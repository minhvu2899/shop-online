import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import {
  getAllCartItems,
  removeItemFromCart,
  updateCartItem,
} from "../../lib/cart";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/cart.module.scss";
import { formatPrice } from "../../utils";
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
const CartItem = ({ item }: { item: ICartItem }) => {
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
  const authCtx = useContext(AuthContext);
  const fetcher = async (url: string) => {
    const result = await axios.get(url);
    return result.data;
  };
  const { data: userInfo, error } = useSWR("/api/user/jwt", fetcher);
  const handelRemoveItem = async (id: string) => {
    try {
      console.log(cartCtx);
      await removeItemFromCart(id);
      // cartCtx.deteteToCart(id);
      const cartItems = await getAllCartItems(userInfo.userId);
      cartCtx.updateCartItems(cartItems);

      notificationCtx.showNotification({
        message: `${item.name} deleted from your cart`,
        status: "error",
      });
    } catch (error) {
      notificationCtx.showNotification({
        message: `Something went wrong`,
        status: "error",
      });
    }
  };
  const handelUpdateQuantity = async (cartId: string, quantity: number) => {
    await updateCartItem(cartId, quantity);
    // cartCtx.deteteToCart(id);
    const cartItems = await getAllCartItems(userInfo.userId);
    cartCtx.updateCartItems(cartItems);
  };
  return (
    <div className={styles["cart-item"]}>
      <div className={styles["cart-item-image"]}>
        <Image src={item.image} width="100" height="100" alt="Product" />
      </div>
      <div className={styles["cart-item-name"]}>{item.name}</div>
      <div className={styles["cart-item-quantity"]}>
        <div
          className={styles["cart-item-icon"]}
          onClick={() =>
            handelUpdateQuantity(
              item.id,
              item.quantity > 1 ? item.quantity - 1 : 1
            )
          }
        >
          <Image
            src="/icons/minus.svg"
            width="50"
            height="50"
            alt="Delete item"
          />
        </div>

        <input
          type="number"
          className={styles["cart-item-quantity-input"]}
          value={item.quantity}
          min="1"
          max="30"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            cartCtx.setQuantity(item.id, +e.target.value)
          }
        />
        <div
          className={styles["cart-item-icon"]}
          onClick={() => handelUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Image
            src="/icons/plus.svg"
            width="50"
            height="50"
            alt="Delete item"
          />
        </div>
      </div>
      <div className={styles["cart-item-price"]}>{formatPrice(item.price)}</div>
      <div
        className={styles["cart-item-delete"]}
        onClick={() => handelRemoveItem(item.id)}
      >
        <Image
          src="/icons/delete.svg"
          width="30"
          height="30"
          alt="Delete item"
        />
      </div>
    </div>
  );
};

export default CartItem;
