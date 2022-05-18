import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/product.module.scss";
const ProductFeaturedItem = () => {
  return (
    <div className={styles["product-featured-item"]}>
      <div className={styles["product-featured-image"]}>
        <Image
          src="/images/products/image.png"
          width="100"
          height="100"
          alt="Product"
          layout="responsive"
        />
      </div>
      <div className={styles["product-featured-content"]}>
        <div className={styles["product-featured-name"]}>
          <Link href="#">
            <a className={styles["product-featured-name"]}>Organie Juice</a>
          </Link>
        </div>

        <p className={styles["product-featured-price"]}>$120.00</p>
      </div>
    </div>
  );
};

export default ProductFeaturedItem;
