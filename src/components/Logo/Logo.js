import React from "react";
import Link from "next/link";
import imgLogo from "../../assets/ILogomid.png";

import imgL1Logo from "../../assets/image/logo-main-black.png";
import imgL1LogoWhite from "../../assets/image/logo-main-white.png";

const Logo = ({ white, height, className = "", ...rest }) => {
  return (
      <a className={`d-block ${className}`} {...rest}>
        {white ? (
          <img src={imgL1LogoWhite} alt="" />
        ) : (
          <img src={imgLogo} alt="" style={{ height: "40px" }} />
        )}
      </a>
  );
};

export default Logo;
