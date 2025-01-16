import { useShipmentContext } from "../hooks/useShipmentContext";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const DateSection = styled.div`
  margin-bottom: 20px;
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 10px;

  &::before {
    content: "•";
    color: #009688;
    font-size: 2em;
    margin-right: 10px;
  }
`;

const Events = styled.div`
  padding-left: 20px;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
`;

const Event = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Timestamp = styled.div`
  font-size: 0.85em;
  color: #666;
`;

const Location = styled.div`
  font-size: 0.85em;
  color: #666;
  margin-top: 5px;
`;

function TransitEvents({}) {
  const { shipment, dispatch } = useShipmentContext();
  if (!shipment) return null;
  if (!shipment.TransitEvents) return null;
  

  const eventsByDate = {};

  // Group TransitEvents by date
  shipment.TransitEvents.map((event) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    var date = new Date(event.timestamp);
    date = date.toLocaleDateString("en-US", options);
    if (!eventsByDate[date]) {
      eventsByDate[date] = [];
    }
    eventsByDate[date].push({
      description: event.state || "",
      time: date || "",
      code: event.code || "",
      exceptionCode: event.exceptionCode || "",
      msg: event.msg || "",
    });
  });
  console.log({ eventsByDate });

  //TODO: Replace the expected delivery date with the status if delivery reached final state such as Delivered or Returned)

  return (
    <div>
      <Container>
        {Object.entries(eventsByDate).map(([date, events]) => (
          <DateSection key={date}>
            <DateHeader>{date}</DateHeader>
            <Events expanded={true}>
              {events.map((event, index) => (
                <Event key={index}>
                  <div>{event.description}</div>
                  <Timestamp>{event.time}</Timestamp>
                  {event.msg && <Location>{event.msg}</Location>}
                </Event>
              ))}
            </Events>
          </DateSection>
        ))}
      </Container>
    </div>
  );
}

export default TransitEvents;
