import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    // companyId: state.companyId,
  };
};
function Service() {
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default connect(mapStateToProps)(Service);
