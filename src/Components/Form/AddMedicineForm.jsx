import React, { useRef, useContext, useState } from "react";
import Input from "../UI/Input";
import classes from "./AddMedicineForm.module.css";
import Button from "../UI/Button";
import MyContext from "../../MyContext/MyContext";
import axios from "axios";


const AddMedicineForm = (props) => {
  const [id, setId] = useState(0);
  const myCtx = useContext(MyContext);
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const submitFormHandler = async(e) => {
    e.preventDefault();
    setId(prevId=>prevId+1);
    const object = {
      id: id,
      name: nameInputRef.current.value,
      desc: descInputRef.current.value,
      price: Number(priceInputRef.current.value),
      quantity: Number(quantityInputRef.current.value),
    };

    // sending the data to crudcrud api
    try{
      const response = await axios.post(`https://crudcrud.com/api/45709b7b81da4c5fae88aab8a71944e5/product`, object);
      if(response.status!==200) {
        throw new Error('Something went wrong with the sending product');
      }
      const data = response.data;
      console.log(data);

    }catch(error) {
      alert(error)
    }
   
    

    console.log(object);
    myCtx.addFormData(object);

    // reset all the inputs
    nameInputRef.current.value = "";
    descInputRef.current.value = "";
    priceInputRef.current.value = "";
    quantityInputRef.current.value = "1";
  };
  const clickHandler = () => {};

  return (
    <form className={classes["add-medicine-form"]} onSubmit={submitFormHandler}>
      <Input
        type="text"
        label="Medicine Name"
        id='name'
        name="medicine-name"
        ref={nameInputRef}
      />
      <Input
        type="text"
        label="Description"
        id='description'
        name="discription"
        ref={descInputRef}
      />
      <Input
        type="number"
        label="Price"
        id='price'
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
