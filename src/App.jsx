import { useState } from "react";
// import "./App.css";
import { useTranslation } from "react-i18next";
// components
import SearchBar from "./components/SearchBar";
import ShipmentDetails from "./components/ShipmentDetails";
import DeliveryTimeline from "./components/DeliveryTimeline";
import TransitEvents from "./components/TransitEvents";
// context
import { ShipmentContextProvider } from "./context/ShipmentContext";

// com
// import SearchBar from "./components/SearchBar";

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <>
      <ShipmentContextProvider>
        <SearchBar />
        <ShipmentDetails />
        <DeliveryTimeline />
        <TransitEvents />
      </ShipmentContextProvider>
    </>
  );
}

export default App;
