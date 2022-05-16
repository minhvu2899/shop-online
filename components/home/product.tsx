import Image from "next/image";
import React from "react";
import styles from "../../styles/product.module.scss";
const filters = [
  {
    id: 1,
    name: "All",
    active: true,
  },
  {
    id: 2,
    name: "Fruits",
    active: false,
  },
  {
    id: 3,
    name: "Vagetable",
    active: false,
  },
  {
    id: 4,
    name: "Juices",
    active: false,
  },
];
const Product = () => {
  return (
    <div className={styles.product}>
      <h2 className="title-primary">Our Products</h2>
      <div className={styles["product-option-list"]}>
        {filters.map((f) => (
          <span
            key={f.id}
            className={
              f.active
                ? `${styles["product-option-item"]} active`
                : styles["product-option-item"]
            }
          >
            {f.name}
          </span>
        ))}
      </div>
      <div className={styles["product-list"]}>
        <div className={styles["product-item"]}>
          <div className={styles["product-image"]}>
            <Image
              src="/sliders/slider1.png"
              width="250"
              height="250"
              alt="Image"
            />
          </div>
          <span className={styles["product-status"]}>NEW</span>
          <h3 className={styles["product-name"]}>Organic Vegetables</h3>
          <p className={styles["product-price"]}>$501.00</p>
          <div className={styles["product-cta"]}>
            <ul className={styles["product-cta-list"]}>
              <li className={styles["product-cta-item"]}>
                <a className={styles["product-cta-link"]}>
                  <Image
                    src="/icons/cart.svg"
                    width={30}
                    height={30}
                    alt="Image"
                  />
                </a>
              </li>
              <li className={styles["product-cta-item"]}>
                <a className={styles["product-cta-link"]}>
                  <Image
                    src="/icons/cart.svg"
                    width={30}
                    height={30}
                    alt="Image"
                  />
                </a>
              </li>
              <li className={styles["product-cta-item"]}>
                <a className={styles["product-cta-link"]}>
                  <Image
                    src="/icons/cart.svg"
                    width={30}
                    height={30}
                    alt="Image"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["product-item"]}>
          <div className={styles["product-image"]}>
            <Image
              src="/sliders/slider1.png"
              width="250"
              height="250"
              alt="Image"
            />
          </div>
          <span className={styles["product-status"]}>NEW</span>
          <h3 className={styles["product-name"]}>Organic Vegetables</h3>
          <p className={styles["product-price"]}>$501.00</p>
        </div>
        <div className={styles["product-item"]}>
          <div className={styles["product-image"]}>
            <Image
              src="/sliders/slider1.png"
              width="250"
              height="250"
              alt="Image"
            />
          </div>
          <span className={styles["product-status"]}>NEW</span>
          <h3 className={styles["product-name"]}>Organic Vegetables</h3>
          <p className={styles["product-price"]}>$501.00</p>
        </div>
        <div className={styles["product-item"]}>
          <div className={styles["product-image"]}>
            <Image
              src="/sliders/slider1.png"
              width="250"
              height="250"
              alt="Image"
            />
          </div>
          <span className={styles["product-status"]}>NEW</span>
          <h3 className={styles["product-name"]}>Organic Vegetables</h3>
          <p className={styles["product-price"]}>$501.00</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
