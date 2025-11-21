import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { title } from 'process';

// form zod validation schema
export const categoryFormSchema = z.object({

  name: z.string().optional(),
  

});

// generate form types from zod validation schema
export type CategoryFormTypes = z.infer<typeof categoryFormSchema>;

export const defaultValues = {

  name: undefined,

};
