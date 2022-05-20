import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import LayOutAuth from "../../components/laypout/layout-auth";
import ProductCategory from "../../components/product/product-category";
import ProductFeaturedItem from "../../components/product/product-featured-item";
import ProductList from "../../components/product/product-list";
import { getAllProduct } from "../../lib/product";

import styles from "../../styles/product.module.scss";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  category: string;
}
interface IProductProps {
  products: ProductItem[];
}
const ProductPage = ({ products }: IProductProps) => {
  console.log(products);

  return (
    <div className={styles["product"]}>
      <div className={styles["product-container"]}>
        <div className={styles["product-left"]}>
          <div className={styles["product-category"]}>
            <h3 className="title-secondary">SHOP</h3>
            <ProductCategory />
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
          <h3 className="title-secondary">FEATURED</h3>
          <div className={styles["product-featured"]}>
            <div className={styles["product-featured-list"]}>
              <ProductFeaturedItem />
              <ProductFeaturedItem />
              <ProductFeaturedItem />
              <ProductFeaturedItem />
            </div>
          </div>
        </div>
        <div className={styles["product-right"]}>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProduct();
  return { props: { products } };
};
ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default ProductPage;
