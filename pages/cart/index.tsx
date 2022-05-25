import axios from "axios";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import CartList from "../../components/cart/cart-list";
import Layout from "../../components/laypout/layout";
import Loading from "../../components/loading";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/cart.module.scss";
import { formatPrice } from "../../utils";
interface User {
  userId: string;
  name: string;
  image: string;
  email: number;
}
const CartPage = ({ userInfo }: { userInfo: User }) => {
  const { showNotification } = useContext(NotificationContext);
  const { updateCartItems, cartItemsTotal, cartItemsCount } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = userInfo;
  useEffect(() => {
    try {
      const fetchCartItems = async () => {
        setIsLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${userId}/user`
        );
        const cartItems = data.data;
        updateCartItems(cartItems);
        setIsLoading(false);
      };
      fetchCartItems();
    } catch (error) {
      setIsLoading(false);
      showNotification({
        message: "Some thing went wrong! Please try again",
        status: "error",
      });
    }
  }, [updateCartItems, userId, showNotification]);

  const tax = (cartItemsTotal * 10) / 100;
  const ship = (cartItemsTotal * 5) / 100;
  return (
    <Layout>
      {isLoading && <Loading />}
      <Head>
        <title>Shopping cart</title>
        <meta name="description" content="Shopping cart" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.cart}>
        <div className={styles["cart-left"]}>
          <div className={styles["cart-overview"]}>
            <CartList />
            <div className={styles["cart-left-btn"]}>
              <Link href="/product">Continue shopping</Link>
            </div>
          </div>
        </div>
        <div className={styles["cart-right"]}>
          <div className={styles["cart-sumary"]}>
            <div className={styles["cart-block"]}>
              <div className={styles["cart-sumary-line"]}>
                <span className={styles["cart-sumary-label"]}>
                  {cartItemsCount} ITEM
                </span>
                <span className={styles["cart-sumary-value"]}>
                  {formatPrice(cartItemsTotal)}
                </span>
              </div>
              <div className={styles["cart-sumary-line"]}>
                <span className={styles["cart-sumary-label"]}>Shipping</span>
                <span className={styles["cart-sumary-value"]}>
                  {formatPrice(ship)}
                </span>
              </div>
            </div>
            <div className={styles["cart-block"]}>
              <div className={styles["cart-sumary-line"]}>
                <span className={styles["cart-sumary-label"]}>Taxes</span>
                <span className={styles["cart-sumary-value"]}>
                  {formatPrice(tax)}
                </span>
              </div>
              <div className={styles["cart-sumary-line"]}>
                <span className={styles["cart-sumary-label"]}>Total</span>
                <span className={styles["cart-sumary-value"]}>
                  {formatPrice(cartItemsTotal + tax + ship)}
                </span>
              </div>
            </div>
            <div className={styles["cart-right-btn"]}>
              <Link href="/product">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const req = context.req as NextApiRequest;
  const token = await getToken({ req, secret });

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      userInfo: token,
    },
  };
};
export default CartPage;
