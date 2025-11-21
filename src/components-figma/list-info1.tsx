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

const ListInfo1: NextPage<ListInfo1Type> = ({

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


  return (


   

    <Link
      href={`/usermain/boards/health/${id}`}

      className="
        hover:border-gray-900  bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] box-border
        w-80 flex flex-col items-center justify-end text-left text-xl text-dark font-menu-off border-[1px] border-solid border-grey-e
      "
      style={listInfoStyle}
    >
    
    
      {/*
      <img
        className="self-stretch relative max-w-full overflow-hidden shrink-0 object-cover  h-40  "
        alt=""
        src={imageResolution1}
      />
      */}
    
      <Image
        className="self-stretch relative max-w-full overflow-hidden shrink-0 object-cover  h-40  "
        alt=""
        src={image ? image : "/images/food1.jpg"}
        //layout="fill"
        width={320}
        height={320}
      />
      

      
      <div className="self-stretch flex flex-col items-center justify-end p-6 gap-[12px]">
        
        <div className="grid grid-cols-2 items-center justify-center gap-[4px]">

          {tags.map((tag, index) => {

            return (
              <div key={index}
                className="rounded-81xl flex flex-row items-center justify-center py-2 px-3 text-center text-3xs text-grey-6 font-menu-off border-[1px] border-solid border-grey-c">
                <div className="relative">{tag}</div>
              </div>
            );

          } )}

        </div>

        <div className="self-stretch relative font-extrabold leading-6 ">
          {title}
        </div>

      </div>
      



    </Link>

  );
};

export default ListInfo1;
