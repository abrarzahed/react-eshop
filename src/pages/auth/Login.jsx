import styles from "./Auth.module.scss";
import LoginImage from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
export default function Login() {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={LoginImage} alt="login" width={400} />
      </div>
      <Card cardClass="">
        <div className={styles.form}>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
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
  );
}
