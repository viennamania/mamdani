const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const doc = {
  info: {
    title: "두잉두잇 API",
    description: "두잉두잇 API 문서입니다.",
  },
  host: "http://localhost:3000",
  schemes: ["http"],
  // schemes: ["https" ,"http"],
};

const outputFile = "./swagger-output.json";	// 같은 위치에 swagger-output.json을 만든다.
const endpointsFiles = [
  //"../app.js"					// 라우터가 명시된 곳을 지정해준다.

  ///"../src/app/(hydrogen)/_app.tsx",

  ///location of router

    

    "../src/app/(hydrogen)/_app.tsx",


];

swaggerAutogen(outputFile, endpointsFiles, doc);