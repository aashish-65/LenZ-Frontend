import React from "react";
import "../assets/styles/CoatingSelection.css";

const CoatingSelection = ({
  setCoatingDetails,
  nextStep,
  prevStep,
  materialDetails,
}) => {
  const handleCoatingSelection = (coatingType) => {
    setCoatingDetails(coatingType);
    nextStep();
  };

  return (
    <div className="coating-selection-container">
      <h3 className="coating-selection-title">Select Coating for {materialDetails}</h3>
      <div className="coating-selection-buttons">
        {materialDetails === "Glass" && (
          <>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Normal")}
            >
              Normal (White Glass)
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("PG")}
            >
              PG
            </button>
          </>
        )}
        {materialDetails === "CR" && (
          <>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("HC")}
            >
              HC
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("HC Pg")}
            >
              HC Pg
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Bluekart")}
            >
              Bluekart
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Bluekart Pg")}
            >
              Bluekart Pg
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("ARC")}
            >
              ARC
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("ARC Pg")}
            >
              ARC Pg
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Bluekart Blue (Violet)")}
            >
              Bluekart Blue (Violet)
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Bluekart Blue (Violet) Pg")}
            >
              Bluekart Blue (Violet) Pg
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Dual Coating")}
            >
              Dual Coating
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Dual Coating Pg")}
            >
              Dual Coating Pg
            </button>
          </>
        )}
        {materialDetails === "Poly" && (
          <>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Bluekart")}
            >
              Bluekart
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("ARC")}
            >
              ARC
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Bluekart Blue (Violet)")}
            >
              Bluekart Blue (Violet)
            </button>
            <button
              className="coating-selection-button"
              onClick={() => handleCoatingSelection("Dual Coating")}
            >
              Dual Coating
            </button>
          </>
        )}
      </div>
      <button
        className="coating-selection-back-button"
        onClick={prevStep}
      >
        Back
      </button>
    </div>
  );
};

export default CoatingSelection;
