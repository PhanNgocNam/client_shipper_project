/*global google*/
import { MAPBOX_API_KEY } from "../../utils/APIRoute";
import scriptLoader from "react-async-script-loader";
import PlacesAutocomplete from "react-places-autocomplete";
import styles from "./ordermap.module.scss";
import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";

function OrderMap({ isScriptLoaded, isScriptLoadSucceed }) {
  const [address, setAddress] = useState("");
  const center = useMemo(
    () => ({
      lng: 106.687569,
      lat: 10.822024,
    }),
    []
  );

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = (value) => {
    setAddress(value);
  };

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyDrtXFuOaX95Llcs7VIv19sSiVYlbjgLMU",
  //   libraries: ["places"],
  // });
  return (
    <div id="map" className={styles.orderMapContainer}>
      {isScriptLoadSucceed ? (
        <GoogleMap
          zoom={16}
          center={center}
          mapContainerClassName={styles.mapContainer}
        >
          <div className={styles.orderBox}>
            <div className={styles.nameAndStorage}>
              <input placeholder="Nhập tên sản phẩm..." />
              <select>
                <option>--Chọn Kho--</option>
                <option>Kho Gò Vấp</option>
                <option>Kho Quận 3</option>
                <option>Kho Bình Thạnh</option>
              </select>
            </div>
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <>
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                      })}
                    />
                  </div>
                  <div>
                    {loading && <div style={{ color: "red" }}>Loading...</div>}
                  </div>
                </>
              )}
            </PlacesAutocomplete>

            <div className={styles.footerBox}>
              <button className={styles.btn_add_order}>Thêm đơn hàng</button>
              <button className={styles.btn_delete}>Hủy</button>
            </div>
          </div>
        </GoogleMap>
      ) : (
        ""
      )}
    </div>
  );
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDrtXFuOaX95Llcs7VIv19sSiVYlbjgLMU&libraries=places",
])(OrderMap);
