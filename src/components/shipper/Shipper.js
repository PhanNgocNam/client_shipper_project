import Popup from "../popup/Popup";
import ListShipper from "../list_shipper/ListShipper";
import { useState } from "react";

function Shipper() {
  const [rerenderListShipper, setRerenderListShipper] = useState(false);
  return (
    <div className="content_right_container">
      <Popup rerender={setRerenderListShipper} />
      <ListShipper />
    </div>
  );
}

export default Shipper;
