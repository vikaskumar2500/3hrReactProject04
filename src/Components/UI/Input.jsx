import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        min={props.min}
        step={props.step}
        ref={ref}
        placeholder={`please enter ${props.name}...`}
        defaultValue={props.defaultValue} 
        required
      />
    </div>
  );
});

export default Input;
