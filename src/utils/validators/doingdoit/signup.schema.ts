import { z } from 'zod';
import { messages } from '@/config/messages';


 
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,

} from '@/utils/validators/doingdoit/common-rules';



               {/* checkbox [필수] 서비스 이용약관 */}
                {/* checkbox [필수] 개인정보수집 및 이용 동의 */}
                {/* checkbox [선택] 마케팅 정보 수신 */}



// form zod validation schema
export const signUpSchema = z.object({

  //firstName: z.string().min(1, { message: messages.firstNameRequired }),
  //lastName: z.string().optional(),
  
  email: validateEmail,

  password: validatePassword,
  
  //confirmPassword: validateConfirmPassword,

  confirmPassword: z.string().optional(),

  
  regType: z.string().optional(),
  
  isAgreed: z.boolean(),

  isAgreedTerms: z.boolean(),
  isAgreedPrivacy: z.boolean(),
  isAgreedMarketing: z.boolean(),

  mobile: z.string().optional(),

  name: z.string().optional(),
  
  //nickname: z.string().optional(),

  // nickname size 2~10
  nickname: z.string().optional(),
  
    //.min(2, { message: "최소 2자 이상 입력해주세요." })
    //.max(10, { message: "최대 10자 이하 입력해주세요."}),

  birthDate: z.string().optional(),

  birthDateYear: z.string().optional(),
  birthDateMonth: z.string().optional(),
  birthDateDay: z.string().optional(),

  gender: z.string().optional(),

  avatar: z.string().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  purpose: z.string().optional(),
  medicalHistory: z.string().optional(),
  familyMedicalHistory: z.string().optional(),


});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
