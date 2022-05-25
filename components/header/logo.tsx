import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/header.module.scss";
const Logo = () => {
  return (
    <Link href="/">
      <a className={styles["header-logo"]}>
        <Image src="/icons/logo1.svg" width={50} height={50} alt="Logo"></Image>
      </a>
    </Link>
  );
};

export default Logo;
