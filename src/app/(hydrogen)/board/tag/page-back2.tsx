import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';

import { routes } from '@/config/routes';


import { data } from '@/data/doingdoit/board/tag-data';


///import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';

import { getColumns } from '@/app/shared-doingdoit/board/tag-columns';

import BasicTableWidget from '@/components/doingdoit/tag-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';




import WidgetCard from '@/components/cards/widget-card';

import { topProductList } from '@/data/top-products-data';

import Rating from '@/components/rating';
import Image from 'next/image';

import { Title, Text } from '@/components/ui/text';


export const metadata = {
  ...metaObject('추천태그관리'),
};

const pageHeader = {
  title: '추천태그관리',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.board.index,
      name: '자유게시판',
    },
    {
      name: '추천태그관리',
    },
  ],
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        <WidgetCard
          title={'태그'}
          titleClassName="leading-none"
          headerClassName="mb-3 lg:mb-4"
          
          action={
            <Button variant="outline" size="sm" className="text-sm">
              추가
            </Button>
          }
          
        >
          
          <div className="grid grid-cols-1 gap-5">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-start pe-2 "
              >
                <div className="flex w-full items-start justify-start gap-10">
                  <div className="flex items-center space-x-3 text-lg">
                    {item.id}
                  </div>
                  <div>
                    <Text className="font-lexend text-lg font-semibold text-gray-900 dark:text-gray-700">
                      {item.name}
                    </Text>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      color="primary"
                      //onClick={() => alert('삭제')}
                      className='flex items-center space-x-2'
                    >
                      삭제
                    </Button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>


        </WidgetCard>
      </div>
    </>
  );
}
