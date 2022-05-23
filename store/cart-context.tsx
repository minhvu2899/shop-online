import React, { createContext, useCallback, useState } from "react";
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
  setQuantity: (id: string, quantity: number) => void;
  updateCartItems: (items: ICartItem[]) => void;
  cartItemsCount: number;
  cartItemsTotal: number;
}
const CartContext = createContext<ICartContext>({
  cartItems: [], // { title, message, status }
  updateCartItems: function (items: ICartItem[]) {},
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
  const [carts, setCart] = useState<ICartItem[]>([]);
  function setQuantityHandler(id: string, quantity: number) {
    //check if product is available in cart
    const index = carts.findIndex((x) => x.id === id);
    if (index >= 0) {
      const newItems = [...carts];
      if (quantity > 30) {
        newItems[index].quantity = 30;
      } else {
        newItems[index].quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      setCart(newItems);
    }
  }

  const updateCartItemsHandler = useCallback(function (items: ICartItem[]) {
    const newCartItems = [...items];
    setCart(newCartItems);
  }, []);

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
    cartItemsTotal,
    cartItemsCount,
    setQuantity: setQuantityHandler,
    updateCartItems: updateCartItemsHandler,
  };
  return (
    <CartContext.Provider value={context}>{children} </CartContext.Provider>
  );
}
