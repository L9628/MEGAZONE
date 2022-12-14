import axios from "axios";
import React, { useState, useEffect } from "react";

function Charge({ companyInfo }) {
  const [chargeInfo, setChargeInfo] = useState({
    companyId: "",
    lastUpdated: "",
    cashChargedDate: 0,
    cashChargedAmount: 0,
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
    setChargeInfo({ [key]: e.target.value });
  };
  const [refresh, setRefresh] = useState(true);
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
        setHistory({
          companyId: data.companyId,
          currentCoin: data.currentCoin,
          currentCash: data.currentCash,
          currentBonus: data.currentBonus,
          lastUpdated: data.lastUpdated,
          cashChargedDate: data.cashChargedDate,
          cashChargedAmount: 0,
          bonusChargedDate: data.bonusChargedDate,
          bonusChargedAmount: data.bonusChargedAmount,
          coinDeducted: 0,
          serviceName: "",
          coinDeductedDate: data.coinDeductedDate,
          deductionResult: "",
        });
      });
  }, [refresh]);

  const handleOnCharge = () => {
    setRefresh(!refresh);
    if (chargeInfo.cashChargedAmount < 100)
      window.alert("????????? 100?????? ?????? ?????? ???????????????");
    else {
      if (history.lastUpdated === "") {
        axios
          .post(
            process.env.REACT_APP_SERVER_URL + "/histories",
            {
              companyId: companyInfo.companyId,
              currentCoin:
                Number(history.currentCoin) +
                Number(chargeInfo.cashChargedAmount) +
                200,
              currentCash:
                Number(history.currentCash) +
                Number(chargeInfo.cashChargedAmount),
              currentBonus: Number(history.currentBonus) + 200,
              lastUpdated: dateStr + " " + timeStr,
              cashChargedDate: dateStr + " " + timeStr,
              cashChargedAmount: Number(chargeInfo.cashChargedAmount),
              bonusChargedDate: dateStr + " " + timeStr,
              bonusChargedAmount: 200,
              coinDeducted: history.coinDeducted,
              serviceName: history.serviceName,
              coinDeductedDate: history.coinDeductedDate,
              deductionResult: history.deductionResult,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then(() => {
            window.alert("????????? ?????????????????????!");
          });
      } else {
        axios
          .post(
            process.env.REACT_APP_SERVER_URL + "/histories",
            {
              companyId: companyInfo.companyId,
              currentCoin:
                Number(history.currentCoin) +
                Number(chargeInfo.cashChargedAmount),
              currentCash:
                Number(history.currentCash) +
                Number(chargeInfo.cashChargedAmount),
              currentBonus: history.currentBonus,
              lastUpdated: dateStr + " " + timeStr,
              cashChargedDate: dateStr + " " + timeStr,
              cashChargedAmount: Number(chargeInfo.cashChargedAmount),
              bonusChargedDate: history.bonusChargedDate,
              bonusChargedAmount: history.bonusChargedAmount,
              coinDeducted: history.coinDeducted,
              serviceName: history.serviceName,
              coinDeductedDate: history.coinDeductedDate,
              deductionResult: history.deductionResult,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then(() => {
            window.alert("????????? ?????????????????????!");
          });
      }
    }
  };

  // server => client ??? ????????? ???????????? client?????? ???????????? server??? ????????? ????????????
  //! client?????? ?????? ??????, server?????? ?????? ??? ???????????? ???????????? client??? ????????? ?????? setState

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>?????? ??????</h2>
        <input
          type="cashChargedAmount"
          placeholder="???????????? ??????"
          onChange={handleInputValue("cashChargedAmount")}
        ></input>
        <button type="submit" onClick={handleOnCharge}>
          ??????
        </button>
      </form>
    </>
  );
}

export default Charge;
