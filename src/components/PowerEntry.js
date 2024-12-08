import React, { useState, useEffect } from "react";

const PowerEntry = ({ lensType, onPowerDataChange, onPowerTypeChange, onPowerEntryTypeChange, prevStep, nextStep }) => {
    console.log("lensType: ", lensType);
  const [eyePower, setEyePower] = useState({
    right: {
      spherical: "",
      cylindrical: "",
      axis: "",
      addition: "",
    },
    left: {
      spherical: "",
      cylindrical: "",
      axis: "",
      addition: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [powerType, setPowerType] = useState("");
  const [powerEntryType, setPowerEntryType] = useState("");

  useEffect(() => {
    // Notify parent of the current power data
    onPowerDataChange(eyePower);
    // Determine power type (high or low) for billing purposes
    const calculatePowerType = (eye) => {
      const spherical = parseFloat(eye.spherical);
      if (!isNaN(spherical)) {
        return spherical >= 7 || spherical <= -7 ? "High" : "Low";
      }
      return "";
    };

    const rightPowerType = calculatePowerType(eyePower.right);
    const leftPowerType = calculatePowerType(eyePower.left);

    if (rightPowerType === "High" || leftPowerType === "High") {
      onPowerTypeChange("high");
    } else if (rightPowerType === "Low" || leftPowerType === "Low") {
      onPowerTypeChange("low");
    }

    setPowerType({
      right: rightPowerType,
      left: leftPowerType,
    });

    // Determine if it's Single or Double Power
    const hasRightEyePower = Object.values(eyePower.right).some(
      (val) => val !== ""
    );
    const hasLeftEyePower = Object.values(eyePower.left).some(
      (val) => val !== ""
    );

    if (hasRightEyePower && hasLeftEyePower) {
      setPowerEntryType("Double");
      onPowerEntryTypeChange("Double");
    } else if (hasRightEyePower || hasLeftEyePower) {
      setPowerEntryType("Single");
      onPowerEntryTypeChange("Single");
    } else {
      setPowerEntryType("");
    }
  }, [eyePower, onPowerDataChange, onPowerTypeChange, onPowerEntryTypeChange]);

  const validateInput = (eye, param, value) => {
    const lensRanges = {
      SV: {
        spherical: { min: -30, max: 30 },
        cylindrical: { min: -16, max: 15 },
        axis: { min: 1, max: 180 },
        addition: null, // Addition not allowed for SV
      },
      KT: {
        spherical: { min: -20, max: 20 },
        cylindrical: { min: -10, max: 10 },
        axis: { min: 1, max: 180 },
        addition: { min: 1, max: 3 },
      },
      PR: {
        spherical: { min: -20, max: 20 },
        cylindrical: { min: -10, max: 10 },
        axis: { min: 1, max: 180 },
        addition: { min: 1, max: 3 },
      },
    };

    const lensRange = lensRanges[lensType];

    if (!lensRange) {
      console.error(`Invalid lens type: ${lensType}`);
      return false;
    }

    // Validate Spherical Power
    if (param === "spherical") {
      if (value < lensRange.spherical.min || value > lensRange.spherical.max) {
        setErrors((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], spherical: "Invalid spherical power" },
        }));
        return false;
      }
    }

    // Validate Cylindrical Power
    if (param === "cylindrical") {
      if (
        value < lensRange.cylindrical.min ||
        value > lensRange.cylindrical.max
      ) {
        setErrors((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], cylindrical: "Invalid cylindrical power" },
        }));
        return false;
      }
      // If cylindrical power is entered, validate axis power
      if (
        eyePower[eye].cylindrical !== "" &&
        (eyePower[eye].axis === "" ||
          value < lensRange.axis.min ||
          value > lensRange.axis.max)
      ) {
        setErrors((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], axis: "Invalid axis power" },
        }));
        return false;
      }
    }

    // Validate Axis Power
    if (param === "axis") {
      if (value < lensRange.axis.min || value > lensRange.axis.max) {
        setErrors((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], axis: "Invalid axis power" },
        }));
        return false;
      }
    }

    // Validate Addition Power
    if (param === "addition" && lensRange.addition) {
      if (value < lensRange.addition.min || value > lensRange.addition.max) {
        setErrors((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], addition: "Invalid addition power" },
        }));
        return false;
      }
    }

    // Clear any previous error for this parameter
    setErrors((prev) => ({ ...prev, [eye]: { ...prev[eye], [param]: "" } }));
    return true;
  };

  const handleChange = (eye, param, value) => {
    const numericValue = value === "" ? "" : parseFloat(value);
    setEyePower((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [param]: numericValue,
      },
    }));

    // Validate the input
    validateInput(eye, param, numericValue);
  };

  return (
    <div>
      <h3>Enter Power Details</h3>
      {["right", "left"].map((eye) => (
        <div key={eye}>
          <h4>{eye.charAt(0).toUpperCase() + eye.slice(1)} Eye</h4>
          <div>
            <label>Spherical Power:</label>
            <input
              type="number"
              value={eyePower[eye].spherical}
              onChange={(e) => handleChange(eye, "spherical", e.target.value)}
            />
            {errors[eye]?.spherical && <span>{errors[eye].spherical}</span>}
          </div>
          <div>
            <label>Cylindrical Power:</label>
            <input
              type="number"
              value={eyePower[eye].cylindrical}
              onChange={(e) => handleChange(eye, "cylindrical", e.target.value)}
            />
            {errors[eye]?.cylindrical && <span>{errors[eye].cylindrical}</span>}
          </div>
          {eyePower[eye].cylindrical !== "" && (
            <div>
              <label>Axis Power:</label>
              <input
                type="number"
                value={eyePower[eye].axis}
                onChange={(e) => handleChange(eye, "axis", e.target.value)}
              />
              {errors[eye]?.axis && <span>{errors[eye].axis}</span>}
            </div>
          )}
          {["KT", "PR"].includes(lensType) && (
            <div>
              <label>Addition Power:</label>
              <input
                type="number"
                value={eyePower[eye].addition}
                onChange={(e) => handleChange(eye, "addition", e.target.value)}
              />
              {errors[eye]?.addition && <span>{errors[eye].addition}</span>}
            </div>
          )}
        </div>
      ))}
      <div>
        <h4>
          Power Type: {powerType.right} (Right), {powerType.left} (Left)
        </h4>
        <h4>Power Entry Type: {powerEntryType}</h4>
      </div>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default PowerEntry;
