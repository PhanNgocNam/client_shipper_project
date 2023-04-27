import React, { useState, useRef, useEffect } from "react";
import styles from "./popup.module.scss";
import stylesForTrackingPopup from "./trackingPopupBody.module.scss";
import { CSSTransition } from "react-transition-group";
import { MdOutlineCancelPresentation } from "react-icons/md";

import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_API_KEY } from "../../utils/APIRoute";

function TrackingPopup({ isOpen, setIsOpen, shipper }) {
  const popupRef = useRef(null);

  useEffect(() => {
    let shipperLocation = JSON.parse(sessionStorage.getItem("shipperLocation"));
    if (isOpen) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [106.687569, 10.822024],
        zoom: 16,
        accessToken: MAPBOX_API_KEY,
      });

      if (shipperLocation.length !== 0) {
        console.log(shipperLocation);

        const x = shipperLocation.find(
          (shipperIt) => shipperIt.shipperID === shipper._id
        );

        if (x) {
          new mapboxgl.Marker()
            .setLngLat({ lon: x.longitude, lat: x.latitude })
            .addTo(map);

          map.flyTo({
            center: { lon: x.longitude, lat: x.latitude },
          });
        } else {
          console.log("Chưa online!");
        }
      }
    }

    return () => {};
  }, [isOpen]);

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="popup"
        unmountOnExit
        nodeRef={popupRef}
      >
        <div className={styles.popup}>
          <div
            ref={popupRef}
            className={styles.popup_content}
            style={{ width: "90%", height: "fit-content" }}
          >
            <div className={styles.popup_title}>
              <span>
                <MdOutlineCancelPresentation
                  onClick={handleClosePopup}
                  className={styles.closePopup}
                />
              </span>
            </div>
            <div className={stylesForTrackingPopup.popup_body} id="map">
              <div className={stylesForTrackingPopup.shipperInfo}>
                <div
                  className={stylesForTrackingPopup.avatarBlock}
                  style={{
                    backgroundImage: `url(${shipper.avatarURL})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <h3>
                  Tên: <span>{shipper.fullName}</span>
                </h3>
                <h3>
                  Biển số: <span>{shipper.license}</span>
                </h3>
                <h3>
                  SDT: <span>{shipper.phoneNumber}</span>
                </h3>
              </div>
            </div>
            {/* <div className={styles.popup_footer}></div> */}
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default TrackingPopup;
