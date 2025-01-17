import { Suspense, useState } from "react";
// import "./App.css";
//localization
import { useTranslation, Trans } from "react-i18next";
// components
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ShipmentDetails from "./components/ShipmentDetails";
import DeliveryTimeline from "./components/DeliveryTimeline";
import TransitEvents from "./components/TransitEvents";
// context
import { ShipmentContextProvider } from "./context/ShipmentContext";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ShipmentContextProvider>
          <Header headText={t("headText")} />
          <ShipmentDetails />
          <DeliveryTimeline />
          <TransitEvents />
        </ShipmentContextProvider>
      </Suspense>
    </>
  );
}

export default App;
