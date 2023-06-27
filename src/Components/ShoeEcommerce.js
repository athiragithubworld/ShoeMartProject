import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import CartContext from "../Store/CartContext";

const ShoeEcommerce = (props) => {
  const cartcntx = useContext(CartContext);
  // console.log("get the meditem", cartcntx.productList);

  const [productList, setProductList] = useState([]);

  const name = useRef("");
  const description = useRef("");
  const price = useRef("");
  const large = useRef("");
  const medium = useRef("");
  const small = useRef("");

  useEffect(() => {
    setProductList(cartcntx.productList);
  }, [cartcntx.productList]);

  const addProductsHandler = (event) => {
    event.preventDefault();

    // const enteredName = name.current.value;
    // const enteredDescription = description.current.value;
    // const enteredPrice = price.current.value;
    // const enteredLargeQt = large.current.value;
    // const enteredMediumQt = medium.current.value;
    // const enteredSmallQt = small.current.value;

    const shoeproducts = {
      id: Math.random().toString(),
      name: name.current.value,
      description: description.current.value,
      price: price.current.value,
      largeQt: large.current.value,
      mediumQt: medium.current.value,
      smallQt: small.current.value,
    };

    if (
      name.current.value !== "" &&
      description.current.value !== "" &&
      price.current.value !== "" &&
      large.current.value !== "" &&
      medium.current.value !== "" &&
      small.current.value !== ""
    ) {
      cartcntx.addShoeProducts(shoeproducts);
    }

    // clear the data
    name.current.value = "";
    description.current.value = "";
    price.current.value = "";
    large.current.value = "";
    medium.current.value = "";
    small.current.value = "";
  };

  const QuantityHandler = (item, qname) => {
    let squantity = 0;
    if (qname === "large") {
      squantity = Number(item.largeQt) - 1;
    } else if (qname === "medium") {
      squantity = Number(item.mediumQt) - 1;
    } else if (qname === "small") {
      squantity = Number(item.smallQt) - 1;
    }
    let quantity = {};
    productList.map((product) => {
      if (product.id === item.id) {
        if (qname === "large") {
          quantity = { ...product, largeQt: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 1,
              quantityMedium: 0,
              quantitySmall: 0,
            });
          }
        } else if (qname === "medium") {
          quantity = { ...product, mediumQt: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 0,
              quantityMedium: 1,
              quantitySmall: 0,
            });
          }
        } else if (qname === "small") {
          quantity = { ...product, smallQt: squantity };
          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 0,
              quantityMedium: 0,
              quantitySmall: 1,
            });
          }
        }
      }
    });
    // console.log("getlastquantity", quantity);
    if (quantity) {
      const { _id, ...rest } = quantity;
      axios
        .put(
          `https://crudcrud.com/api/508fc0eff4af491a9919eb9bb8043cb2/addedProducts/${item._id}`,
          rest
        )
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form>
        <label>Name</label>
        <input type="text" ref={name} required></input>
        <label>Description</label>
        <input type="text" ref={description} required></input>
        <label>Price</label>
        <input type="text" ref={price} required></input>
        <label>Large</label>
        <input type="number" ref={large} required></input>
        <label>Medium</label>
        <input type="number" ref={medium} required></input>
        <label>Small</label>
        <input type="number" ref={small} required></input>
        <button onClick={addProductsHandler}>Add Products</button>
      </form>
      <button onClick={props.onClick}>
        <span>Cart</span>
        <span>
          -
          {cartcntx.shoeProductList.reduce(
            (a, v) =>
              (a =
                Number(a) +
                Number(
                  Number(v.quantityLarge) +
                    Number(v.quantityMedium) +
                    Number(v.quantitySmall)
                )),
            0
          )}
          -
        </span>
      </button>
      <ul>
        {productList.map((item) => {
          return (
            <li style={{ listStyle: "none" }} key={item.id}>
              {item.name} - {item.description} - Rs {item.price}
              <button
                onClick={() => {
                  QuantityHandler(item, "large");
                }}
              >
                Large ({item.largeQt}) Qt
              </button>
              <button
                onClick={() => {
                  QuantityHandler(item, "medium");
                }}
              >
                Medium( {item.mediumQt} )Qt
              </button>
              <button
                onClick={() => {
                  QuantityHandler(item, "small");
                }}
              >
                Small ({item.smallQt}) Qt
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ShoeEcommerce;
