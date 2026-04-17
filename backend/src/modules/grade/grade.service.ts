import { gradeRepository } from './grade.repository';
import { CreateGradeInput, UpdateGradeInput } from './grade.schema';
import { AppError } from '../../middleware/error.middleware';
import { getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const gradeService = {
  createGrade: async (input: CreateGradeInput) => {
    logger.info(`Creating new grade for student: ${input.studentId}`);
    
    const existing = await gradeRepository.checkExists(input.studentId, input.subjectId);
    if (existing) {
      throw new AppError('Grade already exists for this student and subject', 400);
    }
    
    return gradeRepository.create(input);
  },

  getAllGrades: async (page?: string, limit?: string) => {
    if (page || limit) {
      logger.info(`Fetching paginated grades - Page: ${page}, Limit: ${limit}`);
      const { skip, take, page: p, limit: l } = getPagination(page, limit);
      const { data, total } = await gradeRepository.findAll({ skip, take });
      return { data, meta: buildMeta(total, p, l) };
    }

    logger.info('Fetching full grade list');
    const { data, total } = await gradeRepository.findAll();
    return { data, total };
  },

  getGradeById: async (id: string) => {
    logger.info(`Fetching grade by ID: ${id}`);
    const grade = await gradeRepository.findById(id);
    if (!grade) throw new AppError('Grade not found', 404);
    return grade;
  },

  updateGrade: async (id: string, input: UpdateGradeInput) => {
    logger.info(`Updating grade with ID: ${id}`);
    const grade = await gradeRepository.findById(id);
    if (!grade) throw new AppError('Grade not found', 404);
    return gradeRepository.update(id, input);
  },

  deleteGrade: async (id: string) => {
    logger.info(`Deleting grade with ID: ${id}`);
    const grade = await gradeRepository.findById(id);
    if (!grade) throw new AppError('Grade not found', 404);
    return gradeRepository.delete(id);
  },
};
