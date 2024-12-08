import React from 'react'

const MaterialSelection = ({ setMaterialDetails, nextStep, prevStep, frameOptions }) => {
    const handleMaterialSelection = (materialType) => {
        setMaterialDetails(materialType);
        nextStep();
    };

    return (
        <div>
            <h3>Select Material for {frameOptions.type}</h3>
            {frameOptions.type === 'Full Frame' && (
                <>
                    <button onClick={() => handleMaterialSelection('CR')}>CR</button>
                    <button onClick={() => handleMaterialSelection('Glass')}>Glass</button>
                </>
            )}
            {frameOptions.type === 'Supra' && (
                <>
                    <button onClick={() => handleMaterialSelection('CR')}>CR</button>
                    <button onClick={() => handleMaterialSelection('Glass')}>Glass</button>
                </>
            )}
            {frameOptions.type === 'Rimless' && (
                <>
                    <button onClick={() => handleMaterialSelection('Poly')}>Poly</button>
                    <button onClick={() => handleMaterialSelection('CR')}>CR</button>
                </>
            )}
            <button onClick={prevStep}>Back</button>
        </div>
    );
};

export default MaterialSelection
