import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/product.module.scss";
import { formatPrice } from "../../utils";
interface ProductItemProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    status: string;
    slug: string;
  };
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className={`${styles["product-item"]} home`}>
      <div className={styles["product-image"]}>
        <Image src={product.image} width="400" height="400" alt="Image" />
      </div>
      <span className={styles["product-status"]}>{product.status}</span>
      <h3 className={styles["product-name"]}>{product.name}</h3>
      <p className={styles["product-price"]}>{formatPrice(product.price)}</p>
      <div className={styles["product-cta"]}>
        <ul className={styles["product-cta-list"]}>
          <li className={styles["product-cta-item"]}>
            <Link href="/cart">
              <a className={styles["product-cta-link"]}>
                <Image
                  src="/icons/cart1.svg"
                  width={30}
                  height={30}
                  alt="Image"
                />
              </a>
            </Link>
          </li>
          <li className={styles["product-cta-item"]}>
            <Link href={`/product/${product.slug}`}>
              <a className={styles["product-cta-link"]}>
                <Image
                  src="/icons/search.svg"
                  width={30}
                  height={30}
                  alt="Image"
                />
              </a>
            </Link>
          </li>
          <li className={styles["product-cta-item"]}>
            <Link href="#">
              <a className={styles["product-cta-link"]}>
                <Image
                  src="/icons/heart.svg"
                  width={30}
                  height={30}
                  alt="Image"
                />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductItem;
