import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { title } from 'process';

// form zod validation schema
export const commentFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  email: validateEmail,
  avatar: fileSchema.optional(),
  role: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  title: z.string().optional(),
  
  commentContent: z.string().optional(),
  replyContent: z.string().optional(),


  portfolios: z.array(fileSchema).optional(),
 
  
  // 공개 여부 영어로 뭐라고 해야할지 모르겠음
  // 공개하지안음 영어로 뭐라고 해야할지 모르겠음
  hidden: z.boolean().optional(),

});

// generate form types from zod validation schema
export type CommentFormTypes = z.infer<typeof commentFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  title: undefined,
  
  commentContent: undefined,
  replyContent: undefined,

  portfolios: undefined,

  
  hidden: false,
};
