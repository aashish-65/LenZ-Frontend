import React, { useState, useEffect } from "react";
import "../assets/styles/PowerEntry.css";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Box,
  Card,
  CardContent,
  Stack,
  InputAdornment,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { 
  ArrowBack, 
  ArrowForward, 
  RemoveRedEye, 
  RemoveRedEyeOutlined 
} from "@mui/icons-material";
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
  const [cylindricalErrorPowerRange, setCylindricalErrorPowerRange] = useState({});
  const [isValidCylindricalPowerRange, setIsValidCylindricalPowerRange] = useState(true);
  const [sphericalErrorPowerRange, setSphericalErrorPowerRange] = useState({});
  const [isValidSphericalPowerRange, setIsValidSphericalPowerRange] = useState(true);
  const [axisErrorPowerRange, setAxisErrorPowerRange] = useState({});
  const [isValidAxisPowerRange, setIsValidAxisPowerRange] = useState(true);
  const [additionErrorPowerRange, setAdditionErrorPowerRange] = useState({});
  const [isValidAdditionPowerRange, setIsValidAdditionPowerRange] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isValidPowerRange, setIsValidPowerRange] = useState(false);
  const [activeEye, setActiveEye] = useState("both"); // "right", "left", or "both"
  
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

  useEffect(() => {
    // Reset eye power data when activeEye changes
    if (activeEye === "right") {
      setEyePower((prev) => ({
        ...prev,
        left: {
          spherical: "",
          cylindrical: "",
          axis: "",
          addition: "",
        },
      }));
    } else if (activeEye === "left") {
      setEyePower((prev) => ({
        ...prev,
        right: {
          spherical: "",
          cylindrical: "",
          axis: "",
          addition: "",
        },
      }));
    }
  }, [activeEye]);

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

  const renderEyeSection = (eye) => {
    const eyeColor = eye === "right" ? "#1976d2" : "#9c27b0";
    
    return (
      <Card 
        elevation={3} 
        sx={{ 
          borderTop: `4px solid ${eyeColor}`,
          height: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                backgroundColor: eyeColor,
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: 1,
              }}
            >
              {eye === "right" ? (
                <RemoveRedEye sx={{ color: 'white' }} fontSize="small" />
              ) : (
                <RemoveRedEyeOutlined sx={{ color: 'white' }} fontSize="small" />
              )}
            </Box>
            <Typography variant="h6" color={eyeColor} fontWeight="bold">
              {eye.charAt(0).toUpperCase() + eye.slice(1)} Eye
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* Spherical Power */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Spherical Power"
                type="number"
                variant="outlined"
                fullWidth
                size={isMobile ? "small" : "medium"}
                value={eyePower[eye].spherical}
                onChange={(e) => handleChange(eye, "spherical", e.target.value)}
                onBlur={() => handleBlur(eye, "spherical")}
                error={Boolean(
                  errors[eye]?.spherical || sphericalErrorPowerRange[eye]?.spherical
                )}
                helperText={
                  errors[eye]?.spherical || sphericalErrorPowerRange[eye]?.spherical
                }
                onWheel={(e) => numberInputOnWheelPreventChange(e)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">D</InputAdornment>,
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: eyeColor,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: eyeColor,
                    },
                  }
                }}
              />
            </Grid>

            {/* Cylindrical Power */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cylindrical Power"
                type="number"
                variant="outlined"
                fullWidth
                size={isMobile ? "small" : "medium"}
                value={eyePower[eye].cylindrical}
                onChange={(e) => handleChange(eye, "cylindrical", e.target.value)}
                onBlur={() => handleBlur(eye, "cylindrical")}
                error={Boolean(
                  errors[eye]?.cylindrical || cylindricalErrorPowerRange[eye]?.cylindrical
                )}
                helperText={
                  errors[eye]?.cylindrical || cylindricalErrorPowerRange[eye]?.cylindrical
                }
                onWheel={(e) => numberInputOnWheelPreventChange(e)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">D</InputAdornment>,
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: eyeColor,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: eyeColor,
                    },
                  }
                }}
              />
            </Grid>

            {/* Axis Power */}
            {eyePower[eye].cylindrical !== "" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Axis Power"
                  type="number"
                  variant="outlined"
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  value={eyePower[eye].axis}
                  onChange={(e) => handleChange(eye, "axis", e.target.value)}
                  error={Boolean(
                    errors[eye]?.axis || axisErrorPowerRange[eye]?.axis
                  )}
                  helperText={
                    errors[eye]?.axis || axisErrorPowerRange[eye]?.axis
                  }
                  onWheel={(e) => numberInputOnWheelPreventChange(e)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">°</InputAdornment>,
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: eyeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: eyeColor,
                      },
                    }
                  }}
                />
              </Grid>
            )}

            {/* Addition (for specific lens types) */}
            {["KT", "PR"].includes(lensType) && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Addition"
                  type="number"
                  variant="outlined"
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  value={eyePower[eye].addition}
                  onChange={(e) => handleChange(eye, "addition", e.target.value)}
                  onBlur={() => handleBlur(eye, "addition")}
                  error={Boolean(
                    errors[eye]?.addition || additionErrorPowerRange[eye]?.addition
                  )}
                  helperText={
                    errors[eye]?.addition || additionErrorPowerRange[eye]?.addition
                  }
                  onWheel={(e) => numberInputOnWheelPreventChange(e)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">D</InputAdornment>,
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: eyeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: eyeColor,
                      },
                    }
                  }}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: { xs: "95%", sm: 700, md: 1000 },
        margin: "20px auto",
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        backgroundColor: "#fdfdfd",
        mt: (lensType !== "SV" && activeEye === "both") ? (isMobile ? 20 : 0) : 0,
        position: "relative",
        // overflow: "hidden",
      }}
    >
      {/* Gradient background accent */}
      <Box 
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: "linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)",
        }}
      />

      <Box sx={{ pt: 1 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom 
          textAlign="center"
          sx={{ 
            fontWeight: 600,
            color: "#333",
            mb: 1,
          }}
        >
          Enter Power Details
        </Typography>
        
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            mb: 3,
          }}
        >
          <Card 
            sx={{ 
              display: "inline-flex", 
              px: 2,
              py: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="subtitle1" 
              textAlign="center"
              sx={{ fontWeight: 500 }}
            >
              Selected Lens Type: <Box component="span" sx={{ fontWeight: 700, color: "#1976d2" }}>{lensType}</Box>
            </Typography>
          </Card>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Eye Selector for Mobile */}
        {isMobile && (
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button 
                variant={activeEye === "right" ? "contained" : "outlined"}
                color="primary"
                onClick={() => setActiveEye("right")}
                startIcon={<RemoveRedEye />}
                sx={{ borderRadius: 4, px: 2 }}
              >
                Right
              </Button>
              <Button 
                variant={activeEye === "both" ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setActiveEye("both")}
                sx={{ borderRadius: 4, px: 2 }}
              >
                Both
              </Button>
              <Button 
                variant={activeEye === "left" ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setActiveEye("left")}
                startIcon={<RemoveRedEyeOutlined />}
                sx={{ borderRadius: 4, px: 2 }}
              >
                Left
              </Button>
            </Stack>
          </Box>
        )}

        {/* Eye Form Sections */}
        <Grid container spacing={3}>
          {(!isMobile || activeEye === "right" || activeEye === "both") && (
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                {renderEyeSection("right")}
              </Slide>
            </Grid>
          )}
          
          {(!isMobile || activeEye === "left" || activeEye === "both") && (
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                {renderEyeSection("left")}
              </Slide>
            </Grid>
          )}
        </Grid>

        {/* Status Indicator */}
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: 3, 
            mb: 2 
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: isValid ? "success.main" : "text.secondary",
              fontStyle: "italic"
            }}
          >
            {isValid 
              ? "All required fields are valid. You can proceed to the next step." 
              : "Please fill in the required fields to proceed."
            }
          </Typography>
        </Box>

        {/* Button Section */}
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 3
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={prevStep}
            sx={{ 
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: 1,
              minWidth: { xs: 100, sm: 120 },
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                backgroundColor: "rgba(25, 118, 210, 0.05)"
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            onClick={nextStep}
            disabled={!isValid}
            sx={{ 
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: 1,
              minWidth: { xs: 100, sm: 120 },
              boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.26)"
              }
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PowerEntry;