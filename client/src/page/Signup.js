import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [companyInfo, setCompanyInfo] = useState({
    companyId: "",
    password: "",
    passwordCheck: "",
    companyName: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleInputValue = (key) => (e) => {
    setCompanyInfo({ ...companyInfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    const { companyId, password, passwordCheck, companyName, email } =
      companyInfo;
    console.log(companyInfo);
    if (!companyId || !password || !passwordCheck || !companyName || !email) {
      setErrMsg("모든 항목이 필수입니다.");
    } else if (password !== passwordCheck) {
      setErrMsg("비밀번호가 다릅니다.");
    } else {
      axios
        .post(
          "/auth/signup",
          {
            companyId: companyId,
            companyName: companyName,
            password: password,
            email: email,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(() => {
          window.location.href = "/";
          window.alert("회원가입이 완료되었습니다!");
        });
    }
  };
  return (
    <div>
      <form className="signup" onSubmit={(e) => e.preventDefault()}>
        <h1>회원가입</h1>
        <div>모든 항목은 필수입니다.</div>
        <div>
          <div>CompanyID</div>
          <input
            type="text"
            placeholder="Company ID"
            onChange={handleInputValue("companyId")}
          ></input>
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            placeholder="Password"
            onChange={handleInputValue("password")}
          ></input>
        </div>
        <div>
          <div>Password 확인</div>
          <input
            type="password"
            placeholder="Password"
            onChange={handleInputValue("passwordCheck")}
          ></input>
        </div>
        <div>
          <div>Company Name</div>
          <input
            type="text"
            placeholder="Company Name"
            onChange={handleInputValue("companyName")}
          ></input>
        </div>
        <div>
          <div>E-mail</div>
          <input
            type="email"
            placeholder="E-mail"
            onChange={handleInputValue("email")}
          ></input>
        </div>
        <div className="alert-box">{errMsg}</div>
        <button className="signup-btn" type="submit" onClick={handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
}
export default Signup;
