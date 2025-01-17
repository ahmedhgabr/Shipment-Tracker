import React from "react";
import { useShipmentContext } from "../hooks/useShipmentContext";
import styled from "styled-components";
//localization
import { useTranslation, Trans } from "react-i18next";

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
  }
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
    z-index: -10;
    /*move the ine 100px to top */
    transform: translateY(-50%);
  }

  &:first-child::after {
    left: 50%;
    width: 50%;
  }

  &:last-child::after {
    left: 0;
    width: 50%;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: left;
    { /* make the date below the label */}
    position: relative;
    top: 0;
    left: 0;
    transform: none;

  }
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ completed, isReturnedStep }) =>
    isReturnedStep ? "red" : completed ? "#0098A5" : "white"};
  border: 2px solid
    ${({ completed, isReturnedStep }) =>
      isReturnedStep ? "red" : completed ? "#0098A5" : "gray"};
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
  min-width: 100px;
  color: ${({ completed, isReturnedStep }) =>
    isReturnedStep ? "red" : completed ? "black" : "gray"};
  font-weight: ${({ completed }) => (completed ? "bold" : "normal")};
  
  @media (max-width: 768px) {
}
`;

const DateLabel = styled.span`
  font-size: 0.9em;
  color: #666;
  font-weight: normal;
  font-style: italic;
  text-align: center;
  min-width: 100px;
  /* make the date below the label */
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

function DeliveryTimeline() {
  const { t } = useTranslation();

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
    { label: t("pickedUp") },
    { label: t("processing") },
    { label: t("outForDelivery") },
    { label: isReturned ? t("returned") : t("delivered") },
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
            isReturnedStep={step.label === t("returned")}
          />
          <Label
            completed={index <= currentStepIndex}
            isReturnedStep={step.label === t("returned")}
          >
            {step.label}
          </Label>
          {index === currentStepIndex && shipment.CurrentStatus.timestamp && (
            <DateLabel>{t("date", { date: new Date(date) })}</DateLabel>
          )}
        </Step>
      ))}
    </TimelineWrapper>
  );
}

export default DeliveryTimeline;
