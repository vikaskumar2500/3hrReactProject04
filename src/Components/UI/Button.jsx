import classes from "./Button.module.css";

const Button = (props) => {
  const buttonHandler = () => {
    props.onClickBtn();
  };

  return (
    <button
      type={props.type}
      className={classes.button}
      onClick={buttonHandler}
    >
      {props.label}
    </button>
  );
};

export default Button;
