import Image from "next/image";
import React from "react";
import LayOutAuth from "../../components/laypout/layout-auth";
import ProductList from "../../components/product/product-list";
import styles from "../../styles/product-detail.module.scss";
import { formatPrice } from "../../utils";
const ProductDetailPage = () => {
  return (
    <React.Fragment>
      <div className={styles["product-detail"]}>
        <div className={styles["product-detail-thumbnail"]}>
          <div className={styles["product-thumbnail-main"]}>
            <Image
              src="/sliders/slider1.png"
              width="1000"
              height="500"
              alt="Product thumbnail"
            />
          </div>
          <div className={styles["product-thumbnail-images"]}>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src="/sliders/slider1.png"
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src="/sliders/slider1.png"
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src="/sliders/slider1.png"
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src="/sliders/slider1.png"
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
          </div>
        </div>
        <div className={styles["product-detail-content"]}>
          <h3 className={styles["product-detail-title"]}>
            Product name product nane
          </h3>
          <div className={styles["product-detail-stars"]}>
            <Image
              src="/icons/star.svg"
              className={styles["product-detail-star"]}
              width="20"
              height="20"
              alt="Star"
            />
            <Image
              src="/icons/star.svg"
              className={styles["product-detail-star"]}
              width="20"
              height="20"
              alt="Star"
            />
            <Image
              src="/icons/star.svg"
              className={styles["product-detail-star"]}
              width="20"
              height="20"
              alt="Star"
            />
            <Image
              src="/icons/star.svg"
              className={styles["product-detail-star"]}
              width="20"
              height="20"
              alt="Star"
            />
            <Image
              src="/icons/star.svg"
              className={styles["product-detail-star"]}
              width="20"
              height="20"
              alt="Star"
            />
          </div>
          <div className={styles["product-detail-price"]}>
            <span>{formatPrice(100000)}</span>
          </div>
          <p className={styles["product-detail-desc"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            ligula justo, aco nsectetur adipisicing elitur tantas regiones barba
            rorum peat dibus obiit, tot mariataelitur uctor id posuere sed,
            gravida non odio. Consectetur adipisicing elitur tantas regiones
            barbarorum peat dibus obiit, tot mariataelitur
          </p>
          <form className={styles["form-add"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="quantity" className={styles["form-label"]}>
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="10"
                name="quantity"
                id="quantity"
                className={styles["form-input-quantity"]}
              />
            </div>
            <button type="submit" className={styles["form-btn-add"]}>
              <Image
                src="/icons/cart1.svg"
                width="20"
                height="20"
                alt="Add to cart"
              />
              Add To Cart
            </button>
          </form>
        </div>
      </div>
      <h2 className="title-primary">Product Related</h2>
      <ProductList />
    </React.Fragment>
  );
};
ProductDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default ProductDetailPage;
