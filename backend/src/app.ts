import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import loggerMiddleware from './middleware/logger.middleware';

// ─── Module Routers (uncomment as each module is implemented) ─────────────────
import authRouter       from './modules/auth/auth.route';
import studentRouter    from './modules/student/student.route';
import classRouter      from './modules/class/class.route';
import subjectRouter    from './modules/subject/subject.route';
import courseRouter     from './modules/course/course.route';
import enrollmentRouter from './modules/enrollment/enrollment.route';
import activityRouter   from './modules/activity/activity.route';
import submissionRouter from './modules/submission/submission.route';
import gradeRouter      from './modules/grade/grade.route';
import attendanceRouter from './modules/attendance/attendance.route';
import userRouter       from './modules/user/user.route';

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/auth',        authRouter);
app.use('/students',    studentRouter);
app.use('/classes',     classRouter);
app.use('/subjects',    subjectRouter);
app.use('/courses',     courseRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/activities',  activityRouter);
app.use('/submissions', submissionRouter);
app.use('/grades',      gradeRouter);
app.use('/attendance',  attendanceRouter);
app.use('/users',       userRouter);

// ─── Centralized Error Handler (must be last) ─────────────────────────────────
app.use(errorHandler);

export default app;
