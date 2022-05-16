import React, { useEffect } from "react";
import Link from "next/link";
import Button from "../ui/button";
import styles from "../../styles/header.module.scss";
import { signIn, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
const navbars = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/category" },
  { id: 3, name: "Product", link: "/product" },
  { id: 4, name: "Blog", link: "/posts" },
  { id: 5, name: "Contact", link: "/user/profile" },
];

const Header = () => {
  const [userInfo, setUserInfo] = React.useState<{
    name: string;
    picture: string;
  }>();
  useEffect(() => {
    const fetchU = async () => {
      const user = await fetch("/api/user/jwt");
      const data = await user.json();
      setUserInfo(data);
      console.log("data", data);
    };
    fetchU();
  }, []);
  console.log("userInfo", userInfo);
  return (
    <header className={styles.header}>
      <a href="/" className={styles["header-logo"]}>
        <Image src="/icons/logo1.svg" width={50} height={50} alt="Logo"></Image>
      </a>
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

      {userInfo ? (
        <div className={styles["header-user"]}>
          {userInfo.picture && (
            <>
              <Image
                src={userInfo.picture}
                className={styles["header-user-avatar"]}
                width={50}
                height={50}
                alt={userInfo.name}
              />

              <div className={styles["header-cta"]}>
                <span className={styles["header-user-info"]}>
                  {userInfo.name ? userInfo.name : "Guest"}
                </span>
                <a
                  className={styles["header-auth-signout"]}
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles["header-auth"]}>
          <div className={`${styles["header-auth-item"]} mr-1`}>
            <Link href="/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Login
              </a>
            </Link>
          </div>
          <div className={styles["header-shopping-cart"]}>
            <Link href="/cart">
              <Image
                src="/icons/cart.svg"
                width={50}
                height={50}
                alt="Shopping cart"
              />
            </Link>
          </div>
        </div>
      )}
      {/* <iframe src="/api/user/jwt" /> */}
    </header>
  );
};

export default Header;
