'use client';


import Dashboard from '@/app/shared-doingdoit/dashboard';


import { metaObject } from '@/config/site.config';

import { useSession, signIn, signOut } from 'next-auth/react';



import { useEffect, useState } from 'react';


/*
export const metadata = {
  ...metaObject('대시보드'),
};
*/


export default function DashboardPage() {


  const { data: session, status } = useSession();


  const [userData, setUserData] = useState({}) as any;

  useEffect(() => {

    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }



      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      //////console.log(json);

      const data = json as any;

      
      ////console.log('BoardPage data====>', data);



      setUserData(data?.data);
  

   
    };

    fetchData();

  } , [session?.user?.email]);




  ///if (status === 'loading') return null;

  //if (status === 'unauthenticated') return <div>Unauthenticated</div>;

  // if user email is not '@cryptoss.beauty', logout and callback '/signin'

  if (
    session?.user?.email &&
    !session?.user?.email.includes ('@cryptoss.beauty')
  ) {
    signOut(
      {
        callbackUrl: '/signin',
      }
    );

    return <></>
  }

  if (status !== 'loading' && !session) {
    window.location.href = '/signin';
    return <></>
  }


  return <Dashboard />;


}
