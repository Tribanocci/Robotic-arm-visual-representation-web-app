import React, { useState } from 'react';


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
        const result = await fetch("https://able-treefrog-30552.upstash.io/set/user_1_session/session_token_value", {
          method: "PUT", // Use PUT method to replace existing content
          headers:{
            Authorization: "Bearer AXdYASQgODgyMmQ1NmItZDg5Yi00N2IxLWExOTQtNGY5ZDJhMDBiNDNiZGM4ZDYyMThkN2FhNGIzNWE3YTM4NjhlNThiNzU3ZjU=",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fileContents)
 
        });
        if (result.ok) {
          console.log("File uploaded successfully.");
          console.log(fileContents.data)
          window.location.href = '/continueproject'
        } else {
          console.log(fileContents)
          console.error("Failed t00o upload file.");
        }
      } catch (error) {
        console.error("Error uploading filezz:", error);
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
  const res = await fetch('https://able-treefrog-30552.upstash.io/set/user_1_session/session_token_value', {
    headers:{
      Authorization: "Bearer AXdYASQgODgyMmQ1NmItZDg5Yi00N2IxLWExOTQtNGY5ZDJhMDBiNDNiZGM4ZDYyMThkN2FhNGIzNWE3YTM4NjhlNThiNzU3ZjU=",
    }
  });
  console.log(res.status)
  return res.json()
}



