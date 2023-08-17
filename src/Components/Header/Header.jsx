import Cart from "../Cart/Cart";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h2>Medicine Store</h2>
      <Cart />
    </div>
  );
};

export default Header;
