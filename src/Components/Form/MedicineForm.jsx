import { useRef, useContext } from "react";

import Input from "../UI/Input";
import classes from "./MedicineForm.module.css";
import Button from "../UI/Button";
import MyContext from "../../MyContext/MyContext";
import axios from "axios";

const url = "https://crudcrud.com/api/45709b7b81da4c5fae88aab8a71944e5";

const MedicineForm = (props) => {
  const amountInputRef = useRef();
  const myCtx = useContext(MyContext);

  const { med } = props;
  const clickHandler = () => {};

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    console.log(amountInputRef);

    const medicineItem = {
      ...med,
      amount: +amountInputRef.current.value,
    };
    try {
      const res = await axios(`${url}/item`);
      if (res.status !== 200)
        throw new Error("Something wrong with the get request");
      const data = res.data;

      const cartItemIndex = data.findIndex(
        (item) => item.id === medicineItem.id
      );
      if (cartItemIndex !== -1) {
        medicineItem.amount += data[cartItemIndex].amount;
        const _id = data[cartItemIndex]._id;
        const resPut = await axios.put(`${url}/item/${_id}`, {
          ...medicineItem,
        });
        if (resPut.status !== 200)
          throw new Error("Something went wrong with the put request");
      } else {
        const resPost = await axios.post(`${url}/item`, {
          ...medicineItem,
        });
        if (resPost.status!==200 && resPost.status!==201) throw new Error('Something wrong with the post request');
      }

      const resUpdatedGet = await axios(`${url}/item`);
      if (resUpdatedGet.status !== 200)
        throw new Error("Something went wrong with the updated Get Request");
      else {
        const cartItems = resUpdatedGet.data;
        myCtx.addMedicineItem(cartItems);
      }
    } catch (err) {
      console.log(err);
    }

    myCtx.addMedicineItem({
      ...props.med,
      amount: +amountInputRef.current.value,
    });
    amountInputRef.current.value = "1";
  };

  return (
    <form
      action="#"
      className={classes["medicine-form"]}
      onSubmit={submitBtnHandler}
    >
      <Input
        type="number"
        label="Amount"
        id="amount"
        name="amount"
        min={1}
        step={1}
        max={10}
        ref={amountInputRef}
        defaultValue={1}
      />
      <Button
        type="submit"
        label="Add To Cart"
        className={classes["add-to-cart"]}
        onClickBtn={clickHandler}
      />
    </form>
  );
};

export default MedicineForm;
