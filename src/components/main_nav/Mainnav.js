import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./main_nav.module.scss";

function Mainnav() {
  const lable = useLocation();

  return (
    <div className={styles.main_nav_container}>
      <h2>{lable.state}</h2>
      <div className={styles.search_container}>a block</div>
      <div className={styles.user_container}>b block</div>
    </div>
  );
}

export default Mainnav;
