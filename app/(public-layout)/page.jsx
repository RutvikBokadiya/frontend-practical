// 'use client'

// function Landing() {
//     return (
//         <div>Landing</div>
//     )
// }

// export default Landing

"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../redux/slice";
import styles from "../../public/style/RegisterForm.module.css";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "services/authSlice";
import { registerUser } from "services/api";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    dispatch(registerFailure(""));
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await registerUser({ email, password, name });
      dispatch(registerSuccess(res));
      router.push("/login");
    } catch (error) {
      setEmail("");
      setPassword("");
      setName("");
      dispatch(
        registerFailure(error?.response?.data?.message || error?.message)
      );
    }
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Register
        </button>
        <div className={styles.field}>
          <p>
            {"You have an account? "}
            <a className={styles.button} onClick={handleRegister}>
              <a>Login</a>
            </a>
            {"here"}
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
