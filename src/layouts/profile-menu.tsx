'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';


import { Popover } from '@/components/ui/popover';


import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';

import Link from 'next/link';


import { use, useEffect, useState } from 'react';

import { useSession, signOut } from 'next-auth/react';
import { ro } from '@faker-js/faker';


import { useRouter, usePathname} from 'next/navigation';



const menuItems = [

  
  {
    name: '프로필',
    //href: routes.usermain.myProfileEdit,
    href: routes.usermain.myPage,
  },
  
  /*
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Activity Log',
    href: '#',
  },
  */
];




function DropdownMenu() {

  const router = useRouter();


  const { data: session } = useSession(); // pre-fetch session data

 
  console.log('DropdownMenu session ->', session);

  if (!session) return null;
  





  return (
    <div className="w-64 text-left rtl:text-right">


  

      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={session?.user?.image || '/usermain/images/avatar.svg'}
          name={session?.user?.name || ''}
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {session?.user?.name}
          </Title>
          <Text className="text-gray-600">{session?.user?.email}</Text>
        </div>
      </div>
      
      
      {/*
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      */}
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">

        <button
          onClick={() => {

            router.push('/user/my-profile-edit');
            // goto '/user/my-profile-edit'

            
  
          } }
          className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
        >
          비밀번호 변경
        </button>


      </div>
      
      
      

      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => signOut(
            { callbackUrl: '/signin' }
          )}
        >
          로그아웃
        </Button>
      </div>

    
      
    </div>
  );
}





export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {


  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);


  const { data: session } = useSession(); // pre-fetch session data

  ///console.log('ProfileMenu session', session);

  const [userData, setUserData] = useState(
    {
      email: '',
      name: '',
      nickname: '',
      avatar: '',
      // role is array of string
      role: [],
    }
  );

  useEffect(() => {

    // api call

    const fetchUserData = async () => {

    const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      
      const data = await res.json() as any;

      console.log('fetchUserData data ->', data);

      setUserData(data.data);

    }

    fetchUserData();

  } , [session?.user?.email]);



  return (


    <>

    {/* if userData don't have nickname, show nothing */}

    { !userData?.nickname ? (

      <>
            <div className='flex flex-row gap-3  ' >
              <Link href={routes.signIn}>
                로그인
              </Link>
            </div>
      
      </>

    ) : (

    

    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      
      placement="bottom-end"

      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"

    >

      <div className='flex flex-row gap-2 items-center justify-center'>

        { session ? (
          

            <button
              //className={cn(
                //'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
                //buttonClassName
              //)}
            >

              <div className='flex flex-row gap-2 items-center justify-center'>

                <div className='flex' >
                  {session?.user?.name}
                </div>

                <Avatar
                  src={session?.user?.image || '/usermain/images/avatar.svg'}
                  name={session?.user?.name || ''}
                  color="invert"
                  ///className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
                  className={cn('h-9 w-9', avatarClassName)}
                />
               </div>

            </button>
         
          
        ) : (

          <>
            <div className='flex flex-row gap-3  ' >
              <Link href={routes.signIn}>
                로그인
              </Link>
            </div>

          </>
          
        ) }

      </div>


    </Popover>

    )}




    </>



  );
}
