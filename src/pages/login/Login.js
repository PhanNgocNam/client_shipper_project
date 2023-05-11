import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import Axios from "axios";
import { baseURL } from "../../utils/APIRoute";
import { useDispatch, useSelector } from "react-redux";
import { loggin } from "../../features/admin/authSlice";

const axios = Axios.create({
  baseURL: baseURL,
});
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleAuth = async () => {
    const { data } = await axios.post("/auth/admin/login", {
      username,
      password,
    });

    if (!data.status) {
      setErr(data.message);
    } else {
      dispatch(
        loggin({
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        })
      );
      if (data.admin.isFirstLogin) {
        navigate("/admin/resetPW");
      } else {
        navigate("/admin/welcome");
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth();
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

        <h3>{err}</h3>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
