import React, { useContext } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import classes from "./CartList.module.css";
import MyContext from "../../MyContext/MyContext";
import CartListItem from "./CartListItems";

const CartList = () => {
  const myCtx = useContext(MyContext);

  const closeButtonHandler = () => {
    myCtx.onHiddenHandler(false);
  };

  return (
    <Modal>
      <div className={classes["cart-list"]}>
        {/* <div className={classes.name}>{medicineItem.name}</div> */}
        <CartListItem/>
        <div className={classes.price}>
          <h3>Total Price</h3>
          <div className={classes["total-price"]}>${myCtx.totalPrice}</div>
        </div>
        <div className={classes.actions}>
          <Button
            type="button"
            label="Close"
            className={classes.close}
            onClickBtn={closeButtonHandler}
          />
          <Button type="button" label="Order" />
        </div>
      </div>
    </Modal>
  );
};

export default CartList;
