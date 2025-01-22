import React, { useState } from "react";
import CustomerDetails from "../components/CustomerDetails";
import FrameOptions from "../components/FrameOptions";
import ShiftingOrFitting from "../components/ShiftingOrFitting";
import LensSelection from "../components/LensSelection";
import MaterialSelection from "../components/MaterialSelection";
import CoatingSelection from "../components/CoatingSelection";
import PowerEntry from "../components/PowerEntry";
import Bill from "../components/Bill";
import PaymentType from "../components/PaymentType";
import OrderSuccess from "../components/OrderSuccess";
import "../assets/styles/CreateOrder.css";

const CreateOrder2 = () => {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    customerDetails: {},
    frameOptions: {},
    shiftingOrFitting: "",
    purchaseLens: null,
    glassType: "",
    lensDetails: {},
    materialDetails: {},
    coatingDetails: {},
    powerDetails: {},
    powerType: "",
    powerEntryType: "",
    fittingCharge: 0,
    shiftingCharge: 0,
    totalAmount: 0,
    paymentType: "",
    orderPlaced: false,
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const placeOrder = () => {
    console.log("Order Placed:", orderData); // Simulate backend call
    setOrderData((prevData) => ({ ...prevData, orderPlaced: true }));
    nextStep();
  };

  const steps = [
    {
      component: CustomerDetails,
      props: {
        customerDetails: orderData.customerDetails,
        setCustomerDetails: (data) =>
          setOrderData((prevData) => ({ ...prevData, customerDetails: data })),
        nextStep,
      },
    },
    {
      component: FrameOptions,
      props: {
        frameOptions: orderData.frameOptions,
        setFrameOptions: (data) =>
          setOrderData((prevData) => ({ ...prevData, frameOptions: data })),
        nextStep,
        prevStep,
      },
    },
    {
      component: ShiftingOrFitting,
      props: {
        shiftingOrFitting: orderData.shiftingOrFitting,
        setShiftingOrFitting: (data) =>
          setOrderData((prevData) => ({ ...prevData, shiftingOrFitting: data })),
        nextStep,
        prevStep,
      },
    },
    {
      condition: orderData.shiftingOrFitting === "Shifting",
      component: Bill,
      props: {
        customerDetails: orderData.customerDetails,
        frameOptions: orderData.frameOptions,
        shiftingOrFitting: orderData.shiftingOrFitting,
        shiftingCharge: orderData.shiftingCharge,
        setShiftingCharge: (value) =>
          setOrderData((prevData) => ({ ...prevData, shiftingCharge: value })),
        totalAmount: orderData.totalAmount,
        setTotalAmount: (value) =>
          setOrderData((prevData) => ({ ...prevData, totalAmount: value })),
        nextStep,
        prevStep,
      },
    },
    {
      condition: orderData.shiftingOrFitting === "Shifting",
      component: PaymentType,
      props: {
        paymentType: orderData.paymentType,
        setPaymentType: (type) =>
          setOrderData((prevData) => ({ ...prevData, paymentType: type })),
        placeOrder,
        nextStep,
        prevStep,
      },
    },
    {
      condition: orderData.orderPlaced,
      component: OrderSuccess,
    },
    {
      condition: orderData.shiftingOrFitting === "Fitting",
      component: LensSelection,
      props: {
        setLensDetails: (data) =>
          setOrderData((prevData) => ({ ...prevData, lensDetails: data })),
        nextStep,
        prevStep,
      },
    },
    // Add more steps as required...
  ];

  const currentStep = steps[step - 1];
  if (!currentStep) return null;

  const { component: StepComponent, props, condition } = currentStep;

  return (
    <div className="main-container">
      {condition !== undefined && !condition ? null : <StepComponent {...props} />}
    </div>
  );
};

export default CreateOrder2;
