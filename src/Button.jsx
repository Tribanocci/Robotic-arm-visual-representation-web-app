// sidepanel.js/Button.js

import React from 'react';

const Button = ({ onClick, imageSrc }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      <img src={imageSrc} alt="Button Icon" className="button-icon" />
    </button>
  );
};

export default Button;
