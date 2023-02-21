import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/admin/authSlice";
import styles from "./main_nav.module.scss";
import adminAvatar from "../../assets/img/admin.png";

function Mainnav() {
  const lable = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.admin.accessToken);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.main_nav_container}>
      <h2>{lable.state}</h2>
      <div className={styles.search_container}>a block</div>
      <div className={styles.user_container}>
        <div>
          <h3>Admin</h3>
          {!isLogged ? (
            <button>Đăng nhập</button>
          ) : (
            <button onClick={handleLogout}>Đăng xuất</button>
          )}
        </div>
        <img src={adminAvatar} alt="Admin" />
      </div>
    </div>
  );
}

export default Mainnav;
