import type { NextPage } from "next";

///import Frame22 from "./frame22";
import Prog from "./prog";
import List4 from "./list4";
import BtnBigOn from "./btn-big-on";

import Bread from "./bread";


import Link from "next/link";

import Image from "next/image";

import { useMemo, type CSSProperties, useState, useEffect, use } from "react";

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


import { el, ne } from "@faker-js/faker";

import { useRouter } from "next/navigation";
import { set } from "lodash";

import { useSession, signIn, signOut } from 'next-auth/react';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';




type ContainerType = {
  menuNumber?: string;
  mealDiaryStyleLunchCancel?: string;
  mealDiaryPrompt?: string;
  mealDiaryContent?: string;
  mealDiaryStepMealDiaryQue?: string;

  /** Style props */
  propAlignItems?: CSSProperties["alignItems"];
  propJustifyContent?: CSSProperties["justifyContent"];
  propAlignItems1?: CSSProperties["alignItems"];
  propJustifyContent1?: CSSProperties["justifyContent"];

  //setPreviousQuestion?: any;

};




const Container: NextPage<ContainerType> = ({
  menuNumber,
  mealDiaryStyleLunchCancel,
  mealDiaryPrompt,
  mealDiaryContent,
  mealDiaryStepMealDiaryQue,
  propAlignItems,
  propJustifyContent,
  propAlignItems1,
  propJustifyContent1,

  //setPreviousQuestion,


}) => {



  const frameDiv8Style: CSSProperties = useMemo(() => {
    return {
      alignItems: propAlignItems,
      justifyContent: propJustifyContent,
    };
  }, [propAlignItems, propJustifyContent]);

  const frameDiv9Style: CSSProperties = useMemo(() => {
    return {
      alignItems: propAlignItems1,
      justifyContent: propJustifyContent1,
    };
  }, [propAlignItems1, propJustifyContent1]);






  const { data: session, status } = useSession();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userId, setUserId] = useState(session?.user?.id);
  const [userEmail, setUserEmail] = useState(session?.user?.email);
  const [userName, setUserName] = useState(session?.user?.name);
  const [userNickname, setUserNickname] = useState('');
  const [userAvatar, setUserAvatar] = useState(session?.user?.image);




  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/doingdoit/user/getUserByEmail?_email=${session?.user?.email}`);

      if (res.status === 404) {
        return;
      }

      const json = await res?.json();



      //////console.log(json);

      const data = json as any;
      
      if (data?.data) {

        setUserNickname(data.data?.nickname);
        setUserId(data.data?.id);

        ///setFeedEmail(data.data?.email);

    
        

      } else {
        //alert(json.message);
      }
    };
    fetchData();
  } , [session?.user?.email]);









  //const question1 = "평소 밥 먹는 스타일은?";
  //const question1 = "토요일 날 친구들과 점심, 디저트, 저녁까지 온 종일 함께 시간을 보내고 집에 돌아왔다. 당신의 상태는?";

  const question1 = "처음 와본 식당에서 무엇을 먹을 지 고민 중이다. 당신의 선택은?";

  const activityDescription1 = "메뉴판에 'BEST', '추천'이 써있는 식당의 시그니처 메뉴를 주문한다.";
  const activityDescription2 = "메뉴판을 둘러보다가 마음이 끌리는 메뉴를 주문한다.";

  //const activityDescription1 = "건강을 위해 매일 현미밥이나 잡곡밥을 챙겨 먹는다.";
  //const activityDescription2 = "건강을 위해 자주 현미밥이나 잡곡밥을 챙겨 먹는다.";
  //const activityDescription3 = "가끔 현미밥이나 잡곡밥을 먹는 편. 주로 쌀밥을 먹는다.";
  //const activityDescription4 = "밥은 자고로 뽀얀 흰 쌀밥이지! 삼시세끼 쌀밥만 먹는다.";


  const question2 = "평소 고지방 육류(삼겹살, 갈비, 곱창 등)를 먹는 스타일은?";
  const question3 = "평소 야채나 채소를 먹는 스타일은?";
  const question4 = "평소 빵, 케이크, 과자, 초콜릿 등 간식 먹는 스타일은?";
  const question5 = "평소 음주 스타일은?";
  const question6 = "평소 야식 스타일은?";


  //const activityDescription1 = "앗.. 이틀째 식단일지 기록을 깜빡했네. 내가 어제 먹었던 내용을 자동으로 적어줬으면…";
  //const activityDescription2 ="매일 먹은 식단이 시간대별로 꼼꼼하게 적혀있다. 미리 먹을 식단도 적을 수 있었으면..";


  const showFa6SolidcheckIcon1 = true;
  const showFa6SolidcheckIcon2 = false;

  const questionArray = [

    "평소 밥 먹는 스타일은?",

    "평소 고지방 육류(삼겹살, 갈비, 곱창 등)를 먹는 스타일은?",

    "평소 야채나 채소를 먹는 스타일은?",

    "평소 빵, 케이크, 과자, 초콜릿 등 간식 먹는 스타일은?",

    "평소 음주 스타일은?",

    "평소 야식 스타일은?",

    "처음 와본 식당에서 무엇을 먹을 지 고민 중이다. 당신의 선택은?",
    "얼굴만 알고 지내던 옆옆팀 사람들과 같이 밥을 먹게 되었다. 당신의 반응은?",
    "건강을 위해 식단관리를 시작했다. 점심은 주로 회사에서 먹는 편. 당신의 선택은?",

    "친구가 주말에 다녀온 디저트 가게에서 인생 디저트를 만났다고 한다. 당신의 반응은?",

    "토요일 날 친구들과 점심, 디저트, 저녁까지 온 종일 함께 시간을 보내고 집에 돌아왔다. 당신의 상태는?",

    "난생 처음으로 탕후루를 먹어보았다. 당신의 반응은?",

    "바디 프로필 촬영을 위해 식단을 관리 중이다. 친구가 연인과 헤어졌다고 술 한잔하자고 한다. 당신의 선택은?",

    "먹방 예능 '맛있는녀석들'에 평소 자주가던 화덕피자 가게가 나왔다. 당신의 반응은?",

    "친구가 '민트초코떡볶이'가 출시되었다고 같이 먹으러 가자고 한다. 당신의 반응은?",

    "여행지에서 식당을 고르는 중이다. 당신의 반응은?",
  ];



  
  const [nextQuestionNumber, setNextQuestionNumber] = useState(-1);




  // 
  const answerArray = [

    {
      A: '건강을 위해 매일 현미밥이나 잡곡밥을 챙겨 먹는다.',

      B: '건강을 위해 자주 현미밥이나 잡곡밥을 챙겨 먹는다.',

      C: '가끔 현미밥이나 잡곡밥을 먹는 편. 주로 쌀밥을 먹는다.',

      D: '밥은 자고로 뽀얀 흰 쌀밥이지! 삼시세끼 쌀밥만 먹는다.',
    },

    {
      A: '고기는 별로. 거의 안 먹는다.',
      B: '생각날 때면 가끔 먹는다. (주 1-2회)',
      C: '자주 먹는다. (주 3회-5회)',
      D: '없어서 못 먹는다. 거의 매일 먹는다. (주 6회 이상)',

    },

    {
      A: '야채와 채소는 사랑입니다. 매일 먹는다. (주 6회 이상)',
      B: '건강을 위해 자주 먹으려 노력한다. (주 3회-5회)',
      C: '눈에 보이거나 생각날 때면 가끔 먹는다. (주 1-2회)',
      D: '야채나 채소는 별로. 거의 안 먹는다. ',
    },

    {
      A: '간식은 별로. 거의 안 먹는다.',
      B: '입이 심심할때면 가끔 먹는다. (주 1-2회)',
      C: '당 충전이 필요하다. 자주 먹는다. (주 3회-5회)',
      D: '밥과 간식은 세트지. 거의 매일 먹는다. (주 6회 이상)',
    },

    {
      A: '술은 별로. 거의 안 먹는다.',
      B: '가끔 먹는다. (주 1-2회)',
      C: '자주 먹는다. (주 3회-5회)',
      D: '거의 매일 먹는다. (주 6회 이상)',
    },

    {
      A: '야식도, 술도 거의 먹지 않는다.',
      B: '야식은 먹지만 술은 먹지 않는다.',
      C: '야식만 먹기도 하고 술과 함께 먹기도 한다.',
      D: '야식에는 술이 빠질 수 없지! 야식과 술을 꼭 함께 먹는다.',
    },







    {
      A: '메뉴판에 \'BEST\', \'추천\'이 써있는 식당의 시그니처 메뉴를 주문한다.',
      B: '메뉴판을 둘러보다가 마음이 끌리는 메뉴를 주문한다.',
      
    },

    {
      A: '지금 하는 일이 무엇인지, 예전에 했던 일이 무엇인지 물어본다.',
      B: '취미가 무엇인지, 회사 생활은 어떤지 물어본다.',
    },

    {
      A: '점심 먹기 전, 미리 메뉴를 확인하고 가장 영양성분이 좋은 메뉴를 미리 골라둔다.',
      B: '식당에 가서 메뉴판 이미지를 둘러본 후 가장 건강해보이는 메뉴를 고른다.',
    },

    {
      A: '인생 디저트를 맛보다니! 진짜 행복했겠다!',
      B: '가게 이름이 뭐야? 뭐 먹었는데?',
    },

    {
      A: '즐거웠지만 뭔가 피곤하다. 내일은 집에서 쉬어야지.',
      B: '즐겁고 알찬 하루였다. 내일은 누구랑 어디로 가볼까?',
    },

    {
      A: '요즘 학생들은 이런 맛을 좋아하는군! 내가 탕후루 가게 사장님이라면 어떤 메뉴를 추가할 지 생각해본다.',
      B: '탕후루는 이런 맛이구나! 내가 생각했던 탕후루 맛과 어떤 차이가 있는지 생각해본다.',
    },

    {
      A: '바프보다 친구지! 오늘은 치팅데이! 친구의 기분이 풀릴 수 있도록 즐겁게 마신다.',
      B: '3달 동안 준비한 바프다. 미안하지만 술 약속은 거절한다.',
    },

    {
      A: '어떤 메뉴를 먹어봤을까? 반응은 좋았을까? 방송 내용이 궁금하다.',
      B: '역시! 나의 안목이란! 괜히 기분이 좋고 뿌듯하다.',
    },

    {
      A: '와우! 곧 민트초코라면이랑 민트초코피자도 출시되겠는데?',
      B: '너 먹어본 적 있어? 무슨 맛이래? 맛있대? ',
    },

    {
      A: '여행 떠나기 전 미리 동선에 따라 식당 리스트를 찾아본다.',
      B: '그날 이동 동선에 따라 1시간이나 30분 전에 찾아본다.',
    }

  ];

  // 16 items array
  const [selection, setSelection] = useState([
    ////'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A','A','A','A'

    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',

  ]);
  



  const router = useRouter();






  const [widthBar, setWidthBar] = useState("0%");
  //const [textBar, setTextBar] = useState("");

  useEffect(() => {
    nextQuestionNumber === 0 && setWidthBar("6.25%");
    nextQuestionNumber === 1 && setWidthBar("12.5%");
    nextQuestionNumber === 2 && setWidthBar("18.75%");
    nextQuestionNumber === 3 && setWidthBar("25%");
    nextQuestionNumber === 4 && setWidthBar("31.25%");
    nextQuestionNumber === 5 && setWidthBar("37.5%");
    nextQuestionNumber === 6 && setWidthBar("43.75%");
    nextQuestionNumber === 7 && setWidthBar("50%");
    nextQuestionNumber === 8 && setWidthBar("56.25%");
    nextQuestionNumber === 9 && setWidthBar("62.5%");
    nextQuestionNumber === 10 && setWidthBar("68.75%");
    nextQuestionNumber === 11 && setWidthBar("75%");
    nextQuestionNumber === 12 && setWidthBar("81.25%");
    nextQuestionNumber === 13 && setWidthBar("87.5%");
    nextQuestionNumber === 14 && setWidthBar("93.75%");
  } , [nextQuestionNumber]);

  const squareVariants = {
    ///visible: { width : "100%", transition: { duration: 1 } },
    visible: { width : widthBar, transition: { duration: 1 } },
    hidden: { width: 0 }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {

    console.log("widthBar", widthBar);
    console.log("inView", inView);


    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    } 
  }, [controls, inView, widthBar]);





  /* 슬라이딩 효과 */
  /* 일단 보류 */
  /*
  const squareVariantsQuestion = {
    visible: { x: 0, transition: { duration: 0.5 } },
    hidden: { x: 2000 }
  };
  */

  const squareVariantsQuestion = {
    visible: { x: 0, transition: { duration: 0.5 } },
    //hidden: { x: 2000 }
    hidden: { x: 0 }
  };



  const controlsQuestion = useAnimation();
  const [refQuestion, inViewQuestion] = useInView();

  useEffect(() => {

    console.log("nextQuestionNumber", nextQuestionNumber);
    console.log("inViewQuestion", inViewQuestion);



    if (nextQuestionNumber === -1) {
      setNextQuestionNumber(0);

      controlsQuestion.start("visible");
    }


    

    /*

    if (inViewQuestion ) {
      controlsQuestion.start("visible");
    } else {
      controlsQuestion.start("hidden");
    }
    */

    
    /*
    if (nextQuestionNumber === 0) {
        
      if (inView ) {
        controlsQuestion.start("visible");
      } else {
        controlsQuestion.start("hidden");
      }

    }
    */


    /*    
    if (inViewQuestion) {
      controlsQuestion.start("visible");
    } else {
      controlsQuestion.start("hidden");
    }  
    */
    
  
   //controlsQuestion.start("visible");
   /*
   if (nextQuestionNumber === 0) {
    controlsQuestion.start("visible");
   } 
   */


   //controlsQuestion.start("visible");

   /*
   if (nextQuestionNumber === 0) {
    controlsQuestion.start("visible");
   }
    */





  }, [controlsQuestion, inView, inViewQuestion, nextQuestionNumber]);




  ///const setNextQuestion = async () => {
  const setNextQuestion = async (
    selectionParam: string[],
  ) => {

    if (nextQuestionNumber === 15) {

      //const selectionArray = selection;
      const selectionArray = selectionParam;

      let nutrition = '';

      let mbti = ['', '', '', '']; // I N T P

      let characterCode = '';


      let aaa = 0;

      if (selectionArray[0] === 'A') {
        aaa = aaa + 3;
      } else if (selectionArray[0] === 'B') {
        aaa = aaa + 2;
      } else if (selectionArray[0] === 'C') {
        aaa = aaa + 1;
      } else if (selectionArray[0] === 'D') {
        aaa = aaa + 0;
      }

      if (selectionArray[1] === 'A') {
        aaa = aaa + 3;
      } else if (selectionArray[1] === 'B') {
        aaa = aaa + 2;
      } else if (selectionArray[1] === 'C') {
        aaa = aaa + 1;
      } else if (selectionArray[1] === 'D') {
        aaa = aaa + 0;
      }

      if (selectionArray[2] === 'A') {
        aaa = aaa + 3;
      } else if (selectionArray[2] === 'B') {
        aaa = aaa + 2;
      } else if (selectionArray[2] === 'C') {
        aaa = aaa + 1;
      } else if (selectionArray[2] === 'D') {
        aaa = aaa + 0;
      }

      if (selectionArray[3] === 'A') {
        aaa = aaa + 3;
      } else if (selectionArray[3] === 'B') {
        aaa = aaa + 2;
      } else if (selectionArray[3] === 'C') {
        aaa = aaa + 1;
      } else if (selectionArray[3] === 'D') {
        aaa = aaa + 0;
      }


      if (selectionArray[4] === 'A') {
        aaa = aaa + 3;
      } else if (selectionArray[4] === 'B') {
        aaa = aaa + 2;
      } else if (selectionArray[4] === 'C') {
        aaa = aaa + 1;
      } else if (selectionArray[4] === 'D') {
        aaa = aaa + 0;
      }

      if (selectionArray[5] === 'A') {
        aaa = aaa + 3;
      } else if (selectionArray[5] === 'B') {
        aaa = aaa + 2;
      } else if (selectionArray[5] === 'C') {
        aaa = aaa + 1;
      } else if (selectionArray[5] === 'D') {
        aaa = aaa + 0;
      }

      if (aaa <= 5) {
        nutrition ='low';
      } else if (aaa <= 12) {
        nutrition = 'middle';
      } else {
        nutrition = 'high';
      }



      

      if (selectionArray[6] === 'A') { //Q1=> 'S' or 'N'
        mbti[1] = 'S'; // I N T P

      } else {
        mbti[1] = 'N';
      }

      if (selectionArray[7] === 'A') { //Q2=> 'T' or 'F'
        mbti[2] = 'T';
      } else {
        mbti[2] = 'F';
      }

      if (selectionArray[8] === 'A') { //Q3=> 'J' or 'P'
        mbti[3] = 'J';
      } else {
        mbti[3] = 'P';
      }

      if (selectionArray[9] === 'A') { //Q4=> 'F' or 'T'
        //mbti[2] = 'F';
      } else {
        //mbti[2] = 'T';
      }

      if (selectionArray[10] === 'A') { //Q5=> 'I' or 'E'
        mbti[0] = 'I';
      } else {
        mbti[0] = 'E';
      }

      if (selectionArray[11] === 'A') { //Q6=> 'N' or 'S'
        //mbti[1] = 'N';
      } else {
        //mbti[1] = 'S';
      }

      if (selectionArray[12] === 'A') { //Q7=> 'P' or 'J'
        //mbti[3] = 'P';
      } else {
        //mbti[3] = 'J';
      }

      if (selectionArray[13] === 'A') { //Q8=> 'T' or 'F'
        //mbti[2] = 'T';
      } else {
        //mbti[2] = 'F';
      }

      if (selectionArray[14] === 'A') { //Q9=> 'N' or 'S'
        //mbti[1] = 'N';
      } else {
        //mbti[1] = 'S';
      }

      if (selectionArray[15] === 'A') { //Q10=> 'J' or 'P'
        //mbti[3] = 'J';
      } else {
        //mbti[3] = 'P';
      }

     

      //ISTJ, ISFJ, ESTJ, ESFJ => SJ
      //ISTP, ISFP, ESTP, ESFP => SP
      //INTP, INTJ, ENTP, ENTJ => NT
      //INFP, INFJ, ENFP, ENFJ => NF

      if (
        (mbti[0] === 'I' && mbti[1] === 'S' && mbti[2] === 'T' && mbti[3] === 'J')
      || (mbti[0] === 'I' && mbti[1] === 'S' && mbti[2] === 'F' && mbti[3] === 'J')
      || (mbti[0] === 'E' && mbti[1] === 'S' && mbti[2] === 'T' && mbti[3] === 'J')
      || (mbti[0] === 'E' && mbti[1] === 'S' && mbti[2] === 'F' && mbti[3] === 'J')

      ) {
        characterCode = 'SJ';
      } else if (
        (mbti[0] === 'I' && mbti[1] === 'S' && mbti[2] === 'T' && mbti[3] === 'P') 
      || (mbti[0] === 'I' && mbti[1] === 'S' && mbti[2] === 'F' && mbti[3] === 'P')
      || (mbti[0] === 'E' && mbti[1] === 'S' && mbti[2] === 'T' && mbti[3] === 'P')
      || (mbti[0] === 'E' && mbti[1] === 'S' && mbti[2] === 'F' && mbti[3] === 'P')

      ) {
        characterCode = 'SP';

      } else if (
        (mbti[0] === 'I' && mbti[1] === 'N' && mbti[2] === 'T' && mbti[3] === 'P')
      || (mbti[0] === 'I' && mbti[1] === 'N' && mbti[2] === 'T' && mbti[3] === 'J')
      || (mbti[0] === 'E' && mbti[1] === 'N' && mbti[2] === 'T' && mbti[3] === 'P')
      || (mbti[0] === 'E' && mbti[1] === 'N' && mbti[2] === 'T' && mbti[3] === 'J')

      ) {
        characterCode = 'NT';
      } else  if (
        (mbti[0] === 'I' && mbti[1] === 'N' && mbti[2] === 'F' && mbti[3] === 'P')
      || (mbti[0] === 'I' && mbti[1] === 'N' && mbti[2] === 'F' && mbti[3] === 'J')
      || (mbti[0] === 'E' && mbti[1] === 'N' && mbti[2] === 'F' && mbti[3] === 'P')
      || (mbti[0] === 'E' && mbti[1] === 'N' && mbti[2] === 'F' && mbti[3] === 'J')

      ) {
        characterCode = 'NF';
      }



      const characterArray = [
        {
          code: 'SJ',
          name: '주도면밀한 먹개미',
          hashtag: ['전통주의자', '프로꾸준러', '예약선호자', '단골식당러버',],
          description: '먹는 것에 대한 관심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다.',
          activity: '메뉴판에 \'BEST\', \'추천\'이 써있는 식당의 시그니처 메뉴를 주문한다.',
        },
        {
          code: 'SP',
          name: '통통튀는 우주대먹스타',
          hashtag: ['활동주의자', '재미추구자', '프로적응러', '미각탐험가',],
          description: '먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다.',
          activity: '메뉴판을 둘러보다가 마음이 끌리는 메뉴를 주문한다.',
        },
        {
          code: 'NT',
          name: '척척박사 먹박사',
          hashtag: ['합리주의자', '지식추구자', '프로질문러', '미식탐구자'],
          'description': '먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다.',
          'activity': '메뉴판을 둘러보다가 마음이 끌리는 메뉴를 주문한다.',
        },
        {
          code: 'NF',
          name: '성장중독 먹요정',
          hashtag: ['이상주의자', '의미추구자', '프로성장러', '미식탐구자',],
          description: '먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다.',
          activity: '메뉴판을 둘러보다가 마음이 끌리는 메뉴를 주문한다.',
        },
      ];


      /*
      let character = characterArray.map((v, i) => {
        if (v.code === characterCode) {
          return v;
        }
      });
      */

      const character = characterArray.filter((v, i) => {
        if (v.code === characterCode) {
          return v;
        }
      } );

 
      console.log("character", character);


      //const profileCharacter = "주도면밀한 먹개미";
      //const profileDescription = "먹는 것에 대한 관심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다. 먹는 것에 대한 호기심이 많고, 먹는 것을 좋아한다.";




      // register survey result to db
      // api call
      // 
      
      /*
      const surveyResult = {
        questionArray: questionArray,
        answerArray: answerArray,
        selection: selection,

        nutrition: nutrition,
        mbti: mbti,

        character: character,
      };
      */


      const surveyResult = {
        questionArray: questionArray,
        
        answerArray: answerArray,

        optionsArray: answerArray,

        selection: selection,

        selectionArray: selectionArray,

        nutrition: nutrition,
        mbti: mbti,

        character: character,
      };



      
      try {


  
        // json post parameter
        const param = {
          userId: userId,
          email: userEmail,
          name: userName,
          nickname: userNickname,
          avatar: userAvatar,
  
          surveyResult: surveyResult,
        };

        ///console.log("survey registerOneJson param", param);

  
        const res = await fetch(`/api/doingdoit/survey/registerOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param),
        });
  
  
        if (res.status === 200) {
  
          const json = await res?.json();
  
          if (json === undefined) {
            //alert("이메일이 이미 존재합니다.");
            return;
          } else {
  
            const data = json as any;


            console.log("survey registerOneJson data", data);


        
            if (data)  {
              ///window.location.href = "/";
  
              ///window.location.href = `/usermain/user/profile-edit/${email}  `;
              ////window.location.href = `/usermain/feeds/write2/${data?.data?.id}  `;

              

              /////router.push(`/usermain/survey/result?selection=${selection}`);


              router.push(`/usermain/user/survey/result/${data?.data?.insertedId}`);
      
      


            } else {
              //alert(json.message);
            }    
  
          }
  
  
        } else {
          
          return;
        }
  
      } catch (error) {
        console.log(error);
        //setError(error);
      }
      


      

  
      


    } else {


     

      // set next question number after 1 second sleep
      //
      //await sleep(1000);

  
   


      controlsQuestion.start("hidden");
      
        
      

      
      setTimeout(() => {
        
        setNextQuestionNumber(nextQuestionNumber + 1);


          controlsQuestion.start("visible");
        


      }  , 1000);

    
  


    }
  };



  const setPreviousQuestion = () => {

    if (nextQuestionNumber === 0) {
      ///router.push("/usermain/survey/question1");
    } else {

      setNextQuestionNumber(nextQuestionNumber - 1);

    }
  };


  const list1Style1: CSSProperties = useMemo(() => {
    return {
      backgroundColor: "#fff",
      border: "",
    };
  }, []);

  const div9Style1: CSSProperties = useMemo(() => {
    return {
      color:  "#212121",
    };
  }, []);


  const list1Style2: CSSProperties = useMemo(() => {
    return {
      backgroundColor: "#f1f1f1",
      border: "unset",
    };
  }, []);

  const div9Style2: CSSProperties = useMemo(() => {
    return {
      color:  "#999",
    };
  }, []);






  // if user is not logged in, redirect to login page
  if (!session?.user?.email) {

    window.location.href = "/usermain/user/login";
    return <></>;
  }







  return (

    <div className="self-stretch flex flex-col items-center justify-end gap-[10px]   xl:gap-[40px]">


           
           
            <div
              className="self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-5 gap-[12px] z-[0] text-left text-sm text-dark font-menu-off border-b-[1px] border-solid border-grey-e"
            >

             

              <motion.div
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
              

                <button
                  type="button"
                  onClick={() => {
                    ///history.back();

                    //router.push(`/usermain/user/profile-edit/${router.query.id}`);

                    if (nextQuestionNumber === 0 ){
                      signOut(
                        {
                          callbackUrl: `${window.location.origin}/usermain/user/login`,
                        }
                      )
                    } else {
                      setPreviousQuestion();
                    }

                    
                  }}
                >

                  <div className="flex-1 flex flex-row items-center justify-start gap-[12px]">


                      <Image
                        width="24"
                        height="24"
                        className="relative w-6 h-6 overflow-hidden shrink-0"
                        alt=""
                        src="/usermain/images/back.svg"
                      />
                      <div className="relative">뒤로</div>

                  </div>

                </button>
              
              </motion.div>


              <Image
                width="24"
                height="24"
                className="relative w-6 h-6 overflow-hidden shrink-0 hidden"
                alt=""
                src="/usermain/images/x1.svg"
              />
            </div>

            





      <div className="self-stretch flex flex-col items-center justify-end gap-[20px] text-left text-sm text-grey-6 font-menu-off">

        <div className="self-stretch flex flex-col items-center justify-end gap-[8px]">
          <div className="self-stretch relative">Waht you sale, waht you are!</div>
          <div className="self-stretch relative text-lg xl:text-5xl font-extrabold text-dark">
            나의 투자습관을 알아보세요!
          </div>
        </div>

      </div>

      <div className="self-stretch flex flex-col items-center justify-end  text-left text-sm text-grey-6 font-menu-off">


        <div className="self-stretch flex flex-row items-center justify-end gap-[8px]">
          <div className="self-stretch relative">
            {nextQuestionNumber+1}/16
          </div>
      
        </div>
  

        <div className="w-full flex flex-row items-center justify-center  gap-2   ">

          {nextQuestionNumber !== 0 && (
            
            <button
              type="button"
              onClick={() => {
                setPreviousQuestion();
              }}
              className=" w-6 h-6 bg-orange rounded-full"
            >
              <AiOutlineLeft
                className="w-6 h-4 "
                style={{ color: "#ffffff" }}
              />
            </button>
            
          )}

          


          <div className=" w-full  rounded-81xl bg-grey-e h-3 flex  items-center justify-start ">

            <motion.div
              ref={ref}
              animate={controls}
              initial="hidden"
              variants={squareVariants}
              className={` rounded-81xl bg-orange w-[${widthBar}] h-3 `}
            />

            
            {/*
            {nextQuestionNumber === 0 && (
              <div className={` rounded-81xl bg-orange w-[6.25%] h-3 `} />
            )}

            {nextQuestionNumber === 1 && (
              <div className={` rounded-81xl bg-orange w-[12.5%] h-3 `} />
            )}

            {nextQuestionNumber === 2 && (
              <div className={` rounded-81xl bg-orange w-[18.75%] h-3 `} />
            )}

            {nextQuestionNumber === 3 && (
              <div className={` rounded-81xl bg-orange w-[25%] h-3 `} />
            )}

            {nextQuestionNumber === 4 && (
              <div className={` rounded-81xl bg-orange w-[31.25%] h-3 `} />
            )}

            {nextQuestionNumber === 5 && (
              <div className={` rounded-81xl bg-orange w-[37.5%] h-3 `} />
            )}

            {nextQuestionNumber === 6 && (
              <div className={`rounded-81xl bg-orange w-[43.75%] h-3 `} />
            )}

            {nextQuestionNumber === 7 && (
              <div className={` rounded-81xl bg-orange w-[50%] h-3 `} />
            )}

            {nextQuestionNumber === 8 && (
              <div className={` rounded-81xl bg-orange w-[56.25%] h-3 `} />
            )}

            {nextQuestionNumber === 9 && (
              <div className={` rounded-81xl bg-orange w-[62.5%] h-3 `} />
            )}

            {nextQuestionNumber === 10 && (
              <div className={` rounded-81xl bg-orange w-[68.75%] h-3 `} />
            )}

            {nextQuestionNumber === 11 && (
              <div className={` rounded-81xl bg-orange w-[75%] h-3 `} />
            )}

            {nextQuestionNumber === 12 && (
              <div className={` rounded-81xl bg-orange w-[81.25%] h-3 `} />
            )}

            {nextQuestionNumber === 13 && (
              <div className={` rounded-81xl bg-orange w-[87.5%] h-3 `} />
            )}

            {nextQuestionNumber === 14 && (
              <div className={` rounded-81xl bg-orange w-[93.75%] h-3 `} />
            )}

            {nextQuestionNumber === 15 && (
              <div className={` rounded-81xl bg-orange w-[100%] h-3 `} />
            )}
            */}

          </div>

            

        </div>

      </div>


      <div
        className="self-stretch flex flex-col items-center justify-end p-0 xl:p-10 gap-[40px]"
      >

        {/* motion.div
        right to left slide in
        */}


            
        <motion.div
          ref={refQuestion}
          ////ref={ref}
          animate={controlsQuestion}
          initial="hidden"
          variants={squareVariantsQuestion}
          className="w-full h-full"
        >
        
          <div className="self-stretch flex flex-row items-start justify-start gap-[12px]">
            
            <div className="rounded-81xl bg-background w-10 h-10 flex flex-col items-center justify-center">
              <div className="relative">{nextQuestionNumber+1}</div>
            </div>
            
              
            <div className="flex-1 relative text-lg xl:text-9xl  leading-[30px] xl:leading-[40px] text-left">
              {questionArray[nextQuestionNumber]}
            </div>

          </div>

        </motion.div>


        
        <div className="self-stretch flex flex-col items-center justify-end gap-[10px]   xl:gap-[20px]">


          {/*

            answerArray[nextQuestionNumber].A => '건강을 위해 매일 현미밥이나 잡곡밥을 챙겨 먹는다.' 
            answerArray[nextQuestionNumber].B => '건강을 위해 자주 현미밥이나 잡곡밥을 챙겨 먹는다.'
            answerArray[nextQuestionNumber].C => '가끔 현미밥이나 잡곡밥을 먹는 편. 주로 쌀밥을 먹는다.'
            answerArray[nextQuestionNumber].D => '밥은 자고로 뽀얀 흰 쌀밥이지! 삼시세끼 쌀밥만 먹는다.'

            answerArray[nextQuestionNumber].A => '고기는 별로. 거의 안 먹는다.'
            answerArray[nextQuestionNumber].B => '생각날 때면 가끔 먹는다. (주 1-2회)'
            answerArray[nextQuestionNumber].C => null
            answerArray[nextQuestionNumber].D => null



            selection[nextQuestionNumber]=> 'A' or 'B' or 'C' or 'D'

            ex) 

          
          */}



          { answerArray[nextQuestionNumber]?.A ? (

            selection[nextQuestionNumber] === "A" ? (

              <button
                type="button"
                onClick={() => {

                  const newSelection = [...selection];
                  newSelection[nextQuestionNumber] = "A";
                  setSelection(newSelection);

                  setNextQuestion(newSelection);

                  
                }}
              
                ///className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
                className="self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                
                
                //style={list1Style1}
                >
                <div
                  className="
                      xl:leading-[30px]
                    flex-1 relative font-extrabold
                  "
                  ///style={div9Style1}
                >
                  
                  {answerArray[nextQuestionNumber].A}
                </div>
                
                {showFa6SolidcheckIcon1 && (
                  <Image
                    width="24"
                    height="24"
                    className="relative w-[21px] h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/usermain/images/fa6solidcheck.svg"
                  />
                )}
  
              </button>
                      
          ) : (


            <motion.div
              ///className="box w-full"
              className="w-full"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <button
              type="button"
              onClick={() => {
                const newSelection = [...selection];
                newSelection[nextQuestionNumber] = "A";
                setSelection(newSelection);

                setNextQuestion( newSelection );


              }}

              // hover effect => 딤드 처리


            
              //className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
              className="
              w-full
              self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off
              "
                
              
              //style={list1Style2}

            

              >
              <div
                className="flex-1 relative font-extrabold "
                ///style={div9Style2}
              >
                
                {answerArray[nextQuestionNumber].A}
              </div>
              {showFa6SolidcheckIcon2 && (
                <Image
                  width="24"
                  height="24"
                  className="relative w-[21px] h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/fa6solidcheck.svg"
                />
              )}

            </button>
            </motion.div>
            
          ) ) : null }


          { answerArray[nextQuestionNumber]?.B ? (

            selection[nextQuestionNumber] === "B" ? (
              <button
              type="button"
              onClick={() => {
                const newSelection = [...selection];
                newSelection[nextQuestionNumber] = "B";
                setSelection(newSelection);

                setNextQuestion( newSelection );

              }}
            
              //className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
              className="self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                

              ///style={list1Style1}
              >
              <div
                className="flex-1 relative font-extrabold "
                //style={div9Style1}
              >
                
                {answerArray[nextQuestionNumber].B}
              </div>
              {showFa6SolidcheckIcon1 && (
                <Image
                  width="24"
                  height="24"
                  className="relative w-[21px] h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/fa6solidcheck.svg"
                />
              )}

            </button>
                      
          ) : (
            <motion.div
              ///className="box w-full"
              className="w-full"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <button
              type="button"
              onClick={() => {
                const newSelection = [...selection];
                newSelection[nextQuestionNumber] = "B";
                setSelection(newSelection);

                setNextQuestion( newSelection );

              }}
              
              //className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
              className="
              w-full
              self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                
              //style={list1Style2}
              >
              <div
                className="flex-1 relative font-extrabold "
                //style={div9Style2}
              >
                
                {answerArray[nextQuestionNumber].B}
              </div>
              {showFa6SolidcheckIcon2 && (
                <Image
                  width="24"
                  height="24"
                  className="relative w-[21px] h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/fa6solidcheck.svg"
                />
              )}

            </button>
            </motion.div>
            
            ) ) : null }


          { answerArray[nextQuestionNumber]?.C ? (

            selection[nextQuestionNumber] === "C" ? (
              <button
              type="button"
              onClick={() => {
                const newSelection = [...selection];
                newSelection[nextQuestionNumber] = "C";
                setSelection(newSelection);

                setNextQuestion( newSelection );

              }}
            
              //className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
              className="self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                
              //style={list1Style1}
              >
              <div
                className="flex-1 relative font-extrabold"
                ///style={div9Style1}
              >
                
                {answerArray[nextQuestionNumber].C}
              </div>
              {showFa6SolidcheckIcon1 && (
                <Image
                  width="24"
                  height="24"
                  className="relative w-[21px] h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/fa6solidcheck.svg"
                />
              )}

            </button>
                      
          ) : (

            <motion.div
              ///className="box w-full"
              className="w-full"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <button
            type="button"
            onClick={() => {
              const newSelection = [...selection];
              newSelection[nextQuestionNumber] = "C";
              setSelection(newSelection);

              setNextQuestion( newSelection );

            }}
          
            ///className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
            className="
            w-full
            self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                
            //style={list1Style2}
            >
            <div
              className="flex-1 relative font-extrabold"
              ///style={div9Style2}
            >
              
              {answerArray[nextQuestionNumber].C}
            </div>
            {showFa6SolidcheckIcon2 && (
              <Image
                width="24"
                height="24"
                className="relative w-[21px] h-6 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/fa6solidcheck.svg"
              />
            )}

          </button>
          </motion.div>
            
            ) ) : null }


          { answerArray[nextQuestionNumber]?.D ? (

            selection[nextQuestionNumber] === "D" ? (
              <button
              type="button"
              onClick={() => {
                const newSelection = [...selection];
                newSelection[nextQuestionNumber] = "D";
                setSelection(newSelection);

                setNextQuestion( newSelection );
              }}
            
              //className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
              className="self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                
              //style={list1Style1}
              >
              <div
                className="flex-1 relative font-extrabold"
                ///style={div9Style1}
              >
                
                {answerArray[nextQuestionNumber].D}
              </div>
              {showFa6SolidcheckIcon1 && (
                <Image
                  width="24"
                  height="24"
                  className="relative w-[21px] h-6 overflow-hidden shrink-0"
                  alt=""
                  src="/usermain/images/fa6solidcheck.svg"
                />
              )}

            </button>
                      
          ) : (
            <motion.div
              ///className="box w-full"
              className="w-full"
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
            <button
            type="button"
            onClick={() => {
              const newSelection = [...selection];
              newSelection[nextQuestionNumber] = "D";
              setSelection(newSelection);

              setNextQuestion( newSelection );
            }}
          
            //className="self-stretch rounded-81xl bg-white flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-xl text-dark font-menu-off border-[2px] border-solid border-dark"
            
            className="
            w-full
            self-stretch rounded-81xl bg-orange flex flex-row items-center justify-center py-6 px-10 gap-[10px] text-left text-base xl:text-xl text-white font-menu-off"
                
            //style={list1Style2}
            >
            <div
              className="flex-1 relative font-extrabold"
              ///style={div9Style2}
            >
              
              {answerArray[nextQuestionNumber].D}
            </div>
            {showFa6SolidcheckIcon2 && (
              <Image
                width="24"
                height="24"
                className="relative w-[21px] h-6 overflow-hidden shrink-0"
                alt=""
                src="/usermain/images/fa6solidcheck.svg"
              />
            )}

          </button>
          </motion.div>
            
            ) ) : null }









        </div>



      </div>


      {/*
      <div className="self-stretch grid grid-cols-2 items-center justify-center gap-[20px]">
        
        <button
          type="button"
          onClick={() => {
            setPreviousQuestion();
          }}
        >
          {nextQuestionNumber === 0 ? (
            <BtnBigOn
              prop="이전"
              btnBigOnWidth="100px xl:240px"
              btnBigOnBorderRadius="100px"
              btnBigOnAlignSelf="unset"
              btnBigOnBackgroundColor="#ccc"
              //btnBigOnHeight="56px"
            />
          ) : (
            <BtnBigOn
              prop="이전"
              btnBigOnWidth="100px xl:240px"
              btnBigOnBorderRadius="100px"
              btnBigOnAlignSelf="unset"
              btnBigOnBackgroundColor="#212121"
              //btnBigOnHeight="56px"
            />
          ) }
          
        
        </button>


        <button
          type="button"
          onClick={() => {
            setNextQuestion();
          }}
        >
        
          <BtnBigOn
            //prop="완료"
            prop={
              nextQuestionNumber === 15 ? "완료" : "다음"
            }
            btnBigOnWidth="100px xl:240px"
            btnBigOnBorderRadius="100px"
            btnBigOnAlignSelf="unset"
            btnBigOnBackgroundColor="#212121"
          />
        </button>
        
      </div>
      */}



    </div>




  );
};

export default Container;
