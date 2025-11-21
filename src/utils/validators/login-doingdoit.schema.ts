import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
