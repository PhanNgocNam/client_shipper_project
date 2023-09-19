import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import clsx from "clsx";
import { Collapse } from "antd";
import {
  MdGroups,
  MdOutlineIncompleteCircle,
  MdOutlineHelp,
  MdSettings,
  MdListAlt,
  MdNotListedLocation,
} from "react-icons/md";
import { Link } from "react-router-dom";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: "1",
    label: (
      <h2
        style={{
          color: "rgba(255, 255, 255, .9)",
          fontSize: "1.6rem",
          fontWeight: "500",
        }}
      >
        Shipper
      </h2>
    ),
    children: (
      <Link
        className={""}
        to="/admin/shipper"
        state=">> Dashboard > Quản lý shipper"
      >
        <MdGroups size={28} style={{ marginRight: "1.6em" }} />
        <p>Quản lý shipper</p>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <h2
        style={{
          color: "rgba(255, 255, 255, .9)",
          fontSize: "1.6rem",
          fontWeight: "500",
        }}
      >
        Đơn hàng
      </h2>
    ),
    children: (
      <Link
        className={""}
        to="/admin/order"
        state=">> Dashboard > Quản lý đơn hàng"
      >
        <MdListAlt size={28} style={{ marginRight: "1.6em" }} />
        <p>Quản lý đơn hàng</p>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <h2
        style={{
          color: "rgba(255, 255, 255, .9)",
          fontSize: "1.6rem",
          fontWeight: "500",
        }}
      >
        Bảo mật{" "}
      </h2>
    ),
    children: (
      <Link to="/admin/resetPW" state=">> Dashboard > Đổi mật khẩu">
        <MdOutlineHelp size={26} style={{ marginRight: "1.6em" }} />
        Đổi mật khẩu
      </Link>
    ),
  },
  {
    key: "4",
    label: (
      <h2
        style={{
          color: "rgba(255, 255, 255, .9)",
          fontSize: "1.6rem",
          fontWeight: "500",
        }}
      >
        Thống kê
      </h2>
    ),
    children: (
      <Link to="/admin/sta" state=">> Dashboard > Thống kê">
        <MdOutlineIncompleteCircle size={28} style={{ marginRight: "1.6em" }} />
        <p>Thống kê</p>
      </Link>
    ),
  },
];

function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      {/* <div className={styles.sidebar_top}>
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
      {/* </div> */}
      <Collapse
        accordion
        items={items}
        bordered={false}
        defaultActiveKey={2}
        expandIconPosition="right"
      />
      ;
      <div className={styles.sidebar_bottom}>
        {/* <div>
          {" "}
          <MdSettings size={26} style={{ marginRight: "1.6em" }} />
          Cài đặt
        </div> */}

        <div className={styles.needhelp_container}>
          <h2>Bạn cần giúp đỡ?</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
