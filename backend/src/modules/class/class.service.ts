import { classRepository } from './class.repository';
import { CreateClassInput, UpdateClassInput } from './class.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const classService = {
  createClass: async (input: CreateClassInput) => {
    logger.info(`Creating new class: ${input.name} (Level ${input.level})`);
    return classRepository.create(input);
  },

  getAllClasses: async (search?: string, page?: string, limit?: string) => {
    if (search || page || limit) {
      logger.info(`Fetching paginated classes - Search: ${search}, Page: ${page}, Limit: ${limit}`);
      const { skip, take, page: p, limit: l } = getPagination(page, limit);
      const where = buildSearchFilter(search, ['name', 'level']);
      const { data, total } = await classRepository.findAll({ where, skip, take });
      return { data, meta: buildMeta(total, p, l) };
    }

    logger.info('Fetching full class list (for select dropdowns)');
    const { data, total } = await classRepository.findAll();
    return { data, total };
  },

  getClassById: async (id: string) => {
    const cls = await classRepository.findById(id);
    if (!cls) throw new AppError('Class not found', 404);
    return cls;
  },

  updateClass: async (id: string, input: UpdateClassInput) => {
    const cls = await classRepository.findById(id);
    if (!cls) throw new AppError('Class not found', 404);
    return classRepository.update(id, input);
  },

  deleteClass: async (id: string) => {
    const cls = await classRepository.findById(id);
    if (!cls) throw new AppError('Class not found', 404);
    return classRepository.delete(id);
  },
};
