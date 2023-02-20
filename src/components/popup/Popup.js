import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { MdAddCircleOutline } from "react-icons/md";

import styles from "./popup.module.scss";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cccd, setCccd] = useState("");
  const [blx, setBlx] = useState("");
  const [license, setLisence] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
      cccd && URL.revokeObjectURL(cccd);
      blx && URL.revokeObjectURL(blx);
    };
  }, [avatar, blx, cccd]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => {
    setIsOpen(false);
    setAvatar("");
    setCccd("");
    setBlx("");
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setLisence("");
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLicenseChange = (e) => {
    setLisence(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleBlxChange = (e) => {
    setBlx(e.target.files[0]);
  };

  const handleCccdChange = (e) => {
    setCccd(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = [];
    if (!fullName) {
      errors.push("Họ tên là bắt buộc.");
    }

    if (!email) {
      errors.push("Email là bắt buộc.");
    }

    if (!license) {
      errors.push("Biển số xe là bắt buộc.");
    }

    setFormErrors(errors);
    if (errors.length === 0) {
      // Perform registration logic here
    }
  };

  return (
    <>
      <button
        title="Đăng ký shipper"
        className={styles.btn_add_shipper}
        onClick={openPopup}
      >
        <MdAddCircleOutline size={26} />
      </button>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="popup"
        unmountOnExit
        nodeRef={popupRef}
      >
        <div className={styles.popup}>
          <div ref={popupRef} className={styles.popup_content}>
            <div className={styles.popup_title}>Đăng ký shipper</div>
            <div className={styles.popup_body}>
              <form onSubmit={handleSubmit}>
                {formErrors.length > 0 && (
                  <ul>
                    {formErrors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                )}
                <div>
                  <label htmlFor="fullName">Họ tên:</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>

                <div>
                  <label htmlFor="licensePlates">Biển số xe:</label>
                  <input
                    type="text"
                    id="licensePlates"
                    value={license}
                    onChange={handleLicenseChange}
                    placeholder="Định dạng xxxxx-xxxxx ví dụ: 37N1-39108"
                  />
                </div>

                <div className={styles.divHasImage}>
                  <label htmlFor="avatar">Hình đại diện:</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                  <div className={styles.preview_div}>
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="Hình đại diện."
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className={styles.divHasImage}>
                  <label htmlFor="bangLaiXe">Bằng lái xe:</label>
                  <input
                    type="file"
                    id="bangLaiXe"
                    onChange={handleBlxChange}
                  />
                  <div className={styles.preview_div}>
                    {blx ? (
                      <img src={URL.createObjectURL(blx)} alt="Bằng lái xe." />
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className={styles.divHasImage}>
                  <label htmlFor="cccd">Căn cước công dân:</label>
                  <input type="file" id="cccd" onChange={handleCccdChange} />
                  <div className={styles.preview_div}>
                    {cccd ? (
                      <img
                        src={URL.createObjectURL(cccd)}
                        alt="Căn cước công dân."
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className={styles.popup_footer}>
              <button type="submit" onClick={handleSubmit}>
                Đăng ký
              </button>
              <button className={styles.btn_cancel} onClick={closePopup}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
export default Popup;
