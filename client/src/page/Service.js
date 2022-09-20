import React, { useEffect } from "react";
import axios from "axios";
function Service() {
  const services = [
    { name: "service1", price: "-100" },
    { name: "service2", price: "-200" },
    { name: "service3", price: "-300" },
    { name: "service4", price: "-400" },
    { name: "service5", price: "-500" },
  ];

  // useEffect(() => {
  //   axios
  //     .get("/services", {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       for (let service of res.data) {
  //         services.push(service);
  //       }
  //     });
  // }, [services]);

  // const services = [];
  // axios
  //   .get("/services", {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     for (let service of res.data) {
  //       services.push(service);
  //     }
  //   });
  // const serviceTable = () => {
  //   if (services !== []) {
  //     services.map((service) => (
  //       <tr>
  //         <td>{service.name}</td>
  //         <td>{service.price}</td>
  //       </tr>
  //     ));
  //   }
  // };

  // const services = async () => {
  //   const response = await axios.get("/services", {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   });
  //   return response.data;
  // };

  // async function servicePrice() {
  //   const response = await axios.get("/services", {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   });
  //   const serviceData = response.data;
  //   let serviceTable = [];
  //   for (let service of serviceData) {
  //     serviceTable.push(
  //       <tr>
  //         <td>{service.name}</td>
  //         <td>{service.price}</td>
  //       </tr>
  //     );
  //   }
  //   console.log(serviceTable);
  //   return serviceTable;
  // }
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
          {services.map((service) => (
            <tr>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <button>
                <td>이용하기</td>
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Service;
