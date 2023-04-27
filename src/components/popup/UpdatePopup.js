import React, { useEffect, useRef } from "react";
import styles from "./popup.module.scss";
import { CSSTransition } from "react-transition-group";
import { MdOutlineCancelPresentation } from "react-icons/md";
import stylesForConfirmPopup from "./updatePopup.module.scss";
import AcceptButton from "../button/AcceptButton";
import RejectButton from "../button/RejectButton";

function UpdatePopup({
  children,
  isUpdate,
  setIsUpdate,
  shipper,
  handleUpdateShipper,
  setIsOrderUpdate,
  isOrderUpdate,
  handleUpdateOneOrder,
}) {
  const popupRef = useRef(null);
  const handleClosePopup = () => {
    if (isUpdate) {
      setIsUpdate(false);
    } else if (isOrderUpdate) {
      setIsOrderUpdate(false);
    }
  };
  return (
    <>
      <CSSTransition
        in={isUpdate || isOrderUpdate}
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
            <div className={styles.popup_title}>
              <span>
                <MdOutlineCancelPresentation
                  onClick={handleClosePopup}
                  className={styles.closePopup}
                />
              </span>
            </div>
            <div className={stylesForConfirmPopup.popup_body}>{children}</div>
            <div className={styles.popup_footer}>
              <AcceptButton
                content="Cập nhật"
                onClick={isUpdate ? handleUpdateShipper : handleUpdateOneOrder}
              />
              <RejectButton content="Hủy" onClick={handleClosePopup} />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default UpdatePopup;
