import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    // companyId: state.companyId,
  };
};

function Purchase({ companyInfo }) {
  const [purchaseInfo, setPurchaseInfo] = useState({
    companyId: "",
    lastUpdated: "",
    coinDeducted: 0,
    serviceName: "",
    coinDeductedDate: "",
    deductionResult: "",
  });

  const [history, setHistory] = useState({
    companyId: "",
    currentCoin: 0,
    currentCash: 0,
    currentBonus: 0,
    lastUpdated: "",
    cashChargedDate: "",
    cashChargedAmount: 0,
    bonusChargedDate: "",
    bonusChargedAmount: 0,
    coinDeducted: 0,
    serviceName: "",
    coinDeductedDate: "",
    deductionResult: "",
  });

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const timeStr = hours + ":" + minutes + ":" + seconds;

  const handleInputValue = (key) => (e) => {
    setPurchaseInfo({ [key]: e.target.value });
  };
  useEffect(() => {
    axios
      .get("/histories/" + companyInfo.companyId, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data[res.data.length - 1];
        console.log(data);
        setHistory({
          companyId: data.companyId,
          currentCoin: data.currentCoin,
          currentCash: data.currentCash,
          currentBonus: data.currentBonus,
          lastUpdated: data.lastUpdated,
          cashChargedDate: data.cashChargedDate,
          cashChargedAmount: data.cashChargedAmount,
          bonusChargedDate: data.bonusChargedDate,
          bonusChargedAmount: data.bonusChargedAmount,
          coinDeducted: data.coinDeducted,
          serviceName: data.serviceName,
          coinDeductedDate: data.coinDeductedDate,
          deductionResult: data.deductionResult,
        });
      });
  }, []);
  const handleOnPurchase = () => {
    axios
      .post(
        "/histories",
        {
          companyId: history.companyId,
          currentCoin:
            Number(history.currentCoin) -
            Number(purchaseInfo.cashChargedAmount),
          currentCash:
            Number(history.currentCash) -
            Number(purchaseInfo.cashChargedAmount),
          currentBonus: history.currentBonus,
          lastUpdated: dateStr + " " + timeStr,
          cashChargedDate: history.cashChargedDate,
          cashChargedAmount: history.cashChargedAmount,
          bonusChargedDate: history.bonusChargedDate,
          bonusChargedAmount: history.bonusChargedAmount,
          coinDeducted: Number(purchaseInfo.coinDeducted),
          serviceName: purchaseInfo.serviceName,
          coinDeductedDate: dateStr + " " + timeStr,
          deductionResult: "Success",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {
        window.alert("서비스 구매가 완료되었습니다!");
      });
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>서비스 구매</h2>
        <input
          type="serviceName"
          placeholder="사용하실 서비스"
          onChange={handleInputValue("serviceName")}
        ></input>
        <button type="submit" onClick={handleOnPurchase}>
          구매
        </button>
      </form>
    </>
  );
}

export default connect(mapStateToProps)(Purchase);
