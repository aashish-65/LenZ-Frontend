// PowerEntry.js
import React, { useState, useEffect } from 'react';


const PowerEntry = ({ lensType, onPowerDataChange }) => {
  // State to hold eye power data
  const [eyePower, setEyePower] = useState({
    right: {
      spherical: '',
      cylindrical: '',
      axis: '',
      addition: ''
    },
    left: {
      spherical: '',
      cylindrical: '',
      axis: '',
      addition: ''
    }
  });

  // State for error messages
  const [errors, setErrors] = useState({});
  // State for power type (high or low) for billing purposes
  const [powerType, setPowerType] = useState({
    right: '',
    left: ''
  });
  // State to mark "Single Power" or "Double Power"
  const [powerEntryType, setPowerEntryType] = useState('');

  useEffect(() => {
    // Determine power type (high or low) for billing purposes
    const calculatePowerType = (eye) => {
      const spherical = parseFloat(eye.spherical);
      if (!isNaN(spherical)) {
        return spherical >= 7 || spherical <= -7 ? 'High' : 'Low';
      }
      return '';
    };

    setPowerType({
      right: calculatePowerType(eyePower.right),
      left: calculatePowerType(eyePower.left)
    });

    // Determine if it's Single or Double Power
    const hasRightEyePower = Object.values(eyePower.right).some((val) => val !== '');
    const hasLeftEyePower = Object.values(eyePower.left).some((val) => val !== '');

    if (hasRightEyePower && hasLeftEyePower) {
      setPowerEntryType('Double Power');
    } else if (hasRightEyePower || hasLeftEyePower) {
      setPowerEntryType('Single Power');
    } else {
      setPowerEntryType('');
    }

    // Notify parent of the current power data
    onPowerDataChange(eyePower);
  }, [eyePower, onPowerDataChange]);

  // Validate input based on lens type
  const validateInput = (eye, param, value) => {
    const lensRanges = {
      SV: {
        spherical: { min: -30, max: 30 },
        cylindrical: { min: -16, max: 15 },
        axis: { min: 1, max: 180 },
        addition: null // Addition not allowed for SV
      },
      KT: {
        spherical: { min: -20, max: 20 },
        cylindrical: { min: -10, max: 10 },
        axis: { min: 1, max: 180 },
        addition: { min: 1, max: 3 }
      },
      PR: {
        spherical: { min: -20, max: 20 },
        cylindrical: { min: -10, max: 10 },
        axis: { min: 1, max: 180 },
        addition: { min: 1, max: 3 }
      }
    };

    const range = lensRanges[lensType][param];
    if (range !== null && (parseFloat(value) < range.min || parseFloat(value) > range.max)) {
      setErrors((prev) => ({
        ...prev,
        [`${eye}${param}`]: `${param} value must be between ${range.min} and ${range.max}.`
      }));
      return false;
    }

    // Clear error if valid
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`${eye}${param}`];
      return newErrors;
    });

    return true;
  };

  const handleInputChange = (eye, param, value) => {
    setEyePower((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [param]: value
      }
    }));
  };

  const handleBlur = (eye, param, value) => {
    if (!validateInput(eye, param, value)) {
      // Do not proceed if validation fails
      return;
    }
  };

  return (
    <div className="power-entry">
      {['right', 'left'].map((eye) => (
        <div key={eye} className={`eye-entry ${eye}`}>
          <h3>{`${eye.charAt(0).toUpperCase() + eye.slice(1)} Eye`}</h3>
          {['spherical', 'cylindrical', 'axis', 'addition'].map((param) => (
            <div key={param} className="input-group">
              <label>{param.charAt(0).toUpperCase() + param.slice(1)}:</label>
              <input
                type="number"
                value={eyePower[eye][param]}
                onChange={(e) => handleInputChange(eye, param, e.target.value)}
                onBlur={(e) => handleBlur(eye, param, e.target.value)}
                disabled={
                  (lensType === 'SV' && param === 'addition') ||
                  (param === 'axis' && !eyePower[eye].cylindrical)
                }
              />
              {errors[`${eye}${param}`] && (
                <span className="error-message">{errors[`${eye}${param}`]}</span>
              )}
            </div>
          ))}
          <div className="power-type">
            {eyePower[eye].spherical && (
              <span>
                Power Type: {powerType[eye] || 'Not specified'}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="entry-type">
        {powerEntryType && <span>Entry Type: {powerEntryType}</span>}
      </div>
    </div>
  );
};

export default PowerEntry;
