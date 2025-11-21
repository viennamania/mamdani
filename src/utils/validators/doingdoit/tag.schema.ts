import { z } from 'zod';

// form zod validation schema
export const tagSchema = z.object({

  name: z.string().min(1, { message: '태그명은 필수입니다' }),


});

/*
name: z.string().min(1, { message: messages.nameIsRequired }),
*/

// generate form types from zod validation schema
export type TagSchema = z.infer<typeof tagSchema>;


