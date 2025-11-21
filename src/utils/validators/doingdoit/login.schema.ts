import { z } from 'zod';


import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,

} from '@/utils/validators/doingdoit/common-rules';



// form zod validation schema
export const loginSchema = z.object({

  /*
  id: z.string().min(1, { message: '아이디를 입력해주세요.' } ),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),

  */
 
  rememberMe: z.boolean().optional(),

  email: validateEmail,

  password: validatePassword,
});


 

/*
name: z.string().min(1, { message: messages.nameIsRequired }),
*/

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;


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

