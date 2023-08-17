import React, { useContext } from "react";
import classes from "./Cart.module.css";
import cartImage from "../../image/cart.jpg";
import MyContext from "../../MyContext/MyContext";

const Cart = () => {
  const cartCtx = useContext(MyContext);

  const totalAmount = cartCtx.medicineList.reduce(
    (total, medicineItem) => total + medicineItem.amount,
    0
  );

  const cartItemHandler = () => {
    cartCtx.onHiddenHandler(true);
  };

  return (
    <button type="button" className={classes.cart} onClick={cartItemHandler}>
      <img src={cartImage} alt="images not found" />
      <div className={classes["add-cart"]}>Add To Cart</div>
      <div className={classes.bedge}>{totalAmount}</div>
    </button>
  );
};

export default Cart;
