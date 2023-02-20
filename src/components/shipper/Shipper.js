import Popup from "../popup/Popup";
import ListShipper from "../list_shipper/ListShipper";

function Shipper() {
  return (
    <div className="content_right_container">
      <Popup />
      <ListShipper />
    </div>
  );
}

export default Shipper;
