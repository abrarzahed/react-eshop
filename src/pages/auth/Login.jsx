import styles from "./Auth.module.scss";
import LoginImage from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

import Loader from "../../components/loader/Loader";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // handle submit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user?.email) {
          toast.success("Logged in successfully");
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={LoginImage} alt="login" width={400} />
        </div>
        <Card cardClass="">
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="text"
                placeholder="Email"
                required
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
                required
              />
              <button className="--btn --btn-primary --btn-block">Login</button>
              <div className={styles.links}>
                <Link to="/reset">Forgot Password?</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button className="--btn --btn-danger --btn-block">
              <FaGoogle color="#fff" /> Login with Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account? </p>
              <Link to="/register"> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
}
