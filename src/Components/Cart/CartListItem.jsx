import classes from "./CartListItem.module.css";
import MyContext from "../../MyContext/MyContext";
import React, { useContext } from "react";
import Button from "../UI/Button";

const CartListItem = (props) => {
  
  const myCtx = useContext(MyContext);
  const {medicineItem} = props;

  
  const clickBtnHandler = (id) => {
    myCtx.deleteMedicineItem(id);
  };

  return (
    <li key={medicineItem.id}>
      <div className={classes["list-item"]}>
        <div className={classes.name}>{medicineItem.name}</div>
        <div className={classes.description}>
          <div className={classes.price}>${medicineItem.price.toFixed(2)}</div>
          <div className={classes.amount}>x{medicineItem.amount}</div>
          
          <Button
            type="button"
            label="delete"
            onClickBtn={clickBtnHandler.bind(null, medicineItem.id)}
          />
        </div>
      </div>
      <hr className={classes.hrtag} />
    </li>
  );
};

export default CartListItem;
