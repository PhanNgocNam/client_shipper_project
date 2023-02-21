import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navigateToLogin.module.scss";
function NavigateToLogin() {
  const navigate = useNavigate();
  const handleNavigateToLoginPage = () => {
    navigate("/login");
  };
  return (
    <div className="content_right_container">
      <h1 className={styles.titleNavigateToLogin}>
        Bạn cần đăng nhập để thực hiện tác vụ của Admin
      </h1>
      <button
        className={styles.btnNavigateToLogin}
        onClick={handleNavigateToLoginPage}
      >
        Đăng nhập
      </button>
    </div>
  );
}

export default NavigateToLogin;
