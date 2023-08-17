import { useRef, useContext } from "react";

import Input from "../UI/Input";
import classes from "./MedicineForm.module.css";
import Button from "../UI/Button";
import MyContext from "../../MyContext/MyContext";
import axios from "axios";

const url = "https://crudcrud.com/api/979a4109de7a437497d8b49339417b39";

const MedicineForm = (props) => {
  const amountInputRef = useRef();
  const myCtx = useContext(MyContext);

  const { med } = props;
  console.log(med);
  const clickHandler = () => {};

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    const medicineItem = {
      ...med,
      amount: +amountInputRef.current.value,
    };
    console.log("medicineItem02", medicineItem);
    try {
      const res = await axios(`${url}/item`);
      if (res.status === 200) {
        const data = await res.data;
        console.log(data);
        const cartItemIndex = data.findIndex(
          (item) => item.id === medicineItem.id
        );
        console.log(cartItemIndex);
        if (cartItemIndex !== -1) {
          medicineItem.amount += data[cartItemIndex].amount;
          const _id = data[cartItemIndex]._id;
          console.log(_id);
          const resPut = await axios.put(`${url}/item/${_id}`, {
            ...medicineItem,
          });
          if (resPut.status !== 200)
            throw new Error("Something went wrong with the put request");
        } else {
          const resPost = await axios.post(`${url}/item`, {
            ...medicineItem,
          });
          if (resPost.status < 200 && resPost.status >= 300)
            throw new Error("Something wrong with the post request");
        }
      } else
        throw new Error("Something went wrong with the initial data fetching");

      // getting updated data
      const resUpdatedGet = await axios(`${url}/item`);
      if (resUpdatedGet.status !== 200)
        throw new Error("Something went wrong with the updated Get Request");
      const getData = resUpdatedGet.data;
      myCtx.addMedicineItem(getData);
    } catch (err) {
      console.log(err);
    }
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
