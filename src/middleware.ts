import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';




import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes
  matcher: [
    ///////'/',
    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',
    '/forms/profile-settings/:path*',

    ///'/usermain/feeds/my',

    '/usermain/user/profile-edit/:path*',

    /*
    '/feed/:path*',
    '/user/:path*',
    '/board/:path*',
    '/survey/:path*',
    '/operation/:path*',
    '/point/:path*',
    '/setup/:path*',
    */


    '/usermain/feeds/interest',
    '/usermain/feeds/my',

    '/usermain/feeds/survey',
    '/usermain/feeds/statistics',
    '/usermain/feeds/statistics/weekly',
    '/usermain/feeds/statistics/monthly',
    '/usermain/feeds/statistics/totally',

  

  ],
};
