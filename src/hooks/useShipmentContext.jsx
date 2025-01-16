import { ShipmentContext } from "../context/ShipmentContext";
import { useContext } from "react";

const useShipmentContext = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error(
      "useShipmentContext must be used within a ShipmentContextProvider"
    );
  }
  return context;
}

export { useShipmentContext };
