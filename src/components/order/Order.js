import React from "react";
import { axios } from "../../axiosConfig";
import { useState, useEffect } from "react";
import styles from "./order.module.scss";
import loading from "../../assets/img/loading.gif";
import OrderMap from "../map/OrderMap";
import ConfirmPopup from "../popup/ConfirmPopup";
import UpdatePopup from "../popup/UpdatePopup";

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_API_KEY } from "../../utils/APIRoute";

function Order() {
  const [orderList, setOrderList] = useState([]);
  const [newOrderList, setNewOrderList] = useState([]);
  const [isAddOrder, setIsAddOrder] = useState(false);
  const [isOrderDelete, setIsOrderDelete] = useState(false);
  const [isOrderUpdate, setIsOrderUpdate] = useState(false);
  const [singleOrder, setSingleOrder] = useState({});
  const [adressUpdate, setAdressUpdate] = useState("");
  const [coordsUpdate, setCoordsUpdate] = useState({});
  const [weightUpdate, setWeightUpdate] = useState(0);
  const [orderNameUpdate, setOrderNameUpdate] = useState("");
  const [phoneReceiveUpdate, setPhoneReceiveUpdate] = useState("");
  const [storageUpdate, setStorageUpdate] = useState("");

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_API_KEY,
      mapboxgl: mapboxgl,
      countries: "VN",
      placeholder: "Địa chỉ giao hàng...",
    });

    if (isOrderUpdate) {
      if (geocoder) {
        geocoder.addTo("#geocoder");

        geocoder.on("result", (event) => {
          const { center, place_name } = event.result;
          setAdressUpdate(place_name);
          setCoordsUpdate({ lng: center[0], lat: center[1] });
        });
      }
    }

    return () => {
      // geocoder.onRemove();
    };
  }, [isOrderUpdate]);
  const handleAddOrder = () => {
    setIsAddOrder(true);
  };

  const handleOptionChange = (e) => {
    const select = e.target.value;
    if (select) {
      setNewOrderList(orderList.filter((order) => order.storage === select));
    } else {
      setNewOrderList([]);
    }
  };
  const handleGetOrderData = async () => {
    const { data: orderData } = await axios.get("/order/getAllOrder");
    setOrderList(orderData);
  };

  const handleMakeAllFieldBecomeNull = () => {
    setAdressUpdate("");
    setCoordsUpdate({});
    setWeightUpdate(0);
    setOrderNameUpdate("");
    setStorageUpdate("");
    setPhoneReceiveUpdate("");
  };

  const handleUpdateOneOrder = async () => {
    const { _id } = singleOrder;
    const { data } = await axios.put(`/order/updateOneOrder/${_id}`, {
      deliveryAddress: adressUpdate
        ? adressUpdate
        : singleOrder.deliveryAddress,
      storage: storageUpdate ? storageUpdate : singleOrder.storage,
      orderName: orderNameUpdate ? orderNameUpdate : singleOrder.orderName,
      phoneReceive: phoneReceiveUpdate
        ? phoneReceiveUpdate
        : singleOrder.phoneReceive,
      weight: weightUpdate ? weightUpdate : singleOrder.weight,
      coords: coordsUpdate ? coordsUpdate : singleOrder.coords,
    });
    console.log(data);
    if (data.status === "success") {
      setIsOrderUpdate(false);
      handleMakeAllFieldBecomeNull();
      const index = orderList.findIndex(
        (order) => order._id === data.order._id
      );
      console.log(data);
      if (index >= 0) {
        orderList.splice(index, 1, data.order);
      }
    } else {
      console.log(
        "This log come from else block when data is not respone with status = success"
      );
    }
  };

  useEffect(() => {
    handleGetOrderData();
  }, [isAddOrder]);

  return (
    <div className="content_right_container">
      {isAddOrder ? (
        <OrderMap setIsAddOrder={setIsAddOrder} />
      ) : (
        <>
          <ConfirmPopup
            isOrderDelete={isOrderDelete}
            setIsOrderDelete={setIsOrderDelete}
            singleOrder={{ ...singleOrder }}
            isOrderUpdate={isOrderUpdate}
            setIsOrderUpdate={setIsOrderUpdate}
            orderList={orderList}
            setOrderList={setOrderList}
          />
          <UpdatePopup
            isOrderUpdate={isOrderUpdate}
            setIsOrderUpdate={setIsOrderUpdate}
            handleUpdateOneOrder={handleUpdateOneOrder}
          >
            <input
              onChange={(e) => setOrderNameUpdate(e.target.value)}
              placeholder="Tên sản phẩm..."
              defaultValue={singleOrder.orderName}
            />
            <select onChange={(e) => setStorageUpdate(e.target.value)}>
              <option>-- Chọn kho --</option>
              <option value="govap">Gò vấp</option>
              <option value="binhthanh">Bình Thạnh</option>
              <option value="quan3">Quận 3</option>
            </select>
            <input
              onChange={(e) => setWeightUpdate(e.target.value)}
              style={{ marginBottom: 0 }}
              type="number"
              placeholder="Khối lượng..."
              defaultValue={singleOrder.weight}
            />

            <input
              onChange={(e) => setPhoneReceiveUpdate(e.target.value)}
              placeholder="Số điện thoại..."
              defaultValue={singleOrder.phoneReceive}
            />

            <div
              id="geocoder"
              style={{ marginTop: 0, marginBottom: "10px" }}
            ></div>
          </UpdatePopup>
          <div className={styles.orderContainer}>
            <button onClick={handleAddOrder} className={styles.addOrder}>
              Thêm đơn hàng
            </button>
            {orderList.length === 0 ? (
              <img className="loadingImg" src={loading} alt="Loading..." />
            ) : newOrderList.length === 0 ? (
              orderList.map((order) => (
                <div
                  onClick={() => setSingleOrder(order)}
                  key={order._id}
                  className={styles.innerDiv}
                >
                  <h2>Kho: {order.storage}</h2>
                  <h3>Khối lượng: {order.weight} kg</h3>
                  <h3>Tên sản phẩm: {order.orderName}</h3>
                  <h3>Số điện thoại: {order.phoneReceive}</h3>
                  <h3>Giao tới: {order.deliveryAddress}</h3>
                  <div className={styles.innerDivFooter}>
                    <button
                      className="btn_perform"
                      onClick={() => setIsOrderUpdate(true)}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="btn_delete"
                      onClick={() => setIsOrderDelete(true)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            ) : (
              newOrderList.map((order) => (
                <div key={order.id} className={styles.innerDiv}>
                  <h2>Kho: {order.storage}</h2>
                  <h3>Số điện thoại: {order.phoneReceive}</h3>

                  <h3>Khối lượng: {order.weight} kg</h3>
                  <h3>Giao tới: {order.deliveryAddress}</h3>
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
        </>
      )}
    </div>
  );
}

export default Order;
