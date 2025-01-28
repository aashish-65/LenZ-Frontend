import React, { useState, useEffect } from "react";
import "../assets/styles/PowerEntry.css";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

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
  // const [powerType, setPowerType] = useState({});
  // const [powerEntryType, setPowerEntryType] = useState("");
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
  const [isValidPowerRange, setIsValidPowerRange] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    const hasRightEyePower = Object.values(eyePower.right).some(
      (val) => val !== ""
    );
    const hasLeftEyePower = Object.values(eyePower.left).some(
      (val) => val !== ""
    );

    if (hasRightEyePower && hasLeftEyePower) {
      onPowerEntryTypeChange("Double");
    } else if (hasRightEyePower || hasLeftEyePower) {
      onPowerEntryTypeChange("Single");
    } else {
      onPowerEntryTypeChange("");
    }

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

  const numberInputOnWheelPreventChange = (e) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: { xs: 700, md: 1000 }, // Wider on laptops
        margin: "20px auto",
        padding: { xs: 3, md: 5 }, // Adjust padding for larger screens
        borderRadius: 2,
        backgroundColor: "#fdfdfd",
        mt: lensType !== "SV" ? (isMobile ? 30 : 0) : 0,
        // mb: isMobile ? 1 : 0,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Enter Power Details
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Selected Lens Type: <strong>{lensType}</strong>
      </Typography>

      <Divider sx={{ my: 3 }} />

      {["right", "left"].map((eye) => (
        <div key={eye} style={{ marginBottom: "20px" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            {eye.charAt(0).toUpperCase() + eye.slice(1)} Eye
          </Typography>

          {/* Power Entry Fields */}
          <Grid container spacing={3}>
            {/* Spherical Power */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Spherical Power"
                type="number"
                variant="outlined"
                fullWidth
                value={eyePower[eye].spherical}
                onChange={(e) => handleChange(eye, "spherical", e.target.value)}
                onBlur={() => handleBlur(eye, "spherical")}
                error={Boolean(
                  errors[eye]?.spherical ||
                    sphericalErrorPowerRange[eye]?.spherical
                )}
                helperText={
                  errors[eye]?.spherical ||
                  sphericalErrorPowerRange[eye]?.spherical
                }
                onWheel={(e) => numberInputOnWheelPreventChange(e)}
              />
            </Grid>

            {/* Cylindrical Power */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Cylindrical Power"
                type="number"
                variant="outlined"
                fullWidth
                value={eyePower[eye].cylindrical}
                onChange={(e) =>
                  handleChange(eye, "cylindrical", e.target.value)
                }
                onBlur={() => handleBlur(eye, "cylindrical")}
                error={Boolean(
                  errors[eye]?.cylindrical ||
                    cylindricalErrorPowerRange[eye]?.cylindrical
                )}
                helperText={
                  errors[eye]?.cylindrical ||
                  cylindricalErrorPowerRange[eye]?.cylindrical
                }
                onWheel={(e) => numberInputOnWheelPreventChange(e)}
              />
            </Grid>

            {/* Axis Power */}
            {eyePower[eye].cylindrical !== "" && (
              <Grid item xs={12} md={6}>
                <TextField
                  label="Axis Power"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={eyePower[eye].axis}
                  onChange={(e) => handleChange(eye, "axis", e.target.value)}
                  error={Boolean(
                    errors[eye]?.axis || axisErrorPowerRange[eye]?.axis
                  )}
                  helperText={
                    errors[eye]?.axis || axisErrorPowerRange[eye]?.axis
                  }
                  onWheel={(e) => numberInputOnWheelPreventChange(e)}
                />
              </Grid>
            )}

            {/* Addition (for specific lens types) */}
            {["KT", "PR"].includes(lensType) && (
              <Grid item xs={12} md={6}>
                <TextField
                  label="Addition"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={eyePower[eye].addition}
                  onChange={(e) =>
                    handleChange(eye, "addition", e.target.value)
                  }
                  onBlur={() => handleBlur(eye, "addition")}
                  error={Boolean(
                    errors[eye]?.addition ||
                      additionErrorPowerRange[eye]?.addition
                  )}
                  helperText={
                    errors[eye]?.addition ||
                    additionErrorPowerRange[eye]?.addition
                  }
                  onWheel={(e) => numberInputOnWheelPreventChange(e)}
                />
              </Grid>
            )}
          </Grid>
        </div>
      ))}

      {/* Button Section */}
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={prevStep}
            sx={{ paddingX: 3 }}
          >
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            onClick={nextStep}
            disabled={!isValid}
            sx={{ paddingX: 3 }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

// const MyNumberInput = ({ value, onChange, onBlur }) => {
//   const numberInputOnWheelPreventChange = (e) => {
//     e.target.blur();
//     e.stopPropagation();
//     setTimeout(() => {
//       e.target.focus();
//     }, 0);
//   };

//   return (
//     <input
//       type="number"
//       value={value}
//       onChange={onChange}
//       onBlur={onBlur}
//       onWheel={numberInputOnWheelPreventChange}
//       className="input-field"
//     />
//   );
// };

export default PowerEntry;
