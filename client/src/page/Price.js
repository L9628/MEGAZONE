function Price() {
  return (
    <>
      <h1>서비스 가격 정책</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">서비스 이름</th>
            <th scope="col">차감 코인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Service5</td>
            <td>-500</td>
          </tr>
          <tr>
            <td>Service4</td>
            <td>-400</td>
          </tr>
          <tr>
            <td>Service3</td>
            <td>-300</td>
          </tr>
          <tr>
            <td>Service2</td>
            <td>-200</td>
          </tr>
          <tr>
            <td>Service1</td>
            <td>-100</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Price;
