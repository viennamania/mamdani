import type { NextPage } from "next";

import { useMemo, type CSSProperties, useState, useEffect, use } from "react";




import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { set } from "lodash";
import { he } from "@faker-js/faker";


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



type GrPType = {

  barBreakfastCarbohydrate?: number;
  barBreakfastProtein?: number;
  barBreakfastFat?: number;

  barLunchCarbohydrate?: number;
  barLunchProtein?: number;
  barLunchFat?: number;

  barDinnerCarbohydrate?: number;
  barDinnerProtein?: number;
  barDinnerFat?: number;

  barSnackCarbohydrate?: number;
  barSnackProtein?: number;
  barSnackFat?: number;

  barMidnightSnackCarbohydrate?: number;
  barMidnightSnackProtein?: number;
  barMidnightSnackFat?: number;




  /** Style props */
  divFontSize?: CSSProperties["fontSize"];
  propDisplay?: CSSProperties["display"];
  propAlignItems?: CSSProperties["alignItems"];
  propJustifyContent?: CSSProperties["justifyContent"];
  propHeight?: CSSProperties["height"];
};

const GrP: NextPage<GrPType> = ({

  barBreakfastCarbohydrate,
  barBreakfastProtein,
  barBreakfastFat,

  barLunchCarbohydrate,
  barLunchProtein,
  barLunchFat,

  barDinnerCarbohydrate,
  barDinnerProtein,
  barDinnerFat,

  barSnackCarbohydrate,
  barSnackProtein,
  barSnackFat,

  barMidnightSnackCarbohydrate,
  barMidnightSnackProtein,
  barMidnightSnackFat,
  

  divFontSize,
  propDisplay,
  propAlignItems,
  propJustifyContent,
  propHeight,
}) => {
  const div13Style: CSSProperties = useMemo(() => {
    return {
      fontSize: divFontSize,
    };
  }, [divFontSize]);

  const div14Style: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      alignItems: propAlignItems,
      justifyContent: propJustifyContent,
      height: propHeight,
    };
  }, [propDisplay, propAlignItems, propJustifyContent, propHeight]);














  const [heightBarBreakfast, setHeightBarBreakfast] = useState( "0%");

  const [heightBarBreakfastCarbohydrate, setHeightBarBreakfastCarbohydrate] = useState(0);
  const [heightBarBreakfastProtein, setHeightBarBreakfastProtein] = useState(0);
  const [heightBarBreakfastFat, setHeightBarBreakfastFat] = useState(0);



  const [heightBarLunch, setHeightBarLunch] = useState( "0%");

  const [heightBarLunchCarbohydrate, setHeightBarLunchCarbohydrate] = useState(0);
  const [heightBarLunchProtein, setHeightBarLunchProtein] = useState(0);
  const [heightBarLunchFat, setHeightBarLunchFat] = useState(0);


  const [heightBarDinner, setHeightBarDinner] = useState( "0%");

  const [heightBarDinnerCarbohydrate, setHeightBarDinnerCarbohydrate] = useState(0);
  const [heightBarDinnerProtein, setHeightBarDinnerProtein] = useState(0);
  const [heightBarDinnerFat, setHeightBarDinnerFat] = useState(0);


  const [heightBarSnack, setHeightBarSnack] = useState( "0%");

  const [heightBarSnackCarbohydrate, setHeightBarSnackCarbohydrate] = useState(0);
  const [heightBarSnackProtein, setHeightBarSnackProtein] = useState(0);
  const [heightBarSnackFat, setHeightBarSnackFat] = useState(0);



  const [heightBarMidnightSnack, setHeightBarMidnightSnack] = useState( "0%");

  const [heightBarMidnightSnackCarbohydrate, setHeightBarMidnightSnackCarbohydrate] = useState(0);
  const [heightBarMidnightSnackProtein, setHeightBarMidnightSnackProtein] = useState(0);
  const [heightBarMidnightSnackFat, setHeightBarMidnightSnackFat] = useState(0);

  const [heightBarTotal, setHeightBarTotal] = useState( "0%");







  const squareVariantsBreakfast = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    
    visible: { height : heightBarBreakfast, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsLunch = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarLunch, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsDinner = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarDinner, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsSnack = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarSnack, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsMidnightSnack = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarMidnightSnack, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };

  const squareVariantsTotal = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarTotal, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };


  const controlsBreakfast = useAnimation();
  const controlsLunch = useAnimation();
  const controlsDinner = useAnimation();
  const controlsSnack = useAnimation();
  const controlsMidnightSnack = useAnimation();
  const controlsTotal = useAnimation();

  
  const [refBreakfast, inViewBreakfast] = useInView();
  const [refLunch, inViewLunch] = useInView();
  const [refDinner, inViewDinner] = useInView();
  const [refSnack, inViewSnack] = useInView();
  const [refMidnightSnack, inViewMidnightSnack] = useInView();

  const [refTotal, inViewTotal] = useInView();




  const [barBreakfast, setBarBreakfast] = useState(
    (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!)
  );

  const [barLunch, setBarLunch] = useState(
    barLunchCarbohydrate! + barLunchProtein! + barLunchFat!
  );

  const [barDinner, setBarDinner] = useState(
    barDinnerCarbohydrate! + barDinnerProtein! + barDinnerFat!
  );

  const [barSnack, setBarSnack] = useState(
    barSnackCarbohydrate! + barSnackProtein! + barSnackFat!
  );

  const [barMidnightSnack, setBarMidnightSnack] = useState(
    barMidnightSnackCarbohydrate! + barMidnightSnackProtein! + barMidnightSnackFat!
  );




  useEffect(() => {
    
    ///setHeightBarBreakfast(  (barBreakfast / barTotal * 100).toString() + "%");

    setHeightBarBreakfast ("100%");
    setHeightBarLunch ("100%");
    setHeightBarDinner ("100%");
    setHeightBarSnack ("100%");
    setHeightBarMidnightSnack ("100%");





    ////const sumCarbohydrate = barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!;

    const sumCarbohydrate =
      0 + (barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) +
      (barLunchCarbohydrate ? barLunchCarbohydrate : 0) +
      (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) +
      ////(barSnackCarbohydrate ? barSnackCarbohydrate : 0) +
      (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0);

    //console.log("barBreakfastCarbohydrate=====", barBreakfastCarbohydrate);
    //console.log("barLunchCarbohydrate=====", barLunchCarbohydrate);
    //console.log("barDinnerCarbohydrate=====", barDinnerCarbohydrate);
    //console.log("barSnackCarbohydrate=====", barSnackCarbohydrate);
    //console.log("barMidnightSnackCarbohydrate=====", barMidnightSnackCarbohydrate);
    //console.log("sumCarbohydrate=====", sumCarbohydrate);


    setHeightBarBreakfastCarbohydrate (

      //parseInt(( barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0 ) / sumCarbohydrate * 200 + "").toString()

      barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0
    );

    setHeightBarLunchCarbohydrate (
      /////parseInt(( barLunchCarbohydrate ? barLunchCarbohydrate : 0 ) / sumCarbohydrate * 200 + "").toString()

      barLunchCarbohydrate ? barLunchCarbohydrate : 0
    );

    setHeightBarDinnerCarbohydrate (
      ////parseInt(( barDinnerCarbohydrate ? barDinnerCarbohydrate : 0 ) / sumCarbohydrate * 200 + "").toString()

      barDinnerCarbohydrate ? barDinnerCarbohydrate : 0
    );

    setHeightBarSnackCarbohydrate (
      ///parseInt(( barSnackCarbohydrate ? barSnackCarbohydrate : 0 ) / sumCarbohydrate * 200 + "").toString()

      barSnackCarbohydrate ? barSnackCarbohydrate : 0
    );

    setHeightBarMidnightSnackCarbohydrate (
      ////parseInt(( barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0 ) / sumCarbohydrate * 200 + "").toString()

      barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0
    );



    const sumProtein =
    0 + (barBreakfastProtein ? barBreakfastProtein : 0) +
    (barLunchProtein ? barLunchProtein : 0) +
    (barDinnerProtein ? barDinnerProtein : 0) +
    ////(barSnackProtein ? barSnackProtein : 0) +
    (barMidnightSnackProtein ? barMidnightSnackProtein : 0);



    setHeightBarBreakfastProtein (
      ///parseInt(( barBreakfastProtein ? barBreakfastProtein : 0 ) / sumProtein * 200 + "").toString()

      barBreakfastProtein ? barBreakfastProtein : 0
      
    );

    setHeightBarLunchProtein (
      ////parseInt(( barLunchProtein ? barLunchProtein : 0 ) / sumProtein * 200 + "").toString()

      barLunchProtein ? barLunchProtein : 0
    );

    setHeightBarDinnerProtein (
      ////parseInt(( barDinnerProtein ? barDinnerProtein : 0 ) / sumProtein * 200 + "").toString()

      barDinnerProtein ? barDinnerProtein : 0
    );

    setHeightBarSnackProtein (
      ////parseInt(( barSnackProtein ? barSnackProtein : 0 ) / sumProtein * 200 + "").toString()

      barSnackProtein ? barSnackProtein : 0
    );

    setHeightBarMidnightSnackProtein (
      ////parseInt(( barMidnightSnackProtein ? barMidnightSnackProtein : 0 ) / sumProtein * 200 + "").toString()

      barMidnightSnackProtein ? barMidnightSnackProtein : 0
    );


    const sumFat =
    0 + (barBreakfastFat ? barBreakfastFat : 0) +
    (barLunchFat ? barLunchFat : 0) +
    (barDinnerFat ? barDinnerFat : 0) +
    ////////(barSnackFat ? barSnackFat : 0) +
    (barMidnightSnackFat ? barMidnightSnackFat : 0);


    setHeightBarBreakfastFat (
      ////parseInt(( barBreakfastFat ? barBreakfastFat : 0 ) / sumFat * 200 + "").toString()

      barBreakfastFat ? barBreakfastFat : 0
    );

    setHeightBarLunchFat (
      ////parseInt(( barLunchFat ? barLunchFat : 0 ) / sumFat * 200 + "").toString()

      barLunchFat ? barLunchFat : 0
    );

    setHeightBarDinnerFat (
      ////parseInt(( barDinnerFat ? barDinnerFat : 0 ) / sumFat * 200 + "").toString()

      barDinnerFat ? barDinnerFat : 0
    );

    setHeightBarSnackFat (
      ////parseInt(( barSnackFat ? barSnackFat : 0 ) / sumFat * 200 + "").toString()

      barSnackFat ? barSnackFat : 0
    );

    setHeightBarMidnightSnackFat (
      ///parseInt(( barMidnightSnackFat ? barMidnightSnackFat : 0 ) / sumFat * 200 + "").toString()

      barMidnightSnackFat ? barMidnightSnackFat : 0
    );





    setHeightBarTotal(
      (
         //parseInt (barTotal ? barTotal : "0") / parseInt (barTotal ? barTotal : "0") * 100
           
            100
      ).toString() + ""
    );

  } , [barBreakfast, barLunch, barDinner, barSnack, barMidnightSnack
    , barBreakfastCarbohydrate, barBreakfastProtein, barBreakfastFat
    , barLunchCarbohydrate, barLunchProtein, barLunchFat
    , barDinnerCarbohydrate, barDinnerProtein, barDinnerFat
    , barSnackCarbohydrate, barSnackProtein, barSnackFat
    , barMidnightSnackCarbohydrate, barMidnightSnackProtein, barMidnightSnackFat
  ]);






  useEffect(() => {
    if (heightBarBreakfast === "0%") {
      controlsBreakfast.start("hidden");
    } else {
      controlsBreakfast.start("visible");
    } 

    if (heightBarLunch === "0%") {
      controlsLunch.start("hidden");
    } else {
      controlsLunch.start("visible");
    }

    if (heightBarDinner === "0%") {
      controlsDinner.start("hidden");
    } else {
      controlsDinner.start("visible");
    }

    if (heightBarSnack === "0%") {
      controlsSnack.start("hidden");
    } else {
      controlsSnack.start("visible");
    }

    if (heightBarMidnightSnack === "0%") {
      controlsMidnightSnack.start("hidden");
    } else {
      controlsMidnightSnack.start("visible");
    }

    if (heightBarTotal === "0%") {
      controlsTotal.start("hidden");
    } else {
      controlsTotal.start("visible");
    }

  } , [heightBarBreakfast, heightBarLunch, heightBarDinner, heightBarSnack, heightBarMidnightSnack, heightBarTotal]);



  useEffect(() => {
    if (inViewBreakfast) {
      
      controlsBreakfast.start("visible");

    } else {

      controlsBreakfast.start("hidden");
    } 
  }, [controlsBreakfast, inViewBreakfast]);
  
  useEffect(() => {
    if (inViewLunch) {
      
      controlsLunch.start("visible");

    } else {

      controlsLunch.start("hidden");
    } 
  }, [controlsLunch, inViewLunch]);

  useEffect(() => {
    if (inViewDinner) {
      
      controlsDinner.start("visible");

    } else {

      controlsDinner.start("hidden");
    } 
  }, [controlsDinner, inViewDinner]);

  useEffect(() => {
    if (inViewSnack) {
      
      controlsSnack.start("visible");

    } else {

      controlsSnack.start("hidden");
    } 
  }, [controlsSnack, inViewSnack]);
  
  useEffect(() => {
    if (inViewMidnightSnack) {
      
      controlsMidnightSnack.start("visible");

    } else {

      controlsMidnightSnack.start("hidden");
    } 
  } , [controlsMidnightSnack, inViewMidnightSnack]);

  useEffect(() => {
    if (inViewTotal) {
      
      controlsTotal.start("visible");

    } else {

      controlsTotal.start("hidden");
    } 
  } , [controlsTotal, inViewTotal]);




  const squareVariants = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { height : heightBarTotal, transition: { duration: 1 } },
    ///hidden: { width: 0 }
    hidden: { height: 0 }
  };




  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    setTotalHeight(

      /*
      (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*2)
      + (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*2)
      + (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*2)
      */

      (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*1.5)
      + (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*1.5)
      + (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*1.5)



    )

  }, [barBreakfastCarbohydrate, barBreakfastProtein, barBreakfastFat,
    barLunchCarbohydrate, barLunchProtein, barLunchFat,
    barDinnerCarbohydrate, barDinnerProtein, barDinnerFat,
    barSnackCarbohydrate, barSnackProtein, barSnackFat,
    barMidnightSnackCarbohydrate, barMidnightSnackProtein, barMidnightSnackFat,
  ]);






  const squareVariantsTotalCarbohydrate = {
    visible: {
      //height : {barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!}

      
      //height : (barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!)*2 + "px"
      
      height : (barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!)*1.5 + "px"


      , transition: { duration: 1 }

    },
    hidden: { height: 0 }
  };

  const controlsTotalCarbohydrate = useAnimation();
  const [refTotalCarbohydrate, inViewTotalCarbohydrate] = useInView();

  useEffect(() => {
    if (inViewTotalCarbohydrate) {
      
      controlsTotalCarbohydrate.start("visible");

    } else {

      ///controlsTotalCarbohydrate.start("hidden");
    } 
  } , [controlsTotalCarbohydrate, inViewTotalCarbohydrate]);





  const squareVariantsTotalProtein = {
    visible: {
      
      
      //////height : (barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!)*2 + "px"

      height : (barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!)*1 + "px"


      , transition: { duration: 1 }

    },
    hidden: { height: 0 }
  };

  const controlsTotalProtein = useAnimation();
  const [refTotalProtein, inViewTotalProtein] = useInView();

  useEffect(() => {
    if (inViewTotalProtein) {
      
      controlsTotalProtein.start("visible");

    } else {

      //controlsTotalProtein.start("hidden");
    } 
  } , [controlsTotalProtein, inViewTotalProtein]);




  const squareVariantsTotalFat = {
    visible: {
      
      ///height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*2 + "px"

      height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*1 + "px"

      , transition: { duration: 1 }

    },
    hidden: { height: 0 }
  };

  const controlsTotalFat = useAnimation();
  const [refTotalFat, inViewTotalFat] = useInView();

  useEffect(() => {
    if (inViewTotalFat) {
      
      controlsTotalFat.start("visible");

    } else {

      ///controlsTotalFat.start("hidden");
    } 
  } , [controlsTotalFat, inViewTotalFat]);






  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },

  ];



  // style={{height: (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*2).toString() + "px"}}

  
  //console.log("barTotalCarbohydrate height =====",
  //  (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*2).toString() + "px"
  //);

  // style={{height: (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*2).toString() + "px"}}



  //console.log("barTotalProtein height =====",
  //  (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*2).toString() + "px"
  //);


  return (


    <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-base xl:text-xl text-dark font-menu-off">
      
      {/* barBreakfast carbohydrate, protein, fat */}
      <div className="self-stretch flex flex-row items-center justify-center gap-[8px]">

        <div className="flex-1 relative font-extrabold" style={div13Style}>
          탄단지
        </div>
        
        <div className="flex flex-row items-center justify-start gap-[4px] text-3xs">

          <div className="flex flex-row items-center justify-center gap-[4px]">
            <div className="relative bg-skyblue w-2  h-2 " />
            <div className="relative">탄</div>
          </div>
          <div className="relative text-xs">:</div>
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <div className="relative bg-lightcoral w-2 h-2" />
            <div className="relative">단</div>
          </div>
          <div className="relative text-xs">:</div>
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <div className="relative bg-burlywood w-2 h-2" />
            <div className="relative">지</div>
          </div>

        </div>

      </div>



      <div className={`self-stretch h-[${totalHeight}] flex flex-row items-end justify-center text-center text-3xs`}>



        <div className=" w-8 flex flex-row items-end justify-center pt-0 px-0  pb-[29px] xl:pb-[28px]">

        </div>




        <div className="self-stretch w-px flex flex-row items-end justify-end pt-0 px-0 pb-[28px] box-border">
          <div className="self-stretch border-r-[1px] border-solid border-grey-c" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-end">
          <div className="self-stretch flex flex-row items-end justify-center">
            
            
            {/* Breakfast */}
            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">

              {/*
              <motion.div
                ref={refBreakfast}
                animate={controlsBreakfast}
                initial="hidden"
                variants={squareVariantsBreakfast}
              >
              */}

                <div className=" flex flex-row items-end justify-center gap-[10px] h-[200px]">


                  {/*
                  <div className={`flex flex-col items-center justify-end  `}>
                     

                      <BarChart
                        
                        //layout="vertical"

                        layout="horizontal"


                        width={
                          // full width

                          500
                        }
                        height={400}
                        data={

                          [
                            {
                              name: "아침",
                              fat: barBreakfastFat,
                              protein: barBreakfastProtein,
                              carbohydrate: barBreakfastCarbohydrate,
                            },
                            {
                              name: "점심",
                              fat: barLunchFat,
                              protein: barLunchProtein,
                              carbohydrate: barLunchCarbohydrate,
                            },
                            {
                              name: "저녁",
                              fat: barDinnerFat,
                              protein: barDinnerProtein,
                              carbohydrate: barDinnerCarbohydrate,
                            },
                            {
                              name: "간식",
                              fat: barSnackFat,
                              protein: barSnackProtein,
                              carbohydrate: barSnackCarbohydrate,
                            },
                            {
                              name: "야식",
                              fat: barMidnightSnackFat,
                              protein: barMidnightSnackProtein,
                              carbohydrate: barMidnightSnackCarbohydrate,
                            },
                            {
                              name: "합계",
                              fat: barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!,
                              protein: barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!,
                              carbohydrate: barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!,

                            }
                          ]
                        }

                        margin={{
                          top: 30,
                          right: 10,
                          bottom: 10,
                          left: 10,
                        }}

                        barSize={20}

                        // full width

                        //barSize={20}

                        //barGap={20}

                        //barCategoryGap={20}

                        barGap={50}


                      >
                     
                      
                       
                        <Bar
                          dataKey="fat"
                          stackId="a"
                          //fill="#8884d8"
                          //className="bg-skyblue"
                          fill="skyblue"
                        />

                        <Bar
                          dataKey="protein"
                          stackId="a"
                          fill="lightcoral"
                        />
                        <Bar
                          dataKey="carbohydrate"
                          stackId="a"
                          fill="burlywood"
                        />

                        
                      </BarChart>
                   
                  </div>
                  */}
                        





                  
                  <div className={`flex flex-col items-center justify-end  `}>

                    

                    {heightBarBreakfastCarbohydrate !== 0 && (
                      <div className={`bg-skyblue w-[20px] `}
                        style={{height: (heightBarBreakfastCarbohydrate*2).toString() + "px"}}
                      />
                    )}

                    {heightBarBreakfastProtein !== 0 && (
                      <div className={`bg-lightcoral w-[20px] `}
                        style={{height: (heightBarBreakfastProtein*2).toString() + "px"}}
                      />
                    )}
                    
                    {heightBarBreakfastFat !== 0 && (
                      <div className={`bg-burlywood w-[20px] `}
                        style={{height: (heightBarBreakfastFat*2).toString() + "px"}}
                      />
                    )}
                    
                  </div>


                  <div className={`flex flex-col items-center justify-end  `}>

                    {heightBarBreakfastCarbohydrate !== 0 && (
                      <div className={` w-[10px]  flex items-center justify-center `}
                        style={{height: (heightBarBreakfastCarbohydrate*2).toString() + "px"}}
                      >
                        {barBreakfastCarbohydrate}
                      </div>
                    )}
                    


                    {heightBarBreakfastProtein !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: (heightBarBreakfastProtein*2).toString() + "px"}}
                      >
                        {barBreakfastProtein}
                      </div>
                    )}

                    {heightBarBreakfastFat !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: (heightBarBreakfastFat*2).toString() + "px"}}
                      >
                        {barBreakfastFat}
                      </div>
                    )}
                  
                  </div>


                </div>

              {/*
              </motion.div>
              */}

            </div>




            {/* Lunch */}
            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">

              {/*
              <motion.div
                ref={refLunch}
                animate={controlsLunch}
                initial="hidden"
                variants={squareVariantsLunch}
              >
              */}

                <div className="flex-1 flex flex-row items-end justify-center gap-[10px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end `}>

                    

                    {barLunchCarbohydrate !== 0 && (
                      <div className={` bg-skyblue w-[20px]  `}
                        style={{height: ((barLunchCarbohydrate ? barLunchCarbohydrate : 0)*2).toString() + "px"}}
                      />
                    )}
                    
                    {barLunchProtein !== 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{height: ((barLunchProtein ? barLunchProtein : 0)*2).toString() + "px"}}
                      />
                    )}

                    {barLunchFat !== 0 && (
                      <div className={` bg-burlywood w-[20px]`}
                        ///style={{height: (barLunchFat*2).toString() + "px"}}

                        style={{height: ((barLunchFat ? barLunchFat : 0)*2).toString() + "px"}}
                      />
                    )}


                    
                  

                  </div>

                  {/*
                  <div className={`flex flex-col items-center justify-end h-[${heightBarLunchCarbohydrate+heightBarLunchProtein+heightBarLunchFat}px] `}>
                  */}
                  <div className={`flex flex-col items-center justify-end  `}>


                    {barLunchCarbohydrate !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barLunchCarbohydrate ? barLunchCarbohydrate : 0)*2).toString() + "px"}}
                      >
                        {barLunchCarbohydrate}
                      </div>
                    )}

                    {barLunchProtein !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barLunchProtein ? barLunchProtein : 0)*2).toString() + "px"}}
                      >
                        {barLunchProtein}
                      </div>
                    )}

                    {barLunchFat !== 0 && (
                      <div className={` w-[10px]  flex items-center justify-center `}
                        style={{height: ((barLunchFat ? barLunchFat : 0)*2).toString() + "px"}}
                      >
                        {barLunchFat}
                      </div>
                    )}


                  
                  </div>

                </div>

              {/*
              </motion.div>
              */}

            </div>




            {/* Dinner */}

            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">

              {/*
              <motion.div
                ref={refDinner}
                animate={controlsDinner}
                initial="hidden"
                variants={squareVariantsDinner}
              >
              */}

                <div className="flex-1 flex flex-row items-end justify-center gap-[10px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    
                    {barDinnerCarbohydrate !== 0 && (
                      <div className={` bg-skyblue w-[20px] h-[${barDinnerCarbohydrate?.toString()}px] `}
                        style={{height: ((barDinnerCarbohydrate ? barDinnerCarbohydrate : 0)*2).toString() + "px"}}
                      />
                    )}

                    {barDinnerProtein !== 0 && (
                      <div className={` bg-lightcoral w-[20px] h-[${barDinnerProtein?.toString()}px] `}
                        style={{height: ((barDinnerProtein ? barDinnerProtein : 0)*2).toString() + "px"}}
                      />
                    )}

                    {barDinnerFat !== 0 && (
                      <div className={` bg-burlywood w-[20px] `}
                        style={{height: ((barDinnerFat ? barDinnerFat : 0)*2).toString() + "px"}}
                      />
                    )}


                    
                  

                  </div>

                  {/*
                  <div className={`flex flex-col items-center justify-end h-[${heightBarDinnerCarbohydrate+heightBarDinnerProtein+heightBarDinnerFat}px] `}>
                  */}
                  <div className={`flex flex-col items-center justify-end  `}>

                    {barDinnerCarbohydrate !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barDinnerCarbohydrate ? barDinnerCarbohydrate : 0)*2).toString() + "px"}}
                      >
                        {barDinnerCarbohydrate}
                      </div>
                    )}

                    {barDinnerProtein !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barDinnerProtein ? barDinnerProtein : 0)*2).toString() + "px"}}
                      >
                        {barDinnerProtein}
                      </div>
                    )}

                    {barDinnerFat !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barDinnerFat ? barDinnerFat : 0)*2).toString() + "px"}}
                      >
                        {barDinnerFat}
                      </div>
                    )}


                  
                  </div>

                </div>

              {/*
              </motion.div>
              */}

            </div>


            {/* Snack */}
            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">

              {/*
              <motion.div
                ref={refSnack}
                animate={controlsSnack}
                initial="hidden"
                variants={squareVariantsSnack}
              >
              */}

                <div className="flex-1 flex flex-row items-end justify-center gap-[10px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    
                    {barSnackCarbohydrate !== 0 && (
                      <div className={` bg-skyblue w-[20px]  `} 
                        style={{height: ((barSnackCarbohydrate ? barSnackCarbohydrate : 0)*2).toString() + "px"}}
                      />
                    )}

                    {barSnackProtein !== 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{height: ((barSnackProtein ? barSnackProtein : 0)*2).toString() + "px"}}
                      />
                    )}

                    {barSnackFat !== 0 && (
                      <div className={` bg-burlywood w-[20px]  `}
                        style={{height: ((barSnackFat ? barSnackFat : 0)*2).toString() + "px"}}
                      />
                    )}


                    
                  

                  </div>

                  {/*
                  <div className={`flex flex-col items-center justify-end h-[${heightBarSnackCarbohydrate+heightBarSnackProtein+heightBarSnackFat}px] `}>
                  */}
                  <div className={`flex flex-col items-center justify-end  `}>

                    {barSnackCarbohydrate !== 0 && (


                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barSnackCarbohydrate ? barSnackCarbohydrate : 0)*2).toString() + "px"}}
                      >
                        {barSnackCarbohydrate}
                      </div>


                    )}

                    {barSnackProtein !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barSnackProtein ? barSnackProtein : 0)*2).toString() + "px"}}
                      >
                        {barSnackProtein}
                      </div>
                    )}

                    {barSnackFat !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barSnackFat ? barSnackFat : 0)*2).toString() + "px"}}
                      >
                        {barSnackFat}
                      </div>
                    )}

                  </div>

                </div>

              {/*
              </motion.div>
              */}

            </div>





            {/* MidnightSnack */}
            <div className="flex-1 flex flex-row items-end justify-center gap-[4px] h-[200px] ">

              {/*
              <motion.div
                ref={refMidnightSnack}
                animate={controlsMidnightSnack}
                initial="hidden"
                variants={squareVariantsMidnightSnack}
              >
              */}
              


              <div className="flex-1 flex flex-row items-end justify-center gap-[10px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    
                    {heightBarMidnightSnackCarbohydrate !== 0 && (
                      <div className={` bg-skyblue w-[20px] `}
                        style={{height: ((barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0)*2).toString() + "px"}}
                      />
                    )}

                    {heightBarMidnightSnackProtein !== 0 && (
                      <div className={` bg-lightcoral w-[20px] `}
                        style={{height: ((barMidnightSnackProtein ? barMidnightSnackProtein : 0)*2).toString() + "px"}}
                      />
                    )}

                    {heightBarMidnightSnackFat !== 0 && (
                      <div className={` bg-burlywood w-[20px] `}
                        style={{height: ((barMidnightSnackFat ? barMidnightSnackFat : 0)*2).toString() + "px"}}
                      />
                    )}


                    
                  

                  </div>

                  {/*
                  <div className={`flex flex-col items-center justify-end h-[${heightBarMidnightSnackCarbohydrate+heightBarMidnightSnackProtein+heightBarMidnightSnackFat}px] `}>
                  */}
                  <div className={`flex flex-col items-center justify-end  `}>



                    {heightBarMidnightSnackCarbohydrate !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0)*2).toString() + "px"}}
                      >
                        {barMidnightSnackCarbohydrate}
                      </div>
                    )}

                    {heightBarMidnightSnackProtein !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barMidnightSnackProtein ? barMidnightSnackProtein : 0)*2).toString() + "px"}}
                      >
                        {barMidnightSnackProtein}
                      </div>
                    )}

                    {heightBarMidnightSnackFat !== 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{height: ((barMidnightSnackFat ? barMidnightSnackFat : 0)*2).toString() + "px"}}
                      >
                        {barMidnightSnackFat}
                      </div>
                    )}


                  
                  </div>

                </div>

              {/*
              </motion.div>
              */}
              

            </div>




            <div className="flex-1 flex flex-row items-center justify-center gap-[10px] "

              /*
              style={{height:


                ( ( (barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0) ) * 2
                  + 
                  ( (barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0) ) * 2
                  +
                  ( (barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0) ) * 2
                
                  ).toString() + "px"

              

              }}
              */

              style={{height: totalHeight.toString() + "px"}}

          
            >

              <div className="flex flex-col items-center justify-end">


                <motion.div
                  ref={refTotalCarbohydrate}
                  animate={controlsTotalCarbohydrate}
                  initial="hidden"
                  variants={squareVariantsTotalCarbohydrate}
                >
                  
                  <div className="flex flex-row items-center justify-center gap-[4px] ">
                    <div className={`relative bg-skyblue w-5`}
                      
                      ///style={{height: (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*2).toString() + "px"}}
                      
                      style={{height: (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*1.5).toString() + "px"}}
                    
                    />

                    {/*
                    <div className=" w-5">

                      { (barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!) > 0 && (

                        barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!
                        
                      )}

                    </div>
                    */}
                  </div>


                </motion.div>

                
                <motion.div
                  ref={refTotalProtein}
                  animate={controlsTotalProtein}
                  initial="hidden"
                  variants={squareVariantsTotalProtein}
                >
                
                  <div className="flex flex-row items-center justify-center gap-[4px]">
                    
                    <div className={`relative bg-lightcoral w-5`}

                  

                      ////style={{height: (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*2).toString() + "px"}}

                      style={{height: (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*1.5).toString() + "px"}}
                    />
                      
                      {/*
                    <div className=" w-5 ">

                      { (barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!) > 0 && (

                        barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!
                        
                      )}
                     
                    </div>
                    */}

                  </div>
                
                </motion.div>
                




                <motion.div
                  ref={refTotalFat}
                  animate={controlsTotalFat}
                  initial="hidden"
                  variants={squareVariantsTotalFat} 
                >
                  <div className="flex flex-row items-center justify-center gap-[4px]">
                    <div className={`relative bg-burlywood w-5`}
                      
                      //style={{height: (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*2).toString() + "px"}}

                      style={{height: (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*1.5).toString() + "px"}}
                    />

                    {/*
                    <div className=" w-5">

                      { (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!) > 0 && (

                        barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!
                        
                      )}
                      
                    </div>
                    */}

                  </div>
                </motion.div>
                
              </div>


              <div className="flex flex-col items-center justify-center">


                <motion.div
                  ref={refTotalCarbohydrate}
                  animate={controlsTotalCarbohydrate}
                  initial="hidden"
                  variants={squareVariantsTotalCarbohydrate}
                >
                  
                  <div className="h-full flex flex-row items-center justify-center gap-[4px] ">
                    {/*
                    <div className={`relative bg-skyblue w-5`}
                      style={{height: (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*2).toString() + "px"}}
                    />
                    */}

                    
                    <div className=" w-5">

                      { (barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!) > 0 && (

                        barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!
                        
                      )}

                    </div>
                    
                  </div>


                </motion.div>


                <motion.div
                  ref={refTotalProtein}
                  animate={controlsTotalProtein}
                  initial="hidden"
                  variants={squareVariantsTotalProtein}
                >

                  <div className="h-full flex flex-row items-center justify-center gap-[4px]">
                    
                    {/*
                    <div className={`relative bg-lightcoral w-5`}
                      style={{height: (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*2).toString() + "px"}}
                    />
                    */}
                      
                      
                    <div className=" w-5 ">

                      { (barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!) > 0 && (

                        barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!
                        
                      )}
                    
                    </div>
                    

                  </div>

                </motion.div>





                <motion.div
                  ref={refTotalFat}
                  animate={controlsTotalFat}
                  initial="hidden"
                  variants={squareVariantsTotalFat} 
                >
                  <div className="h-full flex flex-row items-center justify-center gap-[4px]">
                    {/*
                    <div className={`relative bg-burlywood w-5`}
                      style={{height: (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*2).toString() + "px"}}
                    />
                    */}

                    
                    <div className=" w-5">

                      { (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!) > 0 && (

                        barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!
                        
                      )}
                      
                    </div>
                    

                  </div>
                </motion.div>

              </div>

              
            </div>


          </div>

          
          <div className="self-stretch flex flex-row items-start justify-center pt-2 px-0 pb-0 text-xs border-t-[1px] border-solid border-grey-c">
            
            <div className="flex-1 relative">아침</div>

            <div className="flex-1 relative">점심</div>
            <div className="flex-1 relative">저녁</div>
            <div className="flex-1 relative">간식</div>
            <div className="flex-1 relative">야식</div>
            <div className="flex-1 relative font-extrabold" style={div14Style}>
              총탄단지
            </div>
          </div>


        </div>
      </div>
    </div>






  );
};

export default GrP;
