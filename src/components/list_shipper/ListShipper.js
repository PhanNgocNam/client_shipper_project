import React, { useEffect, useState } from "react";
import styles from "./listShipper.module.scss";
import Axios from "axios";
import loading from "../../assets/img/loading.gif";

import { BASE_API_URL } from "../../utils/APIRoute";

const axios = Axios.create({
  baseURL: BASE_API_URL,
});

function ListShipper() {
  const [shipperData, setShipperData] = useState([]);
  const [newShipperList, setNewShipperList] = useState([]);

  const handleGetAllShipper = async () => {
    if (shipperData.length === 0) {
      const { data } = await axios.get("/shipper");
      setShipperData(data);
    }
  };
  const handleOptionChange = (e) => {
    let select = e.target.value;
    if (select) {
      setNewShipperList(
        shipperData.filter((shipper) => shipper.warehousesValue === select)
      );
    } else {
      setNewShipperList([]);
    }
  };
  useEffect(() => {
    handleGetAllShipper();
    return () => {};
  }, []);
  return (
    <div className={styles.shipper_container}>
      {shipperData.length === 0 ? (
        <img className="loadingImg" src={loading} />
      ) : newShipperList.length === 0 ? (
        shipperData.map((shipper) => (
          <div className={styles.innerDiv} key={shipper.id}>
            <img src={shipper.avatar} alt="Avatar" />
            <h2>Tên: {shipper.fullname}</h2>
            <h3>Kho: {shipper.warehouses}</h3>
            <h3>Biển số: {shipper.license}</h3>
            <h3>Số điện thoại: {shipper.phoneNumber}</h3>
            <div className={styles.innerDivFooter}>
              <button className="btn_perform">Cập nhật</button>
              <button className="btn_delete">Xóa</button>
            </div>
          </div>
        ))
      ) : (
        newShipperList.map((shipper) => (
          <div className={styles.innerDiv} key={shipper.id}>
            <img src={shipper.avatar} alt="Avatar" />
            <h2>Tên: {shipper.fullname}</h2>
            <h3>Kho: {shipper.warehouses}</h3>
            <h3>Biển số: {shipper.license}</h3>
            <h3>Số điện thoại: {shipper.phoneNumber}</h3>
            <div className={styles.innerDivFooter}>
              <button className="btn_perform">Cập nhật</button>
              <button className="btn_delete">Xóa</button>
            </div>
          </div>
        ))
      )}

      <select className={styles.filter} onChange={handleOptionChange}>
        <option value="">--Lọc theo kho--</option>
        <option value="govap">Kho Gò Vấp</option>
        <option value="binhthanh">Kho Bình Thạnh</option>
        <option value="quan3">Kho Quận 3</option>
      </select>
    </div>
  );
}

export default ListShipper;
