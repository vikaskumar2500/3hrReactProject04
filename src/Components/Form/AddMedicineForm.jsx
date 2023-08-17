import React, { useRef, useContext } from "react";
import Input from "../UI/Input";
import classes from "./AddMedicineForm.module.css";
import Button from "../UI/Button";
import MyContext from "../../MyContext/MyContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const url = "https://crudcrud.com/api/979a4109de7a437497d8b49339417b39";
const AddMedicineForm = (props) => {
  const myCtx = useContext(MyContext);
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const object = {
      id: uuidv4(),
      name: nameInputRef.current.value,
      desc: descInputRef.current.value,
      price: Number(priceInputRef.current.value),
    };

    // sending the data to crudcrud api
    try {
      const response = await axios.post(`${url}/product`, object);
      console.log(response.status);
      if (response.status !== 201) {
        throw new Error("Something went wrong post request ,addMedicineForm");
      }

      const res = await axios(`${url}/product`);
      console.log(response.status);
      if (res.status !== 200)
        throw new Error(
          "Something went wrong with the get request , addMedicineForm"
        );
      const data = res.data;
      console.log(data);
      myCtx.addFormData(data);
    } catch (error) {
      alert(error);
    }

    // console.log(object);
    // myCtx.addFormData(object);

    // reset all the inputs
    nameInputRef.current.value = "";
    descInputRef.current.value = "";
    priceInputRef.current.value = "";
  };
  const clickHandler = () => {};

  return (
    <form className={classes["add-medicine-form"]} onSubmit={submitFormHandler}>
      <Input
        type="text"
        label="Medicine Name"
        id="name"
        name="medicine-name"
        ref={nameInputRef}
      />
      <Input
        type="text"
        label="Description"
        id="description"
        name="discription"
        ref={descInputRef}
      />
      <Input
        type="number"
        label="Price"
        id="price"
        name="price"
        min={0.01}
        step={0.01}
        ref={priceInputRef}
      />
      <Button type="submit" label="Add medicine" onClickBtn={clickHandler} />
    </form>
  );
};

export default AddMedicineForm;
