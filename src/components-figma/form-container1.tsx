import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Day from "./day";

type FormContainer1Type = {
  carCount?: string;
  carNumber?: string;
  carIndex?: string;
  carNumberText?: string;
  carPosition?: string;
  carOptionNumber?: string;
  carNumberValue?: string;
  rectangleDiv?: boolean;
  rectangleDiv1?: boolean;
  rectangleDiv2?: boolean;
  rectangleDiv3?: boolean;
  rectangleDiv4?: boolean;
  rectangleDiv5?: boolean;
  rectangleDiv6?: boolean;
  rectangleDiv7?: boolean;
  rectangleDiv8?: boolean;
  rectangleDiv9?: boolean;
  rectangleDiv10?: boolean;

  /** Style props */
  rectangleDivOpacity?: CSSProperties["opacity"];
  rectangleDivColor?: CSSProperties["color"];
  rectangleDivOpacity1?: CSSProperties["opacity"];
  propOpacity?: CSSProperties["opacity"];
  propBorderRadius?: CSSProperties["borderRadius"];
  propBorder?: CSSProperties["border"];
  propOpacity1?: CSSProperties["opacity"];
  propOpacity2?: CSSProperties["opacity"];
  propOpacity3?: CSSProperties["opacity"];
};

const FormContainer1: NextPage<FormContainer1Type> = ({
  carCount,
  carNumber,
  carIndex,
  carNumberText,
  carPosition,
  carOptionNumber,
  carNumberValue,
  rectangleDiv,
  rectangleDiv1,
  rectangleDiv2,
  rectangleDiv3,
  rectangleDiv4,
  rectangleDiv5,
  rectangleDiv6,
  rectangleDiv7,
  rectangleDiv8,
  rectangleDiv9,
  rectangleDiv10,
  rectangleDivOpacity,
  rectangleDivColor,
  rectangleDivOpacity1,
  propOpacity,
  propBorderRadius,
  propBorder,
  propOpacity1,
  propOpacity2,
  propOpacity3,
}) => {
  const dayStyle: CSSProperties = useMemo(() => {
    return {
      opacity: rectangleDivOpacity,
    };
  }, [rectangleDivOpacity]);

  const div15Style: CSSProperties = useMemo(() => {
    return {
      color: rectangleDivColor,
    };
  }, [rectangleDivColor]);

  const dayStyle1: CSSProperties = useMemo(() => {
    return {
      opacity: rectangleDivOpacity1,
    };
  }, [rectangleDivOpacity1]);

  const dayStyle2: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity,
    };
  }, [propOpacity]);

  const dayStyle3: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
      border: propBorder,
      opacity: propOpacity1,
    };
  }, [propBorderRadius, propBorder, propOpacity1]);

  const dayStyle4: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity2,
    };
  }, [propOpacity2]);

  const dayStyle5: CSSProperties = useMemo(() => {
    return {
      opacity: propOpacity3,
    };
  }, [propOpacity3]);

  return (
    <div className="self-stretch flex flex-row items-center justify-center text-center text-sm text-dark font-menu-off">
      <Day
        numberValue="29"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
        propOpacity="0.2"
        propBorderRadius="unset"
        propBorder="unset"
        propColor="#212121"
      />
      <Day
        numberValue="30"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
        propOpacity="0.2"
        propBorderRadius="unset"
        propBorder="unset"
        propColor="#212121"
      />
      <Day
        numberValue="31"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
        propOpacity="0.2"
        propBorderRadius="unset"
        propBorder="unset"
        propColor="#212121"
      />
      <Day
        numberValue="1"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
      />
      <Day
        numberValue="2"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
        propOpacity="unset"
        propBorderRadius="unset"
        propBorder="unset"
        propColor="#212121"
      />
      <Day
        numberValue="3"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
        propOpacity="unset"
        propBorderRadius="unset"
        propBorder="unset"
        propColor="#212121"
      />
      <Day
        numberValue="4"
        rectangleDiv={false}
        rectangleDiv1={false}
        rectangleDiv2={false}
        rectangleDiv3={false}
        rectangleDiv4={false}
        propOpacity="unset"
        propBorderRadius="unset"
        propBorder="unset"
        propColor="#4285f4"
      />
    </div>
  );
};

export default FormContainer1;
