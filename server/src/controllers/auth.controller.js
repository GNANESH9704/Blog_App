
const User = require('../models/User');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token.service');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

async function register(req,res,next){
  try{
    const { error, value } = registerSchema.validate(req.body);
    if(error) return res.status(400).json({ message: 'Validation error', details: error.details });
    const { username, email, password } = value;
    const exists = await User.findOne({ $or: [{email}, {username}] });
    if(exists) return res.status(400).json({ message: 'User already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json({ user: { id: user._id, username: user.username, email: user.email } });
  }catch(e){ next(e); }
}

async function login(req,res,next){
  try{
    const { error, value } = loginSchema.validate(req.body);
    if(error) return res.status(400).json({ message: 'Validation error', details: error.details });
    const { emailOrUsername, password } = value;
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = tokenService.sign(user);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  }catch(e){ next(e); }
}

module.exports = { register, login };
