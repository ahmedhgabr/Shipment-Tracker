import { useShipmentContext } from "../hooks/useShipmentContext";

function TransitEvents({}) {
  const { shipment, dispatch } = useShipmentContext();
  if (!shipment) return null;
  //TODO: Replace the expected delivery date with the status if delivery reached final state such as Delivered or Returned)
  
  return <div>
    {shipment.TransitEvents.map((event, index) => (
        <div key={index}>
          <p>Timestamp: {new Date(event.timestamp).toLocaleString()}</p>
          <p>State: {event.state}</p>
          {event.msg && <p>Message: {event.msg}</p>}
          <p>Code: {event.code}</p>
        </div>
      ))}
  </div>;
}

export default TransitEvents;
