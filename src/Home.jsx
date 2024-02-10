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
        
        fetch(`${process.env.KV_REST_API_URL}/set/userSession`, {
          headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
          body: JSON.stringify({
            sessid: '12345',
            session_name: 'abcdef',
            user: {
              uid: 31,
              name: 'test_user',
              mail: 'user@example.com',
            },
          }),
          method: 'PUT',
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
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



