import type { NextPage } from "next";

type ContainerNoPrescriptionOrDiseaType = {
  medicalHistoryQuestion?: string;
};

const ContainerNoPrescriptionOrDisea: NextPage<
  ContainerNoPrescriptionOrDiseaType
> = ({ medicalHistoryQuestion }) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-[8px] text-left text-sm text-dark font-menu-off">
      <div className="self-stretch relative leading-[20px] font-extrabold">
        {medicalHistoryQuestion}
      </div>
      <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">
        <div className="flex flex-row items-center justify-center gap-[8px]">
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/radio-button-checked.svg"
          />
          <div className="relative">예</div>
        </div>
        <div className="flex flex-row items-center justify-center gap-[8px]">
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0"
            alt=""
            src="/usermain/images/radio-button-unchecked.svg"
          />
          <div className="relative">아니오</div>
        </div>
      </div>
    </div>
  );
};

export default ContainerNoPrescriptionOrDisea;
