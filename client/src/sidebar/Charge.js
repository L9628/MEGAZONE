import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    // companyId: state.companyId,
  };
};

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
      .get("/histories/" + companyInfo.companyId, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
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
      window.alert("금액은 100이상 부터 충전 가능합니다");
    else {
      if (history.lastUpdated === "") {
        axios
          .post(
            "/histories",
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
            window.alert("충전이 완료되었습니다!");
          });
      } else {
        axios
          .post(
            "/histories",
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
            window.alert("충전이 완료되었습니다!");
          });
      }
    }
  };

  // server => client 로 데이터 넘겨줘서 client에서 계산해서 server로 넘기는 형식인데
  //! client에서 충전 하면, server에서 계산 다 한다음에 결과값을 client로 넘겨서 그걸 setState

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>캐시 충전</h2>
        <input
          type="cashChargedAmount"
          placeholder="충전하실 금액"
          onChange={handleInputValue("cashChargedAmount")}
        ></input>
        <button type="submit" onClick={handleOnCharge}>
          충전
        </button>
      </form>
    </>
  );
}

export default connect(mapStateToProps)(Charge);
