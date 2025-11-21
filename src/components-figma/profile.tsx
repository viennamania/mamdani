import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

import Image from "next/image";

type ProfileType = {
  /** Style props */
  profileIconPosition?: CSSProperties["position"];
};

const Profile: NextPage<ProfileType> = ({ profileIconPosition }) => {
  const profileIconStyle: CSSProperties = useMemo(() => {
    return {
      position: profileIconPosition,
    };
  }, [profileIconPosition]);

  return (
    <Image
      width="24"
      height="72"
      className="w-24 h-[72px]"
      alt=""
      src="/usermain/images/profile.svg"
      style={profileIconStyle}
    />
  );
};

export default Profile;
