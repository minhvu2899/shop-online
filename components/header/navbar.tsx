import Link from "next/link";
import React from "react";
import styles from "../../styles/header.module.scss";
const navbars = [
  { id: 1, name: "Home", link: "/" },
  { id: 3, name: "Product", link: "/product" },
  { id: 4, name: "Blog", link: "/blogs" },
];
const NavBar = () => {
  return (
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
  );
};

export default NavBar;
