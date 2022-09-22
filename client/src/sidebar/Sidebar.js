import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import Mypage from "./Mypage";
function Sidebar() {
  const [isLogin, setIsLogin] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    companyId: "",
    password: "",
    companyName: "",
    email: "",
  });
  const handleLoginSuccess = (res) => {
    setCompanyInfo(res);
    setIsLogin(true);
    console.log("성공적으로 로그인 되셨습니다!");
  };
  const handleLogout = () => {
    axios
      .get("/auth/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        setCompanyInfo({
          companyId: "",
          password: "",
          companyName: "",
          email: "",
        });
        setIsLogin(false);
        window.location.href = "/";
      });
    console.log("성공적으로 로그아웃 되셨습니다!");
  };
  return (
    <div>
      <div className="login">
        {isLogin ? (
          <Mypage companyInfo={companyInfo} handleLogout={handleLogout} />
        ) : (
          <Login
            isLogin={isLogin}
            setCompanyInfo={setCompanyInfo}
            handleLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </div>
  );
}
export default Sidebar;
