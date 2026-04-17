import { submissionRepository } from './submission.repository';
import { CreateSubmissionInput, UpdateSubmissionInput } from './submission.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const submissionService = {
  createSubmission: async (input: CreateSubmissionInput) => {
    logger.info(`Creating new submission for activity: ${input.activityId}`);
    
    const existing = await submissionRepository.checkExists(input.activityId, input.studentId);
    if (existing) {
      throw new AppError('You have already submitted for this activity', 400);
    }
    
    return submissionRepository.create(input);
  },

  getAllSubmissions: async (search?: string, page?: string, limit?: string) => {
    if (search || page || limit) {
      logger.info(`Fetching paginated submissions - Search: ${search}, Page: ${page}, Limit: ${limit}`);
      const { skip, take, page: p, limit: l } = getPagination(page, limit);
      const where = buildSearchFilter(search, ['content', 'feedback']);
      const { data, total } = await submissionRepository.findAll({ where, skip, take });
      return { data, meta: buildMeta(total, p, l) };
    }

    logger.info('Fetching full submission list');
    const { data, total } = await submissionRepository.findAll();
    return { data, total };
  },

  getSubmissionById: async (id: string) => {
    logger.info(`Fetching submission by ID: ${id}`);
    const submission = await submissionRepository.findById(id);
    if (!submission) throw new AppError('Submission not found', 404);
    return submission;
  },

  updateSubmission: async (id: string, input: UpdateSubmissionInput) => {
    logger.info(`Updating submission with ID: ${id}`);
    const submission = await submissionRepository.findById(id);
    if (!submission) throw new AppError('Submission not found', 404);
    return submissionRepository.update(id, input);
  },

  deleteSubmission: async (id: string) => {
    logger.info(`Deleting submission with ID: ${id}`);
    const submission = await submissionRepository.findById(id);
    if (!submission) throw new AppError('Submission not found', 404);
    return submissionRepository.delete(id);
  },
};
