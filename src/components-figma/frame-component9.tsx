import type { NextPage } from "next";
import Search from "./search";
import FeedContainer1 from "./feed-container1";
import WriteIcon from "./write-icon";
import Link from "next/link";

const FrameComponent9: NextPage = () => {
  return (
    <div className="xl:w-[1000px] flex flex-col items-center justify-start relative gap-[40px] text-center text-base text-grey-9 font-menu-off">
      
      <div className="self-stretch flex flex-row items-center justify-center z-[0]">
        <div className="flex-1 box-border h-14 flex flex-row items-center justify-start text-dark border-b-[2px] border-solid border-dark">
          <div className="flex-1 relative font-extrabold">전체 Feed</div>
        </div>
        <div className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
          <div className="flex-1 relative font-extrabold">관심 Feed</div>
        </div>
        <div className="flex-1 box-border h-14 flex flex-row items-center justify-start border-b-[2px] border-solid border-orange-light">
          <div className="flex-1 relative font-extrabold">나의 Feed</div>
        </div>
      </div>

      <div className="self-stretch flex flex-col items-center justify-start gap-[20px] z-[1] text-left text-dark">
        <div className="self-stretch flex flex-row items-center justify-between">
          <div className="relative font-extrabold">피드 34</div>
          <Search prop="제목, 내용, 닉네임 검색" searchWidth="400px" />
        </div>
        <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
          <FeedContainer1
            messageText="영양사님 너무 과식한거 같은데 어떻하죠 ㅜㅜ"
            showFrameDiv
            frameDivVisible
            rectangleIcon={false}
          />
          <FeedContainer1
            messageText="친구와 홍대에서 브라우니 케익을 먹으면서 너무 맛있게.."
            showFrameDiv={false}
            frameDivVisible={false}
            rectangleIcon
            divAlignItems="center"
          />
        </div>
      </div>
      
      <Link href="/usermain/feeds/-1">
      <WriteIcon />
      </Link>

    </div>
  );
};

export default FrameComponent9;
