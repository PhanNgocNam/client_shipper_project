import React, { useEffect, useState } from "react";
import styles from "./listShipper.module.scss";
import Axios from "axios";
import loading from "../../assets/img/loading.gif";

import { baseURL } from "../../utils/APIRoute";
import TrackingPopup from "../popup/TrackingPopup";
import { socket } from "../../socket";

const axios = Axios.create({
  baseURL: baseURL,
});

function ListShipper() {
  const [shipperData, setShipperData] = useState([]);
  const [newShipperList, setNewShipperList] = useState([]);
  const [singleShiper, setSingleShipper] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [shipperLocation, setShipperLocation] = useState([]);

  useEffect(() => {
    socket.on("receive-location", (data) => {
      setShipperLocation(data);
    });
  }, [socket]);

  console.log(shipperLocation);
  const handleGetAllShipper = async () => {
    if (shipperData.length === 0) {
      const { data } = await axios.get("/shipper/all");
      setShipperData(data);
    }
  };
  const handleOptionChange = (e) => {
    let select = e.target.value;
    console.log(select);
    if (select) {
      setNewShipperList(
        shipperData.filter((shipper) => shipper.storage === select)
      );
    } else {
      setNewShipperList([]);
    }
  };
  useEffect(() => {
    handleGetAllShipper();
    return () => {};
  }, []);

  // console.log(shipperLocation);
  return (
    <div className={styles.shipper_container}>
      {shipperData.length === 0 ? (
        <img className="loadingImg" src={loading} />
      ) : newShipperList.length === 0 ? (
        <>
          <TrackingPopup
            shipperLocation={shipperLocation}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            shipper={{ ...singleShiper }}
          />
          {shipperData.map((shipper) => (
            <div
              onClick={() => {
                setIsOpen(true);
                setSingleShipper(shipper);
              }}
              className={styles.innerDiv}
              key={shipper._id}
            >
              <img src={shipper.avatarURL} alt="Avatar" />
              <h2>Tên: {shipper.fullName}</h2>
              <h3>Kho: {shipper.storage}</h3>
              <h3>Biển số: {shipper.license}</h3>
              <h3>Số điện thoại: {shipper.phoneNumber}</h3>
              <div className={styles.innerDivFooter}>
                <button className="btn_perform">Cập nhật</button>
                <button className="btn_delete">Xóa</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        newShipperList.map((shipper) => (
          <div
            onClick={() => {
              setIsOpen(true);
              setSingleShipper(shipper);
            }}
            className={styles.innerDiv}
            key={shipper._id}
          >
            <img src={shipper.avatarURL} alt="Avatar" />
            <h2>Tên: {shipper.fullName}</h2>
            <h3>Kho: {shipper.storage}</h3>
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
