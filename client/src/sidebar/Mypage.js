import React, { useState } from "react";
import axios from "axios";
import Charge from "./Charge";
import Purchase from "./Purchase";

function Mypage({ companyInfo, handleLogout }) {
  const { companyName } = companyInfo;

  const [isCharge, setIsCharge] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);

  const handleCharge = () => {
    setIsCharge(!isCharge);
  };
  const handlePurchase = () => {
    setIsPurchase(!isPurchase);
  };
  return (
    <div>
      <div>{"Welcome! " + companyName}</div>
      <div>
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
        <div>
          <button className="charge-btn" onClick={handleCharge}>
            캐시 충전
          </button>
        </div>
        <div>
          <button className="purchase-btn" onClick={handlePurchase}>
            서비스 구매
          </button>
        </div>
        <div>{isCharge ? <Charge companyInfo={companyInfo} /> : null}</div>
        <div>{isPurchase ? <Purchase companyInfo={companyInfo} /> : null}</div>
      </div>
    </div>
  );
}
export default Mypage;
