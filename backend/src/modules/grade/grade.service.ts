import { gradeRepository } from './grade.repository';
import { CreateGradeInput, UpdateGradeInput } from './grade.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const gradeService = {
  createGrade: async (input: CreateGradeInput) => {
    logger.info(`Recording grade for student ${input.studentId} in course ${input.courseId}`);
    return gradeRepository.create(input);
  },

  getAllGrades: async () => {
    logger.info('Fetching full list of all grades');
    const { data } = await gradeRepository.findAll();
    return data;
  },

  searchGrades: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching grades - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    
    // Simple filter for comment or title if exists.
    const where = buildSearchFilter(search, ['comment']);
    const { data, total } = await gradeRepository.findAll({ where, skip, take });
    
    return { data, meta: buildMeta(total, p, l) };
  },

  getGradeById: async (id: string) => {
    const grade = await gradeRepository.findById(id);
    if (!grade) throw new AppError('Grade not found', 404);
    return grade;
  },

  updateGrade: async (id: string, input: UpdateGradeInput) => {
    const grade = await gradeRepository.findById(id);
    if (!grade) throw new AppError('Grade not found', 404);
    return gradeRepository.update(id, input);
  },

  deleteGrade: async (id: string) => {
    const grade = await gradeRepository.findById(id);
    if (!grade) throw new AppError('Grade not found', 404);
    return gradeRepository.delete(id);
  },
};
