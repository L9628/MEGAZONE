import { useState, useEffect } from "react";
import axios from "axios";

function Companies() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/auth", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setCompanies(res.data);
      });
  }, []);
  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const companiesInfo = (e) => {
    if (e === "") {
      let arr = [];
      for (let company of companies) {
        arr.push(
          <tr>
            <td>{company.email}</td>
            <td>{company.companyName}</td>
            <td>{company.companyId}</td>
          </tr>
        );
      }
      return arr;
    }
    let arr = [];
    let filteredCompanies = companies.filter(
      (x) => x.companyName === e || x.companyId === e
    );
    for (let company of filteredCompanies) {
      arr.push(
        <tr>
          <td>{company.email}</td>
          <td>{company.companyName}</td>
          <td>{company.companyId}</td>
        </tr>
      );
    }
    return arr;
  };
  return (
    <>
      <h1>가입자 관리</h1>
      <div>
        <div>
          회사 이름
          <select onChange={handleSelect} value={Selected}>
            {companies.map((item) => (
              <option value={item.companyName} key={item.companyName}>
                {item.companyName}
              </option>
            ))}
          </select>
        </div>
        <div>
          회사 아이디
          <select onChange={handleSelect} value={Selected}>
            {companies.map((item) => (
              <option value={item.companyId} key={item.companyId}>
                {item.companyId}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">이메일</th>
            <th scope="col">회사 이름</th>
            <th scope="col">회사 아이디</th>
          </tr>
        </thead>
        <tbody>{companiesInfo(Selected)}</tbody>
      </table>
    </>
  );
}

export default Companies;
