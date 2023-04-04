import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./Auth.module.scss";
import resetImage from "../../assets/forgot.png";

export default function Reset() {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImage} alt="reset password" width={400} />
      </div>
      <Card cardClass="">
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form>
            <input type="text" placeholder="Email" required />
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
  );
}
