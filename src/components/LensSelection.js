import React from 'react';

const LensSelection = ({ setLensDetails, nextStep, prevStep, glassType }) => {
    const handleLensSelection = (lensType) => {
        setLensDetails(lensType);
        nextStep();
    };

    return (
        <div>
            <h3>Select Lens for {glassType}</h3>
            <button onClick={() => handleLensSelection('SV')}>SV</button>
            <button onClick={() => handleLensSelection('KT')}>KT</button>
            <button onClick={() => handleLensSelection('PR')}>PR</button>
            <button onClick={prevStep}>Back</button>
        </div>
    );
};

export default LensSelection;