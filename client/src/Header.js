import React from "react";
import logo from "./data/logo.jpg";
const Header = () => {
  return (
    <header>
      <img src={logo} id="logo" alt="이미지가 없을 때 나오는 대체 텍스트" />
    </header>
  );
};
export default Header;
