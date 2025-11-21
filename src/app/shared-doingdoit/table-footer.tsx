'use client';

import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';

import { PiList, PiTray } from 'react-icons/pi';


import { useState, useEffect, useMemo } from 'react';
import { set } from 'lodash';



interface TableFooterProps {
  checkedItems: string[];
  handleDelete: (ids: string[]) => void;
}

export default function TableFooter({
  checkedItems,
  handleDelete,
  children,
}: React.PropsWithChildren<TableFooterProps>) {

  /*
  if (checkedItems.length === 0) {
    return null;
  }
  */

  const [isDeleting, setIsDeleting] = useState(false);


  return (

  
      <div className='flex flex-row items-center justify-center gap-5'>
        선택수량:{' '}<Text as="strong">{checkedItems.length}</Text>

        <Button

          isLoading={isDeleting}
          
          size="sm"
          className="dark:bg-gray-100 dark:text-gray-800"
          onClick={() => {

            setIsDeleting(true);
            handleDelete(
              checkedItems
            );

            setIsDeleting(false);
          }}
        >
          삭제하기
        </Button>


      </div>



  );
}
