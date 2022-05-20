import axios from "axios";

export async function getAllProduct() {
  const { data } = await axios.get("http://localhost:3001/api/v1/products");
  return data.products;
}
export async function getAllProductFeatured() {
  const { data } = await axios.get(
    "http://localhost:3001/api/v1/products?isFeatured=true"
  );
  return data.products;
}
export async function getProductById(slug: string) {
  const { data } = await axios.get(
    `http://localhost:3001/api/v1/products/${slug}`
  );
  return data.product;
}
