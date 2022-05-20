import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/cart.module.scss";
import { formatPrice } from "../../utils";
interface CarttItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  quantity: number;
}
const CartItem = ({ item }: { item: CarttItem }) => {
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
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
            cartCtx.setQuantity(
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
          onClick={() => cartCtx.setQuantity(item.id, item.quantity + 1)}
        >
          <Image
            src="/icons/plus.svg"
            width="50"
            height="50"
            alt="Delete item"
          />
        </div>
      </div>
      <div className={styles["cart-item-price"]}>
        {" "}
        {formatPrice(item.price)}
      </div>
      <div
        className={styles["cart-item-delete"]}
        onClick={() => {
          cartCtx.deteteToCart(item.id),
            notificationCtx.showNotification({
              message: `${item.name} deleted from your cart`,
              status: "error",
            });
        }}
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
