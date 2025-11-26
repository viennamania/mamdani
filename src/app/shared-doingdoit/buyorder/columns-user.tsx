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

  onClickUser?: (id: string) => void;
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onChecked,

  onClickUser,
}: Columns) => [


  /*
  {
          "_id": "6921150bd26c3d7f10f45dde",
          "chain": "bsc",
          "lang": null,
          "storecode": "arygljqt",
          "walletAddress": "0x6BB95DF4dcBe4D3C7C380B68E259E92e94Bd5D88",
          "nickname": "maru0611",
          "mobile": "+821012345678",
          "avatar": null,
          "userType": "BBB",
          "userStats": {
              "totalPaymentConfirmedCount": 348,
              "totalPaymentConfirmedKrwAmount": 55420000,
              "totalPaymentConfirmedUsdtAmount": 37136.333
          },
          "usdtAmount": 112.58,
          "krwAmount": 170000,
          "rate": 1510,
          "createdAt": "2025-11-22T01:42:35.640Z",
          "status": "paymentConfirmed",
          "privateSale": false,
          "buyer": {
              "depositBankName": "카카오뱅크",
              "depositBankAccountNumber": "3333136255937",
              "depositName": "박현호"
          },
          "paymentMethod": "bank",
          "tradeId": "59780439",
          "escrowWallet": {
              "address": "0x5bfbA7AA3D0dc12969052f33B9BCC18006A57F4b",
              "privateKey": "0x8f713397a8095b506dbaab77087f6106b028c3bbdbe68491dab26630f750cb10"
          },
          "audioOn": true,
          "returnUrl": "",
          "acceptedAt": "2025-11-22T01:42:38.983Z",
          "seller": {
              "walletAddress": "0x00A6842aEDc1a3BB22d82467d60d9eef3dE63BD6",
              "nickname": "seller",
              "avatar": "",
              "mobile": "+82",
              "memo": "카카오뱅크 111111111111111 지코인",
              "bankInfo": {
                  "bankName": "농협",
                  "accountNumber": "3521606826983",
                  "accountHolder": "김경현"
              }
          },
          "escrowTransactionHash": null,
          "paymentRequestedAt": "2025-11-22T01:42:42.817Z",
          "autoConfirmPayment": true,
          "escrowTransactionConfirmedAt": "2025-11-22T01:43:14.206Z",
          "paymentAmount": 170000,
          "paymentConfirmedAt": "2025-11-22T01:43:14.206Z",
          "queueId": "d42a4ea6-ffbe-4843-823c-6fd0988b9436",
          "sellerWalletAddressBalance": 7072.890801199988,
          "transactionHash": "0x19dfc3b2a7e39c86f4891a038065c0c77f174acb4511a0443a8a452c4e4dbf97",
    },
    */


  /*
  {
    
    title: <HeaderCell title="내역" />,
    
    dataIndex: 'title',
    key: 'title',
    width: "30%",
    
    render: (_: any, row: any) => (


        <Text className='text-center text-dark text-xs xl:text-base font-extrabold'>
          {

            row?.title === 'feedLike' ? '구매주문 좋아요' :
            row?.title === 'feedComment' ? '구매주문 댓글' :
            row?.title === 'feedPost' ? '구매주문 게시글' :
            row?.title === 'boardLike' ? '게시판 좋아요' :
            row?.title === 'boardComment' ? '게시판 댓글' :
            row?.title === 'boardPost' ? '게시판 게시글' :
            row?.title === 'attendance' ? '출석' :
            ''


          }
        </Text>
  
    
    ),
  },
  */

  // 구매자
  // walletAddress, nickname, buyer.bankInfo.accountHolder
  
  {
    title: <HeaderCell title="판매자" />,
    dataIndex: 'buyer',
    key: 'buyer',
    width: "20%",
    render: (value: any, row: any) => (

      <div className="flex flex-col items-center justify-center text-center">

        <Text className='text-gray-600 text-xs xl:text-sm mt-1'>
          {row?.seller?.bankInfo?.accountHolder ? row?.seller?.bankInfo?.accountHolder : '정보없음'}
        </Text>

        {/* wallet address */}
        {/*
        <div className='flex flex-row items-center justify-center'>
          <Text className='text-gray-400 text-xs xl:text-sm mt-1 break-all'>
            {row?.walletAddress ? row?.walletAddress?.slice(0, 6) + '...' : '정보없음'}
          </Text>
          <Button
            variant="outline"
            size="sm"
            className="ms-2 h-6 w-6 p-0 rounded-full border-gray-300 hover:bg-gray-100"
            onClick={() => {
              if (row?.walletAddress) {
                navigator.clipboard.writeText(row?.walletAddress);
                alert('지갑 주소가 복사되었습니다: ' + row?.walletAddress);
              }
            }}
          >
            <Text className="text-gray-400 text-xs">복사</Text>
          </Button>
        </div>
        */}

      </div>

    ),
  },

  // createdAt
  {
    
    title: <HeaderCell
    title="일시"
    // text right
    
    />,
    
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: "20%",
    render: (value: Date) => (

      <div className="flex flex-col items-center justify-center text-center">

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
        {/* "YYY. MM. DD HH:mm" format */}
       
        <Text className='text-dark text-xs xl:text-base font-extrabold'>
          {new Date(value).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </Text>
        <Text className='text-dark text-xs xl:text-base font-extrabold'>
          {new Date(value).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </Text>

    </div>

    ),
  },




  // krwAmount
  // seller
  /*
                "bankInfo": {
                  "bankName": "농협",
                  "accountNumber": "3521606826983",
                  "accountHolder": "김경현"
              }
    */
  {
    title:
      <HeaderCell
        title="보낸 금액(₩)"
      />,

    dataIndex: 'krwAmount',
    key: 'krwAmount',
    width: "30%",
    render: (value: string, row: any) => (
      <div className="flex flex-col items-center justify-center text-center">

        <Text className="text-dark text-xs xl:text-base font-extrabold ">
          ₩{Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>

        <Text className='text-gray-600 text-xs xl:text-sm mt-1'>
          {row?.seller?.bankInfo?.bankName ? row?.seller?.bankInfo?.bankName : '정보없음'}
          {' / '}
          {row?.seller?.bankInfo?.accountNumber ? row?.seller?.bankInfo?.accountNumber?.slice(0, 3) + '***' : '정보없음'}
          {' / '}
          {row?.seller?.bankInfo?.accountHolder ? row?.seller?.bankInfo?.accountHolder?.slice(0, 1) + '**' : '정보없음'}
        </Text>

      </div>
    ),
  },


  // usdtAmount

  {
    title:
      <HeaderCell
        title="구매한 테더(USDT)"
      />,

    dataIndex: 'usdtAmount',
    key: 'usdtAmount',
    width: "20%",
    render: (value: string) => (
      <Text className="text-dark text-xs xl:text-base font-extrabold text-center ">
        {Number(value).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} USDT
      </Text>
    ),
  },


  // tradeId
  // 상세보기 
  // goto '/usermain/feeds/627966799'
  // no new window
  {
    title: (
      <HeaderCell title="거래번호" className="text-center" />
    ),
    dataIndex: 'action',
    key: 'action',
    width: "10%",
    render: (_: string, row: any) => (
      <div className="flex flex-col items-center justify-center text-center">
        {/* 거래번호 */}
        <Text className='text-gray-400 text-xs xl:text-sm'>
          {row.tradeId ? row.tradeId : '정보없음'}
        </Text>

        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 rounded-full border-gray-300 hover:bg-gray-100"
          onClick={() => {
            onClickUser ? onClickUser(row.tradeId) : null;
          }}
        >
          <Text className="text-gray-700 text-xs">상세보기</Text>
        </Button>

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
