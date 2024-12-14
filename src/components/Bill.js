import React from "react";
import "../assets/styles/Bill.css";

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
  prevStep,
  nextStep,
}) => {
  const { name, billNumber } = customerDetails;
  const { type: frameType } = frameOptions;

  // Shifting Charges
  const shiftingCharges = {
    "Full Frame": 15,
    Supra: 20,
    Rimless: 40,
  };

  // Fitting Charges
  const fittingCharges = {
    "Full Frame": {
      Normal: {
        low: { Single: 15, Double: 25 },
        high: { Single: 20, Double: 35 },
      },
      PR: {
        low: { Single: 50, Double: 100 },
        high: { Single: 60, Double: 120 },
      },
    },
    Supra: {
      Normal: {
        low: { Single: 20, Double: 35 },
        high: { Single: 25, Double: 45 },
      },
      PR: {
        low: { Single: 50, Double: 100 },
        high: { Single: 60, Double: 120 },
      },
    },
    Rimless: {
      Normal: {
        low: { Single: 40, Double: 80 },
        high: { Single: 50, Double: 100 },
      },
      PR: {
        low: { Single: 60, Double: 120 },
        high: { Single: 75, Double: 150 },
      },
      Poly: {
        low: { Single: 50, Double: 100 },
        high: { Single: 60, Double: 120 },
      },
      PolyPR: {
        low: { Single: 75, Double: 150 },
        high: { Single: 90, Double: 180 },
      },
    },
  };

  // Helper function to determine frameTypeKey
  const getFrameTypeKey = () => {
    if (frameType === "Rimless") {
      if (
        materialDetails === "Poly" &&
        (lensDetails === "SV" || lensDetails === "KT")
      ) {
        return "Poly";
      } else if (lensDetails === "PR" && materialDetails === "Poly") {
        return "PolyPR";
      }
    }
    return lensDetails === "PR" ? "PR" : "Normal";
  };

  // Helper function to render power details
  // const renderPowerDetails = (powerDetails) => {
  //   let powerDetailStr = "";
  //   if (powerDetails.right) {
  //     powerDetailStr += `Right Eye:- \n`;
  //     if (powerDetails.right.spherical)
  //       powerDetailStr += `\tSpherical: ${powerDetails.right.spherical}\n`;
  //     if (powerDetails.right.cylindrical)
  //       powerDetailStr += `\tCylindrical: ${powerDetails.right.cylindrical}\n`;
  //     if (powerDetails.right.axis)
  //       powerDetailStr += `\tAxis: ${powerDetails.right.axis}\n`;
  //     if (powerDetails.right.addition)
  //       powerDetailStr += `\tAddition: ${powerDetails.right.addition}\n`;
  //   }
  //   if (powerDetails.left) {
  //     powerDetailStr += `Left Eye:- \n`;
  //     if (powerDetails.left.spherical)
  //       powerDetailStr += `\tSpherical: ${powerDetails.left.spherical}\n`;
  //     if (powerDetails.left.cylindrical)
  //       powerDetailStr += `\tCylindrical: ${powerDetails.left.cylindrical}\n`;
  //     if (powerDetails.left.axis)
  //       powerDetailStr += `\tAxis: ${powerDetails.left.axis}\n`;
  //     if (powerDetails.left.addition)
  //       powerDetailStr += `\tAddition: ${powerDetails.left.addition}\n`;
  //   }
  //   return powerDetailStr;
  // };

  // Calculate total amount
  let totalAmount = 0;
  // let billDetails = `Customer Name: ${name}\nBill Number: ${billNumber}\nFrame Type: ${frameType}\n`;

  if (shiftingOrFitting === "Shifting") {
    const shiftingCharge = shiftingCharges[frameType] || 0;
    totalAmount += shiftingCharge;
    // billDetails += `Shifting Charges: Rs ${shiftingCharge}\n`;
  } else if (shiftingOrFitting === "Fitting") {
    const frameCategory = fittingCharges[frameType];
    const frameTypeKey = getFrameTypeKey();
    const powerCharge = frameCategory[frameTypeKey][powerType][powerEntryType];
    totalAmount += powerCharge;
    // billDetails += `Fitting Charges: Rs ${powerCharge}\n`;
  }

  // If lens is purchased, include lens details
  // if (lensDetails) {
  //   billDetails += `Lens Type: ${lensDetails}\n`;
  // }

  // Include material and coating details if available
  // if (materialDetails) {
  //   billDetails += `Material: ${materialDetails}\n`;
  // }
  // if (coatingDetails) {
  //   billDetails += `Coating: ${coatingDetails}\n`;
  // }

  // Include power details
  // if (powerDetails) {
  //   billDetails += `Power: \n${renderPowerDetails(powerDetails)}`;
  // }

  // billDetails += `Total Amount: Rs ${totalAmount}\n`;

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
                ? shiftingCharges[frameType]
                : totalAmount}
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
