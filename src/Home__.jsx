import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-router-dom'

import './Home.css';




export default function Home() {
  
  const [uploadedData, setUploadedData] = useState(null);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setUploadedData(file);
    
  };



  
  return (
    <div className='home'>
      <div className='side-panel'>
        <Form method='post' action='/continueproject'>
          <input name='fileName' type='file' accept='.json' onChange={handleFileUpload}  />
          <input name='fileData' type='hidden' defaultValue={uploadedData ? uploadedData : ''} />
          <button  disabled={!uploadedData}>Continue Project</button>
        </Form>

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


function ReadProjData() {}

ReadProjData.prototype.readAsDataAsync = function(file) {
  console.log('myread')
    return new Promise( (resolve, reject) => {
        try{
            const reader = new FileReader();
            reader.onloadend = () => {
              console.log('event')
                const fileContents = reader.result;
                resolve(fileContents)
            }
            console.log('file',file)
            reader.readAsText(file); 
        } catch(error) {
            reject(error)
        }
    });
}


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
export const uploadAction = async ({ request }) => {

  const form = await request.formData()
  const submission =  form.get('fileData')
  console.log('s',submission)
  const projReader = new ReadProjData();
  const data = await projReader.readAsDataAsync(submission)

  console.log('s',submission)
  console.log('d',data)
  return data;
}


export const linksLoader = async () => {
  
  const projReader = new ReadProjData();
 
  let promise = await projReader.readAsDataAsync(uploadedData)
    return promise;
}