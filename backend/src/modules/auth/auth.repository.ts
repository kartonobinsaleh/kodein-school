import prisma from '../../config/prisma';
import { User } from '@prisma/client';

// RULE: All Prisma queries are confined here.
// No other layer may import prisma directly.

export const authRepository = {
  /**
   * Find a user by email — used during login to locate the account.
   * Returns null if no user exists with that email.
   */
  findByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
