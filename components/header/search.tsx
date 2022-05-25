import Image from "next/image";
import React from "react";
import styles from "../../styles/header.module.scss";
const Search = () => {
  return (
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
  );
};

export default Search;
