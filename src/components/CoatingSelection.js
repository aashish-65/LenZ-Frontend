import React from 'react'

const CoatingSelection = ({ setCoatingDetails, nextStep, prevStep, materialDetails }) => {
    const handleCoatingSelection = (coatingType) => {
        setCoatingDetails(coatingType);
        nextStep();
    };

    return (
        <div>
            <h3>Select Coating for {materialDetails}</h3>
            {materialDetails === 'Glass' && (
                <>
                    <button onClick={() => handleCoatingSelection('Normal')}>Normal (White Glass)</button>
                    <button onClick={() => handleCoatingSelection('PG')}>PG</button>
                </>
            )}
            {materialDetails === 'CR' && (
                <>
                    <button onClick={() => handleCoatingSelection('HC')}>HC</button>
                    <button onClick={() => handleCoatingSelection('HC Pg')}>HC Pg</button>
                    <button onClick={() => handleCoatingSelection('Bluekart')}>Bluekart</button>
                    <button onClick={() => handleCoatingSelection('Bluekart Pg')}>Bluekart Pg</button>
                    <button onClick={() => handleCoatingSelection('ARC')}>ARC</button>
                    <button onClick={() => handleCoatingSelection('ARC Pg')}>ARC Pg</button>
                    <button onClick={() => handleCoatingSelection('Bluekart Blue (Violet)')}>Bluekart Blue (Violet)</button>
                    <button onClick={() => handleCoatingSelection('Bluekart Blue (Violet) Pg')}>Bluekart Blue (Violet) Pg</button>
                    <button onClick={() => handleCoatingSelection('Dual Coating')}>Dual Coating</button>
                    <button onClick={() => handleCoatingSelection('Dual Coating Pg')}>Dual Coating Pg</button>
                </>
            )}
            {materialDetails === 'Poly' && (
                <>
                    <button onClick={() => handleCoatingSelection('Bluekart')}>Bluekart</button>
                    <button onClick={() => handleCoatingSelection('ARC')}>ARC</button>
                    <button onClick={() => handleCoatingSelection('Bluekart Blue (Violet)')}>Bluekart Blue (Violet)</button>
                    <button onClick={() => handleCoatingSelection('Dual Coating')}>Dual Coating</button>
                </>
            )}
            <button onClick={prevStep}>Back</button>
        </div>
    );
};

export default CoatingSelection
