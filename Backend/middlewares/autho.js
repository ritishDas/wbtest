function adminCheck(req, res, next) {
  if(req.user.role !== 'admin')
    res.status(400).json({
      success:false,
      message:'You Are Not Admin'
    });
  next();
}

function supervisorCheck(req, res, next) {
  if(req.user.role !== 'supervisor')
    res.status(400).json({
      success:false,
      message:'You Are Not Admin'
    });
  next();
}

module.exports = {adminCheck, supervisorCheck};
