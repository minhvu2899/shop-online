import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Button from "../ui/button";
import styles from "../../styles/header.module.scss";
import { signIn, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import useSWR from "swr";
import axios from "axios";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
const navbars = [
  { id: 1, name: "Home", link: "/" },
  // { id: 2, name: "Category", link: "/category" },
  { id: 3, name: "Product", link: "/product" },
  { id: 4, name: "Blog", link: "/posts" },
  { id: 5, name: "Me", link: "/user/profile" },
];

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const fetcher = async (url: string) => {
    setLoading(true);
    const result = await axios.get(url);
    setLoading(false);
    return result.data;
  };
  const { data: userInfo, error } = useSWR("/api/user/jwt", fetcher);
  if (error) {
    console.log(error);
  }
  // useEffect(() => {
  //   authCtx.login(userInfo);
  // }, [userInfo, authCtx]);
  // console.log(authCtx.userInfo);
  const cartCtx = useContext(CartContext);
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles["header-logo"]}>
          <Image
            src="/icons/logo1.svg"
            width={50}
            height={50}
            alt="Logo"
          ></Image>
        </a>
      </Link>

      <nav className={styles["header-menu"]}>
        <ul className={styles["header-menu-list"]}>
          {navbars.map((nav) => (
            <li className={styles["header-menu-item"]} key={nav.id}>
              <Link href={nav.link}>
                <a className={styles["header-menu-link"]}>{nav.name} </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles["header-search"]}>
        <input
          type="text"
          className={styles["header-search-input"]}
          name="search"
          placeholder="Search"
        />
        <div className={styles["header-search-icon"]}>
          <Image src="/icons/search.svg" width={30} height={30} alt="Search" />
        </div>
      </div>
      {userInfo && (
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
        </div>
      )}

      <div className={styles["header-user"]}>
        {userInfo && (
          <React.Fragment>
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
                    authCtx.logout();
                  }}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </React.Fragment>
        )}
        {!userInfo && !loading && (
          <React.Fragment>
            <div className={styles["header-auth"]}>
              <div className={`${styles["header-auth-item"]}`}>
                <Link href="/auth/signin">
                  <a>Login</a>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>

      {/* <iframe src="/api/user/jwt" /> */}
    </header>
  );
};

export default Header;
