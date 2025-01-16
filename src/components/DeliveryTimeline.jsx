import { useShipmentContext } from "../hooks/useShipmentContext";

function DeliveryTimeline({}) {
  const { shipment, dispatch } = useShipmentContext();
  if (!shipment) return null;
  return <div className="timeline">
    <div>
      <p>{shipment.CurrentStatus.state}</p>
    </div>
  </div>;
}

export default DeliveryTimeline;
