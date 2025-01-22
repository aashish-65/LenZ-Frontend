import React from "react";
import "../assets/styles/PaymentType.css";

const PaymentType = ({ paymentType, setPaymentType, placeOrder, prevStep }) => {
    const handleCOD = () => {
        setPaymentType("COD");
        placeOrder();
      };

  return (
    <div className="payment-container">
      <h3 className="payment-title">Select Payment Type</h3>
      <div className="payment-buttons">
        <button
          className={`payment-button ${
            paymentType === "COD" ? "selected" : ""
          }`}
          onClick={handleCOD}
        >
          Cash on Delivery
        </button>
        <button
          className={`payment-button ${
            paymentType === "Online" ? "selected" : ""
          }`}
          onClick={handleCOD}
        >
          Online Payment
        </button>
      </div>
      <button className="payment-back-button" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};

export default PaymentType;
