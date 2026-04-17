import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { LoginInput } from './auth.schema';

// RULE: Controllers handle req/res wiring only — zero business logic.
// All logic is delegated to the service layer.

export const authController = {
  /**
   * POST /auth/login
   * Body is pre-validated by Zod middleware before this handler is called.
   */
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = req.body as LoginInput;
      const result = await authService.login(input);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      next(error); // delegate to centralized error handler
    }
  },
};
