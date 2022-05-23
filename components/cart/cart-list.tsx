import React, { useContext, useState } from "react";
import CartItem from "./cart-item";
import styles from "../../styles/cart.module.scss";
import CartContext from "../../store/cart-context";

interface ICartItem {
  id: string;
  _id: string;
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
const CartList = () => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.cartItems);

  return (
    <div className={styles["cart-items"]}>
      {cartCtx.cartItems.length === 0 && (
        <h3 className={styles["cart-items"]}>No item in your cart</h3>
      )}
      {cartCtx.cartItems &&
        cartCtx.cartItems.length > 0 &&
        cartCtx.cartItems.map((item: ICartItem) => (
          <CartItem key={item._id} item={item} />
        ))}
    </div>
  );
};

export default CartList;
