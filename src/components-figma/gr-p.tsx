import type { NextPage } from "next";

import { useMemo, type CSSProperties, useState, useEffect, use } from "react";




import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { set } from "lodash";
import { he } from "@faker-js/faker";


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { u } from "uploadthing/dist/types-e8f81bbc";



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
      (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*1)
      + (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*1)
      + (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*1)
      */

      (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*1)
      + (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*1)
      + (((barBreakfastFat ? barBreakfastFat : 0) + (barLunchFat ? barLunchFat : 0) + (barDinnerFat ? barDinnerFat : 0) + (barSnackFat ? barSnackFat : 0) + (barMidnightSnackFat ? barMidnightSnackFat : 0))*1)



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

      
      //height : (barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!)*1 + "px"
      
      height : (barBreakfastCarbohydrate! + barLunchCarbohydrate! + barDinnerCarbohydrate! + barSnackCarbohydrate! + barMidnightSnackCarbohydrate!)*1 + "px"


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
      
      
      //////height : (barBreakfastProtein! + barLunchProtein! + barDinnerProtein! + barSnackProtein! + barMidnightSnackProtein!)*1 + "px"

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
      
      ///height : (barBreakfastFat! + barLunchFat! + barDinnerFat! + barSnackFat! + barMidnightSnackFat!)*1 + "px"

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



  // style={{height: (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*1).toString() + "px"}}

  //console.log("barTotalCarbohydrate height =====",
  //  (((barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) + (barLunchCarbohydrate ? barLunchCarbohydrate : 0) + (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) + (barSnackCarbohydrate ? barSnackCarbohydrate : 0) + (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0))*1).toString() + "px"
  //);

  // style={{height: (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*1).toString() + "px"}}



  //console.log("barTotalProtein height =====",
  //  (((barBreakfastProtein ? barBreakfastProtein : 0) + (barLunchProtein ? barLunchProtein : 0) + (barDinnerProtein ? barDinnerProtein : 0) + (barSnackProtein ? barSnackProtein : 0) + (barMidnightSnackProtein ? barMidnightSnackProtein : 0))*1).toString() + "px"
  //);





  /*
    (
    barBreakfastCarbohydrate &&
    Math.round(barBreakfastCarbohydrate / (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!) * 200) > 0
    && Math.round(barBreakfastCarbohydrate / (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!) * 200)
  ) + "px"
  */


  // Math.round(barBreakfastCarbohydrate / (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!)


  const [barBreakfastCarbohydrateBy10, setBarBreakfastCarbohydrateBy10] = useState(0);
  const [barBreakfastProteinBy10, setBarBreakfastProteinBy10] = useState(0);
  const [barBreakfastFatBy10, setBarBreakfastFatBy10] = useState(0);

  const [barLunchCarbohydrateBy10, setBarLunchCarbohydrateBy10] = useState(0);
  const [barLunchProteinBy10, setBarLunchProteinBy10] = useState(0);
  const [barLunchFatBy10, setBarLunchFatBy10] = useState(0);

  const [barDinnerCarbohydrateBy10, setBarDinnerCarbohydrateBy10] = useState(0);
  const [barDinnerProteinBy10, setBarDinnerProteinBy10] = useState(0);
  const [barDinnerFatBy10, setBarDinnerFatBy10] = useState(0);

  const [barSnackCarbohydrateBy10, setBarSnackCarbohydrateBy10] = useState(0);
  const [barSnackProteinBy10, setBarSnackProteinBy10] = useState(0);
  const [barSnackFatBy10, setBarSnackFatBy10] = useState(0);

  const [barMidnightSnackCarbohydrateBy10, setBarMidnightSnackCarbohydrateBy10] = useState(0);
  const [barMidnightSnackProteinBy10, setBarMidnightSnackProteinBy10] = useState(0);
  const [barMidnightSnackFatBy10, setBarMidnightSnackFatBy10] = useState(0);


  const [barTotalCarbohydrateBy10, setBarTotalCarbohydrateBy10] = useState(0);
  const [barTotalProteinBy10, setBarTotalProteinBy10] = useState(0);
  const [barTotalFatBy10, setBarTotalFatBy10] = useState(0);



  useEffect(() => {

    let barBreakfastCarbohydrateBy10 = 0;
    let barBreakfastProteinBy10 = 0;
    let barBreakfastFatBy10 = 0;

    if (barBreakfastCarbohydrate && barBreakfastCarbohydrate > 0) {
      
      barBreakfastCarbohydrateBy10 =  Math.round(barBreakfastCarbohydrate! / (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!) * 10)
      
    }

    if (barBreakfastProtein && barBreakfastProtein > 0) {
      
      barBreakfastProteinBy10 = Math.round(barBreakfastProtein! / (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!) * 10)
      
    }

    if (barBreakfastFat && barBreakfastFat > 0) {
      
      barBreakfastFatBy10 = Math.round(barBreakfastFat! / (barBreakfastCarbohydrate! + barBreakfastProtein! + barBreakfastFat!) * 10)
      
    }

    if (barBreakfastCarbohydrateBy10 + barBreakfastProteinBy10 + barBreakfastFatBy10 > 10) {
      // find the max and then subtract 1 from it
      const max = Math.max(barBreakfastCarbohydrateBy10, barBreakfastProteinBy10, barBreakfastFatBy10);
      if (max === barBreakfastCarbohydrateBy10) {
        barBreakfastCarbohydrateBy10 -= 1;
      } else if (max === barBreakfastProteinBy10) {
        barBreakfastProteinBy10 -= 1;
      } else {
        barBreakfastFatBy10 -= 1;
      }
    }

    if (
      barBreakfastCarbohydrateBy10 + barBreakfastProteinBy10 + barBreakfastFatBy10 > 0 &&
      barBreakfastCarbohydrateBy10 + barBreakfastProteinBy10 + barBreakfastFatBy10 < 10
    ) {
      // find the min and then add 1 to it
      const min = Math.min(barBreakfastCarbohydrateBy10, barBreakfastProteinBy10, barBreakfastFatBy10);
      if (min === barBreakfastCarbohydrateBy10) {
        barBreakfastCarbohydrateBy10 += 1;
      } else if (min === barBreakfastProteinBy10) {
        barBreakfastProteinBy10 += 1;
      } else {
        barBreakfastFatBy10 += 1;
      }
    }

    setBarBreakfastCarbohydrateBy10(barBreakfastCarbohydrateBy10);
    setBarBreakfastProteinBy10(barBreakfastProteinBy10);
    setBarBreakfastFatBy10(barBreakfastFatBy10);




    let barLunchCarbohydrateBy10 = 0;
    let barLunchProteinBy10 = 0;
    let barLunchFatBy10 = 0;

    if (barLunchCarbohydrate && barLunchCarbohydrate > 0) {
      barLunchCarbohydrateBy10 = Math.round(barLunchCarbohydrate! / (barLunchCarbohydrate! + barLunchProtein! + barLunchFat!) * 10)
    }

    if (barLunchProtein && barLunchProtein > 0) {
      barLunchProteinBy10 = Math.round(barLunchProtein! / (barLunchCarbohydrate! + barLunchProtein! + barLunchFat!) * 10)
    }

    if (barLunchFat && barLunchFat > 0) {
      barLunchFatBy10 = Math.round(barLunchFat! / (barLunchCarbohydrate! + barLunchProtein! + barLunchFat!) * 10)
    }

    
    if (barLunchCarbohydrateBy10 + barLunchProteinBy10 + barLunchFatBy10 > 10) {      
      // find the max and then subtract 1 from it
      const max = Math.max(barLunchCarbohydrateBy10, barLunchProteinBy10, barLunchFatBy10);
      if (max === barLunchCarbohydrateBy10) {
        barLunchCarbohydrateBy10 -= 1;
      } else if (max === barLunchProteinBy10) {
        barLunchProteinBy10 -= 1;
      } else {
        barLunchFatBy10 -= 1;
      }
    }

    if (
      barLunchCarbohydrateBy10 + barLunchProteinBy10 + barLunchFatBy10 > 0 &&
      barLunchCarbohydrateBy10 + barLunchProteinBy10 + barLunchFatBy10 < 10
      ) {
      // find the min and then add 1 to it
      const min = Math.min(barLunchCarbohydrateBy10, barLunchProteinBy10, barLunchFatBy10);
      if (min === barLunchCarbohydrateBy10) {
        barLunchCarbohydrateBy10 += 1;
      } else if (min === barLunchProteinBy10) {
        barLunchProteinBy10 += 1;
      } else {
        barLunchFatBy10 += 1;
      }
    }



    


    setBarLunchCarbohydrateBy10(barLunchCarbohydrateBy10);
    setBarLunchProteinBy10(barLunchProteinBy10);
    setBarLunchFatBy10(barLunchFatBy10);



    let barDinnerCarbohydrateBy10 = 0;
    let barDinnerProteinBy10 = 0;
    let barDinnerFatBy10 = 0;


    if (barDinnerCarbohydrate && barDinnerCarbohydrate > 0) {
      barDinnerCarbohydrateBy10 = Math.round(barDinnerCarbohydrate! / (barDinnerCarbohydrate! + barDinnerProtein! + barDinnerFat!) * 10)
    }

    if (barDinnerProtein && barDinnerProtein > 0) {
      barDinnerProteinBy10 = Math.round(barDinnerProtein! / (barDinnerCarbohydrate! + barDinnerProtein! + barDinnerFat!) * 10)
    }

    if (barDinnerFat && barDinnerFat > 0) {
      barDinnerFatBy10 = Math.round(barDinnerFat! / (barDinnerCarbohydrate! + barDinnerProtein! + barDinnerFat!) * 10)
    }

    if (barDinnerCarbohydrateBy10 + barDinnerProteinBy10 + barDinnerFatBy10 > 10) {
      // find the max and then subtract 1 from it
      const max = Math.max(barDinnerCarbohydrateBy10, barDinnerProteinBy10, barDinnerFatBy10);
      if (max === barDinnerCarbohydrateBy10) {
        barDinnerCarbohydrateBy10 -= 1;
      } else if (max === barDinnerProteinBy10) {
        barDinnerProteinBy10 -= 1;
      } else {
        barDinnerFatBy10 -= 1;
      }
    }

    if (
      barDinnerCarbohydrateBy10 + barDinnerProteinBy10 + barDinnerFatBy10 > 0 &&
      barDinnerCarbohydrateBy10 + barDinnerProteinBy10 + barDinnerFatBy10 < 10
    ) {
      // find the min and then add 1 to it
      const min = Math.min(barDinnerCarbohydrateBy10, barDinnerProteinBy10, barDinnerFatBy10);
      if (min === barDinnerCarbohydrateBy10) {
        barDinnerCarbohydrateBy10 += 1;
      } else if (min === barDinnerProteinBy10) {
        barDinnerProteinBy10 += 1;
      } else {
        barDinnerFatBy10 += 1;
      }
    }


    setBarDinnerCarbohydrateBy10(barDinnerCarbohydrateBy10);
    setBarDinnerProteinBy10(barDinnerProteinBy10);
    setBarDinnerFatBy10(barDinnerFatBy10);




    let barSnackCarbohydrateBy10 = 0;
    let barSnackProteinBy10 = 0;
    let barSnackFatBy10 = 0;

    if (barSnackCarbohydrate && barSnackCarbohydrate > 0) {
      barSnackCarbohydrateBy10 = Math.round(barSnackCarbohydrate! / (barSnackCarbohydrate! + barSnackProtein! + barSnackFat!) * 10)
    }

    if (barSnackProtein && barSnackProtein > 0) {
      barSnackProteinBy10 = Math.round(barSnackProtein! / (barSnackCarbohydrate! + barSnackProtein! + barSnackFat!) * 10)
    }

    if (barSnackFat && barSnackFat > 0) {
      barSnackFatBy10 = Math.round(barSnackFat! / (barSnackCarbohydrate! + barSnackProtein! + barSnackFat!) * 10)
    }

    if (barSnackCarbohydrateBy10 + barSnackProteinBy10 + barSnackFatBy10 > 10) {
      // find the max and then subtract 1 from it
      const max = Math.max(barSnackCarbohydrateBy10, barSnackProteinBy10, barSnackFatBy10);
      if (max === barSnackCarbohydrateBy10) {
        barSnackCarbohydrateBy10 -= 1;
      } else if (max === barSnackProteinBy10) {
        barSnackProteinBy10 -= 1;
      } else {
        barSnackFatBy10 -= 1;
      }
    }

    if (
      barSnackCarbohydrateBy10 + barSnackProteinBy10 + barSnackFatBy10 > 0 &&
      barSnackCarbohydrateBy10 + barSnackProteinBy10 + barSnackFatBy10 < 10
    ) {
      // find the min and then add 1 to it
      const min = Math.min(barSnackCarbohydrateBy10, barSnackProteinBy10, barSnackFatBy10);
      if (min === barSnackCarbohydrateBy10) {
        barSnackCarbohydrateBy10 += 1;
      } else if (min === barSnackProteinBy10) {
        barSnackProteinBy10 += 1;
      } else {
        barSnackFatBy10 += 1;
      }
    }


    setBarSnackCarbohydrateBy10(barSnackCarbohydrateBy10);
    setBarSnackProteinBy10(barSnackProteinBy10);
    setBarSnackFatBy10(barSnackFatBy10);
    

  





    let barMidnightSnackCarbohydrateBy10 = 0;
    let barMidnightSnackProteinBy10 = 0;
    let barMidnightSnackFatBy10 = 0;

    if (barMidnightSnackCarbohydrate && barMidnightSnackCarbohydrate > 0) {
      barMidnightSnackCarbohydrateBy10 = Math.round(barMidnightSnackCarbohydrate! / (barMidnightSnackCarbohydrate! + barMidnightSnackProtein! + barMidnightSnackFat!) * 10)
    }

    if (barMidnightSnackProtein && barMidnightSnackProtein > 0) {
      barMidnightSnackProteinBy10 = Math.round(barMidnightSnackProtein! / (barMidnightSnackCarbohydrate! + barMidnightSnackProtein! + barMidnightSnackFat!) * 10)
    }

    if (barMidnightSnackFat && barMidnightSnackFat > 0) {
      barMidnightSnackFatBy10 = Math.round(barMidnightSnackFat! / (barMidnightSnackCarbohydrate! + barMidnightSnackProtein! + barMidnightSnackFat!) * 10)
    }

    if (barMidnightSnackCarbohydrateBy10 + barMidnightSnackProteinBy10 + barMidnightSnackFatBy10 > 10) {
      // find the max and then subtract 1 from it
      const max = Math.max(barMidnightSnackCarbohydrateBy10, barMidnightSnackProteinBy10, barMidnightSnackFatBy10);
      if (max === barMidnightSnackCarbohydrateBy10) {
        barMidnightSnackCarbohydrateBy10 -= 1;
      } else if (max === barMidnightSnackProteinBy10) {
        barMidnightSnackProteinBy10 -= 1;
      } else {
        barMidnightSnackFatBy10 -= 1;
      }
    }

    if (
      barMidnightSnackCarbohydrateBy10 + barMidnightSnackProteinBy10 + barMidnightSnackFatBy10 > 0 &&
      barMidnightSnackCarbohydrateBy10 + barMidnightSnackProteinBy10 + barMidnightSnackFatBy10 < 10
    ) {
      // find the min and then add 1 to it
      const min = Math.min(barMidnightSnackCarbohydrateBy10, barMidnightSnackProteinBy10, barMidnightSnackFatBy10);
      if (min === barMidnightSnackCarbohydrateBy10) {
        barMidnightSnackCarbohydrateBy10 += 1;
      } else if (min === barMidnightSnackProteinBy10) {
        barMidnightSnackProteinBy10 += 1;
      } else {
        barMidnightSnackFatBy10 += 1;
      }
    }


    setBarMidnightSnackCarbohydrateBy10(barMidnightSnackCarbohydrateBy10);
    setBarMidnightSnackProteinBy10(barMidnightSnackProteinBy10);
    setBarMidnightSnackFatBy10(barMidnightSnackFatBy10);





    let barTotalCarbohydrateBy10 = 0;
    let barTotalProteinBy10 = 0;
    let barTotalFatBy10 = 0;


    if (
      barBreakfastCarbohydrateBy10 + barLunchCarbohydrateBy10 + barDinnerCarbohydrateBy10 + barSnackCarbohydrateBy10 + barMidnightSnackCarbohydrateBy10 > 0
    ) {
      barTotalCarbohydrateBy10 = Math.round(
        (
          barBreakfastCarbohydrateBy10 + barLunchCarbohydrateBy10 + barDinnerCarbohydrateBy10 + barSnackCarbohydrateBy10 + barMidnightSnackCarbohydrateBy10
        ) / (
          barBreakfastCarbohydrateBy10 + barLunchCarbohydrateBy10 + barDinnerCarbohydrateBy10 + barSnackCarbohydrateBy10 + barMidnightSnackCarbohydrateBy10
          +
          barBreakfastProteinBy10 + barLunchProteinBy10 + barDinnerProteinBy10 + barSnackProteinBy10 + barMidnightSnackProteinBy10
          +
          barBreakfastFatBy10 + barLunchFatBy10 + barDinnerFatBy10 + barSnackFatBy10 + barMidnightSnackFatBy10
        ) * 10
      )
    }

    if (
      barBreakfastProteinBy10 + barLunchProteinBy10 + barDinnerProteinBy10 + barSnackProteinBy10 + barMidnightSnackProteinBy10 > 0
    ) {
      barTotalProteinBy10 = Math.round(
        (
          barBreakfastProteinBy10 + barLunchProteinBy10 + barDinnerProteinBy10 + barSnackProteinBy10 + barMidnightSnackProteinBy10
        ) / (
          barBreakfastCarbohydrateBy10 + barLunchCarbohydrateBy10 + barDinnerCarbohydrateBy10 + barSnackCarbohydrateBy10 + barMidnightSnackCarbohydrateBy10
          +
          barBreakfastProteinBy10 + barLunchProteinBy10 + barDinnerProteinBy10 + barSnackProteinBy10 + barMidnightSnackProteinBy10
          +
          barBreakfastFatBy10 + barLunchFatBy10 + barDinnerFatBy10 + barSnackFatBy10 + barMidnightSnackFatBy10
        ) * 10
      )
    }
    

    if (
      barBreakfastFatBy10 + barLunchFatBy10 + barDinnerFatBy10 + barSnackFatBy10 + barMidnightSnackFatBy10 > 0
    ) {
      barTotalFatBy10 = Math.round(
        (
          barBreakfastFatBy10 + barLunchFatBy10 + barDinnerFatBy10 + barSnackFatBy10 + barMidnightSnackFatBy10
        ) / (
          barBreakfastCarbohydrateBy10 + barLunchCarbohydrateBy10 + barDinnerCarbohydrateBy10 + barSnackCarbohydrateBy10 + barMidnightSnackCarbohydrateBy10
          +
          barBreakfastProteinBy10 + barLunchProteinBy10 + barDinnerProteinBy10 + barSnackProteinBy10 + barMidnightSnackProteinBy10
          +
          barBreakfastFatBy10 + barLunchFatBy10 + barDinnerFatBy10 + barSnackFatBy10 + barMidnightSnackFatBy10
        ) * 10
      )
    }


    if (barTotalCarbohydrateBy10 + barTotalProteinBy10 + barTotalFatBy10 > 10) {
      // find the max and then subtract 1 from it
      const max = Math.max(barTotalCarbohydrateBy10, barTotalProteinBy10, barTotalFatBy10);
      if (max === barTotalCarbohydrateBy10) {
        barTotalCarbohydrateBy10 -= 1;
      } else if (max === barTotalProteinBy10) {
        barTotalProteinBy10 -= 1;
      } else {
        barTotalFatBy10 -= 1;
      }
    }

    if (
      barTotalCarbohydrateBy10 + barTotalProteinBy10 + barTotalFatBy10 > 0 &&
      barTotalCarbohydrateBy10 + barTotalProteinBy10 + barTotalFatBy10 < 10
    ) {
      // find the min and then add 1 to it
      const min = Math.min(barTotalCarbohydrateBy10, barTotalProteinBy10, barTotalFatBy10);
      if (min === barTotalCarbohydrateBy10) {
        barTotalCarbohydrateBy10 += 1;
      } else if (min === barTotalProteinBy10) {
        barTotalProteinBy10 += 1;
      } else {
        barTotalFatBy10 += 1;
      }
    }

    setBarTotalCarbohydrateBy10(barTotalCarbohydrateBy10);
    setBarTotalProteinBy10(barTotalProteinBy10);
    setBarTotalFatBy10(barTotalFatBy10);






    /*
    setBarTotalCarbohydrateBy10(
      Math.round(
        (
          (barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) +
          (barLunchCarbohydrate ? barLunchCarbohydrate : 0) +
          (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) +
          (barSnackCarbohydrate ? barSnackCarbohydrate : 0) +
          (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0)
        ) / (
          (barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) +
          (barLunchCarbohydrate ? barLunchCarbohydrate : 0) +
          (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) +
          (barSnackCarbohydrate ? barSnackCarbohydrate : 0) +
          (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0)

          +
          (barBreakfastProtein ? barBreakfastProtein : 0) +
          (barLunchProtein ? barLunchProtein : 0) +
          (barDinnerProtein ? barDinnerProtein : 0) +
          (barSnackProtein ? barSnackProtein : 0) +
          (barMidnightSnackProtein ? barMidnightSnackProtein : 0)

          +
          (barBreakfastFat ? barBreakfastFat : 0) +
          (barLunchFat ? barLunchFat : 0) +
          (barDinnerFat ? barDinnerFat : 0) +
          (barSnackFat ? barSnackFat : 0) +
          (barMidnightSnackFat ? barMidnightSnackFat : 0)


        ) * 10
      )
    )
    


    setBarTotalProteinBy10(
      Math.round(
        (
          (barBreakfastProtein ? barBreakfastProtein : 0) +
          (barLunchProtein ? barLunchProtein : 0) +
          (barDinnerProtein ? barDinnerProtein : 0) +
          (barSnackProtein ? barSnackProtein : 0) +
          (barMidnightSnackProtein ? barMidnightSnackProtein : 0)
        ) / (
          (barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) +
          (barLunchCarbohydrate ? barLunchCarbohydrate : 0) +
          (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) +
          (barSnackCarbohydrate ? barSnackCarbohydrate : 0) +
          (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0)

          +
          (barBreakfastProtein ? barBreakfastProtein : 0) +
          (barLunchProtein ? barLunchProtein : 0) +
          (barDinnerProtein ? barDinnerProtein : 0) +
          (barSnackProtein ? barSnackProtein : 0) +
          (barMidnightSnackProtein ? barMidnightSnackProtein : 0)

          +
          (barBreakfastFat ? barBreakfastFat : 0) +
          (barLunchFat ? barLunchFat : 0) +
          (barDinnerFat ? barDinnerFat : 0) +
          (barSnackFat ? barSnackFat : 0) +
          (barMidnightSnackFat ? barMidnightSnackFat : 0)

        ) * 10
      )
    )

    setBarTotalFatBy10(
      Math.round(
        (
          (barBreakfastFat ? barBreakfastFat : 0) +
          (barLunchFat ? barLunchFat : 0) +
          (barDinnerFat ? barDinnerFat : 0) +
          (barSnackFat ? barSnackFat : 0) +
          (barMidnightSnackFat ? barMidnightSnackFat : 0)
        ) / (
          (barBreakfastCarbohydrate ? barBreakfastCarbohydrate : 0) +
          (barLunchCarbohydrate ? barLunchCarbohydrate : 0) +
          (barDinnerCarbohydrate ? barDinnerCarbohydrate : 0) +
          (barSnackCarbohydrate ? barSnackCarbohydrate : 0) +
          (barMidnightSnackCarbohydrate ? barMidnightSnackCarbohydrate : 0)

          +
          (barBreakfastProtein ? barBreakfastProtein : 0) +
          (barLunchProtein ? barLunchProtein : 0) +
          (barDinnerProtein ? barDinnerProtein : 0) +
          (barSnackProtein ? barSnackProtein : 0) +
          (barMidnightSnackProtein ? barMidnightSnackProtein : 0)

          +
          (barBreakfastFat ? barBreakfastFat : 0) +
          (barLunchFat ? barLunchFat : 0) +
          (barDinnerFat ? barDinnerFat : 0) +
          (barSnackFat ? barSnackFat : 0) +
          (barMidnightSnackFat ? barMidnightSnackFat : 0)

        ) * 10
      )
    )
    */






  }, [
    barBreakfastCarbohydrate, barBreakfastProtein, barBreakfastFat,
    , barLunchCarbohydrate, barLunchProtein, barLunchFat
    , barDinnerCarbohydrate, barDinnerProtein, barDinnerFat
    , barSnackCarbohydrate, barSnackProtein, barSnackFat
    , barMidnightSnackCarbohydrate, barMidnightSnackProtein, barMidnightSnackFat

  ]);


  /*
  console.log("barBreakfastCarbohydrateBy10====", barBreakfastCarbohydrateBy10);
  console.log("barBreakfastProteinBy10====", barBreakfastProteinBy10);
  console.log("barBreakfastFatBy10====", barBreakfastFatBy10);

  console.log("barLunchCarbohydrateBy10====", barLunchCarbohydrateBy10);
  console.log("barLunchProteinBy10====", barLunchProteinBy10);
  console.log("barLunchFatBy10====", barLunchFatBy10);

  console.log("barDinnerCarbohydrateBy10====", barDinnerCarbohydrateBy10);
  console.log("barDinnerProteinBy10====", barDinnerProteinBy10);
  console.log("barDinnerFatBy10====", barDinnerFatBy10);

  console.log("barSnackCarbohydrateBy10====", barSnackCarbohydrateBy10);
  console.log("barSnackProteinBy10====", barSnackProteinBy10);
  console.log("barSnackFatBy10====", barSnackFatBy10);

  console.log("barMidnightSnackCarbohydrateBy10====", barMidnightSnackCarbohydrateBy10);
  console.log("barMidnightSnackProteinBy10====", barMidnightSnackProteinBy10);
  console.log("barMidnightSnackFatBy10====", barMidnightSnackFatBy10);

  */




  return (


    <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-left text-base xl:text-xl text-dark font-menu-off">
      
      {/* barBreakfast carbohydrate, protein, fat */}
      <div className="self-stretch flex flex-row items-center justify-center gap-[8px]">

        <div className="ml-2 xl:ml-8 flex-1 relative font-extrabold" style={div13Style}>
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



        <div className=" ml-12 xl:ml-16 flex flex-row items-end justify-center pt-0 px-0  pb-[29px] xl:pb-[28px]">

        </div>




        <div className="self-stretch w-px flex flex-row items-end justify-end pt-0 px-0 pb-[28px] box-border">
          <div className="self-stretch border-r-[1px] border-solid border-grey-c" />
        </div>

        <div className=" flex-1 flex flex-col items-center justify-end">

          <div className=" self-stretch flex flex-row items-end justify-center">
            
            
            {/* Breakfast */}
            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px]">

              {/*
              <motion.div
                ref={refBreakfast}
                animate={controlsBreakfast}
                initial="hidden"
                variants={squareVariantsBreakfast}
              >
              */}

                <div className=" pl-4 flex flex-row items-end justify-center gap-[5px] h-[200px]">

                  
                  <div className={`flex flex-col items-center justify-end  `}>

                    

                    {barBreakfastCarbohydrateBy10 > 0 && (
                      <div className={`bg-skyblue w-[20px] `}
                        style={{
                          height:
                          (
                            barBreakfastCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barBreakfastProteinBy10 > 0 && (
                      <div className={`bg-lightcoral w-[20px] `}
                        style={{
                          height:
                          (
                            barBreakfastProteinBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}
                    
                    {barBreakfastFatBy10 > 0 && (
                      <div className={`bg-burlywood w-[20px] `}
                        style={{
                          height:
                          (
                            barBreakfastFatBy10 * 20
                          ) + "px"  
                        }}
                      />
                    )}
                    
                  </div>


                  <div className={`flex flex-col items-center justify-end  `}>

                    {barBreakfastCarbohydrateBy10 > 0 && (
                      <div className={` w-[10px]  flex items-center justify-center `}
                        style={{
                          height: 
                          (
                            barBreakfastCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barBreakfastCarbohydrateBy10
                        }
                      </div>
                    )}
                    


                    {barBreakfastProteinBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barBreakfastProteinBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barBreakfastProteinBy10
                        }
                      </div>
                    )}

                    {barBreakfastFatBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barBreakfastFatBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barBreakfastFatBy10
                        }
                      </div>
                    )}
                  
                  </div>


                </div>


            </div>




            {/* Lunch */}
            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">


                <div className="pl-4 flex-1 flex flex-row items-end justify-center gap-[5px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end `}>

                    

                    {barLunchCarbohydrateBy10 > 0 && (
                      <div className={` bg-skyblue w-[20px]  `}
                        style={{
                          height:
                          (
                            barLunchCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}
                    
                    {barLunchProteinBy10 > 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{
                          height:
                          (
                            barLunchProteinBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barLunchFatBy10 > 0 && (
                      <div className={` bg-burlywood w-[20px]`}
                        style={{
                          height:
                          (
                            barLunchFatBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                  </div>



                  <div className={`flex flex-col items-center justify-end  `}>

                    {barLunchCarbohydrateBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barLunchCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barLunchCarbohydrateBy10
                        }
                      </div>
                    )}

                    {barLunchProteinBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barLunchProteinBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barLunchProteinBy10
                        }
                      </div>
                    )}

                    {barLunchFatBy10 > 0 && (
                      <div className={` w-[10px]  flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barLunchFatBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barLunchFatBy10
                        }
                      </div>
                    )}

                  </div>

                </div>

            </div>




            {/* Dinner */}

            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">


                <div className="pl-4 flex-1 flex flex-row items-end justify-center gap-[5px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    {barDinnerCarbohydrateBy10 > 0 && (
                      <div className={` bg-skyblue w-[20px]  `}
                        style={{
                          height:
                          (
                            barDinnerCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barDinnerProteinBy10 > 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{
                          height:
                          (
                            barDinnerProteinBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barDinnerFatBy10 > 0 && (
                      <div className={` bg-burlywood w-[20px]  `}
                        style={{
                          height:
                          (
                            barDinnerFatBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}
                    
                  </div>


                  <div className={`flex flex-col items-center justify-end  `}>

                    {barDinnerCarbohydrateBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barDinnerCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barDinnerCarbohydrateBy10
                        }
                      </div>
                    )}

                    {barDinnerProteinBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barDinnerProteinBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barDinnerProteinBy10
                        }
                      </div>
                    )}

                    {barDinnerFatBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barDinnerFatBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barDinnerFatBy10
                        }
                      </div>
                    )}

                  
                  </div>

                </div>

            </div>




            {/* Snack */}
            <div className="flex-1 flex flex-row items-center justify-center gap-[4px] h-[200px] ">

                <div className="pl-4 flex-1 flex flex-row items-end justify-center gap-[5px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    
                    {barSnackCarbohydrateBy10 > 0 && (
                      <div className={` bg-skyblue w-[20px]  `}
                        style={{
                          height:
                          (
                            barSnackCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barSnackProteinBy10 > 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{
                          height:
                          (
                            barSnackProteinBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barSnackFatBy10 > 0 && (
                      <div className={` bg-burlywood w-[20px]  `}
                        style={{
                          height:
                          (
                            barSnackFatBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                  </div>




                  <div className={`flex flex-col items-center justify-end  `}>

                    {barSnackCarbohydrateBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barSnackCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barSnackCarbohydrateBy10
                        }
                      </div>
                    )}

                    {barSnackProteinBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barSnackProteinBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barSnackProteinBy10
                        }
                      </div>
                    )}

                    {barSnackFatBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barSnackFatBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barSnackFatBy10
                        }
                      </div>
                    )}

                  </div>

                </div>

            </div>





            {/* MidnightSnack */}
            <div className="flex-1 flex flex-row items-end justify-center gap-[4px] h-[200px] ">

              <div className="pl-4 flex-1 flex flex-row items-end justify-center gap-[5px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    
                    {barMidnightSnackCarbohydrateBy10 > 0 && (
                      <div className={` bg-skyblue w-[20px]  `}
                        style={{
                          height:
                          (
                            barMidnightSnackCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barMidnightSnackProteinBy10 > 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{
                          height:
                          (
                            barMidnightSnackProteinBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barMidnightSnackFatBy10 > 0 && (
                      <div className={` bg-burlywood w-[20px]  `}
                        style={{
                          height:
                          (
                            barMidnightSnackFatBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                  </div>

             
                  <div className={`flex flex-col items-center justify-end  `}>

                    {barMidnightSnackCarbohydrateBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barMidnightSnackCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barMidnightSnackCarbohydrateBy10
                        }
                      </div>
                    )}

                    {barMidnightSnackProteinBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barMidnightSnackProteinBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barMidnightSnackProteinBy10
                        }
                      </div>
                    )}

                    {barMidnightSnackFatBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barMidnightSnackFatBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barMidnightSnackFatBy10
                        }
                      </div>
                    )}

                  
                  </div>

                </div>

              {/*
              </motion.div>
              */}
              

            </div>




            {/* Total */}
            <div className="flex-1 flex flex-row items-end justify-center gap-[4px] h-[200px] ">

              <div className="pl-4 flex-1 flex flex-row items-end justify-center gap-[5px] h-[200px]">

                  <div className={`flex flex-col items-center justify-end  `}>

                    {barTotalCarbohydrateBy10 > 0 && (
                      <div className={` bg-skyblue w-[20px]  `}
                        style={{
                          height:
                          (
                            barTotalCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barTotalProteinBy10 > 0 && (
                      <div className={` bg-lightcoral w-[20px]  `}
                        style={{
                          height:
                          (
                            barTotalProteinBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                    {barTotalFatBy10 > 0 && (
                      <div className={` bg-burlywood w-[20px]  `}
                        style={{
                          height:
                          (
                            barTotalFatBy10 * 20
                          ) + "px"
                        }}
                      />
                    )}

                  </div>

                  <div className={`flex flex-col items-center justify-end  `}>

                    {barTotalCarbohydrateBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barTotalCarbohydrateBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barTotalCarbohydrateBy10
                        }
                      </div>
                    )}

                    {barTotalProteinBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barTotalProteinBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barTotalProteinBy10
                        }
                      </div>
                    )}

                    {barTotalFatBy10 > 0 && (
                      <div className={` w-[10px] flex items-center justify-center `}
                        style={{
                          height:
                          (
                            barTotalFatBy10 * 20
                          ) + "px"
                        }}
                      >
                        {
                          barTotalFatBy10
                        }
                      </div>
                    )}

                  </div>

              </div>

            </div>








            {/*
            <div className="flex-1 flex flex-row items-center justify-center gap-[5px] "
              style={{
                height: "200px"
              }}       
            >

              <div className=" pl-7 flex flex-col items-center justify-end">


                <motion.div
                  ref={refTotalCarbohydrate}
                  animate={controlsTotalCarbohydrate}
                  initial="hidden"
                  variants={squareVariantsTotalCarbohydrate}
                >
                  
                  <div className="flex flex-row items-center justify-center gap-[4px] ">
                    <div className={`relative bg-skyblue w-5`}
                      style={{
                        height:
                        (
                          barTotalCarbohydrateBy10 * 20
                        ) + "px"
                      }}
                    
                    />

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
                      style={{
                        height:
                        (
                          barTotalProteinBy10 * 20
                        ) + "px"
                      }} 
                    />
                      
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
                      style={{
                        height:
                        (
                          barTotalFatBy10 * 20
                        ) + "px"
                      }}
                    />

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
    
                    <div className=" w-5">

                      {
                        barTotalCarbohydrateBy10 > 0 && (
                          barTotalCarbohydrateBy10
                        )
                      }

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
                    
                   
                      
                    <div className=" w-5 ">

                      {
                        barTotalProteinBy10 > 0 && (
                          barTotalProteinBy10
                        )
                      }
                    
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
                    
                    <div className=" w-5">

                      {
                        barTotalFatBy10 > 0 && (
                          barTotalFatBy10
                        )
                      }
                    
                      
                    </div>
                    

                  </div>
                </motion.div>

              </div>




            </div>

            */}


          </div>

          
          <div className=" self-stretch flex flex-row items-start justify-center pt-2 px-0 pb-0 text-xs border-t-[1px] border-solid border-grey-c">
            
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
