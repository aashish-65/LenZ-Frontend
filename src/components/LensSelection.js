import React from "react";
import "../assets/styles/LensSelection.css";

const LensSelection = ({ setLensDetails, nextStep, prevStep, glassType }) => {
  const handleLensSelection = (lensType) => {
    setLensDetails(lensType);
    nextStep();
  };

  return (
    <div className="lens-selection-container">
      <h3 className="lens-selection-title">Select Lens for {glassType}</h3>
      <div className="lens-selection-buttons">
        <button
          className="lens-selection-button"
          onClick={() => handleLensSelection("SV")}
        >
          SV
        </button>
        <button
          className="lens-selection-button"
          onClick={() => handleLensSelection("KT")}
        >
          KT
        </button>
        <button
          className="lens-selection-button"
          onClick={() => handleLensSelection("PR")}
        >
          PR
        </button>
      </div>
      <button className="lens-selection-back-button" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default LensSelection;
