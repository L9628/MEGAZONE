import axios from "axios";
import React, { useEffect, useState } from "react";

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
      .get(
        process.env.REACT_APP_SERVER_URL +
          "/histories/" +
          companyInfo.companyId,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
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
          cashChargedAmount: 0,
          bonusChargedDate: data.bonusChargedDate,
          bonusChargedAmount: 0,
          coinDeducted: data.coinDeducted,
          serviceName: "",
          coinDeductedDate: data.coinDeductedDate,
          deductionResult: "",
        });
      });
  }, []);
  const handleOnPurchase = () => {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          "/services/" +
          purchaseInfo.serviceName,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (!res.data[0]) window.alert("????????? ????????? ????????? ??????????????????");
        else if (history.currentCoin === 0)
          window.alert("????????? ???????????????. ??????????????????");
        else {
          const coinDeducted = res.data[0].price;
          axios
            .post(
              process.env.REACT_APP_SERVER_URL + "/histories",
              {
                companyId: history.companyId,
                currentCoin: Number(history.currentCoin) + Number(coinDeducted),
                currentCash: Number(history.currentCash) + Number(coinDeducted),
                currentBonus: history.currentBonus,
                lastUpdated: dateStr + " " + timeStr,
                cashChargedDate: history.cashChargedDate,
                cashChargedAmount: history.cashChargedAmount,
                bonusChargedDate: history.bonusChargedDate,
                bonusChargedAmount: history.bonusChargedAmount,
                coinDeducted: Number(coinDeducted),
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
              window.alert("????????? ????????? ?????????????????????!");
            });
        }
      });
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>????????? ??????</h2>
        <input
          type="serviceName"
          placeholder="???????????? ?????????"
          onChange={handleInputValue("serviceName")}
        ></input>
        <button type="submit" onClick={handleOnPurchase}>
          ??????
        </button>
      </form>
    </>
  );
}

export default Purchase;
