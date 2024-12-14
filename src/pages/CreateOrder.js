import React, { useState } from "react";
import CustomerDetails from "../components/CustomerDetails";
import FrameOptions from "../components/FrameOptions";
import ShiftingOrFitting from "../components/ShiftingOrFitting";
import LensSelection from "../components/LensSelection";
import MaterialSelection from "../components/MaterialSelection";
import CoatingSelection from "../components/CoatingSelection";
import PowerEntry from "../components/PowerEntry";
import Bill from "../components/Bill";
import "../assets/styles/CreateOrder.css";

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
  const [purchaseLens, setPurchaseLens] = useState(false);
  const [glassType, setGlassType] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  //   console.log("powerDetails", powerDetails);
  //   console.log("powerType", powerType);
  //   console.log("powerEntryType", powerEntryType);

  return (
    <div>
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
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && shiftingOrFitting === "Fitting" && (
        <div className="lens-options-container">
          <h3 className="lens-options-title">Please Select a Option</h3>
          <div className="lens-options-buttons">
            <button
              className="lens-options-button"
              onClick={() => {
                setPurchaseLens(false);
                nextStep();
              }}
            >
              I have the lens
            </button>
            <button
              className="lens-options-button"
              onClick={() => {
                setPurchaseLens(true);
                nextStep();
              }}
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
                className="glass-type-button"
                onClick={() => {
                  setGlassType("Sunglass");
                  nextStep();
                }}
              >
                Sunglass
              </button>
              <button
                className="glass-type-button"
                onClick={() => {
                  setGlassType("Normal");
                  nextStep();
                }}
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
          nextStep={nextStep}
          prevStep={prevStep}
        />
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
            nextStep={nextStep}
            prevStep={prevStep}
          />
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
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
    </div>
  );
};

export default CreateOrder;
