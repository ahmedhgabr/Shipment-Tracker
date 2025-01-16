import React from "react";
import { useShipmentContext } from "../hooks/useShipmentContext";
import styled from "styled-components";

const TimelineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Step = styled.div`
  text-align: center;
  position: relative;
  flex: 1;
  color: ${({ completed }) => (completed ? "#009688" : "#ddd")};

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    height: 4px;
    width: 100%;
    background-color: ${({ completed }) => (completed ? "#009688" : "#ddd")};
    z-index: -1;
  }

  &:first-child::after {
    left: 50%;
    width: 50%;
  }

  &:last-child::after {
    left: 0;
    width: 50%;
  }
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ completed, isReturnedStep }) =>
    isReturnedStep ? "red" : completed ? "#0098A5" : "white"};
  border: 2px solid ${({ completed }) => (completed ? "#0098A5" : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;

  &::before {
    content: ${({ completed }) => (completed ? "'✔'" : "''")};
    color: white;
    font-size: 16px;
  }
`;

const Label = styled.span`
  color: ${({ completed, isReturnedStep }) =>
    isReturnedStep ? "red" : completed ? "black" : "gray"};
  font-weight: ${({ completed }) => (completed ? "bold" : "normal")};
`;

const DateLabel = styled.span`
  font-size: 0.9em;
  color: #666;
`;

function DeliveryTimeline() {
  const { shipment } = useShipmentContext();
  if (!shipment) return null;

  var currentStepIndex = 0;
  var isCompleted = true;
  var isReturned = false;

  switch (shipment.CurrentStatus.state) {
    case "Received at warehouse":
      currentStepIndex = 0;
      break;
    case "Processing":
    case "Pending":
      currentStepIndex = 1;
      break;
    case "Out for delivery":
      currentStepIndex = 2;
      break;
    case "Returned":
      currentStepIndex = 3;
      isReturned = true;
      break;
    case "Delivered":
      currentStepIndex = 3;
      break;
  }

  // Define the timeline steps
  const steps = [
    { label: "Picked Up" },
    { label: "Processing" },
    { label: "Out for Delivery" },
    { label: isReturned ? "Returned" : "Delivered" },
  ];
  // date format
  const options = { weekday: "short", month: "short", day: "numeric" };
  var date = new Date(shipment.CurrentStatus.timestamp);
  date = date.toLocaleDateString("en-US", options);

  return (
    <TimelineWrapper>
      {steps.map((step, index) => (
        <Step key={step.label} completed={index <= currentStepIndex}>
          <Circle
            completed={index <= currentStepIndex}
            isReturnedStep={step.label === "Returned"}
          />
          <Label completed={index <= currentStepIndex} isReturnedStep = {step.label === "Returned"}>{step.label}</Label>
          {index === currentStepIndex && shipment.CurrentStatus.timestamp && (
            <DateLabel>{date}</DateLabel>
          )}
        </Step>
      ))}
    </TimelineWrapper>
  );
}

export default DeliveryTimeline;
