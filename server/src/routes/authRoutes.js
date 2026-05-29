import express from 'express';
import { User } from '../models/User.js';
import { Staff } from '../models/Staff.js';
import { Student } from '../models/Student.js';
import { protect } from '../middleware/auth.js';
import { signToken } from '../utils/token.js';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid login credentials.' });
  }

  res.json({
    token: signToken(user),
    user: user.toSafeObject()
  });
});

authRouter.get('/me', protect, async (req, res) => {
  let profile = null;

  if (req.user.role === 'staff') {
    profile = await Staff.findOne({ user: req.user._id });
  }

  if (req.user.role === 'student') {
    profile = await Student.findOne({ user: req.user._id });
  }

  res.json({ user: req.user, profile });
});
