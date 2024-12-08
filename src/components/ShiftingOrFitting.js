import React from 'react';

const ShiftingOrFitting = ({ setShiftingOrFitting, nextStep, prevStep }) => {
    const handleSelection = (selection) => {
        setShiftingOrFitting(selection);
        nextStep();
    };

    return (
        <div>
            <h2>Shifting or Fitting</h2>
            <button onClick={() => handleSelection('Shifting')}>Shifting</button>
            <button onClick={() => handleSelection('Fitting')}>Fitting</button>
            <button type="button" onClick={prevStep}>Back</button>
        </div>
    );
};

export default ShiftingOrFitting;