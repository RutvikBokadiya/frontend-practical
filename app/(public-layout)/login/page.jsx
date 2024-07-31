"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "services/api";
import { loginStart, loginSuccess, loginFailure } from "services/authSlice";
import { useRouter } from "next/navigation";
import styles from "public/style/RegisterForm.module.css";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let router = useRouter();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await loginUser({ email, password });
      dispatch(loginSuccess(res.data));
      router.push("/weather");
    } catch (error) {
      // debugger;
      dispatch(loginFailure(error?.response?.data?.message || error?.message));
    }
  };

  const handleRegister = () => {
    dispatch(loginFailure(""));
    router.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          Login
        </button>
        <div className={styles.field}>
          <p>
            {"Don't have an account? "}
            <a className={styles.button} onClick={handleRegister}>
              <a>Register</a>
            </a>
            {"here"}
          </p>
        </div>
      </form>
    </>
  );
  // ... form and other logic
};

export default Login;
