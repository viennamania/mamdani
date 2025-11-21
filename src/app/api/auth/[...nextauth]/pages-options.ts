import { routes } from '@/config/routes';
import { PagesOptions } from 'next-auth';


export const pagesOptions: Partial<PagesOptions> = {
  //signIn: routes.signIn,
  //error: routes.signIn,


  

  signIn: routes.usermain.signIn,

  /////signIn: '/signin',


  error: routes.usermain.signIn,

};
