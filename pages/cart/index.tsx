import axios from "axios";
import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import CartItem from "../../components/cart/cart-item";
import CartList from "../../components/cart/cart-list";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import styles from "../../styles/cart.module.scss";
import { formatPrice } from "../../utils";
interface User {
  userId: string;
  name: string;
  image: string;
  email: number;
}
const CartPage = ({ userInfo }: { userInfo: User }) => {
  const authCtx = useContext(AuthContext);
  const { updateCartItems, cartItemsTotal, cartItemsCount } =
    useContext(CartContext);
  const fetcher = async (url: string) => {
    const result = await axios.get(url);
    return result.data.data;
  };
  const { userId } = userInfo;
  useEffect(() => {
    try {
      const fetchCartItems = async () => {
        const { data } = await axios.get(
          `http://localhost:3001/api/v1/carts/${userId}/user`
        );
        const cartItems = data.data;

        updateCartItems(cartItems);
      };
      fetchCartItems();
    } catch (error) {
      console.log(error);
    }
  }, [updateCartItems, userId]);

  // if (error) {
  //   console.log(error);
  // }
  // if (carts) {
  //   cartCtx.updateCartItems(carts);
  // }
  const tax = (cartItemsTotal * 10) / 100;
  const ship = (cartItemsTotal * 5) / 100;
  return (
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
