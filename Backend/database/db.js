const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

 async function userCheck(userId, password) {
  const user = await User.findOne({ userId });

  if (!user) return { status: false };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: false };

  return { status: true, data: user };
}

 async function generateAccessToken(userId, role) {
  const secret = process.env.TOKEN_SECRET || "dev_secret_key";
  const token = jwt.sign({ userId, role }, secret, { expiresIn: "1h" });
  return token;
}

 async function getUserUnderSupervisor(supervisorId) {
 const supervisor = await User.findOne({ userId: supervisorId, role: "supervisor" });
  if (!supervisor) return [];

  const users = await User.find({ supervisor: supervisor._id }, "userId role");
  return users;
}

 async function deleteUser(userId) {
  const result = await User.findOneAndDelete({ userId, role: "user" });
  if (!result) return { status: false, message: "User not found" };
  return { status: true, message: "User deleted successfully" };
}

 async function addUser(userId, password, supervisorId) {
  const existingUser = await User.findOne({ userId });
  if (existingUser) return { status: false, message: "Duplicate userId" };

  const supervisor = await User.findOne({ userId: supervisorId, role: "supervisor" });
  if (!supervisor) return { status: false, message: "No supervisor matched" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    userId,
    password: hashedPassword,
    role: "user",
    supervisor: supervisor._id
  });

  await newUser.save();

  return { status: true, message: "User added successfully" };
}

 async function adminFetch() {
  const supervisors = await User.find({ role: "supervisor" });

  const result = [];
  for (let sup of supervisors) {
    const users = await User.find({ role: "user", supervisor: sup._id }, "userId role");
    result.push({
      userId: sup.userId,
      role: sup.role,
      users: users
    });
  }

  return result;
}

module.exports = {deleteUser, adminFetch, addUser, userCheck, generateAccessToken, getUserUnderSupervisor};
