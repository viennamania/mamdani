import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import List1 from "./list1";
import List1Comment from "./list1-comment";

type CommentContainerType = {
  commentText?: string;

  /** Style props */
  propColor?: CSSProperties["color"];
};

const CommentContainer: NextPage<CommentContainerType> = ({
  commentText,
  propColor,
}) => {
  const div8Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  return (
    <div className="self-stretch flex flex-col items-center justify-end gap-[20px] text-left text-xs text-dark font-menu-off">
      <List1
        commentText="댓글입니다."
        replyButtonText="답글쓰기"
        commentIconUrl="/usermain/images/more2line.svg"
      />

      <div className="self-stretch flex flex-row items-start justify-start gap-[8px]">
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src="/usermain/images/cornerdownrightline.svg"
        />

        <List1Comment
          replyButtonText=" 댓글입니다."
          propAlignSelf="unset"
          propFlex="1"
          propColor="unset"
          propDisplay="unset"
          propFlexDirection="unset"
          propAlignItems="unset"
          propJustifyContent="unset"
          propGap="unset"
          propColor1="#999"
          propPosition="unset"
          propFontSize="unset"
          propFontWeight="unset"
          propFontFamily="unset"
          propTextAlign="unset"
          propDisplay1="unset"
          propPosition1="unset"
          propWidth="unset"
          propHeight="unset"
          propOverflow="unset"
          propFlexShrink="unset"
          propDisplay2="flex"
          propFlexDirection1="row"
          propAlignItems1="center"
          propJustifyContent1="center"
          propGap1="12px"
        />

      </div>
    </div>
  );
};

export default CommentContainer;
