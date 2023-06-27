import React, { useState } from "react";
import ShoeEcommerce from "./Components/ShoeEcommerce";
import ShoeCart from "./Components/ShoeCart";
import CartProvider from "./Store/CartProvider";

function App() {
  const [opencart, setOpenCart] = useState(false);

  const clickOpenCart = () => {
    setOpenCart(true);
  };

  const closeCart = () => {
    setOpenCart(false);
  };

  return (
    <CartProvider>
      <ShoeEcommerce onClick={clickOpenCart}></ShoeEcommerce>
      {opencart && <ShoeCart onClose={closeCart}></ShoeCart>}
    </CartProvider>
  );
}

export default App;
