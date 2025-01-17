import { useShipmentContext } from "../hooks/useShipmentContext";
import styled from "styled-components";

//localization
import { useTranslation, Trans } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  font-family: "Cairo", serif;
`;

const DateSection = styled.div`
  margin-bottom: 20px;
  width: 70%;
`;

const DateHeader = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1.2em;
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
  padding-right: 20px;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
`;

const Event = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Timestamp = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const Location = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const Title = styled.p`
  font-size: 1.5em;
  left: 0;
  font-family: "Cairo", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  color:#667085;
  display: flex;
`;


function TransitEvents({}) {
  const { t, i18n } = useTranslation();
  const { shipment, dispatch } = useShipmentContext();
  if (!shipment) return null;
  if (!shipment.TransitEvents) return null;

  const eventsByDate = {};

  // Group TransitEvents by date
  shipment.TransitEvents.map((event) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    var date = new Date(event.timestamp);
    date.setHours(0, 0, 0, 0);
    // var dateStr = new Date(date).toLocaleDateString("en-US", options);
    if (!eventsByDate[date]) {
      eventsByDate[date] = [];
    }
    eventsByDate[date].push({
      description: event.state || "",
      time: event.timestamp || "",
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
        <Title>{t('Trackingdetails')}</Title>
        {Object.entries(eventsByDate).map(([dateStr, events]) => (
          <DateSection key={dateStr}>
            <DateHeader>{t("date", { date: new Date(dateStr) })}</DateHeader>
            <Events expanded={true}>
              {events.map((event, index) => (
                <Event key={index}>
                  <div>{event.description}</div>
                  <Timestamp>
                    {t("time", { value: new Date(event.time) })}
                  </Timestamp>
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
