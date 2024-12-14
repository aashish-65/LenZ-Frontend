import React from "react";
import "../assets/styles/MaterialSelection.css";

const MaterialSelection = ({
  setMaterialDetails,
  nextStep,
  prevStep,
  frameOptions,
}) => {
  const handleMaterialSelection = (materialType) => {
    setMaterialDetails(materialType);
    nextStep();
  };

  return (
    <div className="material-selection-container">
      <h3 className="material-selection-title">Select Material for {frameOptions.type}</h3>
      <div className="material-selection-buttons">
        {frameOptions.type === "Full Frame" && (
          <>
            <button
              className="material-selection-button"
              onClick={() => handleMaterialSelection("CR")}
            >
              CR
            </button>
            <button
              className="material-selection-button"
              onClick={() => handleMaterialSelection("Glass")}
            >
              Glass
            </button>
          </>
        )}
        {frameOptions.type === "Supra" && (
          <>
            <button
              className="material-selection-button"
              onClick={() => handleMaterialSelection("CR")}
            >
              CR
            </button>
            <button
              className="material-selection-button"
              onClick={() => handleMaterialSelection("Glass")}
            >
              Glass
            </button>
          </>
        )}
        {frameOptions.type === "Rimless" && (
          <>
            <button
              className="material-selection-button"
              onClick={() => handleMaterialSelection("Poly")}
            >
              Poly
            </button>
            <button
              className="material-selection-button"
              onClick={() => handleMaterialSelection("CR")}
            >
              CR
            </button>
          </>
        )}
      </div>
      <button className="material-selection-back-button" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default MaterialSelection;
