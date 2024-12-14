import React, { useEffect, useState } from "react";
import "../assets/styles/FrameOptions.css";

const FrameOptions = ({
  frameOptions,
  setFrameOptions,
  nextStep,
  prevStep,
}) => {
  const [selectedFrame, setSelectedFrame] = useState(frameOptions?.type || "");

  useEffect(() => {
    // Set selectedFrame if frameOptions is updated (when user navigates back)
    if (frameOptions?.type) {
      setSelectedFrame(frameOptions.type);
    }
  }, [frameOptions]);

  const handleFrameSelection = (frameType) => {
    setSelectedFrame(frameType);
    setFrameOptions({ type: frameType });
    nextStep();
  };

  return (
    <div className="frame-options-container">
      <h3 className="frame-options-title">Select Frame Type</h3>
      <div className="frame-options-buttons">
        <button
          className={`frame-option-button ${
            selectedFrame === "Full Frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelection("Full Frame")}
        >
          Full Frame
        </button>
        <button
          className={`frame-option-button ${
            selectedFrame === "Supra" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelection("Supra")}
        >
          Supra
        </button>
        <button
          className={`frame-option-button ${
            selectedFrame === "Rimless" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelection("Rimless")}
        >
          Rimless
        </button>
      </div>
      <button className="frame-options-back-button" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default FrameOptions;
