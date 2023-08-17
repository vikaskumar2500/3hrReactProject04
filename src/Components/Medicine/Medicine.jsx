import React, { useContext} from "react";

import classes from "./Medicine.module.css";
import MedicineItem from "./MedicineItem";
import MyContext from "../../MyContext/MyContext";

const Medicine = (props) => {
  const myCtx = useContext(MyContext);
  
  return (
    <ul key="medicine-list" className={classes["medicine-list"]}>
      {myCtx.formData.map((data) => (
        <MedicineItem med={data} />
      ))}
    </ul>
  );
};

export default Medicine;
