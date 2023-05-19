import React, { useState, useEffect } from "react";
import { axios } from "../../axiosConfig";
import SearchBar from "../search_bar/SearchBar";
import styles from "./sta.module.scss";

import PieCharts from "../charts/PieCharts";

function Statistics() {
  const [shipperData, setShipperData] = useState([]);
  const [shipperWasSelected, setShipperWasSelected] = useState(null);
  const [numberOfSucessOrder, setNumberOfSucessOrder] = useState(null);
  const [numberOfFailureOrder, setNumberOfFailureOrder] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [totalNumberOfOrder, setTotalNumberOfOrder] = useState(null);
  const [dateWasSelected, setDateWasSelected] = useState("");
  const handleGetAllShipper = async () => {
    if (shipperData.length === 0) {
      const { data } = await axios.get("/shipper/all");
      setShipperData(data);
    }
  };
  useEffect(() => {
    handleGetAllShipper();
    return () => {};
  }, []);

  useEffect(() => {
    if (shipperWasSelected) {
      handleGetNumberOfOrderBaseOnStatus();
    }
  }, [shipperWasSelected]);

  useEffect(() => {
    if (dateWasSelected) {
      handleGetNumberOfOrderBaseOnStatusAndDate();
    }
  }, [dateWasSelected]);

  const handleGetNumberOfOrderBaseOnStatus = async () => {
    const { data } = await axios.get(
      `/historyOrder/getHistoryOrderByShipperId/${shipperWasSelected._id}`
    );
    if (data) {
      const numberOfSucessOrder = data.orders.filter(
        (order) => order.status === "thanhcong"
      ).length;
      setNumberOfSucessOrder(numberOfSucessOrder);

      const numberOfFailureOrder = data.orders.filter(
        (order) => order.status === "thatbai"
      ).length;
      setNumberOfFailureOrder(numberOfFailureOrder);

      setTotalNumberOfOrder(data.orders.length);
    }
  };

  const handleGetNumberOfOrderBaseOnStatusAndDate = async () => {
    const { data } = await axios.get(
      `/historyOrder/getHistoryOrderByShipperIdAndDate/${shipperWasSelected._id}?dateAdded=${dateWasSelected}`
    );
    const { numOfTotal, numOfSucess, numOfFailure } = data;
    if (data) {
      setTotalNumberOfOrder(numOfTotal);
      setNumberOfSucessOrder(numOfSucess);
      setNumberOfFailureOrder(numOfFailure);
    }
  };

  const handleGetNumberOfOrderBetweenTwoDate = async (req, res) => {
    if (startDate && endDate) {
      const startDateInDateSecformat = new Date(startDate).getTime();
      const endDateInDateSecformat = new Date(endDate).getTime();
      if (startDateInDateSecformat >= endDateInDateSecformat) {
        alert("Lỗi: ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
      } else {
        const { data } = await axios.get(
          `/historyOrder/getHistoryOrderBetweenTwoDate/${shipperWasSelected._id}?startDate=${startDate}&endDate=${endDate}`
          // /historyOrder/getHistoryOrderBetweenTwoDate/6449db1e1ccbe1c4892f7d1a?startDate=2023-05-16&endDate=2023-05-19
        );
        const { numOfTotal, numOfSucess, numOfFailure } = data;
        if (data) {
          setTotalNumberOfOrder(numOfTotal);
          setNumberOfSucessOrder(numOfSucess);
          setNumberOfFailureOrder(numOfFailure);
        }
        console.log(data);
      }
    }
  };
  // console.log(dateWasSelected);
  const data = [
    { name: "Giao Thành công", value: numberOfSucessOrder || 0 },
    { name: "Giao thất bại", value: numberOfFailureOrder || 0 },
  ];

  const COLORS = ["#743f7e", "#E06900", "#FFBB28"];

  // const data2 = [
  //   {
  //     name: shipperWasSelected ? shipperWasSelected.fullName : "Tên shipper...",
  //     Sucess: numberOfSucessOrder || 0,
  //     Failure: numberOfFailureOrder || 0,
  //   },
  // ];

  console.log("st :" + startDate + ", ", "end" + endDate);

  return (
    <div className="content_right_container">
      {shipperData && (
        <SearchBar
          dateWasSelected={dateWasSelected}
          shipperWasSelected={shipperWasSelected}
          setDateWasSelected={setDateWasSelected}
          numberOfSucessOrder={numberOfSucessOrder}
          totalNumberOfOrder={totalNumberOfOrder}
          setShipperWasSelected={setShipperWasSelected}
          placeholder="Nhập tên shipper..."
          data={shipperData}
        />
      )}
      <div className={styles.sta_container}>
        <div>
          {shipperWasSelected ? (
            <>
              <div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={() => handleGetNumberOfOrderBetweenTwoDate()}>
                  Xem thống kê
                </button>
              </div>
              <PieCharts
                className={styles.piechart_container}
                data={data}
                COLORS={COLORS}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
