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
  ]
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


module.exports = {userCheck, generateAccessToken, getUserUnderSupervisor};
