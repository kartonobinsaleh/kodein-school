import { Router } from 'express';
import { activityController } from './activity.controller';
import { validate } from '../../middleware/validate.middleware';
import { createActivitySchema, updateActivitySchema } from './activity.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve activities
router.get('/', authenticate, activityController.getAll);
router.get('/search', authenticate, activityController.search);
router.get('/:id', authenticate, activityController.getById);

// Create, Update, Delete activities (ADMIN and MENTOR can manage activities)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(createActivitySchema),
  activityController.create
);

router.patch(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MENTOR'),
  validate(updateActivitySchema),
  activityController.update
);

router.delete('/:id', authenticate, authorize('ADMIN', 'MENTOR'), activityController.delete);

export default router;
