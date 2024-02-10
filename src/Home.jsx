import React, { useState, useRef, useEffect } from 'react';


import './Home.css';


function ReadFileAsync(file) {
  return new Promise( (resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileContent = e.target.result;
        resolve(JSON.parse(fileContent))
      }
      reader.readAsText(file)
    } catch(error) {
      reject(error)
    }

  })
}

export default function Home() {
  const [uploadedFile, setuploadedFile] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setuploadedFile(file);
  };

  const handleUpload = async () => {
    if (uploadedFile) {
      let fileContents = await ReadFileAsync(uploadedFile);
      console.log(fileContents)

      try {
        const result = await fetch("http://localhost:4000/data", {
          method: "PUT", // Use PUT method to replace existing content
          body: JSON.stringify(fileContents.data), 
          headers:{
            'Content-Type': 'application/json'
          }
        });
        if (result.ok) {
          console.log("File uploaded successfully.");
          window.location.href = '/continueproject'
        } else {
          console.error("Failed t00o upload file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className='home'>
      <div className='side-panel'>
        
          <input name='fileName' type='file' accept='.json' onChange={handleFileUpload}  />
          <input name='fileData' type='hidden' defaultValue={uploadedFile ? uploadedFile : ''} />
          <button onClick={handleUpload} disabled={!uploadedFile}>Continue Project</button>
          {uploadedFile && (
        <section>
          File details:
          <ul>
            <li>Name: {uploadedFile.name}</li>
            <li>Type: {uploadedFile.type}</li>
            <li>Size: {uploadedFile.size} bytes</li>
          </ul>
        </section>
      )}

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



