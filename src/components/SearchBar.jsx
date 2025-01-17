import { useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShipmentContext } from "../hooks/useShipmentContext";
//localization
import { useTranslation, Trans } from "react-i18next";

const Div = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  --rad: 0.5rem;
  position: absolute;
  left: 0;
  background: #e30613;
  border: none;
  border-radius: var(--rad) 0 0 var(--rad);
  cursor: pointer;
  height: 100%;
  padding: 0.5rem;
  img {
    width: 1.5rem;
  }
`;

const Input = styled.input`
  --rad: 0.5rem;
  border: none;
  background: #f5f5f5;
  width: 100%;
  border-radius: var(--rad);
  height: 100%;
  padding: 0.5rem;
  padding-left: 3rem;
  &:focus {
    outline: none;
  }
  font-family: "Lato", serif;
  font-weight: 600;
  font-size: 17px;
  font-style: normal;
  font-align: center;
`;

const Label = styled.label`
  display: none;
`;

function SearchBar({}) {
  const { shipment, dispatch } = useShipmentContext();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");

  const { t } = useTranslation();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!trackingNumber) {
      setError(t("emptyInput"));
      toast.error(error);
      return;
    }
    // fetch
    //TODO: Use axios instead of fetch
    const response = await fetch(
      `https://tracking.bosta.co/shipments/track/${trackingNumber}`,
      {
        method: "GET",
        headers: {
          "x-requested-by": "Bosta",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      setError(t("error_message"));
      toast.error(error);
    } else {
      setError(null);
      console.log(data);
      dispatch({ type: "SET_SHIPMENT", payload: data });
    }
  };

  return (
    <div>
      <form className="search" onSubmit={handleSearch}>
        <Div className="search-bar">
          <Button>
            <img src={searchIcon} alt="Search" />
          </Button>
          <Label>{t("TrackingNumber")}</Label>
          <Input
            type="text"
            onChange={(e) => setTrackingNumber(e.target.value.trim())}
            value={trackingNumber}
          />
        </Div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SearchBar;
