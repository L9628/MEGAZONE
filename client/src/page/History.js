import axios from "axios";
import { useEffect, useState } from "react";

function History() {
  const [histories, setHistories] = useState([]);
  useEffect(() => {
    axios
      .get("/histories", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setHistories(res.data);
      });
  }, []);
  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const historyTable = (e) => {
    if (e === "") {
      let arr = [];
      for (let history of histories) {
        arr.push(
          <tr className="hisTbody">
            <td>{history.companyId}</td>
            <td>{history.currentCoin}</td>
            <td>{history.currentCash}</td>
            <td>{history.currentBonus}</td>
            <td>{history.lastUpdated}</td>
            <td>{history.cashChargedDate}</td>
            <td>{history.cashChargedAmount}</td>
            <td>{history.bonusChargedDate}</td>
            <td>{history.bonusChargedAmount}</td>
            <td>{history.coinDeducted}</td>
            <td>{history.serviceName}</td>
            <td>{history.coinDeductedDate}</td>
            <td>{history.deductionResult}</td>
          </tr>
        );
      }
      return arr;
    }
    let arr = [];
    let filteredHistoryTable = histories.filter((x) => x.companyId === e);
    for (let history of filteredHistoryTable) {
      arr.push(
        <tr className="hisTbody">
          <td>{history.companyId}</td>
          <td>{history.currentCoin}</td>
          <td>{history.currentCash}</td>
          <td>{history.currentBonus}</td>
          <td>{history.lastUpdated}</td>
          <td>{history.cashChargedDate}</td>
          <td>{history.cashChargedAmount}</td>
          <td>{history.bonusChargedDate}</td>
          <td>{history.bonusChargedAmount}</td>
          <td>{history.coinDeducted}</td>
          <td>{history.serviceName}</td>
          <td>{history.coinDeductedDate}</td>
          <td>{history.deductionResult}</td>
        </tr>
      );
    }
    return arr;
  };
  return (
    <>
      <h1>충전 및 지출 이력</h1>
      <h3>
        회사 아이디
        <select onChange={handleSelect} value={Selected}>
          {histories.map((item) => (
            <option value={item.companyId} key={item.companyId}>
              {item.companyId}
            </option>
          ))}
        </select>
      </h3>
      <table class="table">
        <thead>
          <tr>
            <th className="hisThead" scope="col">
              회사 아이디
            </th>
            <th className="hisThead" scope="col">
              현재 코인
            </th>
            <th className="hisThead" scope="col">
              현재 캐시
            </th>
            <th className="hisThead" scope="col">
              현재 보너스
            </th>
            <th className="hisThead" scope="col">
              마지막 갱신 일시
            </th>
            <th className="hisThead" scope="col">
              캐시 충전 일시
            </th>
            <th className="hisThead" scope="col">
              충전 캐시
            </th>
            <th className="hisThead" scope="col">
              보너스 충전 일시
            </th>
            <th className="hisThead" scope="col">
              충전 보너스
            </th>
            <th className="hisThead" scope="col">
              차감 코인
            </th>
            <th className="hisThead" scope="col">
              사용 서비스 이름
            </th>
            <th className="hisThead" scope="col">
              차감 일시
            </th>
            <th className="hisThead" scope="col">
              차감 결과
            </th>
          </tr>
        </thead>
        <tbody>{historyTable(Selected)}</tbody>
      </table>
    </>
  );
}

export default History;
