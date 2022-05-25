import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
interface ICartItem {
  id: string;
  _id: string;
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
  user: string;
}

interface ICartContext {
  cartItems: ICartItem[];
  updateCartItems: (items: ICartItem[]) => void;
  cartItemsCount: number;
  cartItemsTotal: number;
}
const CartContext = createContext<ICartContext>({
  cartItems: [], // { title, message, status }
  updateCartItems: function (items: ICartItem[]) {},
  cartItemsCount: 0,
  cartItemsTotal: 0,
});
export default CartContext;
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carts, setCart] = useState<ICartItem[]>([]);
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { data } = await axios.get("/api/user/jwt");
        if (!data.userInfo) {
          return;
        }
        const { data: result } = await axios.get("/api/cart");
        setCart(result.carts);
      } catch (error) {
        setCart([]);
      }
    };
    getCartItems();
  }, []);

  const updateCartItemsHandler = useCallback(function (items: ICartItem[]) {
    const newCartItems = [...items];
    setCart(newCartItems);
  }, []);

  const cartItemsCount =
    carts.reduce((count, item) => count + item.quantity, 0) | 0;
  const cartItemsTotal =
    carts.reduce((total, item) => total + item.quantity * item.price, 0) | 0;

  const context = {
    cartItems: carts,
    cartItemsTotal,
    cartItemsCount,
    updateCartItems: updateCartItemsHandler,
  };
  return (
    <CartContext.Provider value={context}>{children} </CartContext.Provider>
  );
}
