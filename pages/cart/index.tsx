import { GetServerSideProps, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import CartItem from "../../components/cart/cart-item";
import CartList from "../../components/cart/cart-list";
import CartContext from "../../store/cart-context";
import styles from "../../styles/cart.module.scss";
import { formatPrice } from "../../utils";

const CartPage = () => {
  const cartCtx = useContext(CartContext);
  const tax = (cartCtx.cartItemsTotal * 10) / 100;
  const ship = (cartCtx.cartItemsTotal * 5) / 100;
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
                {cartCtx.cartItemsCount} ITEM
              </span>
              <span className={styles["cart-sumary-value"]}>
                {formatPrice(cartCtx.cartItemsTotal)}
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
                {formatPrice(cartCtx.cartItemsTotal + tax + ship)}
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
    props: {},
  };
};
export default CartPage;
