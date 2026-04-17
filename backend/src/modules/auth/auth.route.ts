import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { loginSchema } from './auth.schema';

const router = Router();

/**
 * POST /auth/login
 *
 * Flow: validate(loginSchema) → authController.login
 * - validate() runs Zod parse; returns 400 if input is invalid
 * - controller delegates to authService.login
 * - No authentication required (public route)
 */
router.post('/login', validate(loginSchema), authController.login);

export default router;
