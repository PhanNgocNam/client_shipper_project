import React, { useState } from "react";
import styles from "./register.module.scss";
import { axios } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleUsenameChange = (e) => {
    setUsename(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const checkUserEnterCorrectPassword = (
    password,
    confirmPassword,
    setErrMsg
  ) => {
    if (password === confirmPassword) {
      return true;
    } else {
      setErrMsg("Mật khẩu và xác nhận mật khẩu không khớp.");
      return false;
    }
  };

  const handleRegexInputNotNull = (
    username,
    password,
    confirmPassword,
    setErrMsg
  ) => {
    if (!username) {
      setErrMsg("Username không được để trống.");
    } else if (!password) {
      setErrMsg("Password không được để trống.");
    } else if (!confirmPassword) {
      setErrMsg("Confirm password không được để trống.");
    }
  };

  const handleCheckRegisterSuccess = (data, setErrMsg) => {
    if (data.status) {
      return true;
    } else {
      setErrMsg("Username đã tồn tại.");
      return false;
    }
  };

  const handleRegisterAdmin = async (username, password) => {
    try {
      const { data } = await axios.post("/auth/admin/register", {
        username,
        password,
      });

      if (handleCheckRegisterSuccess(data, setErrMsg)) {
        alert("Đăng ký thành công.Vui lòng đăng nhập để sử dụng dịch vụ.");
        navigate("/");
      }
    } catch (error) {
      alert("Lỗi: " + error.message);
    }
  };

  const hanleRegister = (e) => {
    if (username && password && confirmPassword) {
      e.preventDefault();
      if (checkUserEnterCorrectPassword(password, confirmPassword, setErrMsg)) {
        setErrMsg("");
        handleRegisterAdmin(username, password);
      }
    } else {
      e.preventDefault();
      handleRegexInputNotNull(username, password, confirmPassword, setErrMsg);
    }
  };
  return (
    <div className={styles.resContainer}>
      <form>
        <h3>Đăng ký tài khoản</h3>
        <input
          placeholder="Tên đăng nhập..."
          value={username}
          onChange={handleUsenameChange}
        />
        <input
          placeholder="Mật khẩu..."
          value={password}
          onChange={handlePasswordChange}
          type="password"
        />
        <input
          placeholder="Xác nhận mật khẩu..."
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
        />
        <p>{errMsg}</p>
        <button onClick={hanleRegister}>Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
