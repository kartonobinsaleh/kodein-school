import { courseRepository } from './course.repository';
import { CreateCourseInput, UpdateCourseInput } from './course.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const courseService = {
  createCourse: async (input: CreateCourseInput) => {
    logger.info(`Creating new course: ${input.title}`);
    const existingCourse = await courseRepository.findBySubjectAndMentor(input.subjectId, input.mentorId);
    if (existingCourse) throw new AppError('Course with this subject and mentor already exists', 400);
    return courseRepository.create(input);
  },

  getAllCourses: async () => {
    logger.info('Fetching full list of all courses');
    const { data } = await courseRepository.findAll();
    return data;
  },

  searchCourses: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching courses - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['title']);
    const { data, total } = await courseRepository.findAll({ where, skip, take });
    return { data, meta: buildMeta(total, p, l) };
  },

  getCourseById: async (id: string) => {
    const course = await courseRepository.findById(id);
    if (!course) throw new AppError('Course not found', 404);
    return course;
  },

  updateCourse: async (id: string, input: UpdateCourseInput, user: any) => {
    const course = await courseRepository.findById(id);
    if (!course) throw new AppError('Course not found', 404);
    if (user.role !== 'ADMIN' && course.mentorId !== user.id) {
       throw new AppError('Unauthorized: You can only update your own courses', 403);
    }
    return courseRepository.update(id, input);
  },

  deleteCourse: async (id: string, user: any) => {
    const course = await courseRepository.findById(id);
    if (!course) throw new AppError('Course not found', 404);
    if (user.role !== 'ADMIN' && course.mentorId !== user.id) {
       throw new AppError('Unauthorized: You can only delete your own courses', 403);
    }
    return courseRepository.delete(id);
  },
};
