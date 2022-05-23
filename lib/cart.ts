import axios from "axios";
interface CartItem {
  // id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    status: string;
    slug: string;
  };
  user?: string | null;
}

export async function AddtoCart(item: CartItem) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts`,
    item
  );
  return data.item;
}
export async function getAllCartItems(userId: string) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${userId}/user`
  );
  return data.data;
}
export async function updateCartItem(cartId: string, quantity: number) {
  const { data } = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${cartId}`,
    { quantity }
  );
  return data.data;
}
export async function removeItemFromCart(id: string) {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${id}`
  );
  return data.data;
}
