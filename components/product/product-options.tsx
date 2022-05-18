import React, { useState } from "react";
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
  const [isActive, setIsActive] = useState(false);
  const [indexActive, setIndexActive] = useState(0);
  const handelOptionClick = (idx: number) => {
    console.log(idx);
    setIndexActive(idx);
  };
  return (
    <div className={styles["product-option-list"]}>
      {filters.map((f, idx) => (
        <span
          onClick={() => handelOptionClick(idx)}
          key={f.id}
          className={
            indexActive === idx
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
