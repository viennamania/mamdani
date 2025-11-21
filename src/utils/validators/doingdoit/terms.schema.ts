import { z } from 'zod';

// form zod validation schema
export const termsSchema = z.object({

  terms: z.string().optional(),
  privacy: z.string().optional(),
  marketing: z.string().optional(),
  withdrawal: z.string().optional(),

});

/*
name: z.string().min(1, { message: messages.nameIsRequired }),
*/

// generate form types from zod validation schema
export type TermsSchema = z.infer<typeof termsSchema>;


// error messages for form fields

export const errorMessages = {
  id: {
    required: '아이디를 입력해주세요.',
    valid: '아이디를 입력해주세요.',
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    valid: '비밀번호를 입력해주세요.',
  },
  rememberMe: {
    required: '아이디 저장',
    valid: '아이디 저장',
  },
};

