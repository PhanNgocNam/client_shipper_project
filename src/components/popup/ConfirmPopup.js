import React, { useEffect, useRef } from "react";
import styles from "./popup.module.scss";
import stylesForConfirmPopup from "./confirmPopup.module.scss";
import { CSSTransition } from "react-transition-group";
import { MdOutlineCancelPresentation } from "react-icons/md";
import AcceptButton from "../button/AcceptButton";
import RejectButton from "../button/RejectButton";
import { axios } from "../../axiosConfig";

function ConfirmPopup({
  isDelete,
  setIsDelete,
  shipper,
  shipperData,
  setShipperData,
  singleOrder,
  isOrderDelete,
  setIsOrderDelete,
  orderList,
  setOrderList,
}) {
  const popupRef = useRef(null);
  const handleClosePopup = () => {
    if (isDelete) {
      setIsDelete(false);
    } else if (isOrderDelete) {
      setIsOrderDelete(false);
    }
  };

  const handleDeleteShipper = async () => {
    const { data } = await axios.delete(`shipper/${shipper._id}`);
    if (data.status === "success") {
      handleClosePopup();
      setShipperData(shipperData.filter((ship) => ship._id !== shipper._id));
    } else {
      alert("Xảy ra lỗi!");
    }
  };

  const handleDeleteOrder = async () => {
    const { data } = await axios.delete(
      `order/deleteOneOrder/${singleOrder._id}`
    );
    if (data.status === "success") {
      handleClosePopup();
      setOrderList(orderList.filter((order) => order._id !== singleOrder._id));
    } else {
      alert("Xảy ra lỗi!");
    }
  };
  return (
    <>
      <CSSTransition
        in={isDelete || isOrderDelete}
        timeout={300}
        classNames="popup"
        unmountOnExit
        nodeRef={popupRef}
      >
        <div className={styles.popup}>
          <div
            ref={popupRef}
            className={styles.popup_content}
            style={{ maxWidth: "90%", width: "26%", height: "fit-content" }}
          >
            <div style={{ padding: "1em 1em" }} className={styles.popup_title}>
              Bạn chắc chắn muốn xóa
              <span>
                <MdOutlineCancelPresentation
                  onClick={handleClosePopup}
                  className={styles.closePopup}
                />
              </span>
            </div>

            <div className={styles.popup_footer}>
              <AcceptButton
                content="Xóa"
                onClick={
                  isOrderDelete ? handleDeleteOrder : handleDeleteShipper
                }
              />
              <RejectButton content="Hủy" onClick={handleClosePopup} />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default ConfirmPopup;
