import React, { useState } from 'react';

export default function SliderComponent({min = 0, max = 1000}) {
  const [value, setValue] = useState((max - min)/2);

  function handleSliderChange(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        className="rounded-full bg-red-200"
      />
      <p>Value: {value}</p>
    </div>
  );
}
