import React from "react";
import logo from "../../assets/img/logo.png";
import admin from "../../assets/img/admin.png";
import welcomeBack from "../../assets/img/back-welcome.png";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import styles from "../home/homePage.module.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.homePageCon}>
      <header className={styles.homePageHeader}>
        <div className={styles.logoDiv}>
          <img src={logo} alt="Logo..." />
        </div>
        <div className={styles.menuDiv}>
          <li className="isActive">Nhà phát triển</li>
          <li>Liên hệ</li>
          <li>Trợ giúp</li>
          <li>Bảo mật</li>
          <img src={admin} alt="Admin logo..." />
        </div>
      </header>
      <section className={styles.homePageMainContent}>
        <div className={styles.right}>
          <img src={welcomeBack} alt="Back-welcome" />
        </div>
        <div className={styles.left}>
          <h1>Goba Admin</h1>
          <h2>Quản lý Business của bạn, dễ dàng, tiện lợi và nhanh chóng</h2>
          <ul>
            <li>
              <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/ico_check.png" />
              Theo dõi vị trí shipper
            </li>
            <li>
              <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/ico_check.png" />
              Thêm đơn hàng một cách dễ dàng
            </li>
            <li>
              <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/ico_check.png" />
              Bảo mật, thuận tiện và nhanh chóng
            </li>
            <li>
              <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/ico_check.png" />
              Dễ dàng quản lý, giám sát doanh ngiệp của bạn từ xa
            </li>
          </ul>
          <Button onClick={() => navigate("/admin/welcome")}>Bắt đầu</Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
