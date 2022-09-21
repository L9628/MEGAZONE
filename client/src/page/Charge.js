import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    // companyId: state.companyId,
  };
};

function Charge({ companyId }) {
  console.log(companyId);
  const [chargeInfo, setChargeInfo] = useState({
    companyId: companyId,
    lastUpdated: "",
    cashChargedDate: 0,
    cashChargedAmount: 0,
  });
  const handleInputValue = (key) => (e) => {
    setChargeInfo({ [key]: e.target.value });
  };
  const handleOnCharge = () => {
    axios
      .post("/histories", chargeInfo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        window.location.href = "/";
        window.alert("충전이 완료되었습니다!");
      });
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>캐시 충전</h1>
        <input
          type="chargeAmount"
          placeholder="충전하실 금액"
          onChange={handleInputValue("chargeAmount")}
        ></input>
        <button type="submit" onClick={handleOnCharge}>
          충전
        </button>
      </form>
    </>
  );
}

export default connect(mapStateToProps)(Charge);
