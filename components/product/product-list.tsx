import Image from "next/image";
import React from "react";
import styles from "../../styles/product.module.scss";
import ProductItem from "./product-item";
import ProductOptions from "./product-options";

const ProductList = () => {
  return (
    <div className={styles.product}>
      <ProductOptions />
      <div className={styles["product-list"]}>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default ProductList;
