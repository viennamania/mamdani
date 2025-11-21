import { z } from 'zod';
import { messages } from '@/config/messages';

export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
});

export type FileSchema = z.infer<typeof fileSchema>;

export const validateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invalidEmail });




export const validatePassword = z
  .string()
  //.min(1, { message: messages.passwordRequired })
  .min(1, { message: "비밀번호는 8~12자리 영문,숫자,특수문자 혼합" })

  /*
  ///.min(6, { message: messages.passwordLengthMin })
  .min(6, { message: "비밀번호는 8~12자리 영문,숫자,특수문자 혼합" })

  //.regex(new RegExp('.*[A-Z].*'), {
  //  message: messages.passwordOneUppercase,
  //})

  .regex(new RegExp('.*[A-Z].*'), {
    message: "비밀번호는 8~12자리 영문,숫자,특수문자 혼합",
  })

  
  //.regex(new RegExp('.*[a-z].*'), {
  //  message: messages.passwordOneLowercase,
  //})

  .regex(new RegExp('.*[a-z].*'), {
    message: "비밀번호는 8~12자리 영문,숫자,특수문자 혼합",
  })

  ///.regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

  .regex(new RegExp('.*\\d.*'), { message: "비밀번호는 8~12자리 영문,숫자,특수문자 혼합" });
  */



export const validateNewPassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });

export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric });
