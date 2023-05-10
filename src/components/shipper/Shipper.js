import Popup from "../popup/Popup";
import ListShipper from "../list_shipper/ListShipper";
import { useState } from "react";

function Shipper() {
  const [trigerRerender, setTrigerRerender] = useState(false);
  return (
    <div className="content_right_container">
      <Popup setTrigerRerender={setTrigerRerender} />
      <ListShipper trigerRerender={trigerRerender} />
    </div>
  );
}

export default Shipper;
