const {userCheck, generateAccessToken, addUser, adminFetch, deleteUser} = require('../database/db');
const {checkAuth} = require('../middlewares/auth');
const {Router} = require( 'express');
const { supervisorCheck, adminCheck } = require('../middlewares/autho');

const router = Router();

router.post('/login', async(req, res) => {
  const {userId, password} = req.body;
  console.log(userId, password);
  const found = await userCheck(userId, password);
  console.log(found);
  if(found.status){
    token = await generateAccessToken(found.data.userId, found.data.role);
    console.log('from user route:',found.data.userId, found.data.role);
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

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    // secure: true,
    sameSite: "strict"
  });
  res.json({ success: true, message: "Logged out successfully" });
});

router.post('/adduser', checkAuth, supervisorCheck, async (req, res) => {
  const {userId, password} = req.body;
const result = await addUser(userId, password, req.user.userId);

  if(result.status)
    res.json({success:true, message:'User Added'})
  else
    res.json({success:false, message:'duplicate id found'})


});

router.get('/usercheck', checkAuth, (req, res) => {
  console.log('from usercheck ', req.user.role);
  res.json({success:true, data:{userId:req.user.userId, role:req.user.role}});
});

router.get('/adminfetch', checkAuth, adminCheck ,async (req, res) => {
const data = await adminFetch();
  res.json({success:true, data});
})

router.post('/admin/adduser', checkAuth, adminCheck ,async (req, res) => {
const {userId, password, supervisor} = req.body;
const result = await addUser(userId, password, supervisor);

    res.json(result)

});

router.put('/admin/delete', checkAuth, adminCheck ,async (req, res) => {
const {userId} = req.body;
const result = await deleteUser(userId);

    res.json(result)

});

module.exports = router;
