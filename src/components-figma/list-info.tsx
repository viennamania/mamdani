import type { NextPage } from "next";
import Tag1 from "./tag1";

const ListInfo: NextPage = () => {
  return (
    
    <div className="flex-1 bg-white shadow-[4px_4px_20px_rgba(140,_144,_171,_0.1)] flex flex-col items-center justify-end text-left text-xs text-grey-6 font-menu-off border-[1px] border-solid border-grey-e">
      <img
        className="self-stretch relative max-w-full overflow-hidden h-[490px] shrink-0 object-cover"
        alt=""
        src="/usermain/images/rectangle-63@2x.png"
      />
      <div className="self-stretch flex flex-col items-center justify-end p-6 gap-[20px]">
        <div className="self-stretch flex flex-col items-center justify-end gap-[4px]">
          <div className="self-stretch relative">소제목</div>
          <div className="self-stretch relative text-xl font-extrabold text-dark">
            한우등심
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
          <Tag1 />
          <Tag1 />
          <Tag1 />
        </div>
      </div>
    </div>
    
  );
};

export default ListInfo;
