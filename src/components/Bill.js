import React from "react";

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
//   console.log("customerDetails", customerDetails);
//   console.log("frameOptions", frameOptions);
//   console.log("shiftingOrFitting", shiftingOrFitting);
//   console.log("lensDetails", lensDetails);
//   console.log("materialDetails", materialDetails);
//   console.log("coatingDetails", coatingDetails);
//   console.log("powerDetails", powerDetails);
//   console.log("powerType", powerType);
//   console.log("powerEntryType", powerEntryType);

  // Shifting Charges
  const shiftingCharges = {
    "Full Frame": 25,
    Supra: 35,
    Rimless: 80,
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
    },
  };

  // Calculate total amounts
  let totalAmount = 0;
  let billDetails = `Customer Name: ${name}\nBill Number: ${billNumber}\nFrame Type: ${frameType}\n`;

  if (shiftingOrFitting === "Shifting") {
    const shiftingCharge = shiftingCharges[frameType] || 0;
    totalAmount += shiftingCharge;
    billDetails += `Shifting Charges: Rs ${shiftingCharge}\n`;
  } else if (shiftingOrFitting === "Fitting") {
    const frameCategory = fittingCharges[frameType];
    console.log("frameCategory", frameCategory);
    const frameTypeKey = lensDetails === "PR" ? "PR" : "Normal";
    // const powerKey = powerType === "low" ? "low" : "high";
    // const lensCategory = frameCategory[frameTypeKey];
    // const powerTypeCategory = lensCategory[powerType];
    // const powerEntryTypeCategory = powerTypeCategory[powerEntryType];
    // console.log("lensCategory", lensCategory);
    // console.log("powerTypeCategory", powerTypeCategory);
    // console.log("powerEntryTypeCategory", powerEntryTypeCategory);
    const powerCharge = frameCategory[frameTypeKey][powerType][powerEntryType];

    totalAmount += powerCharge;
    billDetails += `Fitting Charges: Rs ${powerCharge}\n`;
  }

  // If lens is purchased, include lens details
  if (lensDetails) {
    billDetails += `Lens Type: ${lensDetails}\n`;
  }

  // Include material and coating details if available
  if (materialDetails) {
    billDetails += `Material: ${materialDetails}\n`;
  }
  if (coatingDetails) {
    billDetails += `Coating: ${coatingDetails}\n`;
  }

  // Include power details
  if (powerDetails) {
    billDetails += `Power: \n`;
    if(powerDetails.right){
        let rightEyeDetails = `Right Eye:- \n`;
        if(powerDetails.right.spherical){
          rightEyeDetails += `\tSpherical: ${powerDetails.right.spherical}\n`;
        }
        if(powerDetails.right.cylindrical){
          rightEyeDetails += `\tCylindrical: ${powerDetails.right.cylindrical}\n`;
        }
        if(powerDetails.right.axis){
          rightEyeDetails += `\tAxis: ${powerDetails.right.axis}\n`;
        }
        if(powerDetails.right.addition){
          rightEyeDetails += `\tAddition: ${powerDetails.right.addition}\n`;
        }
        billDetails += rightEyeDetails;
    }
    if(powerDetails.left){
        let leftEyeDetails = `Left Eye:- \n`;
        if(powerDetails.left.spherical){
          leftEyeDetails += `\tSpherical: ${powerDetails.left.spherical}\n`;
        }
        if(powerDetails.left.cylindrical){
          leftEyeDetails += `\tCylindrical: ${powerDetails.left.cylindrical}\n`;
        }
        if(powerDetails.left.axis){
          leftEyeDetails += `\tAxis: ${powerDetails.left.axis}\n`;
        }
        if(powerDetails.left.addition){
          leftEyeDetails += `\tAddition: ${powerDetails.left.addition}\n`;
        }
        billDetails += leftEyeDetails;
    }
  }

  billDetails += `Total Amount: Rs ${totalAmount}\n`;

  return (
    <div>
      <h2>Bill</h2>
      <pre>{billDetails}</pre>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Bill;
