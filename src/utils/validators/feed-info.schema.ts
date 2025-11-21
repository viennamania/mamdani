import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const feedInfoFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  email: validateEmail,
  avatar: fileSchema.optional(),
  role: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  bio: z.string().optional(),
  portfolios: z.array(fileSchema).optional(),

  feedTitle: z.string().optional(),
  feedContent: z.string().optional(),
  feedbackWriterId: z.string().optional(),
  feedbackWriterNickname: z.string().optional(),
  feedbackWriterEmail: z.string().optional(),
  feedbackWriterAvatar: z.string().optional(),
  feedbackContent: z.string().optional(),
  feedbackCreatedAt: z.string().optional(),
  feedbackUpdatedAt: z.string().optional(),
  feedbackDeletedAt: z.string().optional(),

});

// generate form types from zod validation schema
export type FeedInfoFormTypes = z.infer<typeof feedInfoFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,

  feedTitle: undefined,
  feedContent: undefined,
  feedbackWriterId: undefined,
  feedbackWriterNickname: undefined,
  feedbackWriter: undefined,
  feedbackWriterEmail: undefined,
  feedbackWriterAvatar: undefined,
  feedbackContent: undefined,
  feedbackCreatedAt: undefined,
  feedbackUpdatedAt: undefined,
  feedbackDeletedAt: undefined,
  
};
