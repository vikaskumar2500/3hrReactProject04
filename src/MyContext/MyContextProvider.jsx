import React, { useState, useReducer, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";
const url = "https://crudcrud.com/api/979a4109de7a437497d8b49339417b39";

const defaultMedicine = {
  medicineList: [],
  totalPrice: 0,
};

const medicineReducer = (state, action) => {
  if (action.type === "ADD") {
    // const medicineItemIndex = state.medicineList.findIndex(
    //   (item) => item.id === action.medicineItem.id
    // );
    // if (medicineItemIndex !== -1) {
    //   state.medicineList[medicineItemIndex].amount += Number(
    //     action.medicineItem.amount
    //   );

    //   return {
    //     medicineList: state.medicineList,
    //     totalPrice:
    //       state.totalPrice +
    //       action.medicineItem.price * action.medicineItem.amount,
    //   };
    // } else {
    let totolPrice = 0;
    for (let item in action.medicineItem) {
      totolPrice += item.price;
    }
    return {
      medicineList: [...action.medicineItem],
      totalPrice: totolPrice,
    };
    // }
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

  useEffect(() => {
    async function fetchItem() {
      try {
        const resUpdatedGet = await axios(`${url}/item`);
        if (resUpdatedGet.status !== 200)
          throw new Error("Something went wrong with the updated Get Request");
        const medicineItem = resUpdatedGet.data;
        // console.log("medicineForm", medicineItem);
        // Added a SET_CART_ITEMS action type
        dispatchMedicine({ type: "ADD", medicineItem: medicineItem });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchItem();

    async function fetchProduct() {
      try {
        const resUpdatedGet = await axios(`${url}/product`);
        if (resUpdatedGet.status !== 200)
          throw new Error("Something went wrong with the updated Get Request");
        const product = resUpdatedGet.data;
        // console.log("medicineForm", product);
        // Added a SET_CART_ITEMS action type
        setFormData(product);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProduct();
  }, []);

  const hiddenHandler = (isTrue) => {
    setIsHidden(isTrue);
  };

  const addMedicineItem = (medicineItem) => {
    dispatchMedicine({ type: "ADD", medicineItem: medicineItem });
  };

  const deleteMedicineItem = (id) => {
    dispatchMedicine({ type: "DELETE", id: id });
  };

  const addFormDataHandler = async (medicine) => {
    setFormData(medicine);
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
