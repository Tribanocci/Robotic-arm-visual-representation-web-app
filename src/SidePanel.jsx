// sidepanel.js/SidePanel.js

import React, { useState } from 'react';
import Button from './Button'; // Assuming you have a Button component with an image
import './SidePanel.css'; // Import the SidePanel styles
import './Button.css'; // Import the Button styles

const SidePanel = ({onAddLink}) => {
  // State for slider values
  const [slider1Value, setSlider1Value] = useState(50);
  const [slider2Value, setSlider2Value] = useState(30);

  // Function to handle slider changes
  const handleSlider1Change = (event, value) => {
    setSlider1Value(value);
  };

  const handleSlider2Change = (event, value) => {
    setSlider2Value(value);
  };

  return (
    <div className="side-panel">
      <h2 className="title">Side Panel Title</h2>

      {/* Button with an image */}
      <Button onClick={onAddLink} imageSrc="./chain.png" />

      {/* Sliders */}
      <div className="slider-container">
        <label className="slider-label">Slider 1:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={slider1Value}
          onChange={e => handleSlider1Change(e, parseInt(e.target.value))}
          className="slider"
        />
        <span>{slider1Value}</span>
      </div>

      <div className="slider-container">
        <label className="slider-label">Slider 2:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={slider2Value}
          onChange={e => handleSlider2Change(e, parseInt(e.target.value))}
          className="slider"
        />
        <span>{slider2Value}</span>
      </div>
    </div>
  );
};

export default SidePanel;
