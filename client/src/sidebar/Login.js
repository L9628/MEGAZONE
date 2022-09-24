import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ handleLoginSuccess }) {
  const [companyId, setCompanyId] = useState({
    companyId: "",
  });
  const [password, setPassword] = useState({
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleCompanyId = (key) => (e) => {
    setCompanyId({ ...companyId, [key]: e.target.value });
  };
  const handlePassword = (key) => (e) => {
    setPassword({ ...password, [key]: e.target.value });
  };
  const handleLogin = () => {
    const loginInfo = { ...companyId, ...password };
    if (!companyId || !password) {
      setErrMsg("Company ID와 password를 입력해주세요.");
    } else {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/auth/login", loginInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          handleLoginSuccess(res.data.data);
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
          onChange={handleCompanyId("companyId")}
        />
      </div>
      <div>
        <input
          placeholder="password"
          type="password"
          onChange={handlePassword("password")}
        />
      </div>
      <div>
        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
      <div className="signup">
        <Link to="/signup">
          <button>회원 가입</button>
        </Link>
      </div>
      <div className="alert-box">{errMsg}</div>
    </div>
  );
}
export default Login;
