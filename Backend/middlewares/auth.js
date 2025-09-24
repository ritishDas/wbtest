const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if(!token)
  return res.json({success:false, message:'No token found'});
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err)
    return res.json({success:false, message:'Token not verified'});
    console.log('from auth middleware', user);
    req.user = {userId:user.userId, role:user.role};
  
    next();
  });
}

module.exports = {checkAuth}
