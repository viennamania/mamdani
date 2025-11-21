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




export default function BoardPage() {



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
  
 
      // POST /api/doingdoit/healthinfo/getAll

      const res = await fetch(`/api/doingdoit/healthinfo/getAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          limit: 30,
          page: 1,
          sort: sortBy,
          q: searchTerm,
          startDate: "",
          endDate: "",
        })
      });


      const posts  = await res?.json() as any;
  
      ///////console.log("board data===========================", posts.data);
  
      setData(posts?.data?.boards);

      setSearchResults(posts?.data?.boards);
  
  
  
  
      setLoading(false);
  
    };


    fetchData();
  }
  ,[searchTerm, sortBy]);




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

 
    <div className=" self-stretch flex flex-col items-center justify-center gap-[0px] xl:gap-[20px] text-left text-sm text-dark">
              
              
    <div className=" self-stretch flex flex-col-reverse xl:flex-row gap-2 items-center justify-between  ">
      
      <div className="w-full flex flex-row items-center justify-start gap-[12px]">
      

        { sortBy === "viewCount" ? (
          <>
            <button
              className={`relative text-grey-9 `}
              onClick={() => {
                setSortBy("createdAt");

                

                //search(searchTerm, "createdAt");
              } }
            >
              최근순
            </button>
            <div className="relative bg-grey-c w-px h-3" />
            <div
              className={`relative font-extrabold `}
            >
              인기순
            </div>
          </>
          

        ) : (
          
          <>
            <div
              className={`relative font-extrabold `}
            >
              최근순
            </div>
            <div className="relative bg-grey-c w-px h-3" />
            <button
              className={`relative text-grey-9 `}
              onClick={() => {
                setSortBy("viewCount");
                
                //search(searchTerm, "viewCount");
              } }
            >
              인기순
            </button>
          </>

        )}

      </div>

      {/*
      <Search prop="제목, 태그 입력" searchWidth="400px" />
      */}
      <Input
        type="search"
        //placeholder={searchPlaceholder}
        placeholder="제목, 태그 입력"
        value={searchTerm}
      
        onClear={() =>
          handleSearch('')
        }
        onChange={(event) => 
          handleSearch(event.target.value)
        }
        clearable
        prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        labelClassName='text-base font-medium'

        className=" w-full xl:w-[400px] rounded-[8px] border-[1px] border-solid border-grey-e outline-none bg-white"
      />

    </div>




    <div className="mt-5 self-stretch flex flex-col items-center justify-start gap-[10px] xl:gap-[20px]">

        { searchTerm.length === 0 && loading ? (

          <div className=" h-60 self-stretch flex flex-col items-center justify-center gap-[20px] z-[1] text-left text-dark">
            
            <div className="self-stretch flex flex-row items-center justify-center gap-[20px] z-[1] text-left text-dark">
        
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-grey-6" />
        
            </div>
          </div>
        
        ) : (

          <div className=" self-stretch grid grid-cols-1 xl:grid-cols-2 items-start justify-center gap-[20px] text-left text-dark">
            
            {searchResults.map((item: any) => (
              <Link
                key = {item.id}
                
                href={
                  routes.usermain.boardHealthDetails(item.id)
                }

                className="no-underline   w-full "
              >

                {/*
                <ListInfo  />
                */}


                <div className="flex-1 bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-col items-center justify-end text-left text-xs text-grey-6 font-menu-off border-[1px] border-solid border-grey-e">
                    
                    <Image
                      //className="self-stretch relative max-w-full overflow-hidden h-[490px] shrink-0 object-cover"
                      alt="image"
                      
                      src={
                        //item?.images && item?.images?.[0] && item?.images?.[0] !== undefined ? item?.images?.[0] : "logo.svg"

                        item?.images && item?.images?.[0] ? item?.images?.[0] : "logo.svg"
                      }

                      width={490}
                      height={490}
                    />
       

                    <div className="self-stretch flex flex-col items-center justify-end p-6 gap-[20px]">
                      <div className="self-stretch flex flex-col items-center justify-end gap-[4px]">
                        {/*
                        <div className="self-stretch relative">
                          {item?.title}
                        </div>
                        */}
                        <div className="self-stretch relative text-xl font-extrabold text-dark break-words leading-normal">
                          {item?.title}
                        </div>
                      </div>

                      <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">

                        {item?.tags?.map((tag: any) => (
                          <div
                            key={tag}
                            className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                          >
                              {tag}
                          </div>
                        ))}

                      </div>

                    </div>
                  </div>

              </Link>
            ))}

          </div>
        )}
      
    </div>


    </div>  




  );
};

