import type { NextPage } from "next";

type LogoIconType = {
  carDimensions?: string;
};

const LogoIcon: NextPage<LogoIconType> = ({ carDimensions }) => {
  return (
    <img
      
      //className="relative w-[199.5px] h-[35.3px]"
      className="w-20 object-contain"

      alt=""
      src={carDimensions}
    />
  );
};

export default LogoIcon;
