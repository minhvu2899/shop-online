import React, { createContext, useState } from "react";
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  status: string;
  slug: string;
  quantity: number;
}
interface ICartContext {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  deteteToCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  cartItemsCount: number;
  cartItemsTotal: number;
}
const CartContext = createContext<ICartContext>({
  cartItems: [], // { title, message, status }
  addToCart: function (newItem: CartItem) {},
  deteteToCart: function (id: string) {},
  setQuantity: function (id: string, quantity: number) {},
  cartItemsCount: 0,
  cartItemsTotal: 0,
});
export default CartContext;
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const initCartItems = JSON.parse(localStorage.getItem("cartItems")!) || [];
  // const initCartItems = JSON.parse(localStorage.getItem("cartItems")!) || [];
  const [carts, setCart] = useState<CartItem[]>([]);
  function addToCartHandler(newItem: CartItem) {
    const newCartItems = [...carts];
    const index = carts.findIndex((x: CartItem) => x.id === newItem.id);
    if (index >= 0) {
      newCartItems[index].quantity += newItem.quantity;
    } else {
      newCartItems.push(newItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCart(newCartItems);
  }
  function setQuantityHandler(id: string, quantity: number) {
    //check if product is available in cart
    const index = carts.findIndex((x) => x.id === id);
    if (index >= 0) {
      const newItems = [...carts];
      newItems[index].quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      setCart(newItems);
    }
  }
  function deteteToCartHandler(id: string) {
    const newCartItems = carts.filter((item: CartItem) => item.id !== id);
    setCart(newCartItems);
  }
  const cartItemsCount = carts.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const cartItemsTotal = carts.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const context = {
    cartItems: carts,
    addToCart: addToCartHandler,
    deteteToCart: deteteToCartHandler,
    cartItemsTotal,
    cartItemsCount,
    setQuantity: setQuantityHandler,
  };
  return (
    <CartContext.Provider value={context}>{children} </CartContext.Provider>
  );
}
