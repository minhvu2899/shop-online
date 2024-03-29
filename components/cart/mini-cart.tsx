import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { getAllCartItems, removeItemFromCart } from "../../lib/cart";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/header.module.scss";
import { formatPrice } from "../../utils";
import Loading from "../loading";
const MiniCart = () => {
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const tax = (cartCtx.cartItemsTotal * 10) / 100;
  const ship = (cartCtx.cartItemsTotal * 5) / 100;
  const handelRemoveItem = async (id: string) => {
    try {
      if (!userInfo) return;
      setIsLoading(true);
      await removeItemFromCart(id);
      const cartItems = await getAllCartItems(userInfo.userId);
      cartCtx.updateCartItems(cartItems);
      setIsLoading(false);
      notificationCtx.showNotification({
        message: `Deleted Successfully`,
        status: "error",
      });
    } catch (error) {
      setIsLoading(false);
      notificationCtx.showNotification({
        message: `Something went wrong`,
        status: "error",
      });
    }
  };
  return (
    <React.Fragment>
      {isLoading && <Loading />}
      <div className={styles["header-shopping-minicart"]}>
        <ul className={styles["minicart-product-list"]}>
          {cartCtx.cartItems.length === 0 && (
            <h2 className={styles["minicart-title"]}>No product item</h2>
          )}
          {cartCtx.cartItems.map((item) => (
            <li className={styles["minicart-product-item"]} key={item._id}>
              <div className={styles["minicart-product-media"]}>
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt="product item"
                />
              </div>
              <div className={styles["minicart-product-info"]}>
                <span className={styles["minicart-product-name"]}>
                  {item.name}
                </span>
                <span className={styles["minicart-product-price"]}>
                  {formatPrice(item.price)}
                </span>
                <span className={styles["minicart-product-quantity"]}>
                  Quantity:{item.quantity}
                </span>
              </div>
              <div
                className={styles["minicart-product-remove"]}
                onClick={() => handelRemoveItem(item._id)}
              >
                <Image
                  src="/icons/delete.svg"
                  width={20}
                  height={20}
                  alt="product item"
                />
              </div>
            </li>
          ))}
        </ul>
        {cartCtx.cartItems.length > 0 && (
          <div className={styles["minicart-footer"]}>
            <div className={styles["minicart-subtotal"]}>
              <div className={styles["minicart-line"]}>
                <span className={styles["minicart-line-label"]}>SubTotal:</span>
                <span className={styles["minicart-line-value"]}>
                  {formatPrice(cartCtx.cartItemsTotal)}
                </span>
              </div>
            </div>
            <div className={styles["minicart-shipping"]}>
              <div className={styles["minicart-line"]}>
                <span className={styles["minicart-line-label"]}>Shipping:</span>
                <span className={styles["minicart-line-value"]}>
                  {formatPrice(ship)}
                </span>
              </div>
            </div>
            <div className={styles["minicart-tax"]}>
              <div className={styles["minicart-line"]}>
                <span className={styles["minicart-line-label"]}>Tax:</span>
                <span className={styles["minicart-line-value"]}>
                  {formatPrice(tax)}
                </span>
              </div>
            </div>
            <div className={styles["minicart-total"]}>
              <div className={styles["minicart-line"]}>
                <span className={styles["minicart-line-label"]}>Total:</span>
                <span className={styles["minicart-line-value"]}>
                  {formatPrice(cartCtx.cartItemsTotal + ship + tax)}
                </span>
              </div>
            </div>
            <div className={styles["minicart-btn"]}>
              <Link href="/cart">View Cart</Link>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MiniCart;
