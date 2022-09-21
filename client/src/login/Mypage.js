import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Mypage({ companyInfo, handleLogout }) {
  const { companyName } = companyInfo;
  const handleChargeCash = () => {
    axios.post("http://localhost:5000/histories", {}).then(() => {});
  };
  const handleUseService = () => {};
  return (
    <div>
      <div>{"Welcome! " + companyName}</div>
      <div>
        <button classname="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
        <div>
          <Link to="/charge">
            <button>캐시 충전</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
