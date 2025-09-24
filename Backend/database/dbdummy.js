const jwt = require('jsonwebtoken');

const dummyDatabase = {
  users: [
    {
      userId:'adminritish',
      password:'pass123',
      role:'admin'
    },
    {
      userId:'sup1ritish',
      password:'pass123',
      role:'supervisor'
    },
    {
      userId:'sup2ritish',
      password:'pass123',
      role:'supervisor'
    },
    {
      userId:'client1ritish',
      password:'pass123',
      role:'user',
      supervisor:'sup1ritish'
    },
    {
      userId:'client2ritish',
      password:'pass123',
      role:'user',
      supervisor:'sup1ritish'

    },
    {
      userId:'client3ritish',
      password:'pass123',
      role:'user',
      supervisor:'sup2ritish'

    },
    {
      userId:'client4ritish',
      password:'pass123',
      role:'user',
      supervisor:'sup2ritish'
    },
  ],
};
/*
async function fetchUsers() {
  const users = dummyDatabase.users;
  return users;
}
*/

async function userCheck(userId, password) {
  const users = dummyDatabase.users;
 const foundUser = users.filter(entry => entry.userId === userId && entry.password === password);

  if(foundUser.length)
  return {status:true, data:foundUser[0]}
 else 
  return {status:false}
}

async function generateAccessToken(userId, role) {
  const token = await jwt.sign({userId, role}, process.env.TOKEN_SECRET);
  return token;
}

async function getUserUnderSupervisor(supervisorId) {
  console.log(supervisorId);
  const users = dummyDatabase.users;
  const foundUsers = users.filter(entry => entry.supervisor === supervisorId);
  console.log(foundUsers);

  const data = foundUsers.map(entry =>{ return {userId:entry.userId,
    role:entry.role, supervisor:entry.supervisor}})
  return data;
}

async function deleteUser(userId) {
 const idx = dummyDatabase.users.findIndex(u => u.userId === userId && u.role === "user");

  const [user] = dummyDatabase.users.splice(idx, 1);
  
  return {status:true, message:'done'}

}

async function addUser(userId, password, superV) {

 const foundUser = dummyDatabase.users.filter(entry => entry.userId === userId )

  if(foundUser.length)
  return {status:false, message:'duplicate Id'}

 const foundsuperV = dummyDatabase.users.filter(entry => entry.userId === superV )
  if(!foundsuperV.length)
  return {status:false, message:'No supervisor matched'}

  dummyDatabase.users.push(
    {
      userId:userId,
      password:password,
      role:'user',
      supervisor:superV
    },

  )
  return {status:true, message:'User Added Successfully'}
}

async function adminFetch() {
  const supervisors = dummyDatabase.users.filter(u => u.role === "supervisor");

  return supervisors.map(sup => ({
    userId: sup.userId,
    role: sup.role,
    users: dummyDatabase.users
      .filter(u => u.role === "user" && u.supervisor === sup.userId)
      .map(u => ({
        userId: u.userId,
      role:u.role
      }))
  }));
}

module.exports = {deleteUser, adminFetch, addUser, userCheck, generateAccessToken, getUserUnderSupervisor};
