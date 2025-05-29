import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/hash';
import { generateToken } from '../lib/jwt';

const prisma = new PrismaClient();


export const signup = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    let user;
    if (role === 'vendor') {
      user = await prisma.vendor.create({ data: { email, password: hashedPassword } });
    } else if (role === 'delivery') {
      user = await prisma.partner.create({ data: { email, password: hashedPassword } });
    } else if (role === 'customer') {
      user = await prisma.customer.create({ data: { email, password: hashedPassword } });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const token = generateToken({ id: user.id, role });
    res.json({ token, user: { id: user.id, email, role } });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    let user: any;
    if (role === 'vendor') {
      user = await prisma.vendor.findUnique({ where: { email } });
    } else if (role === 'delivery') {
      user = await prisma.partner.findUnique({ where: { email } });
    } else if (role === 'customer') {
      user = await prisma.customer.findUnique({ where: { email } });
    }

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, role });
    res.json({ token, user: { id: user.id, email, role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};
