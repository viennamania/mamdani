import type { NextPage } from "next";

import Image
 from "next/image";
const WriteIcon: NextPage = () => {
  return (
    <Image
      width="64"
      height="64"

      className="absolute my-0 mx-[!important] top-[1271px] left-[936px] w-16 h-16 z-[2]"
      alt=""
      src="/usermain/images/write.svg"
    />
  );
};

export default WriteIcon;
