import { attendanceRepository } from './attendance.repository';
import { CreateAttendanceInput, UpdateAttendanceInput } from './attendance.schema';
import { AppError } from '../../middleware/error.middleware';
import { buildSearchFilter, getPagination, buildMeta } from '../../utils/query.utils';
import logger from '../../utils/logger';

export const attendanceService = {
  createAttendance: async (input: CreateAttendanceInput) => {
    logger.info(`Recording attendance for student ${input.studentId}`);
    return attendanceRepository.create(input);
  },

  getAllAttendance: async () => {
    logger.info('Fetching full list of all attendance records');
    const { data } = await attendanceRepository.findAll();
    return data;
  },

  searchAttendance: async (search?: string, page?: string, limit?: string) => {
    logger.info(`Searching attendance - Search: ${search}, Page: ${page}, Limit: ${limit}`);
    const { skip, take, page: p, limit: l } = getPagination(page, limit);
    
    // Simple filter for status or notes. For student name, we would need nested filter support.
    const where = buildSearchFilter(search, ['status', 'notes']);
    const { data, total } = await attendanceRepository.findAll({ where, skip, take });
    
    return { data, meta: buildMeta(total, p, l) };
  },

  getAttendanceById: async (id: string) => {
    const attendance = await attendanceRepository.findById(id);
    if (!attendance) throw new AppError('Attendance record not found', 404);
    return attendance;
  },

  updateAttendance: async (id: string, input: UpdateAttendanceInput) => {
    const attendance = await attendanceRepository.findById(id);
    if (!attendance) throw new AppError('Attendance record not found', 404);
    return attendanceRepository.update(id, input);
  },

  deleteAttendance: async (id: string) => {
    const attendance = await attendanceRepository.findById(id);
    if (!attendance) throw new AppError('Attendance record not found', 404);
    return attendanceRepository.delete(id);
  },
};
