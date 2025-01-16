import { useShipmentContext } from "../hooks/useShipmentContext";
import styled from "styled-components";

const OrderNumber = styled.p`
  font-family: "Rubik", serif;
  font-weight: 400;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 12px;
  line-height: 16px;
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
  line-height: 32px;
  font-optical-sizing: auto;
`;

const TimeDiff = styled.p`
  font-family: "Rubik", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #667085;
`;

function ShipmentDetails({}) {
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
  let dateToShow = timeStamp.toLocaleDateString("en-US", options);

  switch (shipment.CurrentStatus.state) {
    case "Delivered":
      statusMessage = `Delivered on `;
      break;
    case "Returned":
      statusMessage = `Returned on `;
      break;
    default:
      dateToShow = PromisedDate.toLocaleDateString("en-US", options);
      statusMessage = `Arriving by `;
      break;
  }

  return (
    <Div>
      <OrderNumber>Order #{shipment.TrackingNumber}</OrderNumber>
      <StatusContainer>
        <StatusMessage>{statusMessage} </StatusMessage>
        <DateP>{dateToShow}</DateP>
      </StatusContainer>
      <TimeDiff>
        {shipment.CurrentStatus.state !== "Delivered" &&
          shipment.CurrentStatus.state !== "Returned" && (
            <p>
              Your order is expected to arrive within {timeDifference} working
              days.
            </p>
          )}
      </TimeDiff>
    </Div>
  );
}

export default ShipmentDetails;
