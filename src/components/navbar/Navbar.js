import React from "react";
import Mainnav from "../main_nav/Mainnav";
import Logo from "../../assets/img/logo.jpg";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo_container}>
        <img src={Logo} alt="Logo" />
      </div>
      <Mainnav />
    </div>
  );
}

export default Navbar;
