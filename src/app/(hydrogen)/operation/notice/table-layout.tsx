'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import ExportButton from '@/app/shared/export-button';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiRecordLight, PiPen } from 'react-icons/pi';

import { routes } from '@/config/routes';

//import { Router } from 'next/router';

import { useRouter } from 'next/navigation';

import Link from 'next/link';



type TableLayoutProps = {
  //data: unknown[];
  //header: string;
  fileName: string;
} & PageHeaderTypes;

export default function TableLayout({
  //data,
  //header,
  fileName,
  children,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {

  const { push } = useRouter();

  return (
    <>
      <PageHeader {...props}>

        {/*
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={data} fileName={fileName} header={header} />
          <ImportButton title={'Import File'} />
        </div>
        */}

        {fileName && (  // fileName이 있으면

        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            엑셀다운로드
          </Button>
        </div>
        
        )}

        {/*
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          
          onClick={() => {
            //Router.push(routes.operation.healthinfo.create);
          }}
          >
            <PiRecordLight className="me-1.5 h-[17px] w-[17px]" />
            등록하기
          </Button>
        </div>
        */}

        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={() => push(routes.operation.noticeCreate)}
          >
            <PiPen className="me-2 h-4 w-4" />
            등록하기
          </button>
        </div>


        {/* 

        <Button
          color="primary"
          size="xl"
          className="mt-8 h-12 px-4 xl:h-14 xl:px-6"
          onClick={() => push('/')}
        >
          <PiHouseLineBold className="mr-1.5 text-lg" />
          Back to home
        </Button>
        */}
      
        {/*
        <div className="flex items-center justify-end mb-3">
          <Link href="/operation/healthinfo/create">
            <a className="flex items-center space-x-2">
              <PiRecordLight className="w-5 h-5" />
              <span>등록하기</span>
            </a>
          </Link>
        </div>
        */}

      
        
      </PageHeader>

      {children}
    </>
  );
}
