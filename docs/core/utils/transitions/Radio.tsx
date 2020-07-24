import React from 'react';

export default ({ value, onChange, options }) => {
  return (
    <div>
      {options.map(option => (
        <label key={option}>
          <input
            type="radio"
            onClick={e => {
              onChange(option);
            }}
            value={option}
            checked={value === option}
          />
          {option}
        </label>
      ))}
    </div>
  );
};
