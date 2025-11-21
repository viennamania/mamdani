import type { NextPage } from "next";

const FormContainer5: NextPage = () => {
  return (
    <div className="relative w-[300px] h-[300px] text-center text-29xl text-dark font-jalnan">
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-input-bg" />

      <div className="mt-10  flex flex-col items-center justify-end gap-[20px]">
        
        <img
          className="relative w-[86.9px] h-40 overflow-hidden shrink-0"
          alt=""
          src="/usermain/images/frame-survey.svg"
        />

        <div className="relative text-17xl ">INFP</div>
      </div>

    </div>
  );
};

export default FormContainer5;
