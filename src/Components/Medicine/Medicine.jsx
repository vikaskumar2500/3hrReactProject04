import React, {useContext, useEffect} from "react";

import classes from "./Medicine.module.css";
import MedicineItem from "./MedicineItem";
import MyContext from "../../MyContext/MyContext";
import axios from "axios";

const Medicine = (props) => {
  const myCtx = useContext(MyContext);
  useEffect(()=> {
    const fetchedFormData=async()=> {
      try{
        const response = await axios(`https://crudcrud.com/api/45709b7b81da4c5fae88aab8a71944e5/product`);
        if(response.status!==200) throw new Error('Something went wrong with the GET request of FormData');
        const data = response.data;
        myCtx.addFormData(data);
      }catch(error) {
        console.log(error);
      }
    }
    fetchedFormData();
    
  },[])

  
  return (
    <ul key='medicine-list' className={classes["medicine-list"]}>
      {myCtx.formData.map((med) => (
        <MedicineItem med = {med}/>
      ))}
    </ul>
  );
};

export default Medicine;
