import { z } from 'zod';

export const createSubmissionSchema = z.object({
  activityId: z.string({ required_error: 'Activity ID is required' }),
  studentId: z.string({ required_error: 'Student ID is required' }),
  content: z.string().optional(),
  url: z.string().url('Invalid URL format').optional(),
}).refine(data => data.content || data.url, {
  message: 'Either content or url must be provided',
  path: ['content', 'url'],
});

export const updateSubmissionSchema = z.object({
  content: z.string().optional(),
  url: z.string().url('Invalid URL format').optional(),
  score: z.number().min(0).max(100).optional(),
  feedback: z.string().optional(),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>;
