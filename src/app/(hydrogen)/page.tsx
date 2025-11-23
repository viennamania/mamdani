'use client';


//import FileDashboard from '@/app/shared/file/dashboard';

///import Dashboard from '@/app/shared-doingdoit/dashboard';

import Dashboard from '@/app/shared-doingdoit-figma/dashboard';


import { metaObject } from '@/config/site.config';


import { GetStaticProps } from 'next';

import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';


import { useSession } from 'next-auth/react';



/*
export const metadata = {
  ...metaObject(),
};
*/



export default function HomePage() {

  const { data: session, status } = useSession();

  console.log('session', session);

  /*
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Unauthenticated</div>;
  }

  if (status === 'authenticated') {
    return <Dashboard />;
  }

  return <div>Something went wrong...</div>;
  */


  /*
  if (status === 'authenticated' && session.user.email === 'admin@cryptoss.beauty') {


    window.location.href = '/dashboard';
    
  }
  */


  
  return <Dashboard />;
  

}

/*
export const getStaticProps: GetStaticProps = async () => {

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();


  return {
    props: {
      //meta: defaultMetaProps,
      results,
      totalUsers,
      user: firstUser
    },
    revalidate: 10
  };
};
*/