import axios from "axios";
import { useEffect, useState } from "react";

function History() {
  const [histories, setHistories] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/histories", {
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
      <h1>?????? ??? ?????? ??????</h1>
      <h3>
        ?????? ?????????
        <select onChange={handleSelect} value={Selected}>
          {histories
            .filter((item, i) => {
              return (
                histories.findIndex((item2, j) => {
                  return item.companyId === item2.companyId;
                }) === i
              );
            })
            .map((item) => (
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
              ?????? ?????????
            </th>
            <th className="hisThead" scope="col">
              ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ?????????
            </th>
            <th className="hisThead" scope="col">
              ????????? ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ????????? ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ?????????
            </th>
            <th className="hisThead" scope="col">
              ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ????????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ??????
            </th>
            <th className="hisThead" scope="col">
              ?????? ??????
            </th>
          </tr>
        </thead>
        <tbody>{historyTable(Selected)}</tbody>
      </table>
    </>
  );
}

export default History;
