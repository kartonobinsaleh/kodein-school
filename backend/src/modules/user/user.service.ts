import { userRepository } from './user.repository';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const userService = {
  searchUsers: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Admin searching users - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['email', 'role']);
    
    const { data, total } = await userRepository.findAll({ where, skip, take });
    return { data, meta: buildMeta(total, p, l) };
  },

  updateUserRole: async (id: string, role: any) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    
    logger.info(`Updating user ${user.email} role to ${role}`);
    return userRepository.update(id, { role });
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
