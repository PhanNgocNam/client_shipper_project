import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import ResetPassword from "../reset_password/ResetPassword";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login validation here with username and password
    if (username === "admin" && password === "admin")
      return navigate("/resetPW");
  };

  return (
    <div className={styles.logInContainer}>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
