
const tokenService = require('../services/token.service');
function authenticate(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({ message: 'Missing authorization header' });
  const parts = header.split(' ');
  if(parts.length !== 2) return res.status(401).json({ message: 'Invalid authorization header' });
  try{
    const payload = tokenService.verify(parts[1]);
    req.user = { id: payload.sub, username: payload.username };
    next();
  }catch(e){
    return res.status(401).json({ message: 'Invalid/expired token' });
  }
}
module.exports = { authenticate };
