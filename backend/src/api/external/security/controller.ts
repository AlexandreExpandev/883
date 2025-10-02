import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { successResponse, errorResponse } from '../../../utils/responseFormatter';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

/**
 * @summary
 * Handles user login and returns JWT token
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const validatedData = await loginSchema.parseAsync(req.body);

    // In a real app, you would verify credentials against database
    // For this foundation, we'll simulate successful authentication

    // Generate JWT token
    const token = jwt.sign({ id: 1, email: validatedData.email }, config.security.jwtSecret, {
      expiresIn: config.security.jwtExpiresIn,
    });

    res.json(
      successResponse({
        token,
        user: {
          id: 1,
          email: validatedData.email,
        },
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * Handles user registration
 */
export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Validate request body
    const validatedData = await registerSchema.parseAsync(req.body);

    // In a real app, you would save user to database
    // For this foundation, we'll simulate successful registration

    res.status(201).json(
      successResponse({
        message: 'User registered successfully',
        user: {
          id: 1,
          name: validatedData.name,
          email: validatedData.email,
        },
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * Handles password reset requests
 */
export async function forgotPasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Validate request body
    const validatedData = await forgotPasswordSchema.parseAsync(req.body);

    // In a real app, you would send password reset email
    // For this foundation, we'll simulate successful request

    res.json(
      successResponse({
        message: 'Password reset instructions sent to email',
        email: validatedData.email,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
    } else {
      next(error);
    }
  }
}
