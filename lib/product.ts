import axios from "axios";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
const products = [
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item",
    category: "fruits",
  },
  {
    id: Math.random().toString().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item1",
    category: "vegetable",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item2",
    category: "juice",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item3",
    category: "dried fruits",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item4",
    category: "cereals",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item",
    category: "fruits",
  },
  {
    id: Math.random().toString().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item1",
    category: "vegetable",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item2",
    category: "juice",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item3",
    category: "dried fruits",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item4",
    category: "cereals",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item",
    category: "fruits",
  },
  {
    id: Math.random().toString().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item1",
    category: "vegetable",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item2",
    category: "juice",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item3",
    category: "dried fruits",
  },
  {
    id: Math.random().toString(),
    name: "Product Organic",
    status: "New",
    image: "/images/products/image.png",
    price: 5010000,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    slug: "product-item4",
    category: "cereals",
  },
];
export async function getAllProduct() {
  const { data } = await axios.get("http://localhost:3001/api/v1/products");
  return data.products;
}
export async function getProductById(slug: string) {
  const { data } = await axios.get(
    `http://localhost:3001/api/v1/products/${slug}`
  );
  //   const products = await res.data;
  return data.product;
}
