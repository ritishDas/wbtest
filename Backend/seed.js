const mongoose = require('mongoose');
const User = require("./models/user");
const bcrypt = require("bcrypt");

require('dotenv').config();

const dummyDatabase = {
  users: [
    { userId: 'adminritish', password: 'pass123', role: 'admin' },
    { userId: 'sup1ritish', password: 'pass123', role: 'supervisor' },
    { userId: 'sup2ritish', password: 'pass123', role: 'supervisor' },
    { userId: 'client1ritish', password: 'pass123', role: 'user', supervisor: 'sup1ritish' },
    { userId: 'client2ritish', password: 'pass123', role: 'user', supervisor: 'sup1ritish' },
    { userId: 'client3ritish', password: 'pass123', role: 'user', supervisor: 'sup2ritish' },
    { userId: 'client4ritish', password: 'pass123', role: 'user', supervisor: 'sup2ritish' }
  ]
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected");

    await User.deleteMany({});
    console.log("Existing users cleared");

    const supervisorsMap = {};

    for (const u of dummyDatabase.users.filter(u => u.role !== "user")) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const doc = await User.create({ ...u, password: hashedPassword });
      supervisorsMap[u.userId] = doc._id;
    }

    for (const u of dummyDatabase.users.filter(u => u.role === "user")) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const supervisorId = supervisorsMap[u.supervisor];
      if (!supervisorId) {
        console.warn(`Supervisor ${u.supervisor} not found for user ${u.userId}`);
        continue;
      }
      await User.create({ userId: u.userId, password: hashedPassword, role: "user", supervisor: supervisorId });
    }

    console.log("Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seed();
