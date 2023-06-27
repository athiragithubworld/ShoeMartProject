import React from "react";

const CartContext = React.createContext({
  shoeProductList: [],
  totalPrice: 0,
  addProduct: (product) => {},
  productList: [],
  addShoeProducts: (productItem) => {},
});

export default CartContext;
