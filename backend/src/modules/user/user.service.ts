import bcrypt from 'bcrypt';
import { userRepository } from './user.repository';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const userService = {
  createUser: async (data: any) => {
    logger.info(`Admin creating new user: ${data.email} as ${data.role}`);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return userRepository.create({
      ...data,
      password: hashedPassword
    });
  },

  searchUsers: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Admin searching users - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['email', 'role']);
    
    const { data, total } = await userRepository.findAll({ where, skip, take });
    return { data, meta: buildMeta(total, p, l) };
  },

  updateUser: async (id: string, data: { email?: string; password?: string; role?: any }) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    
    const updateData: any = { ...data };
    
    if (data.password) {
      logger.info(`Admin resetting password for user ${user.email}`);
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    if (data.email && data.email !== user.email) {
      logger.info(`Admin updating email for user ${user.email} -> ${data.email}`);
    }

    return userRepository.update(id, updateData);
  },

  deleteUser: async (id: string, currentUserId: string) => {
    if (id === currentUserId) {
      throw new AppError('You cannot delete your own admin account!', 400);
    }
    
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    
    return userRepository.delete(id);
  },
};
