import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import clsx from "clsx";
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
  const [isActive, setIsActive] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_top}>
        <Link
          className={clsx({ [styles.isActive]: isActive.one })}
          to="/admin/shipper"
          state=">> Dashboard > Quản lý shipper"
          onClick={() =>
            setIsActive({ three: false, two: false, one: true, four: false })
          }
        >
          <MdGroups size={28} style={{ marginRight: "1.6em" }} />
          <p>Quản lý shipper</p>
        </Link>
        <Link
          className={clsx({ [styles.isActive]: isActive.two })}
          onClick={() =>
            setIsActive({ three: false, two: true, one: false, four: false })
          }
          to="/admin/order"
          state=">> Dashboard > Quản lý đơn hàng"
        >
          <MdListAlt size={28} style={{ marginRight: "1.6em" }} />
          <p>Quản lý đơn hàng</p>
        </Link>
        <Link
          onClick={() =>
            setIsActive({ three: true, two: false, one: false, four: false })
          }
          className={clsx({ [styles.isActive]: isActive.three })}
          to="/admin/resetPW"
          state=">> Dashboard > Đổi mật khẩu"
        >
          <MdOutlineHelp size={26} style={{ marginRight: "1.6em" }} />
          Đổi mật khẩu
        </Link>
        <Link
          to="/admin/sta"
          state=">> Dashboard > Thống kê"
          className={clsx({ [styles.isActive]: isActive.four })}
          onClick={() =>
            setIsActive({ three: false, two: false, one: false, four: true })
          }
        >
          <MdOutlineIncompleteCircle
            size={28}
            style={{ marginRight: "1.6em" }}
          />
          <p>Thống kê</p>
        </Link>
        {/* <Link to="/admin/tracking" state="> Tracking">
          <MdNotListedLocation size={28} style={{ marginRight: "1.6em" }} />
          <p>Tracking</p>
        </Link> */}
      </div>
      <div className={styles.sidebar_bottom}>
        <Link>
          {" "}
          <MdSettings size={26} style={{ marginRight: "1.6em" }} />
          Cài đặt
        </Link>

        <div className={styles.needhelp_container}>
          <h2>Bạn cần giúp đỡ?</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
