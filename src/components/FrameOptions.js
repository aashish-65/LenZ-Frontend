import React from 'react';

const FrameOptions = ({ setFrameOptions, nextStep, prevStep }) => {
    // const [selectedFrame, setSelectedFrame] = useState('');

    const handleFrameSelection = (frameType) => {
        // setSelectedFrame(frameType);
        setFrameOptions({ type: frameType });
        nextStep();
    };

    return (
        <div>
            <h3>Select Frame Type</h3>
            <div>
                <button onClick={() => handleFrameSelection('Full Frame')}>Full Frame</button>
                <button onClick={() => handleFrameSelection('Supra')}>Supra</button>
                <button onClick={() => handleFrameSelection('Rimless')}>Rimless</button>
            </div>
            <button onClick={prevStep}>Back</button>
        </div>
    );
};

export default FrameOptions;