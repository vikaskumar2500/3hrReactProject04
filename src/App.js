import React from "react";
import AddMedicineForm from "./Components/Form/AddMedicineForm";
import Medicine from "./Components/Medicine/Medicine";
import Header from "./Components/Header/Header";
import CartList from "./Components/Cart/CartList";
import classes from "./App.module.css";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <section className={classes.section}>
        <AddMedicineForm />
        <Medicine />
      </section>
      <CartList />
    </React.Fragment>
  );
};

export default App;
