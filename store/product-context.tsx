import React, { createContext, useState } from "react";
interface IFilters {
  category?: string;
}
interface IProductContext {
  filters: IFilters;
  onChangeFilters: (item: IFilters) => void;
}
const ProductContext = createContext<IProductContext>({
  filters: {},
  onChangeFilters: function (filter) {},
});
export default ProductContext;
export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<IFilters>({ category: "all" });

  function onChangeFilters(newFilter: IFilters) {
    setFilters((preFilters) => ({ ...preFilters, ...newFilter }));
  }

  const context = {
    filters,
    onChangeFilters,
  };
  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
}
