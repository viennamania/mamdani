
import nextDynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth/next';

///import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options-doingdoit';


import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';

// Force dynamic rendering for the entire app
export const dynamic = 'force-dynamic';


import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';


//import { inter, lexendDeca } from '@/app/fonts';


import cn from '@/utils/class-names';


import Head from 'next/head';

import { ThirdwebProvider } from "thirdweb/react";



//////import { QueryClient, QueryClientProvider } from 'react-query';



const NextProgress = nextDynamic(() => import('@/components/next-progress'), {
  ssr: false,
});

// styles
import '@/app/globals.css';




export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};







export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {




  // INVALID_CALLBACK_URL_ERROR: Invalid callback URL

  var session = null;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.log(error);
  }

  //const session = await getServerSession(authOptions);

  console.log('session ->', session);

  
  //const [queryClient] = useState(() => new QueryClient());

  ///const queryClient = new QueryClient();
  



  return (
    <html
      //lang="en"
      lang='ko'
      
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >

      <head>
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>


        
        <link rel="stylesheet" href="/se2/css/ko_KR/smart_editor2.css"/>
        
        <script defer src="/se2/js/service/HuskyEZCreator.js"></script>
        
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover" />

        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
      
        

      </head>

      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        
        //className={cn(inter.variable, lexendDeca.variable, 'font-inter')}


        // default font size change


        // noto-sans-kr font is used for korean language
        className={cn('font-noto-sans-kr', 'text-base/5' )}

      >

        {/*
        <QueryClientProvider client={queryClient}>
        */}

        <AuthProvider session={session}>
          <ThemeProvider>

            <ThirdwebProvider>

              <NextProgress />


                {children}


              <Toaster />
              <GlobalDrawer />
              <GlobalModal />

            </ThirdwebProvider>
            
          </ThemeProvider>
        </AuthProvider>

        {/*
        </QueryClientProvider>
        */}


      </body>
    </html>
  );
}
