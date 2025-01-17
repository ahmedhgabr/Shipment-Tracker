import styled from "styled-components";

import ShipmentDetails from "./ShipmentDetails";
import DeliveryTimeline from "./DeliveryTimeline";

function MyCard() {
  const Card = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 50px;
    width: 70%;
  `;

  const Divider = styled.hr`
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 20px 0;
  `;

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  `;
  return (
    <Container>
      <Card>
        <ShipmentDetails />
        <Divider />
        <DeliveryTimeline />
      </Card>
    </Container>
  );
}

export default MyCard;
