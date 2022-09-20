import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ companyInfo, setCompanyInfo, handleLoginSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    companyId: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    const { companyId, password } = loginInfo;
    if (!companyId || !password) {
      setErrMsg("Company ID와 password를 입력해주세요.");
    } else {
      axios
        .post("http://localhost:5000/company/login", loginInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          handleLoginSuccess(res);
        });
    }
  };
  return (
    <div className="login_style">
      <div>MEGAZONE 로그인</div>
      <div>
        <input
          placeholder="companyId"
          type="string"
          onChange={handleInputValue("companyId")}
        />
      </div>
      <div>
        <input
          placeholder="password"
          type="password"
          onChange={handleInputValue("password")}
        />
      </div>
      <div>
        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
      <div className="alert-box">{errMsg}</div>
    </div>
  );
}
export default Login;
