import React, { useContext } from "react";
import classes from "./ShoeCart.module.css";
import CartContext from "../Store/CartContext";

const ShoeCart = (props) => {
  const cartcntx = useContext(CartContext);

  return (
    <form onClick={props.onClose} className={classes.CartForm}>
      <ul className={classes["cart-items"]}>
        {cartcntx.shoeProductList.map((item) => {
          let totalprice =
            Number(item.billPrice) *
            Number(
              Number(item.quantityLarge) +
                Number(item.quantityMedium) +
                Number(item.quantitySmall)
            );
          return (
            <li key={item.id}>
              Name : {item.billName} - Descp : {item.billDescription} - Price :
              {item.billPrice}- L {Number(item.quantityLarge)} - M{" "}
              {Number(item.quantityMedium)}- S {Number(item.quantitySmall)}
              <span> Total Price : {totalprice}</span>
            </li>
          );
        })}
      </ul>

      <div className={classes.total}>
        <span>Total Amount : </span>
        <span>
          ${/* {console.log("cartvisible", cartcntx.shoeProductList)} */}
          {cartcntx.shoeProductList.reduce(
            (a, v) =>
              (a =
                Number(a) +
                Number(v.billPrice) *
                  Number(
                    Number(v.quantityLarge) +
                      Number(v.quantityMedium) +
                      Number(v.quantitySmall)
                  )),
            0
          )}{" "}
        </span>
      </div>
      <div className={classes.button}>
        <button>Product Order</button>
        <button>Close</button>
      </div>
    </form>
  );
};

export default ShoeCart;
