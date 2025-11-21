import type { NextPage } from "next";

import Image from "next/image";

const Page: NextPage = () => {
  return (
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
  );
};

export default Page;
