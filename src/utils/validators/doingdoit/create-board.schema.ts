import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { title } from 'process';
import { categories } from '@/data/product-categories';
import { u } from 'uploadthing/dist/types-e8f81bbc';

// form zod validation schema
export const boardFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  email: validateEmail,
  avatar: fileSchema.optional(),
  role: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
 
  category: z.string().optional(),

  isTop: z.boolean().optional(),

  hidden: z.boolean().optional(),

});

// generate form types from zod validation schema
export type BoardFormTypes = z.infer<typeof boardFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  title: undefined,
  content: undefined,

  category: undefined,

  isTop: undefined,

  hidden: undefined,

};
