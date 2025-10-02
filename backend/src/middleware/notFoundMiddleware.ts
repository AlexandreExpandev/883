import { Request, Response } from 'express';

/**
 * @summary
 * Middleware to handle 404 Not Found errors
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      code: 'NOT_FOUND',
    },
    timestamp: new Date().toISOString(),
  });
}
