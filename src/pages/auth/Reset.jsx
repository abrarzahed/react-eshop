import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./Auth.module.scss";
import resetImage from "../../assets/forgot.png";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for reset link");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImage} alt="reset password" width={400} />
        </div>
        <Card cardClass="">
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={handleInputChange}
                type="text"
                placeholder="Email"
                required
              />
              <button className="--btn --btn-primary --btn-block">Reset</button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">-Login </Link>
                </p>
                <p>
                  <Link to="/register">-Register </Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
}
