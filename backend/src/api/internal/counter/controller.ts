import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '../../../utils/responseFormatter';
import { counterService } from '../../../services/counter';

/**
 * @summary
 * Starts the counter for the current user
 */
export async function startHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json(errorResponse('User not authenticated'));
      return;
    }

    const result = await counterService.startCounter(userId);
    res.json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary
 * Pauses the counter for the current user
 */
export async function pauseHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json(errorResponse('User not authenticated'));
      return;
    }

    const result = await counterService.pauseCounter(userId);
    res.json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary
 * Resets the counter for the current user
 */
export async function resetHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json(errorResponse('User not authenticated'));
      return;
    }

    const result = await counterService.resetCounter(userId);
    res.json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary
 * Gets the current counter value for the current user
 */
export async function getCurrentHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json(errorResponse('User not authenticated'));
      return;
    }

    const result = await counterService.getCurrentCounter(userId);
    res.json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}
