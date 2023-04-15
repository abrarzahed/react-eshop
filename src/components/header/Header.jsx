import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  removeActiveUser,
  setActiveUser,
} from "../../redux/features/authSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const handleActiveLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const cartIcon = (
  <span className={styles.cart}>
    <NavLink to="/cart" className={handleActiveLink}>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
);

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  // on auth changed
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // const uid = user.uid;
        if (user.displayName == null) {
          const nameString = user.email.slice(0, -10);
          const uname =
            nameString.charAt(0).toUpperCase() + nameString.slice(1);
          setUserName(uname);
          // console.log("null", userName, uname);
        } else {
          setUserName(user.displayName);
        }
        dispatch(
          setActiveUser({
            displayName: user.displayName ? user.displayName : userName,
            email: user.email,
            userID: user.uid,
          })
        );
        // console.log(user);
      } else {
        setUserName("");
      }
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    // setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out");
        // setIsLoading(false);
        dispatch(removeActiveUser());
        // setUserName("");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Something went wrong");
        // setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <header>
        <div className={styles.header}>
          {logo}
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>

              <li>
                <NavLink to="/" className={handleActiveLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" className={handleActiveLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                {userName !== "" && (
                  <NavLink to="/">
                    {" "}
                    <FaUserCircle size={16} /> Hi, {userName}
                  </NavLink>
                )}
                {userName === "" && (
                  <NavLink to="/login" className={handleActiveLink}>
                    Login
                  </NavLink>
                )}
                {userName === "" && (
                  <NavLink to="/register" className={handleActiveLink}>
                    Register
                  </NavLink>
                )}
                {userName !== "" && (
                  <NavLink to="/order-history" className={handleActiveLink}>
                    My Orders
                  </NavLink>
                )}
                {userName !== "" && (
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                )}
              </span>
              {cartIcon}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {cartIcon}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
}
