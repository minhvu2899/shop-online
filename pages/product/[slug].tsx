import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import LayOutAuth from "../../components/laypout/layout-auth";
import Loading from "../../components/loading";
import ProductContent from "../../components/product/product-content";
import ProductList from "../../components/product/product-list";
import ProductThumbnail from "../../components/product/product-thumbnail";
import { AddtoCart, getAllCartItems } from "../../lib/cart";
import { getAllProductFeatured, getProductById } from "../../lib/product";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import NotificationContext from "../../store/notification-context";
import styles from "../../styles/product-detail.module.scss";

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
const fetcherProductRelated = async (url: string) => {
  const result = await axios.get(url);
  return result.data.products;
};
const ProductDetailPage = ({ product }: ProductDetailProps) => {
  const authCtx = useContext(AuthContext);
  const { login } = authCtx;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const slug = router.query.slug;
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
  const inputQuantityRef = React.useRef<HTMLInputElement>(null);
  const { data: producstRelated, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}/related`,
    fetcherProductRelated
  );
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("/api/user/jwt");
      login(data);
    };
    getUserInfo();
  }, [login]);

  if (!product) {
    return <Loading />;
  }
  const handelAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!authCtx.userInfo) {
        notificationCtx.showNotification({
          message: `Please login`,
          status: "error",
        });
        setIsLoading(false);
        return;
      }
      if (!inputQuantityRef.current?.value) {
        setIsLoading(false);
        return;
      }

      await AddtoCart({
        name: product.name,
        image: product.image,
        price: product.price,
        product,
        quantity: +inputQuantityRef.current.value,
        user: authCtx.userInfo.userId,
      });
      const cartItems = await getAllCartItems(authCtx.userInfo.userId);
      cartCtx.updateCartItems(cartItems);
      setIsLoading(false);
      notificationCtx.showNotification({
        message: `Add ${product.name} to your cart`,
        status: "success",
      });
    } catch (error) {
      setIsLoading(false);
      notificationCtx.showNotification({
        message: `Something went wrong`,
        status: "error",
      });
    }
  };
  return (
    <React.Fragment>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isLoading && <Loading />}
      <div className={styles["product-detail"]}>
        <ProductThumbnail product={product} />
        <div className={styles["product-detail-content"]}>
          <ProductContent product={product} />
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
