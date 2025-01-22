import React, { useState, useContext } from "react";
import CustomerDetails from "../components/CustomerDetails";
import FrameOptions from "../components/FrameOptions";
import ShiftingOrFitting from "../components/ShiftingOrFitting";
import LensSelection from "../components/LensSelection";
import MaterialSelection from "../components/MaterialSelection";
import CoatingSelection from "../components/CoatingSelection";
import PowerEntry from "../components/PowerEntry";
import Bill from "../components/Bill";
import PaymentType from "../components/PaymentType";
import "../assets/styles/CreateOrder.css";
import OrderSuccess from "../components/OrderSuccess";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const CreateOrder = () => {
  const [step, setStep] = useState(1);
  const [customerDetails, setCustomerDetails] = useState({});
  const [frameOptions, setFrameOptions] = useState({});
  const [shiftingOrFitting, setShiftingOrFitting] = useState("");
  const [lensDetails, setLensDetails] = useState({});
  const [materialDetails, setMaterialDetails] = useState({});
  const [coatingDetails, setCoatingDetails] = useState({});
  const [powerDetails, setPowerDetails] = useState({});
  const [powerType, setPowerType] = useState("");
  const [powerEntryType, setPowerEntryType] = useState("");
  const [purchaseLens, setPurchaseLens] = useState();
  const [glassType, setGlassType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [fittingCharge, setFittingCharge] = useState(0);
  const [shiftingCharge, setShiftingCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const { user } = useContext(AuthContext);
  const userId = user?._id;
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleLensSelection = (selection) => {
    setPurchaseLens(selection);
    nextStep();
  };

  const handleGlassTypeSelection = (type) => {
    setGlassType(type);
    nextStep();
  };

  const orderDetails = { userId, customerDetails, frameOptions, shiftingOrFitting, purchaseLens, glassType, lensDetails, materialDetails, coatingDetails, powerDetails, powerType, powerEntryType, fittingCharge, shiftingCharge, totalAmount, paymentType, orderPlaced };

  // console.log("Shifting Order Details:", shiftingOrderDetails);
  
  console.log("Payment Type",paymentType);
  const placeOrder = async () => {
    if (!userId) {
      alert("User not logged in. Please log in to place an order.");
      return;
    }
  
    try {
      const response = await axios.post("https://lenz-backend.onrender.com/api/orders/place-order", {
        userId,
        ...orderDetails, // Spread order details to include in the request
      });
      console.log("Order Placed:", response.data);
  
      setOrderPlaced(true);
      nextStep();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="main-container">
      {step === 1 && (
        <CustomerDetails
          customerDetails={customerDetails}
          setCustomerDetails={setCustomerDetails}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <FrameOptions
          frameOptions={frameOptions}
          setFrameOptions={setFrameOptions}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ShiftingOrFitting
          shiftingOrFitting={shiftingOrFitting}
          setShiftingOrFitting={setShiftingOrFitting}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && shiftingOrFitting === "Shifting" && (
        <Bill
          customerDetails={customerDetails}
          frameOptions={frameOptions}
          shiftingOrFitting={shiftingOrFitting}
          shiftingCharge={shiftingCharge}
          setShiftingCharge={setShiftingCharge}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && shiftingOrFitting === "Shifting" &&(
        <PaymentType
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          placeOrder={placeOrder}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 6 && orderPlaced && (
        <OrderSuccess/>
      )}
      {step === 4 && shiftingOrFitting === "Fitting" && (
        <div className="lens-options-container">
          <h3 className="lens-options-title">Please Select a Option</h3>
          <div className="lens-options-buttons">
            <button
              className={`lens-options-button ${
                purchaseLens === false ? "selected" : ""
              }`}
              onClick={() => handleLensSelection(false)}
            >
              I have the lens
            </button>
            <button
              className={`lens-options-button ${
                purchaseLens === true ? "selected" : ""
              }`}
              onClick={() => handleLensSelection(true)}
            >
              Want to purchase the lens
            </button>
          </div>
          <button className="lens-options-back-button" onClick={prevStep}>
            Back
          </button>
        </div>
      )}
      {step === 5 &&
        shiftingOrFitting === "Fitting" &&
        purchaseLens !== null && (
          <div className="glass-type-container">
            <h3 className="glass-type-title">Select Glass Type</h3>
            <div className="glass-type-buttons">
              <button
                className={`glass-type-button ${
                  glassType === "Sunglass" ? "selected" : ""
                }`}
                onClick={() => handleGlassTypeSelection("Sunglass")}
              >
                Sunglass
              </button>
              <button
                className={`glass-type-button ${
                  glassType === "Normal" ? "selected" : ""
                }`}
                onClick={() => handleGlassTypeSelection("Normal")}
              >
                Normal
              </button>
            </div>
            <button className="glass-type-back-button" onClick={prevStep}>
              Back
            </button>
          </div>
        )}
      {step === 6 && glassType && (
        <LensSelection
          setLensDetails={setLensDetails}
          nextStep={nextStep}
          prevStep={prevStep}
          glassType={glassType}
        />
      )}
      {step === 7 && glassType === "Sunglass" && (
        <PowerEntry
          onPowerDataChange={setPowerDetails}
          onPowerTypeChange={setPowerType}
          onPowerEntryTypeChange={setPowerEntryType}
          lensType={lensDetails}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 8 && glassType === "Sunglass" && (
        <Bill
          customerDetails={customerDetails}
          frameOptions={frameOptions}
          shiftingOrFitting={shiftingOrFitting}
          lensDetails={lensDetails}
          powerDetails={powerDetails}
          powerType={powerType}
          powerEntryType={powerEntryType}
          fittingCharge={fittingCharge}
          setFittingCharge={setFittingCharge}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
          glassType={glassType}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 9 && glassType === "Sunglass" &&(
        <PaymentType
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          placeOrder={placeOrder}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 10 && orderPlaced && (
        <OrderSuccess/>
      )}
      {step === 7 && glassType === "Normal" && (
        <MaterialSelection
          setMaterialDetails={setMaterialDetails}
          nextStep={nextStep}
          prevStep={prevStep}
          frameOptions={frameOptions}
        />
      )}
      {step === 8 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens === false && (
          <PowerEntry
            onPowerDataChange={setPowerDetails}
            onPowerTypeChange={setPowerType}
            onPowerEntryTypeChange={setPowerEntryType}
            lensType={lensDetails}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      {step === 9 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens === false && (
          <Bill
            customerDetails={customerDetails}
            frameOptions={frameOptions}
            shiftingOrFitting={shiftingOrFitting}
            lensDetails={lensDetails}
            materialDetails={materialDetails}
            powerDetails={powerDetails}
            powerType={powerType}
            powerEntryType={powerEntryType}
            fittingCharge={fittingCharge}
            setFittingCharge={setFittingCharge}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 10 && glassType === "Normal" &&
        materialDetails &&
        purchaseLens === false &&(
        <PaymentType
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          placeOrder={placeOrder}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 11 && orderPlaced && (
        <OrderSuccess/>
      )}
      {step === 8 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens && (
          <CoatingSelection
            setCoatingDetails={setCoatingDetails}
            nextStep={nextStep}
            prevStep={prevStep}
            materialDetails={materialDetails}
          />
        )}
      {step === 9 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens === true && (
          <PowerEntry
            onPowerDataChange={setPowerDetails}
            onPowerTypeChange={setPowerType}
            onPowerEntryTypeChange={setPowerEntryType}
            lensType={lensDetails}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      {step === 10 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens === true && (
          <Bill
            customerDetails={customerDetails}
            frameOptions={frameOptions}
            shiftingOrFitting={shiftingOrFitting}
            lensDetails={lensDetails}
            materialDetails={materialDetails}
            coatingDetails={coatingDetails}
            powerDetails={powerDetails}
            powerType={powerType}
            powerEntryType={powerEntryType}
            fittingCharge={fittingCharge}
            setFittingCharge={setFittingCharge}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 11 && glassType === "Normal" &&
        materialDetails &&
        purchaseLens === true &&(
        <PaymentType
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          placeOrder={placeOrder}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 12 && orderPlaced && (
        <OrderSuccess/>
      )}
    </div>
  );
};

export default CreateOrder;
