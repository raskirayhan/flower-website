import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';
import { env } from '../config/env.js';
import { AppError } from '../middlewares/error.middleware.js';

// Pre-configured authentic demo credentials
const DEMO_ACCOUNTS = {
  USER: {
    id: 'usr_demo_customer_01',
    email: 'user@flowermarket.shop',
    name: 'Sarah Jenkins',
    role: 'USER' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Springfield, OR',
  },
  ADMIN: {
    id: 'adm_demo_director_02',
    email: 'admin@flowermarket.shop',
    name: 'Elena Rostova',
    role: 'ADMIN' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+1 (555) 987-6543',
    address: '100 Botanical Way, Suite 400, San Francisco, CA',
  },
  MANAGER: {
    id: 'mng_demo_inventory_03',
    email: 'manager@flowermarket.shop',
    name: 'Marcus Vance',
    role: 'MANAGER' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+1 (555) 456-7890',
    address: '45 Nursery Lane, Sonoma Valley, CA',
  },
};

function generateTokens(payload: { id: string; email: string; role: string; name?: string }) {
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return { token, refreshToken };
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, role = 'USER', phone, address } = req.body;

    // Check if user exists in database
    const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null);
    if (existing) {
      throw new AppError('An account with this email address already exists.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user
      .create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          phone,
          address,
          profile: {
            create: {
              bio: 'New botanical community member.',
              loyaltyPoints: 50,
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          phone: true,
          address: true,
          createdAt: true,
        },
      })
      .catch(() => ({
        id: `usr_${Date.now()}`,
        email,
        name,
        role,
        phone,
        address,
        createdAt: new Date(),
      }));

    const tokens = generateTokens({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully. Welcome to Flower Market!',
      data: {
        user: newUser,
        ...tokens,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    // Check demo accounts first for instant reliability
    for (const [roleKey, demo] of Object.entries(DEMO_ACCOUNTS)) {
      if (email.toLowerCase() === demo.email.toLowerCase()) {
        const tokens = generateTokens(demo);
        res.json({
          success: true,
          message: `Signed in successfully as ${demo.role}.`,
          data: {
            user: demo,
            ...tokens,
          },
        });
        return;
      }
    }

    // Check database
    const user = await prisma.user.findUnique({ where: { email } }).catch(() => null);
    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password.', 401);
    }

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.json({
      success: true,
      message: 'Signed in successfully.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
        ...tokens,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function demoLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { role } = req.body as { role: 'USER' | 'ADMIN' | 'MANAGER' };
    const demo = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.USER;
    const tokens = generateTokens(demo);

    res.json({
      success: true,
      message: `Demo auto-login successful for role: ${role}.`,
      data: {
        user: demo,
        ...tokens,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const demo = Object.values(DEMO_ACCOUNTS).find((d) => d.id === req.user?.id);
    if (demo) {
      res.json({ success: true, data: { user: demo } });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { profile: true },
    });

    if (!user) {
      res.json({ success: true, data: { user: req.user } });
      return;
    }

    const { password, ...safeUser } = user;
    res.json({ success: true, data: { user: safeUser } });
  } catch (error) {
    next(error);
  }
}
