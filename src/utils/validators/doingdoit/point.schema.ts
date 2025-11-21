import { z } from 'zod';

// form zod validation schema
export const pointSchema = z.object({

  feed_like: z.number().optional(),
  board_like: z.number().optional(),
  attendance: z.number().optional(),
  feed_post: z.number().optional(),
  board_post: z.number().optional(),
  feed_comment: z.number().optional(),
  board_comment: z.number().optional(),

});

/*
name: z.string().min(1, { message: messages.nameIsRequired }),
*/

// generate form types from zod validation schema
export type PointSchema = z.infer<typeof pointSchema>;


