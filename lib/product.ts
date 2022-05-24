import axios from "axios";

export async function getAllProduct() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?limit=30`
  );
  return data.products;
}
export async function getAllProductFeatured() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?isFeatured=true`
  );
  return data.products;
}
export async function getProductById(slug: string) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`
  );
  return data.product;
}
