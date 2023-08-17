// import classes from "./CartListItems.module.css";  
import React, { useContext } from "react";
import MyContext from "../../MyContext/MyContext";
import CartListItem from "./CartListItem";

const CartListItems = () => {
  const myCtx = useContext(MyContext);

  return (
    <ul>
      {myCtx.medicineList.map((medicineItem) => (
        <CartListItem medicineItem={medicineItem}/>
      ))}
    </ul>
  );
};

export default CartListItems;
