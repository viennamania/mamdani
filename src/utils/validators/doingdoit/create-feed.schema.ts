import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const feedFormSchema = z.object({
  feedTitle: z.string().optional(),
  
  // 공개 여부 영어로 뭐라고 해야할지 모르겠음
  // 공개하지안음 영어로 뭐라고 해야할지 모르겠음
  hidden: z.boolean().optional(),

});

// generate form types from zod validation schema
export type FeedFormTypes = z.infer<typeof feedFormSchema>;

export const defaultValues = {
  feedTitle: '',
  hidden: false,
};
