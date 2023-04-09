import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./Auth.module.scss";
import registerImage from "../../assets/register.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config.js";

import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle register
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
    } else {
      // const auth = getAuth();
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);
          setIsLoading(false);
          toast.success("Registration successful");
          navigate("/login");
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setIsLoading(false);
          toast.error(errorMessage);
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <Card cardClass="">
          <div className={styles.form}>
            <h2>Register</h2>
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
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                type="password"
                placeholder="Confirm Password"
                required
              />
              <button className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to="/login"> Login </Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImage} alt="register" width={400} />
        </div>
      </section>
    </>
  );
}
