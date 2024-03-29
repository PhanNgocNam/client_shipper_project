import { Routes, Route } from "react-router-dom";
import Order from "./components/order/Order";
import Shipper from "./components/shipper/Shipper";
import OverviewLayout from "./layouts/OverviewLayout";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/page_not_found/PageNotFound";
import Statistics from "./components/statistics/Statistics";
import Tracking from "./components/tracking/Tracking";
import ResetPassword from "./pages/reset_password/ResetPassword";
import OrderMap from "./components/map/OrderMap";

import { socket } from "./socket";
import { useEffect } from "react";
import Welcome from "./components/welcome/Welcome";
import HomePage from "./pages/home/Home";
import Register from "./pages/register/Register";

function App() {
  useEffect(() => {
    socket.on("connect", () => console.log("Connect to socket server!"));
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/admin" element={<OverviewLayout />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="shipper" element={<Shipper />} />
          <Route path="order" element={<Order />}>
            <Route path="add" element={<OrderMap />} />
          </Route>
          <Route path="sta" element={<Statistics />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="resetPW" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
