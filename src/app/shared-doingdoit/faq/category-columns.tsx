'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';

import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/shared-doingdoit/delete-popover';
import { Button } from 'rizzui';

import { Router } from 'next/router';

import { PiArrowUp, PiArrowDown } from 'react-icons/pi';




function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}



type Columns = {

  data : any;

  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;


  
  onIncrementOrderNumber?: (id: string) => void;

  onDecrementOrderNumber?: (id: string) => void;

};



//onDeleteItem




export const getColumns = ({

  data,

  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onIncrementOrderNumber,
  
  onDecrementOrderNumber,

}: Columns) => [

  /*
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'id',
    key: 'id',
    width: 100,
    render: (value: string) => <Text className='text-center'>{value}</Text>,
  },
  */

  /* up button ,down button */
  /* when colum is first, up arrow button is disabled */
  /* when colum is last, down arrow button is disabled */

  {
    title: <HeaderCell title="순서" />,
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    width: 100,
    render: (_: string, row: any) => (

      <div className=" flex items-center justify-center gap-5">
        


        {/* up button for change orderNumber plus 1 and down button for change orderNumber minus 1 */}
        {/* api call for change orderNumber */}
        {/* up down button is black and white svg format */}
        <div className="flex items-center justify-center gap-3">

         
          
          <Button
            variant="outline"
            //color="primary"

            className={`font-500 text-gray-900 `}

            {...row?.orderNumber === 1 && { disabled: true }}
            onClick={() => {
              console.log('up button clicked');

              onIncrementOrderNumber && onIncrementOrderNumber(row.id);
            }}
          >
            <PiArrowUp className="h-auto w-[18px]" />
          </Button>


          <Button
            variant="outline"
            //color="primary"
            className="font-500 text-gray-900"

            {...row?.orderNumber ===  data.length && { disabled: true }}

            onClick={() => {
              console.log('down button clicked');

              onDecrementOrderNumber && onDecrementOrderNumber(row.id);
            }}
          >
            <PiArrowDown className="h-auto w-[18px]" />
          </Button>

        </div>


        
        <div className="flex items-center justify-center gap-3">
          {row?.orderNumber}
        </div>

       


      </div>
      
    ),
  },
 
  {
    title: <HeaderCell title="분류" />,
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },



 
  
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        
        
        
     


            <Link
              href={`/operation/faqcategory/${row.id}/edit`}
            >

              <ActionIcon
                tag="span"
                size="sm"
                variant="outline"
                aria-label={'수정'}
                className="hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>

            </Link>

         
        
        
        
        
        
      
        
            <DeletePopover
              title={`삭제`}
              description={` 삭제하시겠습니까?`}
              onDelete={
                () => 
                onDeleteItem(row.id)
              }
            />


    


      </div>
    ),
  },
  


];




export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    hidden: 'customer',
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        description={row.email}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
