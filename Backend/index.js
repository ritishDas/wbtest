require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {fetchUsers, userCheck, generateAccessToken, getUserUnderSupervisor} = require('./database/db');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true              
}));

app.use(cookieParser());

app.get('/api/getusers', async(req, res) => {
  try{
  const users = await fetchUsers();
  console.log(users);
  res.status(200).json({
    success:true,
    data:users
  });
  }
  catch(err){
    console.log(err);
  }
});

app.post('/api/login', async(req, res) => {
  const {userId, password} = req.body;
  console.log(userId, password);
  const found = await userCheck(userId, password);
  console.log(found);
  if(found.status){
    token = await generateAccessToken(userId);
    console.log(token);
    const options = {
      httpOnly:true,
      // secure:true,
      expires:new Date(Date.now() + 24*60*60*1000)
    };
    res.cookie('token', token, options).json({success:true});
  }
  else
  res.json({success:false});
});

function checkAuth(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if(!token)
  return res.json({success:false, message:'No token found'});
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err)
    return res.json({success:false, message:'Token not verified'});
    req.user = {userId:user.userId, role:user.role};
  
    next();
  });
}

app.get('/api/usercheck', checkAuth, (req, res) => {
  res.json({success:true, data:{userId:req.user.userId}});
});

app.get('/api/supervisor', checkAuth, async (req, res) => {
  if(req.user?.role === 'client')
  return res.json({success:false, message:'Not a supervisor or client'});

  const clients = await getUserUnderSupervisor(req.user?.userId);


  res.json({success:true, data:clients, message:'Welcome Supervisor'});
});


mongoose.connect(process.env.MONGO_URI).then(() => {
app.listen(5000, () => {
console.log('server listening on port 5000');
});
}).catch(err => {
  console.log(err);
});
