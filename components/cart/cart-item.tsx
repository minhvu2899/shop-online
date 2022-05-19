import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "../../store/CartContext";
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
  return (
    <div className={styles["cart-item"]}>
      <div className={styles["cart-item-image"]}>
        <Image src={item.image} width="100" height="100" alt="Product" />
      </div>
      <div className={styles["cart-item-name"]}>{item.name}</div>
      <div className={styles["cart-item-quantity"]}>
        <div
          className={styles["cart-item-icon"]}
          onClick={() => cartCtx.setQuantity(item.id, item.quantity - 1)}
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
        onClick={() => cartCtx.deteteToCart(item.id)}
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
