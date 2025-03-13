import React, { useState, useContext } from "react";
import CustomerDetails from "../components/CustomerDetails";
import FrameOptions from "../components/FrameOptions";
import ShiftingOrFitting from "../components/ShiftingOrFitting";
import LensSelection from "../components/LensSelection";
import MaterialSelection from "../components/MaterialSelection";
import CoatingSelection from "../components/CoatingSelection";
import PowerEntry from "../components/PowerEntry";
import Bill from "../components/Bill";
import ConfirmationBox from "../components/ConfirmationBox";
import "../assets/styles/CreateOrder.css";
import OrderSuccess from "../components/OrderSuccess";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { Button, Box, Typography, Container } from "@mui/material";

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
  const purchaseLens = false;
  const [glassType, setGlassType] = useState("");
  // const [paymentType, setPaymentType] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [fittingCharge, setFittingCharge] = useState(0);
  const [shiftingCharge, setShiftingCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // const handleLensSelection = (selection) => {
  //   setPurchaseLens(selection);
  //   nextStep();
  // };

  const handleGlassTypeSelection = (type) => {
    setGlassType(type);
    nextStep();
  };

  const orderDetails = {
    userId,
    customerDetails,
    frameOptions,
    shiftingOrFitting,
    purchaseLens: false,
    glassType,
    lensDetails,
    materialDetails,
    coatingDetails,
    powerDetails,
    powerType,
    powerEntryType,
    fittingCharge,
    shiftingCharge,
    totalAmount,
    // paymentType,
    // orderPlaced,
  };

  // console.log("Shifting Order Details:", shiftingOrderDetails);

  // console.log("Payment Type", paymentType);
  const placeOrder = async () => {
    if (!userId) {
      alert("User not logged in. Please log in to place an order.");
      return;
    }

    try {
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/orders/place-order",
        {
          userId,
          ...orderDetails, // Spread order details to include in the request
        }
      );
      console.log("Order Placed:", response.data);

      setOrderPlaced(true);
      nextStep();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="main-container">
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
          shiftingCharge={shiftingCharge}
          setShiftingCharge={setShiftingCharge}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && shiftingOrFitting === "Shifting" && (
        <ConfirmationBox
          // paymentType={paymentType}
          // setPaymentType={setPaymentType}
          placeOrder={placeOrder}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 6 && orderPlaced && <OrderSuccess />}
      {/* {step === 4 && shiftingOrFitting === "Fitting" && (
        <Container maxWidth="sm">
          <Box
            sx={{
              padding: 4,
              backgroundColor: "#fff",
              borderRadius: 5,
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              transition: "all 0.3s ease",
              ":hover": {
                boxShadow: "0 14px 28px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#1a237e",
                marginBottom: 3,
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Choose Your Lens Option
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#424242",
                marginBottom: 4,
                lineHeight: 1.6,
              }}
            >
              Please select one of the options below to proceed. Your choice
              will determine the next steps for your fitting process.
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="center"
              gap={{ xs: 3, sm: 4 }}
              mb={4}
            >
              <Button
                variant={purchaseLens === false ? "contained" : "outlined"}
                onClick={() => handleLensSelection(false)}
                sx={{
                  padding: "14px 35px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: 30,
                  textTransform: "none",
                  backgroundColor: purchaseLens === false ? "#3949ab" : "#fff",
                  color: purchaseLens === false ? "#fff" : "#3949ab",
                  borderColor: "#3949ab",
                  boxShadow:
                    purchaseLens === false
                      ? "0 6px 12px rgba(57, 73, 171, 0.3)"
                      : "none",
                  transition: "all 0.3s ease",
                  ":hover": {
                    backgroundColor:
                      purchaseLens === false ? "#283593" : "#f5f5f5",
                    color: purchaseLens === false ? "#fff" : "#3949ab",
                  },
                }}
              >
                I have the lens
              </Button>
              <Button
                variant={purchaseLens === true ? "contained" : "outlined"}
                onClick={() => handleLensSelection(true)}
                sx={{
                  padding: "14px 35px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: 30,
                  textTransform: "none",
                  backgroundColor: purchaseLens === true ? "#3949ab" : "#fff",
                  color: purchaseLens === true ? "#fff" : "#3949ab",
                  borderColor: "#3949ab",
                  boxShadow:
                    purchaseLens === true
                      ? "0 6px 12px rgba(57, 73, 171, 0.3)"
                      : "none",
                  transition: "all 0.3s ease",
                  ":hover": {
                    backgroundColor:
                      purchaseLens === true ? "#283593" : "#f5f5f5",
                    color: purchaseLens === true ? "#fff" : "#3949ab",
                  },
                }}
              >
                Purchase the lens
              </Button>
            </Box>
            <Button
              variant="outlined"
              onClick={prevStep}
              sx={{
                padding: "12px 30px",
                fontWeight: "bold",
                borderRadius: 20,
                textTransform: "none",
                borderColor: "#3949ab",
                color: "#3949ab",
                ":hover": {
                  backgroundColor: "#3949ab",
                  color: "#fff",
                },
              }}
            >
              Back
            </Button>
          </Box>
        </Container>
      )} */}

      {step === 4 &&
        shiftingOrFitting === "Fitting" &&
        purchaseLens !== null && (
          <Container maxWidth="sm">
            <Box
              sx={{
                padding: 4,
                backgroundColor: "#fff",
                borderRadius: 5,
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "all 0.3s ease",
                ":hover": {
                  boxShadow: "0 14px 28px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1a237e",
                  marginBottom: 3,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                Select Glass Type
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#424242",
                  marginBottom: 4,
                  lineHeight: 1.6,
                }}
              >
                Choose the glass type that suits your needs.
              </Typography>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="center"
                gap={{ xs: 3, sm: 4 }}
                mb={4}
              >
                <Button
                  variant={glassType === "Sunglass" ? "contained" : "outlined"}
                  onClick={() => handleGlassTypeSelection("Sunglass")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor:
                      glassType === "Sunglass" ? "#3949ab" : "#fff",
                    color: glassType === "Sunglass" ? "#fff" : "#3949ab",
                    borderColor: "#3949ab",
                    boxShadow:
                      glassType === "Sunglass"
                        ? "0 6px 12px rgba(57, 73, 171, 0.3)"
                        : "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor:
                        glassType === "Sunglass" ? "#283593" : "#f5f5f5",
                      color: glassType === "Sunglass" ? "#fff" : "#3949ab",
                    },
                  }}
                >
                  Sunglass
                </Button>
                <Button
                  variant={glassType === "Normal" ? "contained" : "outlined"}
                  onClick={() => handleGlassTypeSelection("Normal")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor:
                      glassType === "Normal" ? "#3949ab" : "#fff",
                    color: glassType === "Normal" ? "#fff" : "#3949ab",
                    borderColor: "#3949ab",
                    boxShadow:
                      glassType === "Normal"
                        ? "0 6px 12px rgba(57, 73, 171, 0.3)"
                        : "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor:
                        glassType === "Normal" ? "#283593" : "#f5f5f5",
                      color: glassType === "Normal" ? "#fff" : "#3949ab",
                    },
                  }}
                >
                  Normal
                </Button>
              </Box>
              <Button
                variant="outlined"
                onClick={prevStep}
                sx={{
                  padding: "12px 30px",
                  fontWeight: "bold",
                  borderRadius: 20,
                  textTransform: "none",
                  borderColor: "#3949ab",
                  color: "#3949ab",
                  ":hover": {
                    backgroundColor: "#3949ab",
                    color: "#fff",
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </Container>
        )}

      {step === 5 && glassType && (
        <LensSelection
          setLensDetails={setLensDetails}
          nextStep={nextStep}
          prevStep={prevStep}
          glassType={glassType}
        />
      )}
      {step === 6 && glassType === "Sunglass" && (
        <div>
          <PowerEntry
            onPowerDataChange={setPowerDetails}
            onPowerTypeChange={setPowerType}
            onPowerEntryTypeChange={setPowerEntryType}
            lensType={lensDetails}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
      )}
      {step === 7 && glassType === "Sunglass" && (
        <Bill
          customerDetails={customerDetails}
          frameOptions={frameOptions}
          shiftingOrFitting={shiftingOrFitting}
          lensDetails={lensDetails}
          powerDetails={powerDetails}
          powerType={powerType}
          powerEntryType={powerEntryType}
          fittingCharge={fittingCharge}
          setFittingCharge={setFittingCharge}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
          glassType={glassType}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 8 && glassType === "Sunglass" && (
        <ConfirmationBox
          // paymentType={paymentType}
          // setPaymentType={setPaymentType}
          placeOrder={placeOrder}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 9 && orderPlaced && <OrderSuccess />}
      {step === 6 && glassType === "Normal" && (
        <MaterialSelection
          setMaterialDetails={setMaterialDetails}
          nextStep={nextStep}
          prevStep={prevStep}
          frameOptions={frameOptions}
        />
      )}
      {step === 7 &&
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
      {step === 8 &&
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
            fittingCharge={fittingCharge}
            setFittingCharge={setFittingCharge}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      {step === 9 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens === false && (
          <ConfirmationBox
            // paymentType={paymentType}
            // setPaymentType={setPaymentType}
            placeOrder={placeOrder}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      {step === 10 && orderPlaced && <OrderSuccess />}
      {step === 7 &&
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
      {step === 8 &&
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
      {step === 9 &&
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
            fittingCharge={fittingCharge}
            setFittingCharge={setFittingCharge}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      {step === 10 &&
        glassType === "Normal" &&
        materialDetails &&
        purchaseLens === true && (
          <ConfirmationBox
            // paymentType={paymentType}
            // setPaymentType={setPaymentType}
            placeOrder={placeOrder}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      {step === 11 && orderPlaced && <OrderSuccess />}
    </div>
  );
};

export default CreateOrder;
