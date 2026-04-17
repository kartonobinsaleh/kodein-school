import bcrypt from 'bcrypt';
import { authRepository } from './auth.repository';
import { signToken } from '../../utils/jwt.utils';
import { AppError } from '../../middleware/error.middleware';
import { LoginInput } from './auth.schema';
import logger from '../../utils/logger';

// RULE: All business logic lives here.
// This layer MUST NOT import prisma — it calls repository methods only.

export const authService = {
  /**
   * Authenticate a user with email + password.
   * Throws 401 AppError on any credential mismatch (intentionally vague
   * to prevent user enumeration attacks).
   */
  login: async (input: LoginInput) => {
    logger.info(`Login attempt for email: ${input.email}`);
    
    // 1. Locate user by email
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      logger.warn(`Login failed: User not found for email ${input.email}`);
      throw new AppError('Invalid email or password', 401);
    }

    // 2. Verify password against bcrypt hash
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for email ${input.email}`);
      throw new AppError('Invalid email or password', 401);
    }

    // 3. Issue JWT access token
    logger.info(`Login successful for email: ${input.email}`);
    const token = signToken({ userId: user.id, role: user.role });

    // 4. Return token + safe user object (never expose password hash)
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  },
};
