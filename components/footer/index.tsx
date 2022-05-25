import React from "react";
import styles from "../../styles/footer.module.scss";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-top"]}>
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
                Phu Xuyen, Ha Noi
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
          <h4 className={styles["footer-title"]}>Information</h4>
          <ul className={styles["footer-list"]}>
            <li className={styles["footer-item"]}>New products</li>
            <li className={styles["footer-item"]}>New products</li>
            <li className={styles["footer-item"]}>New products</li>
            <li className={styles["footer-item"]}>New products</li>
          </ul>
        </div>
        <div className={styles["footer-column"]}>
          <h4 className={styles["footer-title"]}>Your Account</h4>
          <ul className={styles["footer-list"]}>
            <li className={styles["footer-item"]}>New products</li>
            <li className={styles["footer-item"]}>New products</li>
            <li className={styles["footer-item"]}>New products</li>
            <li className={styles["footer-item"]}>New products</li>
          </ul>
        </div>
        <div className={styles["footer-column"]}>
          <h4 className={styles["footer-title"]}>Photo Instagram</h4>
          <ul className={styles["footer-instagram-images"]}>
            {Array.from(new Array(6)).map((_, idx) => (
              <li className={styles["footer-instagram-image"]} key={idx}>
                <Image
                  src={`/images/footer/organie${idx + 1}.jpg`}
                  width="100"
                  height="100"
                  alt="Image"
                ></Image>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        Copyright 2022 Organiestore - All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
