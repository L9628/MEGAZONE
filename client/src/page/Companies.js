import { useState, useEffect } from "react";
import axios from "axios";

function Companies() {
  // const companyInfo = [];
  const companyInfo = [
    {
      email: "sse@samsung.com",
      companyName: "삼성전자",
      companyId: "samsungelec",
    },
    { email: "lge@lg.com", companyName: "LG전자", companyId: "lgelec" },
    { email: "apple@apple.com", companyName: "애플", companyId: "appleelec" },
    {
      email: "hwawei@hwawei.com",
      companyName: "화웨이",
      companyId: "hwaweielec",
    },
    { email: "dell@dell.com", companyName: "델", companyId: "dellelec" },
    {
      email: "hitachi@hitachi.com",
      companyName: "히타치",
      companyId: "hitachielec",
    },
    { email: "sony@sony.com", companyName: "소니", companyId: "sonyelec" },
    { email: "intel@intel.com", companyName: "인텔", companyId: "intelelec" },
    {
      email: "panasonic@panasonic.com",
      companyName: "파나소닉",
      companyId: "panasonicelec",
    },
    { email: "hp@hp.com", companyName: "HP", companyId: "hpelec" },
  ];

  axios
    .get("/auth", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => {
      for (let company of res.data) {
        // console.log(company);
        companyInfo.push(company);
      }
      // console.log(companyInfo);
    });

  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const companiesInfo = (e) => {
    if (e === "") {
      let arr = [];
      for (let company of companyInfo) {
        console.log(company);
        arr.push(
          <tr>
            <td>{company.email}</td>
            <td>{company.companyName}</td>
            <td>{company.companyId}</td>
          </tr>
        );
      }
      console.log(arr);
      return arr;
    }
    let arr = [];
    let filteredCompanies = companyInfo.filter(
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
            {companyInfo.map((item) => (
              <option value={item.companyName} key={item.companyName}>
                {item.companyName}
              </option>
            ))}
          </select>
        </div>
        <div>
          회사 아이디
          <select onChange={handleSelect} value={Selected}>
            {companyInfo.map((item) => (
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
