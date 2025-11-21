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
    <div >
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


        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={() => push(routes.operation.faqcategoryCreate)}
          >
            <PiPen className="me-2 h-4 w-4" />
            등록하기
          </button>
        </div>
      
        
      </PageHeader>

        
      {children}
        

    </div>
  );
}
