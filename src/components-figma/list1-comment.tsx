import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type List1Type = {
  commentText?: string;
  replyButtonText?: string;
  commentIconUrl?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propColor?: CSSProperties["color"];
  propDisplay?: CSSProperties["display"];
  propFlexDirection?: CSSProperties["flexDirection"];
  propAlignItems?: CSSProperties["alignItems"];
  propJustifyContent?: CSSProperties["justifyContent"];
  propGap?: CSSProperties["gap"];
  propColor1?: CSSProperties["color"];
  propPosition?: CSSProperties["position"];
  propFontSize?: CSSProperties["fontSize"];
  propFontWeight?: CSSProperties["fontWeight"];
  propFontFamily?: CSSProperties["fontFamily"];
  propTextAlign?: CSSProperties["textAlign"];
  propDisplay1?: CSSProperties["display"];
  propPosition1?: CSSProperties["position"];
  propWidth?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
  propOverflow?: CSSProperties["overflow"];
  propFlexShrink?: CSSProperties["flexShrink"];
  propDisplay2?: CSSProperties["display"];
  propFlexDirection1?: CSSProperties["flexDirection"];
  propAlignItems1?: CSSProperties["alignItems"];
  propJustifyContent1?: CSSProperties["justifyContent"];
  propGap1?: CSSProperties["gap"];
};

const List1Comment: NextPage<List1Type> = ({
  commentText,
  replyButtonText,
  commentIconUrl,
  propAlignSelf,
  propFlex,
  propColor,
  propDisplay,
  propFlexDirection,
  propAlignItems,
  propJustifyContent,
  propGap,
  propColor1,
  propPosition,
  propFontSize,
  propFontWeight,
  propFontFamily,
  propTextAlign,
  propDisplay1,
  propPosition1,
  propWidth,
  propHeight,
  propOverflow,
  propFlexShrink,
  propDisplay2,
  propFlexDirection1,
  propAlignItems1,
  propJustifyContent1,
  propGap1,
}) => {
  const listStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
    };
  }, [propAlignSelf, propFlex]);

  const div8Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  const frameDiv5Style: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      flexDirection: propFlexDirection,
      alignItems: propAlignItems,
      justifyContent: propJustifyContent,
      gap: propGap,
      color: propColor1,
    };
  }, [
    propDisplay,
    propFlexDirection,
    propAlignItems,
    propJustifyContent,
    propGap,
    propColor1,
  ]);

  const div9Style: CSSProperties = useMemo(() => {
    return {
      position: propPosition,
      fontSize: propFontSize,
      fontWeight: propFontWeight,
      fontFamily: propFontFamily,
      textAlign: propTextAlign,
      display: propDisplay1,
    };
  }, [
    propPosition,
    propFontSize,
    propFontWeight,
    propFontFamily,
    propTextAlign,
    propDisplay1,
  ]);

  const more2LineIconStyle: CSSProperties = useMemo(() => {
    return {
      position: propPosition1,
      width: propWidth,
      height: propHeight,
      overflow: propOverflow,
      flexShrink: propFlexShrink,
      display: propDisplay2,
      flexDirection: propFlexDirection1,
      alignItems: propAlignItems1,
      justifyContent: propJustifyContent1,
      gap: propGap1,
    };
  }, [
    propPosition1,
    propWidth,
    propHeight,
    propOverflow,
    propFlexShrink,
    propDisplay2,
    propFlexDirection1,
    propAlignItems1,
    propJustifyContent1,
    propGap1,
  ]);

  return (
    <div
      className="self-stretch flex flex-row items-start justify-start gap-[12px] text-left text-xs text-dark font-menu-off"
      style={listStyle}
    >

      <div className="flex-1 flex flex-row items-start justify-start gap-[12px]">
        
        <img className="relative w-6 h-6" alt="" src="/usermain/images/avatar.svg" />

        <div className="self-stretch  flex flex-col items-center justify-end gap-[8px]">

          <div className="self-stretch relative">
            <span>
              <span className="font-extrabold font-menu-off">Alex</span>
              <span className="text-grey-9">{` · `}</span>
            </span>
            <span className="text-grey-9">
              <span>5분전</span>
            </span>
          </div>

          <div className="self-stretch relative text-sm" style={div8Style}>
            @닉네임 댓글입니다.
          </div>

        </div>

      </div>

      {/* 답글쓰기 버튼 */}
      <div className="flex flex-row items-center justify-center gap-[12px]" >
        <div className="relative font-extrabold">
          답글쓰기
        </div>
      </div>


      {/*
      <div
        className="flex flex-row items-center justify-center gap-[12px]"
        style={frameDiv5Style}
      >
        <div className="relative font-extrabold" style={div9Style}>
          {replyButtonText}
        </div>
        <button className="flex flex-row items-center justify-start"
          onClick={() => {
            alert("답글이 달렸습니다.");
          } }
        >
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src={commentIconUrl}
          style={more2LineIconStyle}
        />
        </button>
      </div>
      */}
      



    </div>


  );
};

export default List1Comment;
