import Image from "next/image";
import React from "react";
import styles from "../../styles/product-detail.module.scss";
interface ProductThumbnailProps {
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
const ProductThumbnail = ({ product }: ProductThumbnailProps) => {
  return (
    <div className={styles["product-detail-thumbnail"]}>
      <div className={styles["product-thumbnail-main"]}>
        <Image
          src={product.image}
          width="1000"
          height="500"
          alt="Product thumbnail"
        />
      </div>
      <div className={styles["product-thumbnail-images"]}>
        <a className={styles["product-thumbnail-image"]}>
          <Image
            src={product.image}
            width="100"
            height="100"
            alt="Product thumbnail"
            layout="responsive"
          />
        </a>
        <a className={styles["product-thumbnail-image"]}>
          <Image
            src={product.image}
            width="100"
            height="100"
            alt="Product thumbnail"
            layout="responsive"
          />
        </a>
        <a className={styles["product-thumbnail-image"]}>
          <Image
            src={product.image}
            width="100"
            height="100"
            alt="Product thumbnail"
            layout="responsive"
          />
        </a>
        <a className={styles["product-thumbnail-image"]}>
          <Image
            src={product.image}
            width="100"
            height="100"
            alt="Product thumbnail"
            layout="responsive"
          />
        </a>
      </div>
    </div>
  );
};

export default ProductThumbnail;
