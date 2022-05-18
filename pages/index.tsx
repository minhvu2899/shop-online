import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ProductList from "../components/product/product-list";
import { getAllProduct } from "../lib/product";
import styles from "../styles/Home.module.scss";
import Blog from "./../components/home/blog";
interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
}
interface IHomeProps {
  products: ProductItem[];
}
const Home = ({ products }: IHomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shop Online</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="title-primary">Our Products</h2>
        <ProductList products={products} />
        <Blog />
      </main>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProduct();
  return { props: { products } };
};
export default Home;
