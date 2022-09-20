import React from "react";
import { Link } from "react-router-dom";

function Mypage({ companyInfo, handleLogout }) {
  const { companyName } = companyInfo;
  return (
    <div>
      <div>{"Welcome! " + companyName}</div>
      <div>
        <button classname="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
export default Mypage;
