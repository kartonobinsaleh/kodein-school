import { Router } from 'express';
import { enrollmentController } from './enrollment.controller';
import { validate } from '../../middleware/validate.middleware';
import { createEnrollmentSchema } from './enrollment.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve enrollments
router.get('/', authenticate, enrollmentController.getAll);
router.get('/:id', authenticate, enrollmentController.getById);

// Creation, Deletion (ADMIN mainly controls direct mapping but mentors can access reading)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createEnrollmentSchema),
  enrollmentController.create
);

router.delete('/:id', authenticate, authorize('ADMIN'), enrollmentController.delete);

export default router;
