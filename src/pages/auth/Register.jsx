import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./Auth.module.scss";
import registerImage from "../../assets/register.png";

export default function Register() {
  return (
    <section className={`container ${styles.auth}`}>
      <Card cardClass="">
        <div className={styles.form}>
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
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
  );
}
