import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import styles from "../../styles/cart.module.scss";
import CartItem from "./cart-item";

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
