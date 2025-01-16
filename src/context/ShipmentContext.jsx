import { createContext, useReducer } from "react";

export const ShipmentContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SHIPMENT":
      return { shipment: action.payload };
    default:
      return state;
  }
};

const ShipmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { shipment: null });
  return (
    <ShipmentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export { ShipmentContextProvider };