import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import ResetPassword from "../reset_password/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { loggin } from "../../features/admin/authSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = useSelector((state) => state.admin.accessToken);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login validation here with username and password
    if (username === "admin" && password === "admin") {
      dispatch(
        loggin({
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        })
      );
      return navigate("/admin");
      // return navigate("/resetPW");
    }
  };

  return (
    <div className={styles.logInContainer}>
      <form onSubmit={handleSubmit}>
        <label>Tên đăng nhập:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label>Mật khẩu:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
