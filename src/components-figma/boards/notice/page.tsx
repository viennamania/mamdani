'use client';

import type { NextPage } from "next";
import Top1 from "@/components-figma/top1";
import Search from "@/components-figma/search";
import FormContainerGuide from "@/components-figma/form-container-guide";
import Footer from "@/components-figma/footer";

import Link from "next/link";





import { Input } from '@/components/ui/input';


import { useState, useEffect, use } from "react";


import { PiMagnifyingGlassBold } from 'react-icons/pi';

import ListInfo from "@/components-figma/list-info";


import { routes } from "@/config/routes";

import { useSearchParams } from 'next/navigation';


import Image from 'next/image';


import { getColumns } from '@/app/shared-doingdoit/notice/columns-user';

import NoticeTableWidget from '@/components/doingdoit/notice-table-widget-user';





export default function NoticedPage() {



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



  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
  

      // POST
      const res = await fetch(`/api/doingdoit/notice/getAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          limit: 30,
          page: 1,
          sort: sortBy,
          search: searchTerm,
          startDate: "",
          endDate: "",
        }),
      });


      const posts  = await res?.json() as any;
  
      //console.log("board data===========================", posts.data);
  
      setData(posts?.data?.boards);

      setSearchResults(posts?.data?.boards);
  
  
  
  
      setLoading(false);
  
    };


    fetchData();
  }
  ,[]);




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




  return (

    <>

   



      <div className="w-full self-stretch flex flex-col items-center justify-center gap-[0px] xl:gap-[20px] text-left text-sm text-dark">


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

      


        
      </div>


    </>

  );
};

