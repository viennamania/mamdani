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

import DeletePopover from '@/app/shared/delete-popover';
import { Button } from 'rizzui';

import Image from 'next/image';



import { Router } from 'next/router';




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
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;

  onClickUser: (id: string) => void; // user profile
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser, // user profile
}: Columns) => [

  
  {
    title: <HeaderCell title="회원" />,
    dataIndex: 'user',
    key: 'user',
    width: 100,
    render: (_: any, row: any) => (

      <div className="flex items-center justify-start ml-5">
      {/*
      <button
        type="button"
        className=' hover:font-bold hover:underline'
        onClick={() => onClickUser(row?.userId)}
      >  
      */}
        
        <TableAvatar
          src={row?.userAvatar || '/usermain/images/avatar.svg'}
          name={row?.userNickname}
          description={row?.userEmail}
        />
      {/*
      </button>
      */}
      </div>
    ),
  },
  


  {
    title: <HeaderCell title="내역" />,
    dataIndex: 'title',
    key: 'title',
    width: 200,
    render: (value: string) => (
      <div className='flex items-center justify-center gap-2'>

        {value === 'feedPost' && (
          <div className='flex items-center justify-center gap-2'>
            <Image
                width="24"
                height="24"
               className="relative w-5 h-5"
               alt=""
               src="/usermain/images/annotation.svg"
              />
            <Text className='text-center'>피드 게시글</Text>
          </div>
        )}

        {value === 'feedLike' && (
          <div className='flex items-center justify-center gap-2'>
            
            <Image
                width="24"
                height="24"
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/heart3fill.svg"
              />

            <Text className='text-center'>피드 좋아요</Text>
          </div>
        )}

        {value === 'boardPost' && (
          <div className='flex items-center justify-center gap-2'>
            <Image
                width="24"
                height="24"
                className="relative w-5 h-5"
                alt=""
                src="/usermain/images/annotation.svg"
              />
            <Text className='text-center'>게시판 게시글</Text>
          </div>
        )}

        {value === 'boardLike' && (
          <div className='flex items-center justify-center gap-2'>
            <Image
                width="24"
                height="24"
                className="relative w-5 h-5"
                alt=""
                src="/usermain/images/heart3fill.svg"
              />
            <Text className='text-center'>게시판 좋아요</Text>
          </div>
        )}

        {value === 'boardComment' && (
          <div className='flex items-center justify-center gap-2'>
              <Image
                width="24"
                height="24"
                className="relative w-5 h-5 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/message3line.svg"
              />
            <Text className='text-center'>게시판 댓글</Text>
          </div>
        )}

        {value === 'attendance' && (
          <div className='flex items-center justify-center gap-2'>
            <Image
                width="24"
                height="24"
                className="relative w-5 h-5"
                alt=""
                src="/usermain/images/logoutboxrline.svg"
              />

            <Text className='text-center'>출석</Text>

          </div>

        )}
              
          
                
              
            


      {/*
      <Text className='text-center'>
        {
          value === 'feedLike' ? '피드 좋아요' :
          value === 'feedPost' ? '피드 게시글' :
          value === 'boardLike' ? '게시판 좋아요' :
          value === 'boardPost' ? '게시판 게시글' :
          value === 'feedComment' ? '피드 댓글' :
          value === 'boardComment' ? '게시판 댓글' :
          value === 'attendance' ? '출석' :
           '' 
        }
      </Text>
      */}


      </div>
    ),
  },

  {
    title: (
      <HeaderCell
        title="일시"
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
    render: (value: Date) => <DateCell date={value} className='text-center'/>,
  },





  {
    title: <HeaderCell title="확득포인트" />,
    dataIndex: 'point',
    key: 'point',
    width: 100,
    render: (value: string) => (
      <Text className='text-center'>{value}</Text>
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
      <Text className="">{value}</Text>
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
      <Text className="">${value}</Text>
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
