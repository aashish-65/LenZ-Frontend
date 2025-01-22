import React, { useState, useEffect } from "react";
import "../assets/styles/CustomerDetails.css";

const CustomerDetails = ({ setCustomerDetails, nextStep, customerDetails }) => {
  const [name, setName] = useState(customerDetails?.name || "");
  const [billNumber, setBillNumber] = useState(customerDetails?.billNumber || "");

  useEffect(() => {
    // This effect ensures that the form is updated when the customerDetails prop changes.
    if (customerDetails) {
      setName(customerDetails.name ?? "");
      setBillNumber(customerDetails.billNumber ?? "");
    }
  }, [customerDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomerDetails({ name, billNumber });
    nextStep();
  };

  return (
    <form className="customer-details-form" onSubmit={handleSubmit}>
      <h2 className="customer-details-title">Customer Details</h2>
      <input
        type="text"
        className="customer-details-input customer-name-input"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        className="customer-details-input bill-number-input"
        placeholder="Bill Number (If applicable)"
        value={billNumber}
        onChange={(e) => setBillNumber(e.target.value)}
      />
      <button type="submit" className="customer-details-button">
        Next
      </button>
    </form>
  );
};

export default CustomerDetails;
