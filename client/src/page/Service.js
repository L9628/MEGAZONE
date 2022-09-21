import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    // companyId: state.companyId,
  };
};
function Service({ companyId }) {
  const [service, setService] = useState([]);
  useEffect(() => {
    axios
      .get("/services", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setService(res.data);
      });
  }, []);

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const timeStr = hours + ":" + minutes + ":" + seconds;

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
  const [purchaseInfo, setPurchaseInfo] = useState({
    companyId: "",
    lastUpdated: "",
    coinDeducted: 0,
    serviceName: "",
    coinDeductedDate: "",
    deductionResult: "",
  });
  const handleOnUse = (name, price) => {
    setPurchaseInfo((prevState) => ({
      ...prevState,
      coinDeducted: price,
      serviceName: name,
      coinDeductedDate: dateStr + " " + timeStr,
      deductionResult: "success",
    }));
    axios
      .get("/histories/t", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data[res.data.length - 1]);
        const data = res.data[res.data.length - 1];
        setHistory((prevState) => {
          let curState = { ...prevState };
          // curState.companyId = data.companyId;
          // curState.currentCoin = data.currentCoin;
          // curState.currentCash = data.currentCash;
          // curState.currentBonus = data.currentBonus;
          // curState.lastUpdated = data.lastUpdated;
          // curState.cashChargedDate = data.cashChargedDate;
          // curState.cashChargedAmount = data.cashChargedAmount;
          // curState.bonusChargedDate = data.bonusChargedDate;
          // curState.bonusChargedAmount = data.bonusChargedAmount;
          // curState.coinDeducted = data.coinDeducted;
          // curState.serviceName = data.serviceName;
          // curState.coinDeductedDate = data.coinDeductedDate;
          // curState.deductionResult = data.deductionResult;
        });
        console.log(history);
      });
    axios
      .post("/purchase", purchaseInfo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        window.location.href = "/";
        // window.alert("서비스 구매가 완료되었습니다!");
      });
  };
  return (
    <>
      <h1>서비스 가격 정책 및 이용</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">서비스 이름</th>
            <th scope="col">차감 코인</th>
          </tr>
        </thead>
        <tbody>
          {service.map((service) => (
            <tr>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <button onClick={handleOnUse(service.name, service.price)}>
                이용하기
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default connect(mapStateToProps)(Service);
