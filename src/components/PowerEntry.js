import React, { useState, useEffect } from "react";

const PowerEntry = ({
  lensType,
  onPowerDataChange,
  onPowerTypeChange,
  onPowerEntryTypeChange,
  prevStep,
  nextStep,
}) => {
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
  const [powerType, setPowerType] = useState({});
  const [powerEntryType, setPowerEntryType] = useState("");
  const [cylindricalErrorPowerRange, setCylindricalErrorPowerRange] = useState(
    {}
  );
  const [isValidCylindricalPowerRange, setIsValidCylindricalPowerRange] =
    useState(true);
  const [sphericalErrorPowerRange, setSphericalErrorPowerRange] = useState({});
  const [isValidSphericalPowerRange, setIsValidSphericalPowerRange] =
    useState(true);
  const [axisErrorPowerRange, setAxisErrorPowerRange] = useState({});
  const [isValidAxisPowerRange, setIsValidAxisPowerRange] = useState(true);
  const [additionErrorPowerRange, setAdditionErrorPowerRange] = useState({});
  const [isValidAdditionPowerRange, setIsValidAdditionPowerRange] =
    useState(true);
  const [isValid, setIsValid] = useState(false);
  // const [errorPowerRange, setErrorPowerRange] = useState({});
  const [isValidPowerRange, setIsValidPowerRange] = useState(false);

  const lensRanges = {
    SV: {
      spherical: { min: -30, max: 30 },
      cylindrical: { min: -16, max: 15 },
      axis: { min: 1, max: 180 },
      addition: null,
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

  useEffect(() => {
    onPowerDataChange(eyePower);

    const calculatePowerType = (eye) => {
      const spherical = parseFloat(eye.spherical);
      const cylindrical = parseFloat(eye.cylindrical);
      const total = spherical + cylindrical;
      if (!isNaN(spherical) || !isNaN(cylindrical)) {
        return spherical >= 7 ||
          spherical <= -7 ||
          cylindrical >= 7 ||
          cylindrical <= -7 ||
          total >= 10 ||
          total <= -10
          ? "High"
          : "Low";
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

    // const hasErrors = Object.values(errors).some((eye) =>
    //   Object.values(eye || {}).some((error) => error !== "")
    // );
    // setIsValid(!hasErrors && (hasRightEyePower || hasLeftEyePower));

    const validateInputs = () => {
      let isValid = true;

      const validateEye = (eye) => {
        const { spherical, cylindrical, axis, addition } = eye;
        const hasSphericalOrCylindrical =
          spherical !== "" || cylindrical !== "";
        const needsAxis = cylindrical !== "" && axis === "";
        const needsAddition =
          ["KT", "PR"].includes(lensType) &&
          hasSphericalOrCylindrical &&
          addition === "";

        return {
          hasSphericalOrCylindrical,
          needsAxis,
          needsAddition,
        };
      };

      const rightEyeValidation = validateEye(eyePower.right);
      const leftEyeValidation = validateEye(eyePower.left);

      if (
        !rightEyeValidation.hasSphericalOrCylindrical &&
        !leftEyeValidation.hasSphericalOrCylindrical
      ) {
        isValid = false;
      }

      if (
        rightEyeValidation.needsAxis ||
        leftEyeValidation.needsAxis ||
        rightEyeValidation.needsAddition ||
        leftEyeValidation.needsAddition
      ) {
        isValid = false;
      }

      setErrors({
        right: {
          axis: rightEyeValidation.needsAxis
            ? "Axis is required for cylindrical power"
            : "",
          addition: rightEyeValidation.needsAddition
            ? "Addition is required for KT/PR lenses"
            : "",
        },
        left: {
          axis: leftEyeValidation.needsAxis
            ? "Axis is required for cylindrical power"
            : "",
          addition: leftEyeValidation.needsAddition
            ? "Addition is required for KT/PR lenses"
            : "",
        },
      });
      if (
        isValidSphericalPowerRange === false ||
        isValidCylindricalPowerRange === false ||
        isValidAxisPowerRange === false ||
        isValidAdditionPowerRange === false
      ) {
        setIsValidPowerRange(false);
      } else {
        setIsValidPowerRange(true);
      }

      if (isValid === true && isValidPowerRange === true) {
        isValid = true;
      } else {
        isValid = false;
      }
      setIsValid(isValid);
    };

    validateInputs();
  }, [
    eyePower,
    lensType,
    onPowerDataChange,
    onPowerTypeChange,
    onPowerEntryTypeChange,
    isValidSphericalPowerRange,
    isValidCylindricalPowerRange,
    isValidAxisPowerRange,
    isValidAdditionPowerRange,
    isValidPowerRange,
  ]);

  const validateRange = (eye, param, value) => {
    if (value === "") return true;
    const lensRange = lensRanges[lensType];
    if (!lensRange) return true;

    const range = lensRange[param];

    if (param === "spherical") {
      if (range && (value < range.min || value > range.max)) {
        setSphericalErrorPowerRange((prev) => ({
          ...prev,
          [eye]: {
            ...prev[eye],
            [param]: `Value out of range (${range.min}-${range.max})`,
          },
        }));
        setIsValidSphericalPowerRange(false);
        return false;
      } else {
        setSphericalErrorPowerRange((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], [param]: "" },
        }));
        setIsValidSphericalPowerRange(true);
        return true;
      }
    } 

    if (param === "cylindrical") {
      if (range && (value < range.min || value > range.max)) {
        setCylindricalErrorPowerRange((prev) => ({
          ...prev,
          [eye]: {
            ...prev[eye],
            [param]: `Value out of range (${range.min}-${range.max})`,
          },
        }));
        setIsValidCylindricalPowerRange(false);
        return false;
      } else {
        setCylindricalErrorPowerRange((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], [param]: "" },
        }));
        setIsValidCylindricalPowerRange(true);
        return true;
      }
    }

    if (param === "axis") {
      if (range && (value < range.min || value > range.max)) {
        setAxisErrorPowerRange((prev) => ({
          ...prev,
          [eye]: {
            ...prev[eye],
            [param]: `Value out of range (${range.min}-${range.max})`,
          },
        }));
        setIsValidAxisPowerRange(false);
        return false;
      } else {
        setAxisErrorPowerRange((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], [param]: "" },
        }));
        setIsValidAxisPowerRange(true);
        return true;
      }
    } 

    if (param === "addition") {
      if (range && (value < range.min || value > range.max)) {
        setAdditionErrorPowerRange((prev) => ({
          ...prev,
          [eye]: {
            ...prev[eye],
            [param]: `Value out of range (${range.min}-${range.max})`,
          },
        }));
        setIsValidAdditionPowerRange(false);
        return false;
      } else {
        setAdditionErrorPowerRange((prev) => ({
          ...prev,
          [eye]: { ...prev[eye], [param]: "" },
        }));
        setIsValidAdditionPowerRange(true);
        return true;
      }
    }
    ;
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
    validateRange(eye, param, numericValue);
  };

  const handleBlur = (eye, param) => {
    const value = eyePower[eye][param];
    if (value !== "") {
      const roundedValue = Math.round(value * 4) / 4;
      setEyePower((prev) => ({
        ...prev,
        [eye]: {
          ...prev[eye],
          [param]: roundedValue,
        },
      }));
      validateRange(eye, param, roundedValue);
    }
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
              onBlur={() => handleBlur(eye, "spherical")}
            />
            {errors[eye]?.spherical && <span>{errors[eye].spherical}</span>}
            {sphericalErrorPowerRange[eye]?.spherical && (
              <span>{sphericalErrorPowerRange[eye].spherical}</span>
            )}
          </div>
          <div>
            <label>Cylindrical Power:</label>
            <input
              type="number"
              value={eyePower[eye].cylindrical}
              onChange={(e) => handleChange(eye, "cylindrical", e.target.value)}
              onBlur={() => handleBlur(eye, "cylindrical")}
            />
            {errors[eye]?.cylindrical && <span>{errors[eye].cylindrical}</span>}
            {cylindricalErrorPowerRange[eye]?.cylindrical && (
              <span>{cylindricalErrorPowerRange[eye].cylindrical}</span>
            )}
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
              {axisErrorPowerRange[eye]?.axis && (
                <span>{axisErrorPowerRange[eye].axis}</span>
              )}
            </div>
          )}
          {["KT", "PR"].includes(lensType) && (
            <div>
              <label>Addition:</label>
              <input
                type="number"
                value={eyePower[eye].addition}
                onChange={(e) => handleChange(eye, "addition", e.target.value)}
                onBlur={() => handleBlur(eye, "addition")}
              />
              {errors[eye]?.addition && <span>{errors[eye].addition}</span>}
              {additionErrorPowerRange[eye]?.addition && (
                <span>{additionErrorPowerRange[eye].addition}</span>
              )}
            </div>
          )}
        </div>
      ))}
      <div>
        <button onClick={prevStep}>Previous</button>
        <button onClick={nextStep} disabled={!isValid}>
          Next
        </button>
      </div>
      <div>
        <h4>Selected Lens Type: {lensType}</h4>
        <h4>
          Power Type: {powerType.right} (Right), {powerType.left} (Left)
        </h4>
        <h4>Power Entry Type: {powerEntryType}</h4>
      </div>
    </div>
  );
};

export default PowerEntry;
