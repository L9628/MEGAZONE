import React from "react";
import { Link } from "react-router-dom";
import logo from "./data/logo.jpg";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} id="logo" alt="이미지가 없을 때 나오는 대체 텍스트" />
      </Link>
    </header>
  );
};
export default Header;
