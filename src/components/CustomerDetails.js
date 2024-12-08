import React, { useState } from 'react';

const CustomerDetails = ({ setCustomerDetails, nextStep }) => {
    const [name, setName] = useState('');
    const [billNumber, setBillNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setCustomerDetails({ name, billNumber });
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Customer Details</h2>
            <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Bill Number (If applicable)" value={billNumber} onChange={(e) => setBillNumber(e.target.value)} />
            <button type="submit">Next</button>
        </form>
    );
};

export default CustomerDetails;