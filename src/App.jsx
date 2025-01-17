import { Suspense, useState, useEffect } from "react";
import "./App.css";

//localization
import { useTranslation, Trans } from "react-i18next";
// components
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MyCard from "./components/Card";
import TransitEvents from "./components/TransitEvents";
// context
import { ShipmentContextProvider } from "./context/ShipmentContext";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ShipmentContextProvider>
          <Header headText={t("headText")} />
          <MyCard />
          <TransitEvents />
        </ShipmentContextProvider>
      </Suspense>
    </>
  );
}

export default App;
