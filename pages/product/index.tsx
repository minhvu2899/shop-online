import React from "react";
import LayOutAuth from "../../components/laypout/layout-auth";
import ProductList from "../../components/product/product-list";
import styles from "../../styles/product.module.scss";
const ProductPage = () => {
  return (
    <div className={styles["product"]}>
      <div className={styles["product-container"]}>
        <div className={styles["product-left"]}>
          <div className={styles["product-category"]}>
            <h3 className="title-secondary">SHOP</h3>
            <div className={styles["product-category-list"]}>
              <div className={styles["product-category-item"]}>
                <a className={styles["product-category-name"]}>Fruits</a>
              </div>
              <div className={styles["product-category-item"]}>
                <a className={styles["product-category-name"]}>Fruits</a>
              </div>
              <div className={styles["product-category-item"]}>
                <a className={styles["product-category-name"]}>Fruits</a>
              </div>
              <div className={styles["product-category-item"]}>
                <a className={styles["product-category-name"]}>Fruits</a>
              </div>
              <div className={styles["product-category-item"]}>
                <a className={styles["product-category-name"]}>Fruits</a>
              </div>
            </div>
            <h3 className="title-secondary">FILTER BY PRICE</h3>
            <div className={styles["product-filter-price"]}>
              <form className={styles["form-filter-price"]}>
                <div className={styles["form-filter-inputs"]}>
                  <input
                    type="number"
                    className={styles["form-filter-input"]}
                    min="0"
                    max="1000000"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className={styles["form-filter-input"]}
                    min="0"
                    max="1000000"
                  />
                </div>
                <button className={styles["form-filter-btn"]}>Áp dụng</button>
              </form>
            </div>
          </div>
          <div className={styles["product-filters"]}></div>
        </div>
        <div className={styles["product-right"]}>
          <ProductList />
        </div>
      </div>
    </div>
  );
};
ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default ProductPage;
