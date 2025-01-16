import { useShipmentContext } from "../hooks/useShipmentContext";

function ShipmentDetails({}) {
  const { shipment, dispatch } = useShipmentContext();
  if (!shipment) return null;
  //TODO: Replace the expected delivery date with the status if delivery reached final state such as Delivered or Returned)
  
  return <div>
    <p>{shipment.TrackingNumber}</p>
    <p>{shipment.CurrentStatus.state}</p>
    <p>{shipment.ScheduleDate}</p>
  </div>;
}

export default ShipmentDetails;
