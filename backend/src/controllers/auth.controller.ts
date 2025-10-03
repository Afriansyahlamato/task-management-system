import type { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export async function register(req: Request, res: Response) {
  try {
    const { email, username, name, password } = req.body || {};
    if (!email || !username || !name || !password) {
      return res.status(400).json({ error: 'email, username, name, password are required' });
    }
    if (String(password).length < 5) {
      return res.status(400).json({ error: 'Password must be at least 5 characters' });
    }

    const existing = await User.findOne({
      $or: [{ email: String(email).toLowerCase() }, { username: String(username).toLowerCase() }],
    }).lean();

    if (existing) return res.status(409).json({ error: 'Email or username already in use' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email, username, name, passwordHash, role: 'user',
    });

    const token = jwt.sign(
      { sub: user.id, name: user.username, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ user: user.toJSON(), token });
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: 'Email or username already in use' });
    }
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Failed to register user' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const user = await User.findOne({ username: String(username).toLowerCase() }).select('+passwordHash');
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid username or password' });

    const token = jwt.sign(
      { sub: user.id, name: user.username, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token, user: user.toJSON() });
  } catch (e) {
    console.error('Login error:', e);
    return res.status(500).json({ error: 'Failed to login' });
  }
}
