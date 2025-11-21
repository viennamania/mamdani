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

import { PiCheckCircleFill, PiStarFill } from 'react-icons/pi';

import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/shared/delete-popover';
import { Button } from 'rizzui';

///import { Router } from 'next/router';

import Rating from '@/components/rating';

import { useRouter } from 'next/navigation';


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






// get rating calculation
function getRating(rating: number[]) {
  let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  let review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="me-1 shrink-0">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{' '}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
}


type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;

  onClickUser: (id: string) => void;

  totalItems?: number;
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser,

  totalItems,
  
}: Columns) => [


  /*
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'sequenceNumber',
    key: 'sequenceNumber',
    width: 50,
    render: 
    (
      _: any,
      row: any,
      index: number,
      
    ) => (

      <Link
        href={routes.feed.edit(row?.id)}

        className="ps-4 hover:text-gray-900 hover:underline"
      >
        <Text className='text-center'>
          {

            row.sequenceNumber


          }
        </Text>
      </Link>
      
    ),
  },
  */


  {
    title: <HeaderCell title="No" />,
    dataIndex: 'id',
    key: 'id',
    width: 80,
    //render: (value: string) => <Text className='  text-center ' >{value}</Text>,
    render: (
      _: any,
      row: any,
      index: number,
    ) => (
      <Text className='  text-center '> 
      {


        row?.totalCount - index - (row?.currentPage - 1) * row?.countPerPage

      }
      </Text>
    ),
  },




  {
    title: (
      <HeaderCell
        title="등록일자"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    render: (value: Date) => <DateCell date={value} className='text-center'/>,
  },

  {
    title: (
      <HeaderCell
        title="식사시간"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'mealDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('mealDate'),
    dataIndex: 'mealDate',
    key: 'mealDate',
    width: 90,
    render: (_: any, row: any) => (
      <div className='flex flex-col items-center justify-center gap-1'>
        <Text className='text-center'>{row?.mealDate}</Text>
        <Text className='text-center'>{row?.mealTime}</Text>
      </div>

    ),
  },
  

  
  
  {
    title: <HeaderCell title="작성자" />,
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: (_: any, row: any) => (

      <div className="flex items-center justify-start ml-0 ">

      {/*
      <button
        type="button"
        className=' hover:font-bold hover:underline '
        onClick={() => onClickUser(row?.userId)}
      >
      */}
          
          <TableAvatar
            src={row?.avatar ?? '/usermain/images/avatar.svg'}
            name={row?.nickname ?? '익명'}
            //description={row.email}
          />
          
      {/*
      </button>
      */}

      </div>

    ),
  },
  


  

  {
    title: <HeaderCell title="스크랩" />,
    dataIndex: 'scrapCount',
    key: 'scrapCount',
    width: 50,
    render: (value: string) => (

      <>
        {value == null ? (
          <Text className="text-center">0</Text>
        ) : (
          <Text className="text-center">{value}</Text>
        )}
      </>

    ),
  },
  


  
  {
    title: <HeaderCell title="좋아요" />,
    dataIndex: 'likeCount',
    key: 'likeCount',
    width: 60,
    render: (value: string) => (

      <>
        {value == null ? (
          <Text className="text-center">0</Text>
        ) : (
          <Text className="text-center">{value}</Text>
        )}
      </>

    ),
  },
  
  
 


  {
    title: <HeaderCell title="조회수" />,
    dataIndex: 'viewCount',
    key: 'viewCount',
    width: 50,
    render: (value: string) => (
      <>
        {value == null ? (
          <Text className="text-center">0</Text>
        ) : (
          <Text className="text-center">{value}</Text>
        )}
      </>
    ),
  },
  

  {
    title: <HeaderCell title="공개여부" />,
    dataIndex: 'hiddenYn',
    key: 'hiddenYn',
    width: 60,
    render: (value: string) => (
        
        value == 'Y' ? (
          <Text className="text-center">비공개</Text>
        ) : (
          <Text className="text-center">공개</Text>
        )
  
      ),
    
  },
   



  {
    title: <HeaderCell title="피드백" />,
    dataIndex: 'feedbackYn',
    key: 'feedbackYn',
    width: 100,
    render: (_: any, row: any) => (

      row?.feedbackYn === null || row?.feedbackYn !== 'Y' || row?.feedbackWriterId === null  ? (
        <Text className="text-center">
          미답변
        </Text>

      ) : (

        <div className='flex flex-row items-center justify-center gap-5'>
          
          <div className='flex flex-col items-center justify-center gap-1'>
            <Text className="">답변완료</Text>

            <Text>
              {row?.feedbackScore == null ? (
                <Text className="text-center">-</Text>
              ) : (
                <Text className="text-center">{row?.feedbackScore}</Text>
              )}
            </Text>

          </div>

          <PiCheckCircleFill className="h-4 w-4 text-green-500" />

          
        </div>
        
      )

    ),
  },

  /*
  {
    title: <HeaderCell title="피드백작성자" />,
    dataIndex: 'feedbackWriterId',
    key: 'feedbackWriterId',
    width: 100,
    render: (_: any, row: any) => (
      <div className="flex items-center gap-2">

        <Text className="">{row.feedbackWriterId}</Text>
        <Text className="">{row.feedbackWriterNickname}</Text>
        <Text className="">{row.feedbackWriterAvatar}</Text>
        <Text className="">{row.feedbackWriterEmail}</Text>
        


      </div>
    ),
  },
  */
  


  {
    title: <HeaderCell title="피드백 작성자" />,
    dataIndex: 'feedbackWriterId',
    key: 'feedbackWriterId',
    width: 200,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-start gap-3 ml-10">





        {row?.feedbackWriterId ? (
          
      
            <div className='flex flex-row items-center justify-start gap-5'>

              {/* my feedback */}
              <div className=' w-28 flex flex-row items-center justify-start gap-5'>
                
                <div className="flex items-center gap-2">
                  <TableAvatar
                    src={row?.feedbackWriterAvatar ?? '/usermain/images/avatar.svg'}
                    name={row?.feedbackWriterNickname}
                    ///description={row.feedbackWriterId?.toLowerCase()}
                  />
                </div>
              </div>



              <Tooltip
                size="sm"
                content={() => '상세보기'}
                placement="top"
                color="invert"
              >
                <Link href={routes.feed.details(row?.id)}>
                  <ActionIcon
                    tag="span"
                    size="sm"
                    variant="outline"
                    aria-label={'상세보기'}
                    className="hover:text-gray-700"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>




              {/* edit */}
              {/* when login user is feedback writer */}

            
                {/*
                <Tooltip
                  size="sm"
                  content={() => '피드백 수정'}
                  placement="top"
                  color="invert"
                >

   
             
                  <Link
                    href={routes.feed.edit(row.id)}
                  >

                    <ActionIcon
                      tag="span"
                      size="sm"
                      variant="outline"
                      aria-label={'피드백 수정'}
                      className="hover:text-gray-700"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </ActionIcon>

                  </Link>

                </Tooltip>
                */}

              

              
       
              {/*
              <DeletePopover
                title={`삭제`}
                description={`삭제하시겠습니까?`}
                onDelete={() => onDeleteItem(row?.id)}
              />
              */}

            </div>

  

        ) : (
          <div className='flex flex-row items-center justify-start gap-5'>

            {/* my feedback */}
            <div className=' w-28 flex flex-row items-center justify-start gap-5'>
            </div>


            <Tooltip
              size="sm"
              content={() => '상세보기'}
              placement="top"
              color="invert"
            >
              <Link href={routes.feed.details(row?.id)}>
                <ActionIcon
                  tag="span"
                  size="sm"
                  variant="outline"
                  aria-label={'상세보기'}
                  className="hover:text-gray-700"
                >
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>


          
            <Tooltip
              size="sm"
              content={() => '피드백 작성'}
              placement="top"
              color="invert"
            >
              <Link href={routes.feed.edit(row.id)}>
                <ActionIcon
                  tag="span"
                  size="sm"
                  variant="outline"
                  aria-label={'피드백 작성'}
                  className="hover:text-gray-700"
                >
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
          

            {/*
            <DeletePopover
              title={`삭제`}
              description={`${row?.id}번을 삭제하시겠습니까?`}
              onDelete={() => onDeleteItem(row?.id)}
            />
            */}

          </div>

        )}

      </div>

    ),
  },
  

  /*
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    render: (_: string, row: any) => (


      <div className="flex items-center justify-end gap-3 pe-4">


        
        <Tooltip
          size="sm"
          content={() => '피드 상세보기'}
          placement="top"
          color="invert"
        >

          <Link href={routes.feed.details(row?.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'피드 상세보기'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        



      </div>
    ),
  },
  */


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
        href={routes.eCommerce.editOrder(row?.id)}
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
          <Link href={routes.eCommerce.editOrder(row?.id)}>
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
          <Link href={routes.eCommerce.orderDetails(row?.id)}>
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
          description={`Are you sure you want to delete this #${row?.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },


];
