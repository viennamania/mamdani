'use client';

import { Title, Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';


///import TrashIcon from '@/components/icons/trash';

///import { PiTrashFill } from 'react-icons/pi';

import { PiFloppyDisk } from 'react-icons/pi';



type SavePopoverProps = {
  title: string;
  description: string;
  onSave: () => void;
};

export default function SavePopover({
  title,
  description,
  onSave,
}: SavePopoverProps) {
  
  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <PiFloppyDisk className="me-1 h-[17px] w-[17px]" /> {title}
          </Title>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          <div className="flex items-center justify-end">
            <Button size="sm" className="me-1.5 h-7" onClick={onSave}>
              예
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              아니오
            </Button>
          </div>
        </div>
      )}
    >
      {/*
      <ActionIcon
        //size="sm"
        size='xl'
        variant="outline"

        aria-label={'Delete Item'}
        className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
      >
        <TrashIcon className="h-14 w-14" /> {title}
      </ActionIcon>
      */}
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        <PiFloppyDisk className="me-2 h-4 w-4" />
        {title}
      </button>


    </Popover>
  );
}
