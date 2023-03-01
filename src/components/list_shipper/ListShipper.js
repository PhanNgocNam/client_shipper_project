import React, { useEffect, useState } from "react";
import styles from "./listShipper.module.scss";
import Axios from "axios";
import loading from "../../assets/img/loading.gif";

const axios = Axios.create({
  baseURL: "https://63f08afb5b7cf4107e2211df.mockapi.io/api/v1/",
});

function ListShipper() {
  const [shipperData, setShipperData] = useState([]);

  const handleGetAllShipper = async () => {
    if (shipperData.length === 0) {
      const { data } = await axios.get("shipper");
      setShipperData(data);
    }
  };
  useEffect(() => {
    handleGetAllShipper();
    return () => {};
  }, []);
  return (
    <div className={styles.shipper_container}>
      {shipperData.length === 0 ? (
        <img className={styles.loadingImg} src={loading} />
      ) : (
        shipperData.map((shipper) => (
          <div className={styles.innerDiv} key={shipper.id}>
            <img src={shipper.avatar} alt="Avatar" />
            <h2>Tên: {shipper.fullname}</h2>
            <h3>Biển số: {shipper.license}</h3>
            <h3>Số điện thoại: {shipper.phoneNumber}</h3>
            <div className={styles.innerDivFooter}>
              <button className="btn_perform">Cập nhật</button>
              <button className="btn_delete">Xóa</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListShipper;
