import React, { useState } from "react";
import styles from "./resetPassword.module.scss";
import { baseURL } from "../../utils/APIRoute";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const axios = Axios.create({
  baseURL: baseURL,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch("auth/admin/resetPW", {
      username: "admin",
      newPassword,
      confirmPassword,
    });

    if (!data.status) {
      setErr(data.message);
    } else {
      alert("Đổi mật khẩu thành công!");
      navigate("/admin");
    }
  };
  return (
    <div className="content_right_container">
      <div className={styles.resetPWContainer}>
        <form>
          <h2 className={styles.title}>Đổi mật khẩu</h2>
          <label>Mật khẩu mới: </label>
          <input
            onChange={handleChangeNewPassword}
            value={newPassword}
            type="password"
          />
          <label>Xác nhận mật khẩu: </label>
          <input
            onChange={handleChangeConfirmPassword}
            value={confirmPassword}
            type="password"
          />

          <h3>{err}</h3>

          <button type="submit" onClick={handleSubmit}>
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
