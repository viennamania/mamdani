import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Tag1 from "./tag1";

import Image from "next/image";
///import { Link } from "react-scroll";

import Link from "next/link";



type ListInfo1Type = {

  id: string;
  createdAt: Date;
  email: string;
  nickname: string;
  name: string;
  avatar: string;
  title: string;
  image: string;
  tags: string[];

  imageResolution1?: string;

  /** Style props */
  propOpacity?: CSSProperties["opacity"];
};





const ListHealthinfo: NextPage<ListInfo1Type> = ({

  id,
  createdAt,
  email,
  nickname,
  name,
  avatar,
  title,
  image,
  tags,

  imageResolution1,
  propOpacity,
}) => {

  const listInfoStyle: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);


  //console.log("ListHealthinfo: image: ", image);




  if (!id) {
    return null;
  }


  return (


    <Link
      href={`/usermain/boards/health/${id}`}

      //className="
      //  rounded-lg
      //  hover:border-gray-900  bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] box-border
      //  w-80 flex flex-col items-center justify-end text-left text-xl text-dark font-menu-off border-[1px] border-solid border-grey-e
      //"

      

      style={listInfoStyle}
    >
      <div
        className=" 
          xl:w-full  w-72
          rounded-lg
          
          xl:hover:border-gray-900  border-[1px] border-solid border-grey-e
          
          "
        style={listInfoStyle}
      >
    

      
          <Image
            className=" rounded-t-lg self-stretch relative max-w-full overflow-hidden shrink-0 object-cover   "
            alt=""
            
            src={
              image && image !== undefined ? image : "logo.svg"
              
            }

            //layout="fill"
            width={420}
            height={420}
          />
       
      

      
        <div className="self-stretch flex flex-col items-center justify-end p-6 gap-[12px]">



          
          <div className="  self-stretch flex flex-wrap items-center justify-start gap-[4px]">
          

            {tags?.map((tag: any) => (
              <div
                key={tag}
                className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
              >
                  {tag}
              </div>
            ))}

          </div>

          <div className="text-start break-words self-stretch relative font-extrabold leading-normal  ">
            
            {title}

          </div>

        </div>
      

      </div>


    </Link>

  );
};


export default ListHealthinfo;