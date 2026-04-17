import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Reusable Zod validation middleware factory.
 *
 * Usage: router.post('/path', validate(mySchema), controller.handler)
 *
 * - On success: replaces req.body with the parsed (type-safe) value and calls next()
 * - On ZodError: returns 400 with a structured field-level error array
 * - On unexpected error: passes to global error handler
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
