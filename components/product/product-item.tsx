import Image from "next/image";
import React from "react";
import styles from "../../styles/product.module.scss";
const ProductItem = () => {
  return (
    <div className={`${styles["product-item"]} home`}>
      <div className={styles["product-image"]}>
        <Image
          src="/sliders/slider1.png"
          width="400"
          height="400"
          alt="Image"
        />
      </div>
      <span className={styles["product-status"]}>NEW</span>
      <h3 className={styles["product-name"]}>Organic Vegetables</h3>
      <p className={styles["product-price"]}>$501.00</p>
      <div className={styles["product-cta"]}>
        <ul className={styles["product-cta-list"]}>
          <li className={styles["product-cta-item"]}>
            <a className={styles["product-cta-link"]}>
              <Image
                src="/icons/cart1.svg"
                width={30}
                height={30}
                alt="Image"
              />
            </a>
          </li>
          <li className={styles["product-cta-item"]}>
            <a className={styles["product-cta-link"]}>
              <Image
                src="/icons/search.svg"
                width={30}
                height={30}
                alt="Image"
              />
            </a>
          </li>
          <li className={styles["product-cta-item"]}>
            <a className={styles["product-cta-link"]}>
              <Image
                src="/icons/heart.svg"
                width={30}
                height={30}
                alt="Image"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductItem;
