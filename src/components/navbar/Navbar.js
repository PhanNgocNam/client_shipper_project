import React from "react";
import Main_nav from "../main_nav/Main_nav";
import Logo from "../../assets/img/logo.jpg";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo_container}>
        <img src={Logo} alt="Logo" />
      </div>
      <Main_nav />
    </div>
  );
}

export default Navbar;
