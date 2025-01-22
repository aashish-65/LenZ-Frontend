import React, { useState, useEffect } from "react";
import "../assets/styles/Bill.css";
import axios from "axios";

const Bill = ({
  customerDetails,
  frameOptions,
  shiftingOrFitting,
  lensDetails,
  materialDetails,
  coatingDetails,
  powerDetails,
  powerType,
  powerEntryType,
  shiftingCharge,
  setShiftingCharge,
  fittingCharge,
  setFittingCharge,
  totalAmount,
  setTotalAmount,
  glassType,
  prevStep,
  nextStep,
}) => {
  const { name, billNumber } = customerDetails;
  const { type: frameType } = frameOptions;

  const [charges, setCharges] = useState({ shiftingCharges: {}, fittingCharges: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the charges from the API
    const fetchCharges = async () => {
      try {
        const response = await axios.get("https://lenz-backend.onrender.com/api/charges/");
        setCharges(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch charges:", err);
        setError("Failed to load charges");
        setIsLoading(false);
      }
    };

    fetchCharges();
  }, []);

  // Helper function to determine frameTypeKey
  const getFrameTypeKey = () => {
    if (frameType === "Rimless") {
      if(glassType === "Sunglass") return "Sunglass";
      if (
        materialDetails === "Poly" &&
        (lensDetails === "SV" || lensDetails === "KT")
      ) {
        return "Poly";
      } else if (lensDetails === "PR" && materialDetails === "Poly") {
        return "PolyPR";
      }
    }
    if (glassType === "Sunglass") return "Sunglass";
    return lensDetails === "PR" ? "PR" : "Normal";
  };

  let total = 0;
  let shiftingAmt = 0;
  let fittingAmt = 0;

  if (shiftingOrFitting === "Shifting" && !isLoading) {
    shiftingAmt = charges[0].data[frameType] || 0;
    setShiftingCharge(shiftingAmt);
    total += shiftingAmt;
    setTotalAmount(total);
  } else if (shiftingOrFitting === "Fitting" && !isLoading) {
    const frameCategory = charges[1].data[frameType];
    const frameTypeKey = getFrameTypeKey();
    fittingAmt = frameCategory?.[frameTypeKey]?.[powerType]?.[powerEntryType] || 0;
    setFittingCharge(fittingAmt);
    total += fittingAmt;
    setTotalAmount(total);
  }

  if (isLoading) {
    return <p>Loading charges...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bill-container">
      <div className="bill-header">
        <h2 className="bill-title">Invoice</h2>
        <p className="customer-info">
          <strong>Customer Name:</strong> {name} <br />
          <strong>Bill Number:</strong> {billNumber}
        </p>
      </div>

      <div className="bill-body">
        <section className="bill-section">
          <h3>Frame Information</h3>
          <p>
            <strong>Frame Type:</strong> {frameType}
          </p>
        </section>

        {shiftingOrFitting && (
          <section className="bill-section">
            <h3>{shiftingOrFitting} Charges</h3>
            <p>
              <strong>Charge Amount:</strong> Rs{" "}
              {shiftingOrFitting === "Shifting"
                ? shiftingCharge
                : fittingCharge}
            </p>
          </section>
        )}

        {lensDetails && (
          <section className="bill-section">
            <h3>Lens Details</h3>
            <p>
              <strong>Lens Type:</strong> {lensDetails}
            </p>
          </section>
        )}

        {materialDetails && (
          <section className="bill-section">
            <h3>Material</h3>
            <p>
              <strong>Material:</strong> {materialDetails}
            </p>
          </section>
        )}

        {coatingDetails && (
          <section className="bill-section">
            <h3>Coating</h3>
            <p>
              <strong>Coating:</strong> {coatingDetails}
            </p>
          </section>
        )}

        {powerDetails && (
          <section className="bill-section power-details">
            <h3>Power Details</h3>
            <div className="power-info">
              {powerDetails.right && (
                <div className="eye-details">
                  <h4>Right Eye</h4>
                  <ul>
                    {powerDetails.right.spherical && (
                      <li>
                        <strong>Spherical:</strong>{" "}
                        {powerDetails.right.spherical}
                      </li>
                    )}
                    {powerDetails.right.cylindrical && (
                      <li>
                        <strong>Cylindrical:</strong>{" "}
                        {powerDetails.right.cylindrical}
                      </li>
                    )}
                    {powerDetails.right.axis && (
                      <li>
                        <strong>Axis:</strong> {powerDetails.right.axis}
                      </li>
                    )}
                    {powerDetails.right.addition && (
                      <li>
                        <strong>Addition:</strong> {powerDetails.right.addition}
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {powerDetails.left && (
                <div className="eye-details">
                  <h4>Left Eye</h4>
                  <ul>
                    {powerDetails.left.spherical && (
                      <li>
                        <strong>Spherical:</strong>{" "}
                        {powerDetails.left.spherical}
                      </li>
                    )}
                    {powerDetails.left.cylindrical && (
                      <li>
                        <strong>Cylindrical:</strong>{" "}
                        {powerDetails.left.cylindrical}
                      </li>
                    )}
                    {powerDetails.left.axis && (
                      <li>
                        <strong>Axis:</strong> {powerDetails.left.axis}
                      </li>
                    )}
                    {powerDetails.left.addition && (
                      <li>
                        <strong>Addition:</strong> {powerDetails.left.addition}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="bill-total">
          <h3>Total Amount</h3>
          <p>
            <strong>Rs {totalAmount}</strong>
          </p>
        </section>
      </div>

      <div className="bill-footer">
        <button className="prev-button" onClick={prevStep}>
          Back
        </button>
        <button className="next-button" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Bill;
