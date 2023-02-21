import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import NavigateToLogin from "../components/navigate_to_login/NavigateToLogin";

function OverviewLayout() {
  const isLogged = useSelector((state) => state.admin.accessToken);
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        {isLogged ? <Outlet /> : <NavigateToLogin />}
      </div>
    </div>
  );
}

export default OverviewLayout;
