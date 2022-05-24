import React, { useContext } from "react";
import ProductContext from "../../store/product-context";
import styles from "../../styles/product.module.scss";
const categories = [
  {
    id: 1,
    name: "all",
    active: true,
  },
  {
    id: 2,
    name: "fruits",
    active: false,
  },
  {
    id: 3,
    name: "vegetable",
    active: false,
  },
  {
    id: 4,
    name: "juices",
    active: false,
  },
  {
    id: 5,
    name: "dried fruits",
    active: false,
  },
  {
    id: 6,
    name: "dried cereals",
    active: false,
  },
];
const ProductOptions = () => {
  const productCtx = useContext(ProductContext);
  const handelOptionClick = (name: string) => {
    productCtx.onChangeFilters({ category: name });
  };
  return (
    <div className={styles["product-option-list"]}>
      {categories.map((f) => (
        <span
          onClick={() => handelOptionClick(f.name)}
          key={f.id}
          className={
            productCtx.filters.category === f.name
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
