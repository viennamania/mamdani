'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import ExportButton from '@/app/shared/export-button';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiUploadSimpleBold } from 'react-icons/pi';
import { ro } from '@faker-js/faker';


import { useRouter, useSearchParams } from "next/navigation";



type TableLayoutProps = {
  data: unknown[];
  header: string;
  fileName: string;
} & PageHeaderTypes;

export default function TableLayout({
  data,
  header,
  fileName,
  children,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {

  const router = useRouter();
  

  
  return (
    <>
      <PageHeader {...props}>

        {/*
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={data} fileName={fileName} header={header} />
          <ImportButton title={'Import File'} />
        </div>
        */}
        

        {/*
        {fileName && (  // fileName이 있으면

          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            
            <Button
              className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              onClick={() => {
                // go to /setup/food/import
                router.push('/setup/food/import');
              } }

            >
              <PiUploadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
              DB업로드
            </Button>

            
            <Button
              className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              ocClick={() => {
                exportToCSV(tableData, 'feed_data');
              }}
            
            >
              <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
              엑셀다운로드
            </Button>
          </div>
          */}

        
        
        

        
      </PageHeader>

      {children}
    </>
  );
}
