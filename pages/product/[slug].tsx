import axios from "axios";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextApiRequest,
} from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useSWR from "swr";
import LayOutAuth from "../../components/laypout/layout-auth";
import ProductList from "../../components/product/product-list";
import {
  getAllProduct,
  getAllProductFeatured,
  getProductById,
} from "../../lib/product";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/product-detail.module.scss";
import { formatPrice } from "../../utils";

interface ProductItem {
  id: string;
  name: string;
  status: string;
  description: string;
  price: number;
  category: string;
  isFeatured: boolean;
  slug: string;
  image: string;
}

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    status: string;
    description: string;
    price: number;
    category: string;
    isFeatured: boolean;
    slug: string;
    image: string;
  };
}
const ProductDetailPage = ({ product }: ProductDetailProps) => {
  const fetcher = async (url: string) => {
    const result = await axios.get(url);
    return result.data.products;
  };
  const router = useRouter();
  const slug = router.query.slug;
  const { data: producstRelated, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}/related`,
    fetcher
  );

  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
  const inputQuantityRef = React.useRef<HTMLInputElement>(null);
  const handelAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputQuantityRef.current?.value) {
      return;
    }
    // cartCtx.addToCart({
    //   name: product.name,
    //   image: product.image,
    //   price: product.price,
    //   product,
    //   quantity: +inputQuantityRef.current.value,
    //   user: "1111111",
    // });
    notificationCtx.showNotification({
      message: `Add ${product.name} to your cart`,
      status: "success",
    });
  };
  return (
    <React.Fragment>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
          <form className={styles["form-add"]} onSubmit={handelAddToCart}>
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
                ref={inputQuantityRef}
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
      {!producstRelated && <p>Loading...</p>}
      {producstRelated && <ProductList products={producstRelated} />}
    </React.Fragment>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const products = await getAllProductFeatured();

  // Get the paths we want to pre-render based on posts
  const paths = products.map((product: ProductItem) => ({
    params: { slug: product.slug as string },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
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
  try {
    const product = await getProductById(params.slug);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

ProductDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default ProductDetailPage;
