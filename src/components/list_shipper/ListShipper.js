import React, { useEffect, useState } from "react";
import styles from "./listShipper.module.scss";
// import Axios from "axios";
import loading from "../../assets/img/loading.gif";

import { baseURL } from "../../utils/APIRoute";
import TrackingPopup from "../popup/TrackingPopup";
import { socket } from "../../socket";
import ConfirmPopup from "../popup/ConfirmPopup";
import UpdatePopup from "../popup/UpdatePopup";
import { axios } from "../../axiosConfig";

function ListShipper({ trigerRerender }) {
  const [shipperData, setShipperData] = useState([]);
  const [newShipperList, setNewShipperList] = useState([]);
  const [singleShiper, setSingleShipper] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fullNameUpdate, setFullNameUpdate] = useState("");
  const [storageUpdate, setStorageUpdate] = useState("");
  const [licenseUpdate, setLicenseUpdate] = useState("");

  useEffect(() => {
    socket.on("receive-location", (data) => {
      console.log(data);
      sessionStorage.setItem("shipperLocation", JSON.stringify(data));
    });

    return () => {};
  }, [socket]);

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
  }, [isOpen, isDelete, shipperData, trigerRerender]);

  const handleGetValueOfUpdateFullnameInput = (e) => {
    setFullNameUpdate(e.target.value);
  };

  const handleGetValueOfStorageSelect = (e) => {
    setStorageUpdate(e.target.value);
  };

  const handleGetValueOfLicense = (e) => {
    setLicenseUpdate(e.target.value);
  };

  const handleMakeAllFieldBecomeNull = () => {
    setFullNameUpdate("");
    setLicenseUpdate("");
    setStorageUpdate("");
  };

  const handleUpdateShipper = async () => {
    const { _id, phoneNumber, password } = singleShiper;
    const { data } = await axios.put(`/shipper/updateOne/${_id}`, {
      fullName: fullNameUpdate ? fullNameUpdate : singleShiper.fullName,
      license: licenseUpdate ? licenseUpdate : singleShiper.license,
      storage: storageUpdate ? storageUpdate : singleShiper.storage,
      phoneNumber,
      password,
    });

    if (data.status === "success") {
      setIsUpdate(false);
      handleMakeAllFieldBecomeNull();
      const index = shipperData.findIndex(
        (ship) => ship._id === data.shiper._id
      );
      if (index >= 0) {
        shipperData.splice(index, 1, data.shiper);
      }
    }
  };

  return (
    <div className={styles.shipper_container}>
      {shipperData.length === 0 ? (
        <img className="loadingImg" src={loading} />
      ) : newShipperList.length === 0 ? (
        <>
          <TrackingPopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            shipper={{ ...singleShiper }}
          />
          <ConfirmPopup
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            shipper={{ ...singleShiper }}
            shipperData={shipperData}
            setShipperData={setShipperData}
          />

          <UpdatePopup
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            shipper={{ ...singleShiper }}
            shipperData={shipperData}
            setShipperData={setShipperData}
            handleUpdateShipper={handleUpdateShipper}
          >
            <input
              placeholder="Tên shipper"
              defaultValue={singleShiper.fullName}
              onChange={(e) => handleGetValueOfUpdateFullnameInput(e)}
            />
            <select onChange={(e) => handleGetValueOfStorageSelect(e)}>
              <option>-- Chọn kho --</option>
              <option value="govap">Gò Vấp</option>
              <option value="binhthanh">Bình Thạnh</option>
              <option value="quan3">Quận 3</option>
            </select>
            <input
              placeholder="Biển số"
              onChange={(e) => handleGetValueOfLicense(e)}
              defaultValue={singleShiper.license}
            />
          </UpdatePopup>
          {shipperData.map((shipper) => (
            <div
              onClick={() => setSingleShipper(shipper)}
              className={styles.innerDiv}
              key={shipper._id}
            >
              <img
                onClick={() => {
                  if (sessionStorage.getItem("shipperLocation") === null) {
                    alert("Hiện chưa có shipper nào đang online!");
                  } else if (
                    JSON.parse(sessionStorage.getItem("shipperLocation"))
                      .length > 0
                  ) {
                    setIsOpen(true);
                  } else {
                    alert("Hiện chưa có shipper nào đang online!");
                  }
                }}
                src={shipper.avatarURL}
                alt="Avatar"
              />
              <h2>Tên: {shipper.fullName}</h2>
              <h3>Kho: {shipper.storage}</h3>
              <h3>Biển số: {shipper.license}</h3>
              <h3>Số điện thoại: {shipper.phoneNumber}</h3>
              <div className={styles.innerDivFooter}>
                <button
                  onClick={() => setIsUpdate(true)}
                  className="btn_perform"
                >
                  Cập nhật
                </button>
                <button
                  className="btn_delete"
                  onClick={() => setIsDelete(true)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        newShipperList.map((shipper) => (
          <div className={styles.innerDiv} key={shipper._id}>
            <img
              onClick={() => {
                if (sessionStorage.getItem("shipperLocation" !== null)) {
                  setIsOpen(true);
                  setSingleShipper(shipper);
                } else {
                  alert("Hiện chưa có shipper nào đang online!");
                }
              }}
              src={shipper.avatarURL}
              alt="Avatar"
            />
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
