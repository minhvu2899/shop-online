import Image from "next/image";
import React from "react";
import styles from "../../styles/product-detail.module.scss";
import { formatPrice } from "../../utils";
interface ProductContentProps {
  product: {
    id: string;
    name: string;
    status: string;
    description: string;
    price: number;
    category: string;
    isFeatured: boolean;
    slug: string;
    image: string;
  };
}
const ProductContent = ({ product }: ProductContentProps) => {
  return (
    <React.Fragment>
      <h3 className={styles["product-detail-title"]}>{product.name}</h3>
      <div className={styles["product-detail-stars"]}>
        <Image
          src="/icons/star.svg"
          className={styles["product-detail-star"]}
          width="20"
          height="20"
          alt="Star"
        />
        <Image
          src="/icons/star.svg"
          className={styles["product-detail-star"]}
          width="20"
          height="20"
          alt="Star"
        />
        <Image
          src="/icons/star.svg"
          className={styles["product-detail-star"]}
          width="20"
          height="20"
          alt="Star"
        />
        <Image
          src="/icons/star.svg"
          className={styles["product-detail-star"]}
          width="20"
          height="20"
          alt="Star"
        />
        <Image
          src="/icons/star.svg"
          className={styles["product-detail-star"]}
          width="20"
          height="20"
          alt="Star"
        />
      </div>
      <div className={styles["product-detail-price"]}>
        <span>{formatPrice(100000)}</span>
      </div>
      <p className={styles["product-detail-desc"]}>{product.description}</p>
    </React.Fragment>
  );
};

export default ProductContent;
