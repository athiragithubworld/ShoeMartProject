import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  const [shoeProductLists, setShoeProductLists] = useState([]);

  const [productLists, setProductList] = useState([]);

  let shoeProductObj = {};

  useEffect(() => {
    // ---------------get items from addproductbutton--------//
    axios
      .get(
        "https://crudcrud.com/api/508fc0eff4af491a9919eb9bb8043cb2/addedProducts"
      )
      .then((response) => {
        // console.log("1x1", response.data);

        shoeProductObj = response.data;
        setProductList(shoeProductObj);
      })

      .catch((error) => {
        console.log(error);
      });

    // ------- get items from carts --------//

    axios
      .get(
        `https://crudcrud.com/api/508fc0eff4af491a9919eb9bb8043cb2/cartProducts`
      )
      .then((response) => {
        // console.log("get the data", response.data);

        setShoeProductLists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  add items to addedproducts
  const addShoeProductHandler = (shoeitem) => {
    // save to crudcrud server
    axios
      .post(
        "https://crudcrud.com/api/508fc0eff4af491a9919eb9bb8043cb2/addedProducts",
        shoeitem
      )
      .then((response) => {
        // console.log(response);

        setProductList([...productLists, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add items to cart
  const addProductHandler = (item) => {
    console.log("item", item);
    let cartpdt = [...shoeProductLists];

    let hasProduct = false,
      cartId = null,
      large = "",
      medium = "",
      small = "";

    cartpdt.forEach((product) => {
      // console.log("addProductHandler", cartpdt);
      if (product.id === item.id) {
        hasProduct = true;
        product.quantityLarge =
          Number(product.quantityLarge) + Number(item.quantityLarge);
        product.quantityMedium =
          Number(product.quantityMedium) + Number(item.quantityMedium);
        product.quantitySmall =
          Number(product.quantitySmall) + Number(item.quantitySmall);

        large = product.quantityLarge;
        medium = product.quantityMedium;
        small = product.quantitySmall;
        cartId = product._id;
      }
    });

    if (hasProduct) {
      const largevalue = large.toString();
      const mediumvalue = medium.toString();
      const smallvalue = small.toString();
      console.log("cartid", cartId);
      axios
        .put(
          `https://crudcrud.com/api/508fc0eff4af491a9919eb9bb8043cb2/cartProducts/${cartId}`,
          {
            id: item.id,
            billName: item.name,
            billDescription: item.description,
            billPrice: item.price,
            quantityLarge: largevalue,
            quantityMedium: mediumvalue,
            quantitySmall: smallvalue,
          }
        )
        .then((response) => {
          // console.log("update data", response.data);
          setShoeProductLists((prevPdt) => {
            return [...prevPdt];
          });
          // setProductList([...productLists]);
        })
        .catch((err) => {
          console.log(err);
        });

      // setMedProductLists(cartpdt);
    } else {
      const largevalue = item.quantityLarge.toString();
      const mediumvalue = item.quantityMedium.toString();
      const smallvalue = item.quantitySmall.toString();
      axios
        .post(
          `https://crudcrud.com/api/508fc0eff4af491a9919eb9bb8043cb2/cartProducts`,
          {
            // medProductid: item._id,
            id: item.id,
            billName: item.name,
            billDescription: item.description,
            billPrice: item.price,
            quantityLarge: largevalue,
            quantityMedium: mediumvalue,
            quantitySmall: smallvalue,
          }
        )
        .then((response) => {
          // console.log("get post data", response.data);
          setShoeProductLists((prevPdt) => {
            return [...prevPdt, response.data];
          });
        })
        .catch((error) => {
          console.log(error);
        });
      // setMedProductLists((prevPdt) => {
      //   return [...prevPdt, item];
      // });
    }
  };

  const cartitem = {
    shoeProductList: shoeProductLists,
    totalPrice: 0,
    addProduct: addProductHandler,
    // quantityLarge: 0,
    // quantityMedium: 0,
    // quantitySmall: 0,
    productList: productLists,
    addShoeProducts: addShoeProductHandler,
  };

  return (
    <CartContext.Provider value={cartitem}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
