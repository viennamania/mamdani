import type { NextPage } from "next";
import FrameComponent8 from "@/components-figma/frame-component8";
import Link from "next/link";

const Frame16: NextPage = () => {
  return (
    <div className="relative bg-gray-300 w-full h-[1080px] overflow-hidden flex flex-col items-center justify-center">
      <div className="rounded-xl bg-white w-[600px] overflow-hidden flex flex-col items-center justify-start p-5 box-border">
        <div className="self-stretch flex flex-row items-center justify-end">
          
          <Link
            href="/usermain/diet/search"
            className=" no-underline flex">
          <img
            className="relative w-6 h-6 overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/x1.svg"
          />
          </Link>

        </div>
        <FrameComponent8 />
      </div>
    </div>
  );
};

export default Frame16;
