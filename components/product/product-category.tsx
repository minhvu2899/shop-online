import React, { useContext } from "react";
import styles from "../../styles/product.module.scss";
import ProductContext from "../../store/product-context";
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
const ProductCategory = () => {
  const productCtx = useContext(ProductContext);

  return (
    <div className={styles["product-category-list"]}>
      {categories.map((category) => (
        <div
          className={
            productCtx.filters.category === category.name
              ? `${styles["product-category-item"]} active`
              : styles["product-category-item"]
          }
          key={category.id}
          onClick={() =>
            productCtx.onChangeFilters({ category: category.name })
          }
        >
          <a className={styles["product-category-name"]}>{category.name}</a>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
