import { studentRepository } from './student.repository';
import { CreateStudentInput, UpdateStudentInput } from './student.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const studentService = {
  createStudent: async (input: CreateStudentInput) => {
    logger.info(`Creating new student: ${input.name} (${input.email})`);
    const existingUser = await studentRepository.checkEmailExists(input.email);
    if (existingUser) throw new AppError('Email already in use', 400);
    return studentRepository.create(input);
  },

  getAllStudents: async () => {
    logger.info('Fetching full list of all students (for dropdowns)');
    const { data } = await studentRepository.findAll();
    return data;
  },

  searchStudents: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching students - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['name', 'nis']);
    
    const { data, total } = await studentRepository.findAll({ where, skip, take });
    
    return {
      data,
      meta: buildMeta(total, p, l),
    };
  },

  getStudentById: async (id: string) => {
    logger.info(`Fetching student ID: ${id}`);
    const student = await studentRepository.findById(id);
    if (!student) throw new AppError('Student not found', 404);
    return student;
  },

  updateStudent: async (id: string, input: UpdateStudentInput) => {
    logger.info(`Updating student ID: ${id}`);
    const student = await studentRepository.findById(id);
    if (!student) throw new AppError('Student not found', 404);
    return studentRepository.update(id, input);
  },

  deleteStudent: async (id: string) => {
    logger.info(`Deleting student ID: ${id}`);
    const student = await studentRepository.findById(id);
    if (!student) throw new AppError('Student not found', 404);
    return studentRepository.delete(id);
  },
};
