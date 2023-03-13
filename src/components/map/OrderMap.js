import { MAPBOX_API_KEY } from "../../utils/APIRoute";
import styles from "./ordermap.module.scss";
import React, { useEffect, useRef, useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = MAPBOX_API_KEY;

function OrderMap(props) {
  const center = useMemo(() => [106.687569, 10.822024], []);

  return <div id="map" className={styles.orderMapContainer}></div>;
}

export default OrderMap;
