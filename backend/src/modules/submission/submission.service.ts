import { submissionRepository } from './submission.repository';
import { CreateSubmissionInput, UpdateSubmissionInput } from './submission.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const submissionService = {
  createSubmission: async (input: CreateSubmissionInput) => {
    logger.info(`Submitting work for student ${input.studentId} on activity ${input.activityId}`);
    return submissionRepository.create(input);
  },

  getAllSubmissions: async () => {
    logger.info('Fetching full list of all submissions');
    const { data } = await submissionRepository.findAll();
    return data;
  },

  searchSubmissions: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching submissions - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['content', 'status']);
    const { data, total } = await submissionRepository.findAll({ where, skip, take });
    return { data, meta: buildMeta(total, p, l) };
  },

  getSubmissionById: async (id: string) => {
    const submission = await submissionRepository.findById(id);
    if (!submission) throw new AppError('Submission not found', 404);
    return submission;
  },

  updateSubmission: async (id: string, input: UpdateSubmissionInput) => {
    const submission = await submissionRepository.findById(id);
    if (!submission) throw new AppError('Submission not found', 404);
    return submissionRepository.update(id, input);
  },

  deleteSubmission: async (id: string) => {
    const submission = await submissionRepository.findById(id);
    if (!submission) throw new AppError('Submission not found', 404);
    return submissionRepository.delete(id);
  },
};
