import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import useSWR from "swr";
import { getAllCartItems, removeItemFromCart } from "../../lib/cart";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/header.module.scss";
import { formatPrice } from "../../utils";
import PostItem from "../posts/post-item";
const navbars = [
  { id: 1, name: "Home", link: "/" },
  { id: 3, name: "Product", link: "/product" },
  { id: 4, name: "Blog", link: "/posts" },
];

const Header = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = async (url: string) => {
    setLoading(true);
    const result = await axios.get(url);
    setLoading(false);
    return result.data;
  };
  const { data: userInfo, error } = useSWR("/api/user/jwt", fetcher);
  if (error) {
    notificationCtx.showNotification({
      message: `Something went wrong`,
      status: "error",
    });
    return;
  }

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
    <header className={styles.header}>
      <Link href="/">
        <a className={styles["header-logo"]}>
          <Image
            src="/icons/logo1.svg"
            width={50}
            height={50}
            alt="Logo"
          ></Image>
        </a>
      </Link>

      <nav className={styles["header-menu"]}>
        <ul className={styles["header-menu-list"]}>
          {navbars.map((nav) => (
            <li className={styles["header-menu-item"]} key={nav.id}>
              <Link href={nav.link}>
                <a className={styles["header-menu-link"]}>{nav.name} </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles["header-search"]}>
        <input
          type="text"
          className={styles["header-search-input"]}
          name="search"
          placeholder="Search"
        />
        <div className={styles["header-search-icon"]}>
          <Image src="/icons/search.svg" width={30} height={30} alt="Search" />
        </div>
      </div>
      {userInfo && (
        <div className={styles["header-shopping-cart"]}>
          <Link href="/cart">
            <Image
              src="/icons/cart.svg"
              width={50}
              height={50}
              alt="Shopping cart"
            />
          </Link>
          <div className={styles["header-shopping-number"]}>
            <span>{cartCtx.cartItemsCount}</span>
          </div>
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
                    <span className={styles["minicart-line-label"]}>
                      SubTotal:
                    </span>
                    <span className={styles["minicart-line-value"]}>
                      {formatPrice(cartCtx.cartItemsTotal)}
                    </span>
                  </div>
                </div>
                <div className={styles["minicart-shipping"]}>
                  <div className={styles["minicart-line"]}>
                    <span className={styles["minicart-line-label"]}>
                      Shipping:
                    </span>
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
                    <span className={styles["minicart-line-label"]}>
                      Total:
                    </span>
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
        </div>
      )}

      <div className={styles["header-user"]}>
        {userInfo && (
          <React.Fragment>
            <div className={styles["header-user-info"]}>
              <Image
                src={userInfo.picture}
                className={styles["header-user-avatar"]}
                width={50}
                height={50}
                alt={userInfo.name}
              />
              <span className={styles["header-user-name"]}>
                {userInfo.name ? userInfo.name : "Guest"}
              </span>
              <Image
                src="/icons/down-arrow.svg"
                className={styles["header-user-avatar"]}
                width={20}
                height={20}
                alt={userInfo.name}
              />
            </div>
            <ul className={styles["header-user-menu"]}>
              <li className={styles["header-user-menu-item"]}>
                <Link href="/user/profile">
                  <a className={styles["header-user-menu-link"]}>Profile</a>
                </Link>
              </li>
              <li className={styles["header-user-menu-item"]}>
                <Link href="/">
                  <a className={styles["header-user-menu-link"]}>Wishlist</a>
                </Link>
              </li>
              <li className={styles["header-user-menu-item"]}>
                <a
                  className={styles["header-user-menu-link"]}
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                    authCtx.logout();
                  }}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </React.Fragment>
        )}
        {!userInfo && !loading && (
          <React.Fragment>
            <div className={styles["header-auth"]}>
              <div className={`${styles["header-auth-item"]}`}>
                <Link href="/account/signin">
                  <a>Login</a>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>

      {/* <iframe src="/api/user/jwt" /> */}
    </header>
  );
};

export default Header;
