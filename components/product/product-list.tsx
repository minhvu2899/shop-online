import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../store/product-context";
import styles from "../../styles/product.module.scss";
import ProductItem from "./product-item";
import ProductOptions from "./product-options";
interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  category: string;
}
interface ProductListProps {
  products: ProductItem[];
}
const ProductList = ({ products }: ProductListProps) => {
  const productCtx = useContext(ProductContext);
  const handelFilters = (name: string) => {
    productCtx.onChangeFilters({ category: name });
  };
  const [productFilters, setProductFilters] = useState<ProductItem[]>([]);
  useEffect(() => {
    const newProductFilters = products.filter(
      (product: ProductItem) => product.category === productCtx.filters.category
    );
    setProductFilters(newProductFilters);
  }, [products, productCtx.filters.category]);

  return (
    <div className={styles.product}>
      <ProductOptions />
      <div className={styles["product-list"]}>
        {productFilters.length === 0 &&
          productCtx.filters.category !== "all" && (
            <h4 className={styles["product-list-notfound"]}>
              Not found product
            </h4>
          )}
        {productCtx.filters.category === "all" &&
          products.map((p) => <ProductItem key={p.id} product={p} />)}
        {productFilters.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
