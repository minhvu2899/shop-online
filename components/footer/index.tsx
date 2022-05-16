import React from "react";
import styles from "../../styles/footer.module.scss";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-column"]}>
        <h4 className={styles["footer-title"]}>Contact</h4>
        <ul className={styles["footer-list"]}>
          <li className={styles["footer-item"]}>
            <Image
              src="/icons/location.svg"
              alt="locations"
              width={20}
              height={20}
            />
            <a className={styles["footer-item-content"]} href="#">
              2/45 Tower Street, New York, USA
            </a>
          </li>
          <li className={styles["footer-item"]}>
            <Image
              src="/icons/telephone.svg"
              alt="locations"
              width={20}
              height={20}
            />
            <a className={styles["footer-item-content"]} href="#">
              0123456789
            </a>
          </li>
          <li className={styles["footer-item"]}>
            <Image
              src="/icons/email.svg"
              alt="locations"
              width={20}
              height={20}
            />
            <a className={styles["footer-item-content"]} href="#">
              vhm@gmail.com
            </a>
          </li>
          <li className={styles["footer-item"]}>
            <Image
              src="/icons/browser.svg"
              alt="locations"
              width={20}
              height={20}
            />
            <a className={styles["footer-item-content"]} href="#">
              https://www.vhm.com
            </a>
          </li>
        </ul>
      </div>
      <div className={styles["footer-column"]}>
        <h4 className={styles["footer-title"]}>Contact</h4>
        <ul className={styles["footer-list"]}>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
        </ul>
      </div>
      <div className={styles["footer-column"]}>
        <h4 className={styles["footer-title"]}>Contact</h4>
        <ul className={styles["footer-list"]}>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
        </ul>
      </div>
      <div className={styles["footer-column"]}>
        <h4 className={styles["footer-title"]}>Contact</h4>
        <ul className={styles["footer-list"]}>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
          <li className={styles["footer-item"]}>Specials</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
