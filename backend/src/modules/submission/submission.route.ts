import { Router } from 'express';
import { submissionController } from './submission.controller';
import { validate } from '../../middleware/validate.middleware';
import { createSubmissionSchema, updateSubmissionSchema } from './submission.schema';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

// Retrieve submissions
router.get('/', authenticate, submissionController.getAll);
router.get('/:id', authenticate, submissionController.getById);

// Create submissions (STUDENT submits to an activity)
router.post(
  '/',
  authenticate,
  authorize('STUDENT'),
  validate(createSubmissionSchema),
  submissionController.create
);

// Update submissions (Mentor grades, or student updates content before grading)
// Normally, one would split grading endpoints from submission endpoints,
// but for MVP CRUD, we allow all authorized roles to use PATCH.
router.patch(
  '/:id',
  authenticate,
  validate(updateSubmissionSchema),
  submissionController.update
);

// Delete submissions (Admin can purge)
router.delete('/:id', authenticate, authorize('ADMIN'), submissionController.delete);

export default router;
