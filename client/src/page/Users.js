import { useState } from "react";

function Users() {
  const companyInfo = [
    {
      email: "sse@samsung.com",
      name: "삼성전자",
      id: "samsungelec",
    },
    { email: "lge@lg.com", name: "LG전자", id: "lgelec" },
    { email: "apple@apple.com", name: "애플", id: "appleelec" },
    { email: "hwawei@hwawei.com", name: "화웨이", id: "hwaweielec" },
    { email: "dell@dell.com", name: "델", id: "dellelec" },
    { email: "hitachi@hitachi.com", name: "히타치", id: "hitachielec" },
    { email: "sony@sony.com", name: "소니", id: "sonyelec" },
    { email: "intel@intel.com", name: "인텔", id: "intelelec" },
    { email: "panasonic@panasonic.com", name: "파나소닉", id: "panasonicelec" },
    { email: "hp@hp.com", name: "HP", id: "hpelec" },
  ];
  const companyEmail = [
    "sse@samsung.com",
    "lge@lg.com",
    "apple@apple.com",
    "hwawei@hwawei.com",
    "dell@dell.com",
    "hitachi@hitachi.com",
    "intel@intel.com",
    "panasonic@panasonic.com",
    "hp@hp.com",
  ];
  const companyName = [
    "삼성전자",
    "LG전자",
    "애플",
    "화웨이",
    "델",
    "히타치",
    "소니",
    "인텔",
    "파나소닉",
    "HP",
  ];
  const companyId = [
    "samsungelec",
    "lgelec",
    "appleelec",
    "hwaweielec",
    "dellelec",
    "hitachielec",
    "sonyelec",
    "intelelec",
    "panasonicelec",
    "hpelec",
  ];

  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const usersInfo = (e) => {
    if (e === "") {
      let arr = [];
      for (let user of companyInfo) {
        arr.push(
          <tr>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.id}</td>
          </tr>
        );
      }
      return arr;
    }
    let arr = [];
    let filteredUsers = companyInfo.filter((x) => x.name === e || x.id === e);
    for (let user of filteredUsers) {
      arr.push(
        <tr>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{user.id}</td>
        </tr>
      );
    }
    return arr;
  };
  return (
    <>
      <div>
        <div>
          회사 이름
          <select onChange={handleSelect} value={Selected}>
            {companyInfo.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          회사 아이디
          <select onChange={handleSelect} value={Selected}>
            {companyInfo.map((item) => (
              <option value={item.id} key={item.id}>
                {item.id}
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
        <tbody>{usersInfo(Selected)}</tbody>
      </table>
    </>
  );
}

export default Users;
