import classes from "./MedicineItem.module.css";
import MedicineForm from "../Form/MedicineForm";

const MedicineItem = (props) => {
  const {med} = props;

  return (
    <li key={med.id}>
      <div className={classes["medicine-list-item"]}>
        <div className={classes["item-about"]}>
          <div className={classes.name}>{med.name}</div>
          <div className={classes.desc}>{med.desc}</div>
          <div className={classes.price}>{med.price}</div>
        </div>

        <div className={classes["item-form"]}>
          <MedicineForm med = {med}/>
        </div>
      </div>
      <hr />
    </li>
  );
};

export default MedicineItem;
