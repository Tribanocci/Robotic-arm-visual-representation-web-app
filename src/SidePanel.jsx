// sidepanel.js/SidePanel.js

import React, { useState } from 'react';
import Button from './Button'; // Assuming you have a Button component with an image
import './SidePanel.css'; // Import the SidePanel styles
import './Button.css'; // Import the Button styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const axis = [
  { id: 1, name: 'x', unavailable: false },
  { id: 2, name: 'y', unavailable: false }
]

function BaseAxisPicker() {
  const [selectedAxis, setSelectedAxis] = useState(axis[0]); // Declare a state variable...
  // ...
  return (
    <select
      value={selectedAxis.name} // ...force the select's value to match the state variable...
      onChange={e => setSelectedAxis(e.target.value)} // ... and update the state variable on any change!
    >
      <option value={axis[0].name}>X Axis rotation</option>
      <option value={axis[1].name}>Y Axis rotation</option>
    </select>
  );
}
const SidePanel = ({onAddBase, onAddLinkRev, onAddLinkTr, onAddLinkFix, onRemoveLink, isBase, onDownload}) => {
  const isOnlyBase = isBase === 0;
  // State for button accesability values
  const [baseButtonActive, setBaseButtonActive] = useState(true);
  const handleBaseButtonActive = () => {
    setBaseButtonActive(false);
    onAddBase();
  }
  const handleRemoveButtonActive = () => {
    onRemoveLink();
    if (isOnlyBase){
      setBaseButtonActive(true);
    }
  }


  const handleHomeButtonClick = () => {
    const shouldNavigateHome = window.confirm("Are you sure you want to return to the home page? Any unsaved changes will be lost.");

    if (shouldNavigateHome) {
      // If the user confirms, navigate to the home page
      window.location.href = '/';
    }
    // If the user cancels, do nothing
  };



  return (
    <div className="side-panel">
      <Row>
        <Col xs={1}>
          <Button onClick={handleHomeButtonClick} imageSrc='./home.png' />
        </Col>
      </Row>
      <h1 className="title">Side Panel Title</h1>
      <Container className={`base-control ${baseButtonActive ? '' : 'inactive'}`}>
        <Row>
          <Col><h3>Add Base:</h3></Col>
        </Row>
        <Row className='m-auto'>
          <Col xs={6} className='m-auto'>
            <Row><label>Set Axis</label></Row>
            <Row><BaseAxisPicker /></Row>
          </Col>
          <Col xs={2} className='m-auto'>
            <Row >
              <Button onClick={handleBaseButtonActive} imageSrc="./chain.png" />
            </Row>
          </Col>
        </Row>

      </Container>

      {/* Button with an image */}
      <Container className={`base-control ${!baseButtonActive ? '' : 'inactive'}`}>
        <Row>
          <Col><h3>Add/Remove Links:</h3></Col>
        </Row>
        <Row className='m-2'> 
          <Col><p>Add revolut link:</p></Col>
          <Col><Button onClick={onAddLinkRev} imageSrc="./chain.png" /></Col>
        </Row>

        <Row className='m-2'>
          <Col><p>Add translational link:</p></Col>
          <Col><Button onClick={onAddLinkTr} imageSrc="./chain.png" /></Col>
        </Row>

        <Row className='m-2'>
          <Col><p>Add fixed link:</p></Col>
          <Col><Button onClick={onAddLinkFix} imageSrc="./chain.png" /></Col>
        </Row>

        <Row className='m-2'>
          <Col><p>Remove link:</p></Col>
          <Col><Button onClick={handleRemoveButtonActive} imageSrc="./chain.png" /></Col>
        </Row>

        <Row className='m-2'>
          <Col><p>Download:</p></Col>
          <Col><Button onClick={onDownload} imageSrc="./chain.png" /></Col>
        </Row>
      </Container>

      
{/*       <div className='controls-panel'>
        <div className='control-buttons'>
          <p>Add revolut link:   </p>
          <Button onClick={onAddLinkRev} imageSrc="./chain.png" />
        </div>

        <div className='control-buttons'>
          <p>Add translational link:   </p>
          <Button onClick={onAddLinkTr} imageSrc="./chain.png" />
        </div>

        <div className='control-buttons'>
          <p>Add fixed link:   </p>
          <Button onClick={onAddLinkFix} imageSrc="./chain.png" />
        </div>

        <div className='control-buttons'>
          <p>Remove link:</p>
          <Button onClick={handleRemoveButtonActive} imageSrc="./chain.png" />
        </div>

      </div> */}
      

      {/* Sliders */}
{/*       {sliders.map(slider => (
        <div key={slider.id} className="slider-container">
          <label className="slider-label">Angle of Link No. : {slider.id} </label>
          <input
            type="range"
            min="0"
            max="6"
            step="0.1"
            value={slider.value}
            onChange={e => handleSliderChange(slider.id, parseInt(e.target.value))}
            className="slider"
          />
          <span>{slider.value}</span>
        </div>
      ))} */}



    </div>
  );
};

export default SidePanel;
