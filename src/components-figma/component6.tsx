import type { NextPage } from "next";
import FeedContainerFree from "./feed-container-free";
import ContainerCardFormHome from "./container-card-form-home";

const Component6: NextPage = () => {
  return (
    <div className="self-stretch bg-background flex flex-col items-center justify-start py-[100px] px-0">
      <div className="xl:w-[1000px] flex flex-col items-center justify-start gap-[40px]">
        <FeedContainerFree
          sectionTitle="자유게시판"
          feedSectionSubtitle="이주의 인기글을 만나보세요!"
          propFlex="unset"
          propAlignSelf="stretch"
        />
        <ContainerCardFormHome
          imageDimensions="/usermain/images/rectangle-621@2x.png"
          showFrameDiv={false}
          frameDivVisible={false}
          showRectangleIcon={false}
          frameDivVisible1={false}
          frameDivJustifyContent="center"
          timeLineIconHeight="240px"
        />
      </div>
    </div>
  );
};

export default Component6;
