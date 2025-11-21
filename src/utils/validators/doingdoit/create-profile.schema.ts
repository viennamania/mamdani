import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { title } from 'process';
import { Description } from '@headlessui/react/dist/components/description/description';

// form zod validation schema
export const profileFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),

  nickname: z.string().optional(),
  email: validateEmail,
  loginId: z.string().optional(),
  loginPassword: z.string().optional(),
  mobile: z.string().optional(),
  avatar: fileSchema.optional(),
  roles: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  portfolios: z.array(fileSchema).optional(),
  description: z.string().optional(),




  access_user_member: z.boolean().optional(),
  access_user_withdrew: z.boolean().optional(),
  access_user_admin: z.boolean().optional(),

  access_feed: z.boolean().optional(),
  access_feed_stats: z.boolean().optional(),

  access_board: z.boolean().optional(),
  access_board_tag: z.boolean().optional(),

  access_survey: z.boolean().optional(),
  access_survey_stats: z.boolean().optional(),

  access_operation_healthinfo: z.boolean().optional(),
  access_operation_guide: z.boolean().optional(),
  access_operation_notice: z.boolean().optional(),
  access_operation_faq: z.boolean().optional(),
  access_operation_faqcategory: z.boolean().optional(),

  access_point: z.boolean().optional(),
  access_point_setting: z.boolean().optional(),

  access_setup_food: z.boolean().optional(),
  access_setup_terms: z.boolean().optional(),




 
  
  // 공개 여부 영어로 뭐라고 해야할지 모르겠음
  // 공개하지안음 영어로 뭐라고 해야할지 모르겠음
  hidden: z.boolean().optional(),




});



// generate form types from zod validation schema
export type ProfileFormTypes = z.infer<typeof profileFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  nickname: undefined,
  email: undefined,
  loginId: undefined,
  loginPassword: undefined,
  mobile: undefined,
  avatar: undefined,
  roles: undefined,
  country: undefined,
  timezone: undefined,
  title: undefined,
  content: undefined,
  portfolios: undefined,
  description: undefined,

  access_user_member: false,
  access_user_withdrew: false,
  access_user_admin: false,

  access_feed: false,
  access_feed_stats: false,

  access_board: false,
  access_board_tag: false,

  access_survey: false,
  access_survey_stats: false,

  access_operation_healthinfo: false,
  access_operation_guide: false,
  access_operation_notice: false,
  access_operation_faq: false,
  access_operation_faqcategory: false,

  access_point: false,
  access_point_setting: false,

  access_setup_food: false,
  access_setup_terms: false,
  

  
  
  hidden: false,
};
