
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'dev_secret';
function sign(user){ return jwt.sign({ sub: user._id, username: user.username }, secret, { expiresIn: '7d' }); }
function verify(token){ return jwt.verify(token, secret); }
module.exports = { sign, verify };
