import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import LayOutAuth from "../../components/laypout/layout-auth";
import ProductCategory from "../../components/product/product-category";
import ProductFeaturedItem from "../../components/product/product-featured-item";
import ProductList from "../../components/product/product-list";
import { getAllProduct, getAllProductFeatured } from "../../lib/product";
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
  productFeatured: ProductItem[];
}
const ProductPage = ({ products, productFeatured }: IProductProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>Shop online - Product list</title>
        <meta name="description" content="Shop online" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                {productFeatured.map((item: ProductItem) => (
                  <ProductFeaturedItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles["product-right"]}>
            <ProductList products={products} />
          </div>
        </div>
      </div>{" "}
    </React.Fragment>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProduct();
  const productFeatured = await getAllProductFeatured();
  return { props: { products, productFeatured } };
};
ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default ProductPage;
