import { Routes, Route } from "react-router-dom";
import Order from "./components/order/Order";
import Shipper from "./components/shipper/Shipper";
import OverviewLayout from "./layouts/OverviewLayout";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/page_not_found/PageNotFound";
import Statistics from "./components/statistics/Statistics";
import Tracking from "./components/tracking/Tracking";
import ResetPassword from "./pages/reset_password/ResetPassword";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/resetPW" element={<ResetPassword />} />
        <Route path="/admin" element={<OverviewLayout />}>
          <Route path="shipper" element={<Shipper />} />
          <Route path="order" element={<Order />} />
          <Route path="sta" element={<Statistics />} />
          <Route path="tracking" element={<Tracking />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
