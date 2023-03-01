import React from "react";
import styles from "./sidebar.module.scss";
import {
  MdGroups,
  MdOutlineIncompleteCircle,
  MdOutlineHelp,
  MdSettings,
  MdListAlt,
  MdNotListedLocation,
} from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_top}>
        <Link to="/admin/shipper" state="> Quản lý shipper">
          <MdGroups size={28} style={{ marginRight: "1.6em" }} />
          <p>Quản lý shipper</p>
        </Link>
        <Link to="/admin/order" state="> Quản lý đơn hàng">
          <MdListAlt size={28} style={{ marginRight: "1.6em" }} />
          <p>Quản lý đơn hàng</p>
        </Link>
        <Link to="/admin/sta" state="> Thống kê">
          <MdOutlineIncompleteCircle
            size={28}
            style={{ marginRight: "1.6em" }}
          />
          <p>Thống kê</p>
        </Link>
        <Link to="/admin/tracking" state="> Tracking">
          <MdNotListedLocation size={28} style={{ marginRight: "1.6em" }} />
          <p>Tracking</p>
        </Link>
      </div>
      <div className={styles.sidebar_bottom}>
        <Link>
          {" "}
          <MdSettings size={26} style={{ marginRight: "1.6em" }} />
          Cài đặt
        </Link>
        <Link to="/admin/resetPW" state="> Đổi mật khẩu">
          <MdOutlineHelp size={26} style={{ marginRight: "1.6em" }} />
          Đổi mật khẩu
        </Link>
        <div className={styles.needhelp_container}>
          <h2>Bạn cần giúp đỡ?</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
