import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function OverviewLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default OverviewLayout;
