import React, { useState, useReducer } from "react";
import MyContext from "./MyContext";

const defaultMedicine = {
  medicineList: [],
  totalPrice: 0,
};

const medicineReducer = (state, action) => {
  if (action.type === "ADD") {
    const medicineItemIndex = state.medicineList.findIndex(
      (item) => item.id === action.medicineItem.id
    );
    if (medicineItemIndex !== -1) {
      state.medicineList[medicineItemIndex].amount += Number(
        action.medicineItem.amount
      );

      return {
        medicineList: state.medicineList,
        totalPrice:
          state.totalPrice +
          action.medicineItem.price * action.medicineItem.amount,
      };
    } else {
      return {
        medicineList: [...state.medicineList, action.medicineItem],
        totalPrice:
          state.totalPrice +
          action.medicineItem.price * action.medicineItem.amount,
      };
    }
  } else if (action.type === "DELETE") {
    const medicineItemIndex = state.medicineList.findIndex(
      (item) => item.id === action.id
    );

    return {
      medicineList: state.medicineList.filter(
        (medicineItem) =>
          medicineItem.id !== state.medicineList[medicineItemIndex].id
      ),
      totalPrice:
        Math.round(state.totalPrice) -
        Math.round(
          state.medicineList[medicineItemIndex].price *
            state.medicineList[medicineItemIndex].amount
        ),
    };
  } else return defaultMedicine;
};

const MyContextProvider = (props) => {
  const [isHidden, setIsHidden] = useState(false);
  const [formData, setFormData] = useState([]);

  const [medicineState, dispatchMedicine] = useReducer(
    medicineReducer,
    defaultMedicine
  );

  const hiddenHandler = (isTrue) => {
    setIsHidden(isTrue);
  };

  const addMedicineItem = (medicineItem) => {
    dispatchMedicine({ type: "ADD", medicineItem: medicineItem });
  };

  const deleteMedicineItem = (id) => {
    dispatchMedicine({ type: "DELETE", id: id });
  };

  const addFormDataHandler = (medicine) => {
    setFormData(prevData=> [medicine, ...prevData]);
  };

  return (
    <MyContext.Provider
      value={{
        isHidden: isHidden,
        onHiddenHandler: hiddenHandler,

        formData: formData,
        addFormData: addFormDataHandler,

        medicineList: medicineState.medicineList,
        addMedicineItem: addMedicineItem,
        deleteMedicineItem: deleteMedicineItem,
        totalPrice: medicineState.totalPrice,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
