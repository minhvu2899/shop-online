import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import CartItem from "../../components/cart/cart-item";
import CartList from "../../components/cart/cart-list";
import CartContext from "../../store/CartContext";
import styles from "../../styles/cart.module.scss";
import { formatPrice } from "../../utils";

const CartPage = () => {
  const cartCtx = useContext(CartContext);
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
              <span className={styles["cart-sumary-value"]}>0</span>
            </div>
          </div>
          <div className={styles["cart-block"]}>
            <div className={styles["cart-sumary-line"]}>
              <span className={styles["cart-sumary-label"]}>Taxes</span>
              <span className={styles["cart-sumary-value"]}>0</span>
            </div>
            <div className={styles["cart-sumary-line"]}>
              <span className={styles["cart-sumary-label"]}>Total</span>
              <span className={styles["cart-sumary-value"]}>
                {formatPrice(cartCtx.cartItemsTotal)}
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

export default CartPage;
