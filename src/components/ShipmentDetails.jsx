import { useShipmentContext } from "../hooks/useShipmentContext";
import styled from "styled-components";
//localization
import { useTranslation, Trans } from "react-i18next";

const OrderNumber = styled.p`
  font-family: "Rubik", serif;
  font-weight: 400;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 12px;
  text-transform: uppercase;
`;

const StatusMessage = styled.p``;

const DateP = styled.p`
  color: #0098a5;
  padding-left: 5px;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: "Rubik", serif;
  font-weight: 600;
  font-style: normal;
  font-size: 24px;
  font-optical-sizing: auto;
`;

const TimeDiff = styled.p`
  font-family: "Rubik", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  color: #667085;
`;

function ShipmentDetails({}) {
  const { t, i18n } = useTranslation();

  const { shipment, dispatch } = useShipmentContext();
  if (!shipment) return null;

  var PromisedDate = new Date(shipment.PromisedDate);
  var timeStamp = new Date(shipment.CurrentStatus.timestamp);
  var currentDate = new Date();
  const timeDifference = Math.ceil(
    (PromisedDate - currentDate) / (1000 * 60 * 60 * 24)
  );

  let statusMessage = "";

  const options = { weekday: "short", month: "short", day: "numeric" };
  //TODO: add localization for date
  let dateToShow = timeStamp;

  switch (shipment.CurrentStatus.state) {
    case "Delivered":
      statusMessage = t("DeliveredStatus");
      break;
    case "Returned":
      statusMessage = t(t("ReturnedStatus"));
      break;
    default:
      dateToShow = PromisedDate;
      statusMessage = t("ArrivingStatus");
      break;
  }

  return (
    <Div>
      <OrderNumber>
        {t("Order")} #{shipment.TrackingNumber}
      </OrderNumber>
      <StatusContainer>
        <StatusMessage>{statusMessage} </StatusMessage>
        <DateP>{t('date', { date: new Date(dateToShow) })}</DateP>
      </StatusContainer>
      <TimeDiff>
        {shipment.CurrentStatus.state !== "Delivered" &&
          shipment.CurrentStatus.state !== "Returned" && (
            <p>{t("timeDiff", { timeDifference })}</p>
          )}
      </TimeDiff>
    </Div>
  );
}

export default ShipmentDetails;
