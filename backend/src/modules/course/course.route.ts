import { Router } from 'express';
import { courseController } from './course.controller';
import { validate } from '../../middleware/validate.middleware';
import { createCourseSchema, updateCourseSchema } from './course.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve courses
router.get('/', authenticate, courseController.getAll);
router.get('/search', authenticate, courseController.search);
router.get('/:id', authenticate, courseController.getById);

// Manage courses (ADMIN or MENTOR)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(createCourseSchema),
  courseController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(updateCourseSchema),
  courseController.update
);

router.delete('/:id', authenticate, authorize('ADMIN'), courseController.delete);

export default router;
