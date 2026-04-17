import { enrollmentRepository } from './enrollment.repository';
import { CreateEnrollmentInput } from './enrollment.schema';
import { AppError } from '../../middleware/error.middleware';
import logger from '../../utils/logger';

export const enrollmentService = {
  createEnrollment: async (input: CreateEnrollmentInput) => {
    logger.info(`Enrolling student ${input.studentId} to course ${input.courseId}`);
    
    // Check if already enrolled
    const existing = await enrollmentRepository.checkExists(input.studentId, input.courseId);
    if (existing) {
        throw new AppError('Student is already enrolled in this course', 400);
    }
    
    return enrollmentRepository.create(input);
  },

  getAllEnrollments: async () => {
    logger.info('Fetching all enrollments');
    return enrollmentRepository.findAll();
  },

  getEnrollmentById: async (id: string) => {
    logger.info(`Fetching enrollment by ID: ${id}`);
    const enrollment = await enrollmentRepository.findById(id);
    if (!enrollment) {
      logger.warn(`Enrollment not found with ID: ${id}`);
      throw new AppError('Enrollment not found', 404);
    }
    return enrollment;
  },

  deleteEnrollment: async (id: string) => {
    logger.info(`Deleting enrollment with ID: ${id}`);
    const enrollment = await enrollmentRepository.findById(id); // Check existence
    if (!enrollment) throw new AppError('Enrollment not found', 404);
    return enrollmentRepository.delete(id);
  },
};
