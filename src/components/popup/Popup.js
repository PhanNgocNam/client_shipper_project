import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { MdAddCircleOutline } from "react-icons/md";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { fbstorage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import styles from "./popup.module.scss";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const [otpExpand, setOtpExpand] = useState(false);
  const [isVerifyPhoneNumber, setIsVerifyPhoneNumber] = useState(false);
  const [files, setFiles] = useState(null);
  const [downloadURL, setDownloadURL] = useState({
    avatarURL: "",
    blxURL: "",
    cccdURL: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [storage, setStorageChange] = useState("");
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
    setPhoneNumber("");
    setLisence("");
    setOtpExpand(false);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleStorageChange = (event) => {
    // setEmail(event.target.value);
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

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = [];
    if (!fullName) {
      errors.push("Họ tên là bắt buộc.");
    }

    if (!phoneNumber) {
      errors.push("Số điện thoại là bắt buộc!");
    }

    if (!license) {
      errors.push("Biển số xe là bắt buộc.");
    }

    setFormErrors(errors);
    if (errors.length === 0) {
      // Perform registration logic here
      console.log("Start handle logic in handleSubmit!");
      handleVerifyOtp(event);
    }
  };

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapchar-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("Generate Recapcha Success!");
        },
      },
      auth
    );
  };

  const handleGetOtp = () => {
    console.log("Your OTP Here!");
    generateRecapcha();
    let appVerify = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerify)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((err) => console.log(err.message));
  };

  const handleUploadImage = async (file) => {
    if (file === null) return;
    const imageRef = ref(fbstorage, `images/shipper/${file.name + v4()}`);
    console.log(imageRef);
    try {
      const a = await uploadBytes(imageRef, file);
      console.log(a.ref._location.path_);
      getDownloadURL(ref(storage, a.ref._location.path_)).then((res) =>
        console.log(res)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          setIsVerifyPhoneNumber();
          if (result) {
            console.log("Phone is verified!");
            setIsVerifyPhoneNumber(true);
          }
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.log(error.message);
        });
    } else {
      alert("Mã otp phải có chính xác 6 ký tự.");
    }
  };

  const handleOtpExpand = () => {
    if (phoneNumber !== "") {
      setOtpExpand(true);
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
                  <label htmlFor="kho">Kho:</label>
                  <select>
                    <option>--Lựa chọn kho--</option>
                    <option>Kho Gò Vấp</option>
                    <option>Kho Bình Thạnh</option>
                    <option>Kho Quận 3</option>
                  </select>
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
              {otpExpand ? (
                <div>
                  <label htmlFor="otp">OTP:</label>
                  <input
                    onChange={(e) => handleOtpChange(e)}
                    id="otp"
                    placeholder="Nhập OTP..."
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.popup_footer}>
              {otpExpand ? (
                <button type="submit" onClick={handleSubmit}>
                  Đăng ký
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (phoneNumber) {
                      setOtpExpand(true);
                      handleGetOtp();
                    } else {
                      alert("Vui lòng nhập số điện thoại trước.");
                    }
                  }}
                >
                  Xác minh
                </button>
              )}
              <button className={styles.btn_cancel} onClick={closePopup}>
                Hủy
              </button>
              <div id="recapchar-container"></div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
export default Popup;
