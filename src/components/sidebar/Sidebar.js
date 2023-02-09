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
        <Link to="/admin/shipper">
          <MdGroups size={28} style={{ marginRight: "1.6em" }} />
          Quản lý shipper
        </Link>
        <Link to="/admin/order">
          <MdOutlineIncompleteCircle
            size={28}
            style={{ marginRight: "1.6em" }}
          />
          Quản lý đơn hàng
        </Link>
        <Link to="/admin/sta">
          <MdListAlt size={28} style={{ marginRight: "1.6em" }} />
          Thống kê
        </Link>
        <Link to="/admin/tracking">
          <MdNotListedLocation size={28} style={{ marginRight: "1.6em" }} />
          Tracking
        </Link>
      </div>
      <div className={styles.sidebar_bottom}>
        <Link>
          {" "}
          <MdSettings size={26} style={{ marginRight: "1.6em" }} />
          Cài đặt
        </Link>
        <Link>
          <MdOutlineHelp size={26} style={{ marginRight: "1.6em" }} />
          Trợ giúp
        </Link>
        <div className={styles.needhelp_container}>
          <h2>Bạn cần giúp đỡ?</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
