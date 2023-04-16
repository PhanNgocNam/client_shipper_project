import styles from "./ordermap.module.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Axios from "axios";
import { MAPBOX_API_KEY } from "../../utils/APIRoute";

const axios = Axios.create({
  baseURL: "http://localhost:4940",
});

function OrderMap() {
  const center = useMemo(() => [106.687569, 10.822024], []);
  const [address, setAdress] = useState("Địa chỉ nhận hàng...");
  const [orderName, setOrderName] = useState("");
  const [phoneReceive, setPhoneReceive] = useState("");
  const lngRef = useRef(null);
  const latRef = useRef(null);
  const storageRef = useRef(null);

  console.log(orderName);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [106.687569, 10.822024],
      zoom: 12,
      accessToken: MAPBOX_API_KEY,
    });
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_API_KEY,
      mapboxgl: mapboxgl,
      countries: "VN",
      placeholder: "Nhập địa chỉ giao hàng...",
    });

    map.on("click", (e) => {
      console.log(e.lngLat);
      lngRef.current = e.lngLat.lng;
      latRef.current = e.lngLat.lat;
      handleReverseGeocoding();
    });

    map.addControl(geocoder);

    geocoder.on("result", (event) => {
      const { center, place_name } = event.result;
      setAdress(place_name);
      console.log(event.result);
      map.flyTo({
        center,
        zoom: 16,
      });
    });
  }, []);

  const handleReverseGeocoding = async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngRef.current},${latRef.current}.json?access_token=${MAPBOX_API_KEY}`
    );
    setAdress(data.features[0].place_name);
  };

  const handleAddOneOrder = async () => {
    const { data } = await axios.post("/order/new", {
      deliveryAddress: address,
      phoneReceive: phoneReceive,
      storage: storageRef.current,
      coords: {
        lng: lngRef.current,
        lat: latRef.current,
      },
      orderName: orderName,
    });
    alert("Thêm đơn hàng thành công!");
    handleCancelAddOrder();
  };

  const handleCancelAddOrder = () => {
    setOrderName("");
    setPhoneReceive("");
    setAdress("Địa chỉ nhận hàng...");
  };

  return (
    <div id="map" className={styles.orderMapContainer}>
      <div className={styles.orderBox}>
        <div className={styles.nameAndStorage}>
          <input
            onChange={(e) => setOrderName(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
            value={orderName}
          />
          <select
            onChange={(e) => {
              storageRef.current = e.target.value;
            }}
          >
            <option>--Chọn Kho--</option>
            <option value="govap">Kho Gò Vấp</option>
            <option value="quan3">Kho Quận 3</option>
            <option value="binhthanh">Kho Bình Thạnh</option>
          </select>
        </div>
        <input
          placeholder="Số điện thoại..."
          onChange={(e) => setPhoneReceive(e.target.value)}
          value={phoneReceive}
        />

        <div className={styles.addressDetail}>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "600",
              padding: "0 0.3em",
              fontStyle: "italic",
            }}
          >
            Giao tới: {address}
          </h3>
        </div>

        <div className={styles.footerBox}>
          <button onClick={handleAddOneOrder} className={styles.btn_add_order}>
            Thêm đơn hàng
          </button>
          <button onClick={handleCancelAddOrder} className={styles.btn_delete}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderMap;
