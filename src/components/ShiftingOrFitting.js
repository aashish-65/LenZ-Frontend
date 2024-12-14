import React, { useEffect, useState } from "react";
import "../assets/styles/ShiftingOrFitting.css";

const ShiftingOrFitting = ({ shiftingOrFitting, setShiftingOrFitting, nextStep, prevStep }) => {
  const [selectedOption, setSelectedOption] = useState(shiftingOrFitting || "");

  useEffect(() => {
    if (shiftingOrFitting) {
      setSelectedOption(shiftingOrFitting); // Update the selected option if shiftingOrFitting is updated
    }
  }, [shiftingOrFitting]);

  const handleSelection = (selection) => {
    setSelectedOption(selection);
    setShiftingOrFitting(selection);
    nextStep();
  };

  return (
    <div className="shifting-fitting-container">
      <h2 className="shifting-fitting-title">What do you want to do?</h2>
      <div className="shifting-fitting-buttons">
        <button
          className={`shifting-fitting-button ${selectedOption === "Shifting" ? "selected" : ""}`}
          onClick={() => handleSelection("Shifting")}
        >
          Shifting
        </button>
        <button
          className={`shifting-fitting-button ${selectedOption === "Fitting" ? "selected" : ""}`}
          onClick={() => handleSelection("Fitting")}
        >
          Fitting
        </button>
      </div>
      <button
        className="shifting-fitting-back-button"
        type="button"
        onClick={prevStep}
      >
        Back
      </button>
    </div>
  );
};

export default ShiftingOrFitting;
