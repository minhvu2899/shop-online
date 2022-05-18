import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import LayOutAuth from "../../components/laypout/layout-auth";
import { getAllProduct, getProductById } from "../../lib/product";
import styles from "../../styles/product-detail.module.scss";
import { formatPrice } from "../../utils";

type PageParams = {
  uuid: string;
};

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    status: string;
    description: string;
    // images: string[];
  };
}
const ProductDetailPage = ({ product }: ProductDetailProps) => {
  console.log(product);
  return (
    <React.Fragment>
      <div className={styles["product-detail"]}>
        <div className={styles["product-detail-thumbnail"]}>
          <div className={styles["product-thumbnail-main"]}>
            <Image
              src={product.image}
              width="1000"
              height="500"
              alt="Product thumbnail"
            />
          </div>
          <div className={styles["product-thumbnail-images"]}>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src={product.image}
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src={product.image}
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src={product.image}
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
            <a className={styles["product-thumbnail-image"]}>
              <Image
                src={product.image}
                width="100"
                height="100"
                alt="Product thumbnail"
                layout="responsive"
              />
            </a>
          </div>
        </div>
        <div className={styles["product-detail-content"]}>
          <h3 className={styles["product-detail-title"]}>{product.name}</h3>
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
          <p className={styles["product-detail-desc"]}>{product.description}</p>
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
      {/* <ProductList products={products} /> */}
    </React.Fragment>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const products = await getAllProduct();

  // Get the paths we want to pre-render based on posts
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
// This also gets called at build time
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1

//   const product = await getProductById(params.slug as string);
//   // Pass post data to the page via props
//   return { props: { product } };
// };
export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { slug: string };
  const product = await getProductById(params.slug as string);
  return {
    props: {
      product,
    },
  };
};
ProductDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default ProductDetailPage;
