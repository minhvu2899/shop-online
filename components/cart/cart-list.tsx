import React, { useContext, useState } from "react";
import CartItem from "./cart-item";
import styles from "../../styles/cart.module.scss";
import CartContext from "../../store/CartContext";
interface CarttItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  quantity: number;
}
const CartList = () => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.cartItems);
  //   if (typeof window !== "undefined") {
  //     console.log("we are running on the client");
  //     console.log(window.localStorage.getItem("cartItems"));
  //     cart = JSON.parse(localStorage.getItem("cartItems")!);
  //   } else {
  //     console.log("we are running on the server");
  //   }
  const [cartItems, setCartItems] = useState(cartCtx.cartItems);
  return (
    <div className={styles["cart-items"]}>
      {cartCtx.cartItems.length === 0 && (
        <h3 className={styles["cart-items"]}>No item in your cart</h3>
      )}
      {cartCtx.cartItems.map((item: CarttItem) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
