import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "../../styles/product.module.scss";
import { formatPrice } from "../../utils";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import useSWR from "swr";
import axios from "axios";

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    status: string;
    slug: string;
  };
  // onAddToCart: (id: string) => void;
}
interface CarttItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  quantity: number;
}
const fetcher = async (url: string) => {
  const result = await axios.get(url);
  return result.data;
};
const ProductItem = ({ product }: ProductItemProps) => {
  const { data: isLogin, error } = useSWR("/api/user/jwt", fetcher);

  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);

  const handelAddToCart = (newItem: CarttItem) => {
    if (!isLogin) {
      notificationCtx.showNotification({
        message: "Please login ",
        status: "error",
      });
      return;
    }
    cartCtx.addToCart(newItem);
    notificationCtx.showNotification({
      message: "Add to Cart Successfully",
      status: "success",
    });
    console.log(notificationCtx);
  };
  if (error) {
    notificationCtx.showNotification({
      message: "Some things went wrong ",
      status: "error",
    });
  }

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
            <a
              className={styles["product-cta-link"]}
              onClick={(e) => {
                e.preventDefault();
                handelAddToCart({ ...product, quantity: 1 });
              }}
            >
              <Image
                src="/icons/cart1.svg"
                width={30}
                height={30}
                alt="Image"
              />
            </a>
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
