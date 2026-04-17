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

  getAllSubjects: async () => {
    logger.info('Fetching full subject list (for select dropdowns)');
    const { data } = await subjectRepository.findAll();
    return data;
  },

  searchSubjects: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching subjects - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['name']);
    const { data, total } = await subjectRepository.findAll({ where, skip, take });
    return { data, meta: buildMeta(total, p, l) };
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
