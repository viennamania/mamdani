'use client';

import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';

import { PiList, PiTray } from 'react-icons/pi';

interface TableFooterProps {

  /////////checkedItems: string[];

  checkedItems: any[];
  
  handleDelete: (ids: string[]) => void;

  handleAdd: (ids: string[]) => void;

}

export default function TableFooter({
  checkedItems,
  handleDelete,
  handleAdd,
  children,
}: React.PropsWithChildren<TableFooterProps>) {
  if (checkedItems.length === 0) {
    return null;
  }

  return (

    <div className="  sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      
      <div className='grid grid-cols-2 items-center justify-between gap-5 w-full  '>

        {/* selected items list */}

        <div className="w-full  grid  grid_cols-1 xl:grid-cols-3   gap-2">
          {checkedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
            >
              {
                item?.foodName
              }
            </div>
          ))}
        </div>

        <div className=' flex  flex-col xl:flex-row items-center justify-center gap-5  '>

          <div className=" w-28 flex flex-row items-center justify-center gap-2">
            선택수량:{' '}<Text as="strong">{checkedItems.length}</Text>
          </div>

          <button
            type="button"
            className=" w-24  inline-flex items-center  justify-center p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          
            onClick={() => {

              //////handleDelete(checkedItems);

              handleAdd(checkedItems);

            }}
          >
            <PiTray className="me-2 h-4 w-4" />
            추가
          </button>
          
            {/*
          <Button
            size="lg"
            variant="text"
            className="underline"
            color="danger"
            onClick={() => {
              handleDelete(checkedItems);
            }}
          >
            삭제하기 
          </Button> 
          */}
        </div>


      </div>
      
      {children}

    </div>


  );
}
