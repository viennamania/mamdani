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

import Image from 'next/image';

import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/shared/delete-popover';
import { Button } from 'rizzui';

import { Router } from 'next/router';

import { Checkbox } from '@/components/ui/checkbox';

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
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [




  {
    /*
    title: <HeaderCell title="제목" />,
    */
    dataIndex: 'comment',
    key: 'comment',

    width: "65%",

    render: (_: any, row: any) => (


   
      <Link
        className='flex flex-row items-center justify-start gap-3 ml-4'
        href={`/usermain/boards/${row?.boardId}`}
        //className="hover:font-bold hover:underline"
        //className="self-stretch flex flex-row items-center justify-between p-8 text-left text-base text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
       
      >
        {/* dot */}
        <div className="w-2 h-2 rounded-full bg-black "></div>

        {/* title */}
        <div className="flex flex-col items-start justify-start gap-2">

          <div className="flex flex-row items-center justify-start gap-2">
            {/*
            <Image
              src={row?.commentUserAvatar || '/usermain/images/avatar.svg'}
              alt="logo"
              width={26}
              height={26}
              className="rounded-full w-6 h-6 overflow-hidden shrink-0"
            />
            */}
            {row?.readYn === 'N' ? (
              <Text className='text-start text-dark text-sm xl:text-base font-extrabold '>
                <span className='font-extrabold'>{row?.commentUserNickname}</span>님이 댓글을 남겼습니다.
              </Text>
            ) : (
              <Text className='text-start text-xs xl:text-base font-extrabold '>
                {row?.commentUserNickname}님이 댓글을 남겼습니다.
              </Text>
            )}
          </div>


          {row?.readYn === 'N' ? (

            <Text className='text-start text-dark text-sm xl:text-base font-bold '>
              
                <div dangerouslySetInnerHTML={{ __html: 
                  row?.commentContent?.length > 25 ?
                  row?.commentContent?.slice(0,25) + '...' :
                  row?.commentContent
                }}
                className='break-words'
                />

            </Text>
          ) : (
            <Text className='text-start text-xs xl:text-base '>
              
                <div dangerouslySetInnerHTML={{ __html: 
                  row?.commentContent?.length > 25 ?
                  row?.commentContent?.slice(0,25) + '...' :
                  row?.commentContent
                }}

                className='break-words'
                />

            </Text>
          )}

        </div>



      </Link>
    
    ),
  },

  {
    /*
    title: (
      <HeaderCell
        title="등록일자"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    */
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    
    ///width: 100,
    width: "25%",

    render: (value: Date) => (

      <span className="flex flex-row items-center justify-end text-xs xl:text-base text-grey-9 ">
        {/*
        <DateCell
          date={ new Date(value) }
          className=""
          timeClassName=""
          dateClassName=""
          dateFormat="YYYY. MM. DD"
          timeFormat="HH:mm"
        />
        */}
        {/* "YYY. MM. DD" */}
        <Text className=''>
          {new Date(value).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </Text>
    </span>

    ),
  },


  // delete button
  {
    dataIndex: 'action',
    key: 'action',
    width: "10%",
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 mr-4 ">


        <button
          onClick={() => {
            //window.history.back();
            onDeleteItem(row?.id);
          }}
          
        >
          <Image
            width="26"
            height="26"
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/x2.svg"
          />
        </button>




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
