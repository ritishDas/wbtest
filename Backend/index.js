require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {getUserUnderSupervisor} = require('./database/db');
const cookieParser = require('cookie-parser');
const {checkAuth} = require('./middlewares/auth');
const userRouter = require('./routes/user');
const { supervisorCheck } = require('./middlewares/autho');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true              
}));

app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());

/*
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
*/

app.use('/api', userRouter);

app.get('/api/supervisor/:id', checkAuth, supervisorCheck, async (req, res) => {
console.log('from supervisor route', req.params.id);
  const clients = await getUserUnderSupervisor(req.params.id);

  res.json({success:true, data:clients, message:'Welcome Supervisor'});
});


mongoose.connect(process.env.MONGO_URI).then(() => {
app.listen(5000, () => {
console.log('server listening on port 5000');
});
}).catch(err => {
  console.log(err);
});
