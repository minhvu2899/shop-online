import Image from "next/image";
import React from "react";
import styles from "../../styles/product.module.scss";
import ProductItem from "./product-item";
import ProductOptions from "./product-options";
interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
}
interface ProductListProps {
  products: ProductItem[];
}
const ProductList = ({ products }: ProductListProps) => {
  if (!products || products.length === 0) {
    return <p>Not found product</p>;
  }
  return (
    <div className={styles.product}>
      <ProductOptions />
      <div className={styles["product-list"]}>
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
