import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import styles from "../../styles/product.module.scss";
import { formatPrice } from "../../utils";
interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  category: string;
}
const ProductFeaturedItem = ({ item }: { item: ProductItem }) => {
  const router = useRouter();
  return (
    <div
      className={styles["product-featured-item"]}
      onClick={() => router.push(`/product/${item.slug}`)}
    >
      <div className={styles["product-featured-image"]}>
        <Image
          src={item.image}
          width="100"
          height="100"
          alt="Product"
          layout="responsive"
        />
      </div>
      <div className={styles["product-featured-content"]}>
        <div className={styles["product-featured-name"]}>
          <Link href="#">
            <a className={styles["product-featured-name"]}>{item.name}</a>
          </Link>
        </div>

        <p className={styles["product-featured-price"]}>
          {formatPrice(item.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductFeaturedItem;
