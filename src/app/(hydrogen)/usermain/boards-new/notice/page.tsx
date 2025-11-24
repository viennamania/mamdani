'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import ComponentNotice from "@/components-figma/component-notice";
import Footer from "@/components-figma/footer";

import List from "@/components-figma/list-notice";
import Page from "@/components-figma/page";

import Link from "next/link";

import { Input } from '@/components/ui/input';


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { useSearchParams } from 'next/navigation';

import DateCell from '@/components/ui/date-cell';


import { getColumns } from '@/app/shared-doingdoit/notice/columns-user';

import NoticeTableWidget from '@/components/doingdoit/notice-table-widget-user';



// tabs for horizontal scroll
import Tabs from '@mui/material/Tabs';

import Tab from '@mui/material/Tab';

import { useRouter } from "next/navigation";





export default function NoticePage() {




  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);




  const searchParams = useSearchParams()
 
  const search = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);



  // sort by date or view count
  const [sortBy, setSortBy] = useState("createdAt");

  

  // search update
  useEffect(() => {

    if (search !== "") {
      setSearchTerm(search);

    } else {
      setSearchTerm("");
    }


  }, [search]);




  // handleSearch
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newFeedList = data.filter((feed: any) => {
        return Object.values(feed).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newFeedList);
    } else {
      setSearchResults(data);
    }
  };




  const router = useRouter();

  // 0 = > 자유게시판 => /usermain/boards
  // 1 = > 테더정보 => /usermain/boards/health
  // 2 = > 유형별 가이드 => /usermain/boards/guide
  // 3 = > 공지사항 => /usermain/boards/notice
  // 4 = > FAQ => /usermain/boards/faq

  const a11yProps = (index: number) => {

    return {

      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,

      onClick: () => {
        if (index === 0) {
          router.push('/usermain/boards');
        } else if (index === 1) {
          router.push('/usermain/boards/health');
        } else if (index === 2) {
          router.push('/usermain/boards/guide');
        } else if (index === 3) {
          router.push('/usermain/boards/notice');
        } else if (index === 4) {
          router.push('/usermain/boards/faq');
        }
      }

    };

  }

  // this is for the health info page
  const [value, setValue] = useState(3);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };




  return (

    <>

    <div className="bg-dark felx sticky top-0 z-50 ">
                  <Top1
                    logo="/usermain/images/logo-oneclick.png"
                    topBackgroundColor="#fff"
                    topBorderBottom="1px solid #ddd"
                    topBoxSizing="border-box"
                    frameDivBorderBottom="unset"
                    frameDivBoxSizing="unset"
                    divColor="#212121"
                    frameDivBorderBottom1="unset"
                    frameDivBoxSizing1="unset"
                    divColor1="#212121"
                    frameDivBorderBottom2="2px solid #212121"
                    frameDivBoxSizing2="border-box"
                    divColor2="#212121"
                    divColor3="#212121"
                    aboutColor="#212121"
                    frameDivBorder="1px solid #666"
                    divColor4="#212121"
                    frameDivBorder1="1px solid #666"
                    divColor5="#212121"
                  />
          </div>


    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-start">
      <div className="self-stretch flex flex-col items-center justify-start">
  
      <div className="self-stretch bg-background flex flex-col items-center justify-start py-5 xl:py-10 px-0 text-center text-base text-grey-9 font-menu-off">
      
      <div className="w-full xl:w-[1000px] flex flex-col items-center justify-start gap-[20px] xl:gap-[40px]">
        

        <div className="xl:hidden w-full self-stretch flex text-left text-dark text-xl font-extrabold pl-5 pr-5">
          게시판
        </div>

      
          {/* tabs */}
          {/*  horizontally scrollable tabs */}

          <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              //className="self-stretch w-full"
              className="w-full"
            >
              {/* change label size */}
              <Tab
                label={
                  <div className="text-sm xl:text-base">자유게시판</div>
                } {...a11yProps(0)}
              />
              <Tab label={
                <div className="text-sm xl:text-base">테더정보</div>
              } {...a11yProps(1)} />
              <Tab label={
                <div className="text-sm xl:text-base">유형별 가이드</div>
              } {...a11yProps(2)} />
              <Tab label={
                <div className="text-sm xl:text-base">공지사항</div>
              } {...a11yProps(3)} />
              <Tab label={
                <div className="text-sm xl:text-base">FAQ</div>
              } {...a11yProps(4)} />
            </Tabs>



        <div className="w-full self-stretch bg-background flex flex-col items-center justify-start text-left text-dark">

        {/*
        <div className="self-stretch flex flex-row items-center justify-between p-8 text-left text-base text-dark font-menu-off border-b-[1px] border-solid border-grey-e">
          <div className="relative font-extrabold">[공지] 공지제목입니다.</div>
          <div className="relative text-xs text-grey-9">2023.03.15</div>
        </div>
        */}



        {false ? (
          <div className="self-stretch flex flex-col items-center justify-center p-8">
            <div  className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>

              
          </div>

        ) : (

          <NoticeTableWidget
            title=""

            variant="modern"
            //variant="minimal"
            //variant="classic"
            //variant="elegant"
            //

            
            //data={data}

            //total={data.length}

  

            // @ts-ignore
            getColumns={getColumns}
            enablePagination={true}
            
            enableSearch={false}
            searchPlaceholder="제목, 내용"

            //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

            //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

            // no table border
            //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium border-0"

            sticky
            //scroll={{ x: 600, }}
            scroll={{ x: 0, }}

            // header hidden
            //hideHeader={true}

            // 

            //paginatorClassName="flex flex-col items-center justify-center text-center text-3xs text-grey-6 font-menu-off"

            // <div className="relative font-extrabold text-black">1</div>

            paginatorClassName=" flex flex-row items-center justify-center text-center text-3xs text-grey-6 font-menu-off"
            
            
            paginatorGap={20}


            // no show count per page

            // no show count per page


          />

        )}


        {/*
        { searchResults.map((item: any) => (
          
          <div
            key={item?.id}
            className="self-stretch flex flex-row items-center justify-between p-8 text-left text-base text-dark font-menu-off border-b-[1px] border-solid border-grey-e">
            
            
            <Link
              href={`/usermain/boards/notice/${item?.id}`}
              className="relative font-extrabold"
            >
              {item?.title}

            </Link>

            <span className=" text-xs text-grey-9">
                    <DateCell
                      date={ new Date(item?.createdAt) }
                      className=""
                      timeClassName=""
                      dateClassName=""
                      dateFormat="YYYY. MM. DD"
                      timeFormat="HH:mm"
                     
                    
                    />
                </span>


          </div>
        ))}

        */}


      
        
          
          {/*
          <div className="self-stretch flex flex-col items-center justify-center p-8">
            <Page />
          </div>
          */}
          {/*
              <div className="flex flex-col items-center justify-center text-center text-3xs text-grey-6 font-menu-off">
      <div className="flex flex-row items-center justify-start gap-[20px]">
        <Image
          width="24"
          height="24"
          className="relative w-[18px] h-[18px]"
          alt=""
          src="/usermain/images/chevrondoubleleft1.svg"
        />
        <Image
          width="24"
          height="24"
          className="relative w-[18px] h-[18px]"
          alt=""
          src="/usermain/images/chevronleft1.svg"
        />
        <div className="relative font-extrabold text-black">1</div>
        <div className="relative">2</div>
        <div className="relative">3</div>
        <div className="relative">4</div>
        <div className="relative">5</div>
        <div className="relative">6</div>
        <div className="relative">7</div>
        <div className="relative">8</div>
        <div className="relative">9</div>
        <div className="relative">10</div>
        <Image
          width="24"
          height="24"
          className="relative w-[18px] h-[18px]"
          alt=""
          src="/usermain/images/chevronright1.svg"
        />
        <Image
          width="24"
          height="24"
          className="relative w-[18px] h-[18px]"
          alt=""
          src="/usermain/images/chevrondoubleright1.svg"
        />
      </div>
    </div>
          */}

          {/* pagenation */}
          



        </div>
      </div>
    </div>

      </div>
      <Footer
        footerAlignSelf="stretch"
        footerBorderTop="1px solid #eee"
        footerBoxSizing="border-box"
      />
    </div>






    <div className="block xl:hidden sticky bottom-0 z-50  ">


<div className="self-stretch bg-white shadow-[0px_0px_20px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-center text-center text-3xs text-grey-9 font-noto-sans-kr">
  
  <div className="self-stretch flex flex-row flex-wrap items-center justify-between ml-5 mr-5">

    

    {/*
    <Link 
        href={'/'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/homefill.svg"
      />
      <b className="relative">홈</b>
    </Link>
    */}

    <Link 
        href={'/'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/homeline.svg"
      />
      <b className="relative">홈</b>
    </Link>


      {/*
    <div className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark">
      <input
        className="m-0 w-6 h-6 relative overflow-hidden shrink-0"
        type="checkbox"
      />
      <b className="relative">홈</b>
    </div>
        */}


    {/*
    <Link
        href={'/usermain/feeds'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/newspaperline.svg"
      />
      <div className="relative">구매주문</div>
    </Link>
    */}


    <Link 
        href={'/usermain/feeds'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/newspaperline.svg"
      />
      <b className="relative">구매주문</b>
    </Link>



{/*    <Link 
        href={'/usermain/feeds/statistics'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]    ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/piechart2line.svg"
      />
      <b className="relative">통계</b>
    </Link> */}

    
    {/*
    <Link
        href={'/usermain/feeds/statistics'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/piechart2line.svg"
      />
      <div className="relative">통계</div>
    </Link>
    
    <div className="h-[60px] w-[48.8px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/piechart2fill.svg"
      />
      <b className="relative">통계</b>
    </div>
    */}



    <Link 
        href={'/usermain/boards'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   text-dark ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/message2fill.svg"
      />
      <b className="relative">게시판</b>
    </Link>
    {/*
    <Link
        href={'/usermain/boards'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/message2line.svg"
      />
      <div className="relative">게시판</div>
    </Link>


    <div className="h-[60px] w-[55.7px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/message2fill.svg"
      />
      <b className="relative">게시판</b>
    </div>
    */}



{/*    <Link 
        href={'/usermain/survey/result'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/questionanswerline.svg"
      />
      <b className="relative">설문</b>
    </Link> */}
    
    {/*
    <Link
        href={'/usermain/surveys'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/questionanswerline.svg"
      />
      <div className="relative">설문</div>
    </Link>
    <div className="h-[60px] w-[65px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/questionanswerfill.svg"
      />
      <b className="relative">설문</b>
    </div>
    */}


    <Link 
        href={'/usermain/user/my-page'}
        className="h-[60px]  flex flex-col items-center justify-center p-2.5 box-border gap-[4px]   ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/usersettingsline.svg"
      />
      <b className="relative">마이</b>
    </Link>

    {/*
    <Link
        href={'/usermain/user/my-page'}
        className="h-[60px] flex-1 flex flex-col items-center justify-center p-2.5 box-border gap-[4px]  ">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        loading="eager"
        alt=""
        src="/usersettingsline.svg"
      />
      <div className="relative">마이</div>
    </Link>
    <div className="h-[60px] w-[55.7px] hidden flex-col items-center justify-center p-2.5 box-border gap-[4px] text-dark">
      <img
        className="w-6 h-6 relative overflow-hidden shrink-0"
        alt=""
        src="/usersettingsfill.svg"
      />
      <b className="relative">마이</b>
    </div>
    */}


  </div>

</div>

  </div>



    </>






    
  );
};


