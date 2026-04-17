import { activityRepository } from './activity.repository';
import { CreateActivityInput, UpdateActivityInput } from './activity.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const activityService = {
  createActivity: async (input: CreateActivityInput) => {
    logger.info(`Creating new activity: ${input.title}`);
    return activityRepository.create(input);
  },

  getAllActivities: async () => {
    logger.info('Fetching full list of all activities');
    const { data } = await activityRepository.findAll();
    return data;
  },

  searchActivities: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching activities - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    const where = buildSearchFilter(search, ['title', 'description']);
    const { data, total } = await activityRepository.findAll({ where, skip, take });
    return { data, meta: buildMeta(total, p, l) };
  },

  getActivityById: async (id: string) => {
    const activity = await activityRepository.findById(id);
    if (!activity) throw new AppError('Activity not found', 404);
    return activity;
  },

  updateActivity: async (id: string, input: UpdateActivityInput) => {
    const activity = await activityRepository.findById(id);
    if (!activity) throw new AppError('Activity not found', 404);
    return activityRepository.update(id, input);
  },

  deleteActivity: async (id: string) => {
    const activity = await activityRepository.findById(id);
    if (!activity) throw new AppError('Activity not found', 404);
    return activityRepository.delete(id);
  },
};
