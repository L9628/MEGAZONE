import axios from "axios";
import { useState } from "react";

function Charge() {
  const [chargeInfo, setChargeInfo] = useState({
    companyId: "",
    chargeAmount: 0,
  });
  const handleInputValue = (key) => (e) => {
    setChargeInfo({ [key]: e.target.value });
  };
  const handleOnCharge = () => {
    // axios
    //   .post("/charge", chargeInfo, {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   })
    //   .then(() => {
    //     window.location.href = "/";
    // window.alert("충전이 완료되었습니다!");
    //   });
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>충전 하기</h1>
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

export default Charge;
