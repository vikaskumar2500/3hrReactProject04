import React from "react";

const MyContext = React.createContext({
  isHidden: null,
  onHiddenHandler: () => {},
  formData: [],
  addFormData: () => {},
  medicineList: [],
  addMedicineItem: () => {},
  deleteMedicineItem: () => {},
  totalPrice: 0,
});

export default MyContext;
