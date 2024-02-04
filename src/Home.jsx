import React, { useState } from 'react';

import './Home.css';

export default function Home() {
  const [uploadedData, setUploadedData] = useState(null);
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setUploadedData(jsonData);
          console.log(jsonData)
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };

      reader.readAsText(file);
    }
  };

/*   const handleContinueProject = () => {
    // Check if data is available
    if (uploadedData) {
      // Navigate to the '/newproject' route and pass the data as state
      navigate('/newproject', { state: { uploadedData } });
    }
  };
 */
  return (
    <div className='home'>
      <div className='side-panel'>
        <input type='file' accept='.json' onChange={handleFileUpload} />
        <button onClick={() => window.location.href = '/continueproject'} disabled={!uploadedData}>
          Continue Project
        </button>
      </div>
      <div className='main-panel'>
        <div className='mask'>
          <div className='start-panel'>
            <h2>Get Started</h2>
            <button onClick={() => window.location.href = '/newproject'}>Start new project</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export const linksLoader = async () => {
    const res = await fetch('http://localhost:4000/data')

    return res.json()
}