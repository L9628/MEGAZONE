import axios from "axios";

function History() {
  const handleChargeCash = () => {
    axios.post("http://localhost:5000/histories", {}).then(() => {});
  };
  const handleUseService = () => {};
  return (
    <>
      <h1>충전 및 지출 이력</h1>
      <button onClick={handleChargeCash}>충전하기</button>
      <button onClick={handleUseService}>서비스 이용하기</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">회사 아이디</th>
            <th scope="col">현재 코인</th>
            <th scope="col">현재 캐시</th>
            <th scope="col">현재 보너스</th>
            <th scope="col">마지막 갱신 일시</th>
            <th scope="col">캐시 충전 일시</th>
            <th scope="col">충전 캐시</th>
            <th scope="col">보너스 충전 일시</th>
            <th scope="col">충전 보너스</th>
            <th scope="col">차감 코인</th>
            <th scope="col">사용 서비스 이름</th>
            <th scope="col">차감 일시</th>
            <th scope="col">차감 결과</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}

export default History;
