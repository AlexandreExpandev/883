import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * @summary
 * Middleware factory for request validation using Zod schemas
 */
export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body against schema
      const validatedData = await schema.parseAsync(req.body);

      // Replace request body with validated data
      req.body = validatedData;
      next();
    } catch (error: any) {
      // Return validation errors
      res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: error.errors || error.message,
          code: 'VALIDATION_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  };
}
