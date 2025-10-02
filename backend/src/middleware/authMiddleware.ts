import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

/**
 * @summary
 * Authentication middleware to verify JWT tokens and extract user information
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, error: { message: 'No token provided' } });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    jwt.verify(token, config.security.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ success: false, error: { message: 'Invalid token' } });
        return;
      }

      // Add user info to request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ success: false, error: { message: 'Authentication failed' } });
  }
}

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
