import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import styles from "../../styles/header.module.scss";
import MiniCart from "../cart/mini-cart";
const UserInfo = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  return (
    <React.Fragment>
      {userInfo && (
        <React.Fragment>
          <div className={styles["header-shopping-cart"]}>
            <Link href="/cart">
              <Image
                src="/icons/cart.svg"
                width={50}
                height={50}
                alt="Shopping cart"
              />
            </Link>
            <div className={styles["header-shopping-number"]}>
              <span>{cartCtx.cartItemsCount}</span>
            </div>
            <MiniCart />
          </div>

          <div className={styles["header-user"]}>
            <div className={styles["header-user-info"]}>
              <Image
                src={userInfo.picture}
                className={styles["header-user-avatar"]}
                width={50}
                height={50}
                alt={userInfo.name}
              />
              <span className={styles["header-user-name"]}>
                {userInfo.name ? userInfo.name : "Guest"}
              </span>
              <Image
                src="/icons/down-arrow.svg"
                className={styles["header-user-avatar"]}
                width={20}
                height={20}
                alt={userInfo.name}
              />
            </div>
            <ul className={styles["header-user-menu"]}>
              <li className={styles["header-user-menu-item"]}>
                <Link href="/user/profile">
                  <a className={styles["header-user-menu-link"]}>Profile</a>
                </Link>
              </li>
              <li className={styles["header-user-menu-item"]}>
                <Link href="/">
                  <a className={styles["header-user-menu-link"]}>Wishlist</a>
                </Link>
              </li>
              <li className={styles["header-user-menu-item"]}>
                <a
                  className={styles["header-user-menu-link"]}
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                    logout();
                  }}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </React.Fragment>
      )}
      {!userInfo && (
        <div className={styles["header-auth"]}>
          <div className={`${styles["header-auth-item"]}`}>
            <Link href="/account/signin">
              <a>Sign In</a>
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserInfo;
