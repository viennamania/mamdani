import Header from '@/layouts/helium/helium-header';
import Sidebar from '@/layouts/helium/helium-sidebar';

import { useSession, signOut } from 'next-auth/react';

import Top1 from "@/components-figma/top1";

import { usePathname } from 'next/navigation';


export default function HeliumLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { data: session, status } = useSession();

  const isRootPath = usePathname() === '/';

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

 

  if (session && session?.user?.email?.includes('cryptoss.beauty') && !isRootPath) {

    return (

    
        
        <>
  
          
          <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
          
  
          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            
            <Header />
  
            <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 xl:pl-3 2xl:pl-6 3xl:px-8 3xl:pl-6 3xl:pt-4 4xl:px-10 4xl:pb-9 4xl:pl-9">
              {children}
            </div>
          </div>
          
        </>
  
      );

  }
  


 

  return (


    <main className="flex min-h-screen flex-grow">

      
      {
      /*
      session && (session?.user?.email === 'admin@cryptoss.beauty'
      || session && session?.user?.email === 'doingdoit1@cryptoss.beauty'
      || session && session?.user?.email === 'doingdoit2@cryptoss.beauty'
      || session && session?.user?.email === 'doingdoit3@cryptoss.beauty'
      || session && session?.user?.email === 'doingdoit4@cryptoss.beauty'
      || session && session?.user?.email === 'doingdoit5@cryptoss.beauty'
      */
      //session && session?.user?.email?.includes('cryptoss.beauty') 
         

      // check path is /


      false
      
      
      
      ? (
      

        <>

          
          <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
          


          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            
            <Header />

            <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 xl:pl-3 2xl:pl-6 3xl:px-8 3xl:pl-6 3xl:pt-4 4xl:px-10 4xl:pb-9 4xl:pl-9">
              {children}
            </div>
          </div>
          
        </>

      ) : (

      

        <>

          <div className="flex flex-col w-full">
            
            {/*
            <Header />
            */}
            


{/*
<div className="bg-dark felx sticky top-0 z-50 ">
              <Top1
                logo="/usermain/images/logo-oneclick.png"
                topBackgroundColor="#fff"
                topBorderBottom="1px solid #ddd"
                topBoxSizing="border-box"
                frameDivBorderBottom="unset"
                frameDivBoxSizing="unset"
                divColor="#212121"
                frameDivBorderBottom1="unset"
                frameDivBoxSizing1="unset"
                divColor1="#212121"
                frameDivBorderBottom2="2px solid #212121"
                frameDivBoxSizing2="border-box"
                divColor2="#212121"
                divColor3="#212121"
                aboutColor="#212121"
                frameDivBorder="1px solid #666"
                divColor4="#212121"
                frameDivBorder1="1px solid #666"
                divColor5="#212121"
              />
      </div>

*/}



            
            {/*
            <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 xl:pl-3 2xl:pl-6 3xl:px-8 3xl:pl-6 3xl:pt-4 4xl:px-10 4xl:pb-9 4xl:pl-9">
            */}
            <div className='flex flex-grow flex-col'>
              {children}
            </div>
          </div>
            
            
        </>

      

      ) }

      

    </main>
  );
}
