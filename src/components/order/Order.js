import React from "react";
import { axios } from "../../axiosConfig";
import { useState, useEffect } from "react";
import styles from "./order.module.scss";
import loading from "../../assets/img/loading.gif";
import OrderMap from "../map/OrderMap";

function Order() {
  const [orderList, setOrderList] = useState([]);
  const [newOrderList, setNewOrderList] = useState([]);
  const [isAddOrder, setIsAddOrder] = useState(false);

  const handleAddOrder = () => {
    setIsAddOrder(true);
  };

  const handleOptionChange = (e) => {
    const select = e.target.value;
    console.log(select);
    if (select) {
      setNewOrderList(
        orderList.filter((order) => order.warehousesValue === select)
      );
    } else {
      setNewOrderList([]);
    }
  };
  const handleGetOrderData = async () => {
    const { data: orderData } = await axios.get("/order/getAllOrder");
    setOrderList(orderData);
  };

  useEffect(() => {
    handleGetOrderData();
  }, []);

  return (
    <div className="content_right_container">
      {isAddOrder ? (
        <OrderMap setIsAddOrder={setIsAddOrder} />
      ) : (
        <div className={styles.orderContainer}>
          <button onClick={handleAddOrder} className={styles.addOrder}>
            Thêm đơn hàng
          </button>
          {orderList.length === 0 ? (
            <img className="loadingImg" src={loading} alt="Loading..." />
          ) : newOrderList.length === 0 ? (
            orderList.map((order) => (
              <div key={order._id} className={styles.innerDiv}>
                {/* <button className={styles.addOrder}>Thêm đơn hàng</button> */}
                <h2>Kho: {order.storage}</h2>
                <h3>Tên sản phẩm: {order.orderName}</h3>
                <h3>Số điện thoại: {order.phoneReceive}</h3>
                {/* <h3>Thu khách: {order.totalPrice}</h3> */}
                {/* <h3>Khối lượng: {order.mass}</h3> */}
                <h3>Giao tới: {order.deliveryAddress}</h3>
                <div className={styles.innerDivFooter}>
                  <button className="btn_perform">Cập nhật</button>
                  <button className="btn_delete">Xóa</button>
                </div>
              </div>
            ))
          ) : (
            newOrderList.map((order) => (
              <div key={order.id} className={styles.innerDiv}>
                {/* <button className={styles.addOrder}>Thêm đơn hàng</button> */}
                <h2>Kho: {order.warehouses}</h2>
                <h3>Số điện thoại: {order.phoneReceive}</h3>
                <h3>Thu khách: {order.totalPrice}</h3>
                <h3>Khối lượng: {order.mass}</h3>
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
      )}
    </div>
  );
}

export default Order;
