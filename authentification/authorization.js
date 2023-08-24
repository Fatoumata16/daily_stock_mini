const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
try{
  const token=req.headers.authorization.split(' ')[1];
  const decodetoken=jwt.verify(token,'RAMDOM_TOKEN_SECRET')
  const userId = decodetoken.userId;
  req.auth = {
      userId: userId
  };
next();
}
catch(error) {
    res.status(401).json({ error });
}}