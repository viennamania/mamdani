'use client';

import { routes } from '@/config/routes';


import { data } from '@/data/doingdoit/faq/category-data';


///import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';

import { getColumns } from '@/app/shared-doingdoit/faq/category-columns';

///import BasicTableWidget from '@/components/doingdoit/tag-table-widget';

import FaqCategoryTableWidget from '@/components/doingdoit/faqcategory-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';




import WidgetCard from '@/components/cards/widget-card';
import { topProductList } from '@/data/top-products-data';
import Rating from '@/components/rating';
import Image from 'next/image';

import { Title, Text } from '@/components/ui/text';

import { useSession, signIn, signOut } from 'next-auth/react';

/*
export const metadata = {
  ...metaObject('FAQ분류관리'),
};
*/

const pageHeader = {
  title: 'FAQ분류관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.operation.healthinfo,
      name: '운영관리',
    },
    {
      name: 'FAQ분류관리',
    },
  ],
};

export default function SearchTablePage() {


  const { data: session, status } = useSession();
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

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}


      
      <FaqCategoryTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        enableSearch={false}
        searchPlaceholder="이름"

        sticky
        scroll={{ x: 600, }}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
      
      {/*
    <WidgetCard
      title={'Top Products'}
      titleClassName="leading-none"
      headerClassName="mb-3 lg:mb-4"
      action={
        <Button variant="outline" size="sm" className="text-sm">
          View All
        </Button>
      }
    >
      
      <div className="grid grid-cols-1 gap-5">
        {topProductList.map((product) => (
          <div
            key={product.title + product.id}
            className="flex items-start pe-2"
          >
            <div className="relative me-3 h-11 w-11 shrink-0 overflow-hidden rounded bg-gray-100">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex w-full items-start justify-between">
              <div>
                <Text className="font-lexend text-sm font-semibold text-gray-900 dark:text-gray-700">
                  {product.title}
                </Text>
                <Text className="text-gray-500">{product.price}</Text>
              </div>
              <div>
                <Rating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </WidgetCard>
    */}
      


      

    </TableLayout>
  );
}
