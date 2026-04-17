import { subjectRepository } from './subject.repository';
import { CreateSubjectInput, UpdateSubjectInput } from './subject.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const subjectService = {
  createSubject: async (input: CreateSubjectInput) => {
    logger.info(`Creating new subject: ${input.name}`);
    return subjectRepository.create(input);
  },

  getAllSubjects: async (search?: string, page?: string, limit?: string) => {
    if (search || page || limit) {
      logger.info(`Fetching paginated subjects - Search: ${search}, Page: ${page}, Limit: ${limit}`);
      const { skip, take, page: p, limit: l } = getPagination(page, limit);
      const where = buildSearchFilter(search, ['name']);
      const { data, total } = await subjectRepository.findAll({ where, skip, take });
      return { data, meta: buildMeta(total, p, l) };
    }

    logger.info('Fetching full subject list (for select dropdowns)');
    const { data, total } = await subjectRepository.findAll();
    return { data, total };
  },

  getSubjectById: async (id: string) => {
    const sub = await subjectRepository.findById(id);
    if (!sub) throw new AppError('Subject not found', 404);
    return sub;
  },

  updateSubject: async (id: string, input: UpdateSubjectInput) => {
    const sub = await subjectRepository.findById(id);
    if (!sub) throw new AppError('Subject not found', 404);
    return subjectRepository.update(id, input);
  },

  deleteSubject: async (id: string) => {
    const sub = await subjectRepository.findById(id);
    if (!sub) throw new AppError('Subject not found', 404);
    return subjectRepository.delete(id);
  },
};
