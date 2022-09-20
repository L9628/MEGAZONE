import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Mypage from "./Mypage";
function Sidebar() {
  const [isLogin, setIsLogin] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    companyId: "",
    password: "",
    compnayName: "",
    email: "",
  });
  const history = useHistory();
  const isAuth = (res) => {
    setIsLogin(true);
    console.log("isLogin ?? :: ", isLogin);
    console.log("성공적으로 로그인 되셨습니다!");
  };
  const handleLoginSuccess = () => {
    isAuth();
  };
  const handleLogout = () => {
    // axios.post('http://localhost:8080/user/logOut').then(() => {
    //   setUserInfo(null);
    //   setIsLogin(false);
    //   history.push('/');
    // });
    // setUserInfo(null);
    setIsLogin(false);
    history.push("/");
    console.log("성공적으로 로그아웃 되셨습니다!");
  };
  // useEffect(() => {
  //   isAuth();
  // }, []);
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
