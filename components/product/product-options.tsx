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
const ProductOptions = () => {
  return (
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
  );
};

export default ProductOptions;
