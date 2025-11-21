import type { NextPage } from "next";
import React, {useEffect, useMemo, type CSSProperties } from "react";

import Link from "next/link";


import { motion } from "framer-motion";


import Image from "next/image";


import { useSession, signIn, signOut } from 'next-auth/react';




type FormContainerType = {
  dimensionText?: string;
  messageText?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propWidth?: CSSProperties["width"];
  propBackgroundColor1?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
};



const FormContainer: NextPage<FormContainerType> = ({
  dimensionText,
  messageText,
  propBackgroundColor,
  propWidth,
  propBackgroundColor1,
  propBorder,
  propColor,
}) => {


  const { data: session, status } = useSession();



  const ellipseDivStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const frameIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const frameDiv10Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
      border: propBorder,
    };
  }, [propBackgroundColor1, propBorder]);

  const div18Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  // when mouse over, dimmed color will be changed
  return (

    <div className="
      relative w-[150px] h-[150px]  xl:w-[360px] xl:h-[360px] overflow-hidden shrink-0 text-center text-xs xl:text-9xl text-dark font-jalnan font-bold
    ">


      <button 
        className="
          z-10
          absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] opacity-0
          hover:opacity-50 bg-gray-200
        "

        // when click, goto 'href="/usermain/feeds/write1/-1"'

        onClick={() => {
          if (session) {
            window.location.href = "/usermain/feeds/write1/-1";
          } else {
            signIn();
          }
        }}
        
      />


      <div
        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gray-200"
        style={ellipseDivStyle}
      />
      
      <div className="absolute  top-[calc(50%_-_60px)] left-[calc(50%_-_37px)]   xl:top-[calc(50%_-_131.5px)] xl:left-[calc(50%_-_87.5px)] flex flex-col items-center justify-start gap-[10px] xl:gap-[20px]">
        
        <Image
          width={158.7}
          height={120}
          //className="relative w-[158.7px] h-[120px] overflow-hidden shrink-0"
          alt=""
          src={dimensionText || ""}
          //style={frameIconStyle}

          className="relative w-[60px]  xl:w-[158.7px] xl:h-[120px] overflow-hidden shrink-0"

          priority
        />

        <div className="flex flex-col items-center justify-center gap-[6px] xl:gap-[16px]">

          <div className="relative">
            <p className="[margin-block-start:0] [margin-block-end:-5px] xl:[margin-block-end:10px]">
              당신의 식단을 
            </p>
            <p className="m-0">알려주세요!</p>
          </div>


          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >

            
            {session ? (
              <Link
                href="/usermain/feeds/write1/-1"
                className=" no-underline rounded-81xl bg-dark flex flex-row items-center justify-center py-1 xl:py-3 px-3 xl:px-6 text-xs xl:text-sm text-white font-menu-off"
                style={frameDiv10Style}
              >
                <div className="relative font-extrabold" style={div18Style}>
                  시작
                </div>
              </Link>
            ) : (
              <button
                className=" no-underline rounded-81xl bg-dark flex flex-row items-center justify-center py-1 xl:py-3 px-3 xl:px-6 text-xs xl:text-sm text-white font-menu-off"
                style={frameDiv10Style}
                onClick={() => signIn()}
              >
                <div className="relative font-extrabold" style={div18Style}>
                  시작
                </div>
              </button>
            )}

            {/*

            <Link
              href="/usermain/feeds/write1/-1"
              className=" no-underline rounded-81xl bg-dark flex flex-row items-center justify-center py-3 px-6 text-sm text-white font-menu-off"
              style={frameDiv10Style}
            >
              <div className="relative font-extrabold" style={div18Style}>
                시작
              </div>
            </Link>
            */}

          </motion.div>


        </div>

      </div>
      
  

    </div>

  );
};

export default FormContainer;
