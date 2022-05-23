import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "../../styles/product.module.scss";
import { formatPrice } from "../../utils";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import useSWR from "swr";
import axios from "axios";
import { AddtoCart, getAllCartItems } from "../../lib/cart";
import AuthContext from "../../store/auth-context";
import Loading from "../loading";

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
interface CartItem {
  // id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    status: string;
    slug: string;
  };
  user: string;
}
const ProductItem = ({ product }: ProductItemProps) => {
  const fetcher = async (url: string) => {
    const result = await axios.get(url);
    return result.data;
  };
  const { data: userInfo, error } = useSWR("/api/user/jwt", fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const cartCtx = useContext(CartContext);
  // const authCtx = useContext(AuthContext);
  const notificationCtx = useContext(NotificationContext);

  const handelAddToCart = async (newItem: CartItem) => {
    try {
      setIsLoading(true);
      const item = await AddtoCart({
        ...newItem,
        user: userInfo.userId,
      });
      console.log(item);
      notificationCtx.showNotification({
        message: "Add to Cart Successfully",
        status: "success",
      });
      const cartItems = await getAllCartItems(userInfo.userId);
      cartCtx.updateCartItems(cartItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      notificationCtx.showNotification({
        message: "Some things went wrong ",
        status: "error",
      });
      setIsLoading(false);
    }
  };
  if (error) {
    notificationCtx.showNotification({
      message: "Some things went wrong ",
      status: "error",
    });
  }
  if (isLoading) return <Loading />;
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
                if (!userInfo) {
                  notificationCtx.showNotification({
                    message: "Please login ",
                    status: "error",
                  });
                  return;
                }
                handelAddToCart({
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  product,
                  quantity: 1,
                  user: userInfo.userId,
                });
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
