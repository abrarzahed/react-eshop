import styles from "./Footer.module.scss";
const date = new Date();
const year = date.getFullYear();
export default function Footer() {
  return (
    <footer className={styles.footer}>&copy; {year} All rights reserved</footer>
  );
}
