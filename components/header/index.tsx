import React from "react";
import styles from "../../styles/header.module.scss";
import Logo from "./logo";
import NavBar from "./navbar";
import Search from "./search";
import UserInfo from "./user-info";

const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <Logo />
        <NavBar />
        <Search />
        <UserInfo />
      </header>
    </React.Fragment>
  );
};

export default Header;
