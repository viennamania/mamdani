'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { Title } from '@/components/ui/text';
import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';


//import { menuItems } from './helium-menu-items';


import { menuItems } from './helium-menu-items-doingdoit';

import { menuItems as menuItemsUser } from './helium-menu-items-doingdoit-user';

import { menuItems as menuItemsWriter } from './helium-menu-items-doingdoit-writer';


// import Logo from '@/components/logo';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';

import { useSession, signOut } from 'next-auth/react';

import { Fragment, useEffect, useState } from 'react';
import { drop, set } from 'lodash';




export default function HeliumSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const { data: session, status } = useSession();


  const [accessArray, setAccessArray] = useState<any>([]);


  /* member data from data */
  const [userData, setUserData] = useState(
    {
      id: '',
      email: '',
      nickname: '',
      avatar: '',
      role: '',
      regType: '',

      gender: '',
      mobile: '',
      birthDate: '',
      weight: 0,
      height: 0,
      purpose: '',
      isAgreedTerms: '',
      isAgreedPolicy: '',
      isAgreedMarketing: '',

      loginId: '',
      password: '',
      roles: '',
      description: '',

      createdAt: '',
      updatedAt: '',
      deletedAt: '',

      status: '',

      access: {
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

      }
    }
  );


  const [homeUrl, setHomeUrl] = useState('/');

  useEffect(() => {

    const getUserData = async () => {
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      const data = json as any;

      setUserData(data?.data);

      console.log('data.data.access', data?.data?.access);

      let tmpAccessArray: any = [];

      data?.data?.access?.access_user_member && tmpAccessArray.push('access_user_member');
      data?.data?.access?.access_user_withdrew && tmpAccessArray.push('access_user_withdrew');
      data?.data?.access?.access_user_admin && tmpAccessArray.push('access_user_admin');
      data?.data?.access?.access_feed && tmpAccessArray.push('access_feed');
      data?.data?.access?.access_feed_stats && tmpAccessArray.push('access_feed_stats');
      data?.data?.access?.access_board && tmpAccessArray.push('access_board');
      data?.data?.access?.access_board_tag && tmpAccessArray.push('access_board_tag');
      data?.data?.access?.access_survey && tmpAccessArray.push('access_survey');
      data?.data?.access?.access_survey_stats && tmpAccessArray.push('access_survey_stats');
      data?.data?.access?.access_operation_healthinfo && tmpAccessArray.push('access_operation_healthinfo');
      data?.data?.access?.access_operation_guide && tmpAccessArray.push('access_operation_guide');
      data?.data?.access?.access_operation_notice && tmpAccessArray.push('access_operation_notice');
      data?.data?.access?.access_operation_faq && tmpAccessArray.push('access_operation_faq');
      data?.data?.access?.access_operation_faqcategory && tmpAccessArray.push('access_operation_faqcategory');
      data?.data?.access?.access_point && tmpAccessArray.push('access_point');
      data?.data?.access?.access_point_setting && tmpAccessArray.push('access_point_setting');
      data?.data?.access?.access_setup_food && tmpAccessArray.push('access_setup_food');
      data?.data?.access?.access_setup_terms && tmpAccessArray.push('access_setup_terms');

      setAccessArray(tmpAccessArray);



      //let href = '';


      if (session && session?.user?.email === 'admin@cryptoss.beauty') {
        
        setHomeUrl('/dashboard');

      } else {

        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i].dropdownItems) {
            for (let j = 0; j < menuItems[i].dropdownItems.length; j++) {
              
              if (tmpAccessArray.includes(menuItems[i].dropdownItems[j].access)) {
                
                //href = menuItems[i].dropdownItems[j].href;

                setHomeUrl(menuItems[i].dropdownItems[j].href);
    
                break;
              }
            }
          }
        }

      }



    }

    getUserData();

  } , [session]);


  //console.log('accessArray:', accessArray);





  if (status === 'loading') {
    return <p>Loading...</p>;
  }






  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[284px] dark:bg-gray-100/50 xl:p-5 2xl:w-[308px]',
        className
      )}
    >
      <div className="h-full bg-gray-900 p-1.5 pl-0  pr-1.5 dark:bg-gray-100/70 xl:rounded-2xl">


        <div className="sticky top-0 z-40 flex justify-center px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
          
          <Link
            href={homeUrl}
            aria-label="Site Logo">

            <Image
              src="/logo-oneclick.png"
              alt={siteConfig.title}
              // className="dark:invert"
              width={250}
              height={100}
              priority
            />
          </Link>


        </div>


        { session && session?.user?.email === 'admin@cryptoss.beauty' ? (

          <SimpleBar className="h-[calc(100%-80px)]">
            <div className="mt-4 pb-3 3xl:mt-6">

              {menuItems.map((item, index) => {

                const isActive = pathname === (item?.href as string);
                const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
                  (dropdownItem) => dropdownItem.href === pathname
                );
                const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

                return (
                  <Fragment key={item.name + '-' + index}>
                    {item?.href ? (
                      <>
                        {item?.dropdownItems ? (
                          <Collapse
                            defaultOpen={isDropdownOpen}
                            header={({ open, toggle }) => (
                              <div
                                onClick={toggle}
                                className={cn(
                                  ' text-base font-bold group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 lg:my-1 2xl:mx-5 2xl:my-2',
                                  isDropdownOpen
                                  //  ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-primary dark:before:bg-primary 2xl:before:-start-5'
                                  //  : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700'
                                    ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-primary dark:before:bg-primary 2xl:before:-start-5'
                                    : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700'
                                )}
                              >
                                <span className="flex items-center">
                                  {item?.icon && (
                                    <span
                                      className={cn(
                                        ' me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                        isDropdownOpen
                                          ? 'text-white dark:text-primary'
                                          : 'text-gray-300/70 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-500'
                                      )}
                                    >
                                      {item?.icon}
                                    </span>
                                  )}
                                  {item.name}
                                </span>

                                <PiCaretDownBold
                                  strokeWidth={3}
                                  className={cn(
                                    'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                    open && 'rotate-0 rtl:rotate-0'
                                  )}
                                />
                              </div>
                            )}
                          >
                            {item?.dropdownItems?.map((dropdownItem, index) => {
                              const isChildActive =
                                pathname === (dropdownItem?.href as string);

                              return (
                                <Link
                                  href={dropdownItem?.href}
                                  key={dropdownItem?.name + index}
                                  className={cn(
                                    'text-sm font-bold group mx-3.5 mb-0.5 flex items-center rounded-md px-2.5 py-2 capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 2xl:px-3.5',
                                    isChildActive
                                      ? 'text-gray-200 dark:text-gray-700'
                                      : 'text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 '
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'me-[18px] ms-1 inline-flex h-2 w-2 rounded-full bg-current transition-all duration-200',
                                      isChildActive
                                        ? 'bg-primary ring-[3px] ring-primary '
                                        : 'opacity-40 group-hover:bg-gray-700'
                                    )}
                                  />{' '}
                                  {dropdownItem?.name}
                                </Link>
                              );
                            })}
                          </Collapse>
                        ) : (
                          <Link
                            href={item?.href}
                            className={cn(
                              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                              isActive
                                ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-gray-900 2xl:before:-start-5'
                                : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-700'
                            )}
                          >
                            {item?.icon && (
                              <span
                                className={cn(
                                  'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200 [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                  isActive
                                    ? 'text-white dark:text-gray-900'
                                    : 'text-gray-300/70 group-hover:text-gray-500 dark:text-gray-500 '
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            {item.name}
                          </Link>
                        )}
                      </>
                    ) : (
                      <Title
                        as="h6"
                        className={cn(
                          'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                          index !== 0 && 'mt-6 3xl:mt-7'
                        )}
                      >
                        {item.name}
                      </Title>
                    )}
                  </Fragment>
                );
              })}
            </div>

          </SimpleBar>


        ) :
        
          /*
          session && session?.user?.email === 'admin@cryptoss.beauty'
          || session && session?.user?.email === 'doingdoit1@cryptoss.beauty'
          || session && session?.user?.email === 'doingdoit2@cryptoss.beauty'
          || session && session?.user?.email === 'doingdoit3@cryptoss.beauty'
          || session && session?.user?.email === 'doingdoit4@cryptoss.beauty'
          || session && session?.user?.email === 'doingdoit5@cryptoss.beauty'
          */
          session && session?.user?.email?.includes('cryptoss.beauty')

         ? (

          <SimpleBar className="h-[calc(100%-80px)]">

            <div className="mt-4 pb-3 3xl:mt-6">

              {
              /////////menuItemsWriter.map((item, index) => {
              menuItems.map((
                item,
                index
              ) => {

                ///console.log('item:', item);


                
                const isActive = pathname === (item?.href as string);

                const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
                  (dropdownItem) => dropdownItem.href === pathname
                );

                const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);


                const isDropdownAccess = item?.dropdownItems?.filter(
                  (dropdownItem) => dropdownItem?.access && accessArray.includes(dropdownItem?.access)
                );

              
                

              
                return (
                  <Fragment key={item.name + '-' + index}>

                    {
          
                  
                    ///item?.href ? (


                    item?.href && isDropdownAccess && isDropdownAccess.length > 0 ? (



                      <>
                        {
                        item?.dropdownItems ? (
                          <Collapse
                            defaultOpen={isDropdownOpen}
                            header={({ open, toggle }) => (
                              <div
                                onClick={toggle}
                                className={cn(
                                  ' text-base font-bold group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 lg:my-1 2xl:mx-5 2xl:my-2',
                                  isDropdownOpen
                                  //  ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-primary dark:before:bg-primary 2xl:before:-start-5'
                                  //  : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700'
                                    ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-primary dark:before:bg-primary 2xl:before:-start-5'
                                    : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700'
                                )}
                              >
                                <span className="flex items-center">
                                  {item?.icon && (
                                    <span
                                      className={cn(
                                        ' me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                        isDropdownOpen
                                          ? 'text-white dark:text-primary'
                                          : 'text-gray-300/70 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-500'
                                      )}
                                    >
                                      {item?.icon}
                                    </span>
                                  )}
                                  {item.name}
                                </span>

                                <PiCaretDownBold
                                  strokeWidth={3}
                                  className={cn(
                                    'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                    open && 'rotate-0 rtl:rotate-0'
                                  )}
                                />
                              </div>
                            )}
                          >
                            {

                              item?.dropdownItems?.map((dropdownItem, index) => {


                                const isAccess = dropdownItem?.access && accessArray.includes(dropdownItem?.access);
                                if (!isAccess) return null;
                             


                              const isChildActive =
                                pathname === (dropdownItem?.href as string);


                    

                                return (

                                  

                                  <Link
                                    href={dropdownItem?.href}
                                    key={dropdownItem?.name + index}
                                    className={cn(
                                      'text-sm font-bold group mx-3.5 mb-0.5 flex items-center rounded-md px-2.5 py-2 capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 2xl:px-3.5',
                                      isChildActive
                                        ? 'text-gray-200 dark:text-gray-700'
                                        : 'text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 '
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        'me-[18px] ms-1 inline-flex h-2 w-2 rounded-full bg-current transition-all duration-200',
                                        isChildActive
                                          ? 'bg-primary ring-[3px] ring-primary '
                                          : 'opacity-40 group-hover:bg-gray-700'
                                      )}
                                    />{' '}
                                    {dropdownItem?.name}
                                  </Link>

                                );

                              


                            })}

                          </Collapse>
                        ) : (
                          <Link
                            href={item?.href}
                            className={cn(
                              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                              isActive
                                ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-gray-900 2xl:before:-start-5'
                                : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-700'
                            )}
                          >
                            {item?.icon && (
                              <span
                                className={cn(
                                  'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200 [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                  isActive
                                    ? 'text-white dark:text-gray-900'
                                    : 'text-gray-300/70 group-hover:text-gray-500 dark:text-gray-500 '
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            {item.name}
                          </Link>
                        )}
                      </>
                    ) : (
                      <>

                      {/*
                      <Title
                        as="h6"
                        className={cn(
                          'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                          index !== 0 && 'mt-6 3xl:mt-7'
                        )}
                      >
                        {item.name}
                      </Title>
                      */}

                      </>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </SimpleBar>          
        
        ) : (

          
          <SimpleBar className="h-[calc(100%-80px)]">

            <div className="mt-4 pb-3 3xl:mt-6">
              {menuItemsUser.map((item, index) => {
                const isActive = pathname === (item?.href as string);
                const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
                  (dropdownItem) => dropdownItem.href === pathname
                );
                const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

                return (
                  <Fragment key={item.name + '-' + index}>
                    {item?.href ? (
                      <>
                        {item?.dropdownItems ? (
                          <Collapse
                            defaultOpen={isDropdownOpen}
                            header={({ open, toggle }) => (
                              <div
                                onClick={toggle}
                                className={cn(
                                  ' text-base font-bold group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 lg:my-1 2xl:mx-5 2xl:my-2',
                                  isDropdownOpen
                                  //  ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-primary dark:before:bg-primary 2xl:before:-start-5'
                                  //  : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700'
                                    ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-primary dark:before:bg-primary 2xl:before:-start-5'
                                    : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700'
                                )}
                              >
                                <span className="flex items-center">
                                  {item?.icon && (
                                    <span
                                      className={cn(
                                        ' me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                        isDropdownOpen
                                          ? 'text-white dark:text-primary'
                                          : 'text-gray-300/70 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-500'
                                      )}
                                    >
                                      {item?.icon}
                                    </span>
                                  )}
                                  {item.name}
                                </span>

                                <PiCaretDownBold
                                  strokeWidth={3}
                                  className={cn(
                                    'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                    open && 'rotate-0 rtl:rotate-0'
                                  )}
                                />
                              </div>
                            )}
                          >
                            {item?.dropdownItems?.map((dropdownItem, index) => {
                              const isChildActive =
                                pathname === (dropdownItem?.href as string);

                              return (
                                <Link
                                  href={dropdownItem?.href}
                                  key={dropdownItem?.name + index}
                                  className={cn(
                                    'text-sm font-bold group mx-3.5 mb-0.5 flex items-center rounded-md px-2.5 py-2 capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 2xl:px-3.5',
                                    isChildActive
                                      ? 'text-gray-200 dark:text-gray-700'
                                      : 'text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-500 '
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'me-[18px] ms-1 inline-flex h-2 w-2 rounded-full bg-current transition-all duration-200',
                                      isChildActive
                                        ? 'bg-primary ring-[3px] ring-primary '
                                        : 'opacity-40 group-hover:bg-gray-700'
                                    )}
                                  />{' '}
                                  {dropdownItem?.name}
                                </Link>
                              );
                            })}
                          </Collapse>
                        ) : (
                          <Link
                            href={item?.href}
                            className={cn(
                              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                              isActive
                                ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-gray-900 2xl:before:-start-5'
                                : 'text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-700'
                            )}
                          >
                            {item?.icon && (
                              <span
                                className={cn(
                                  'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200 [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                  isActive
                                    ? 'text-white dark:text-gray-900'
                                    : 'text-gray-300/70 group-hover:text-gray-500 dark:text-gray-500 '
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            {item.name}
                          </Link>
                        )}
                      </>
                    ) : (
                      <Title
                        as="h6"
                        className={cn(
                          'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                          index !== 0 && 'mt-6 3xl:mt-7'
                        )}
                      >
                        {item.name}
                      </Title>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </SimpleBar>

        ) }



     



      </div>
    </aside>
  );
}
