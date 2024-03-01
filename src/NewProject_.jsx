import React, { useState, useRef, useEffect  } from 'react';
import { Suspense } from 'react';
import {  OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import SidePanel from './SidePanel';
import LinkCompo from './LinkCompo_';
import { Base } from './Links_';
import { useLoaderData } from 'react-router-dom';

import './NewProject.css';




export default function NewProject() {

  let initialLinkState = [];
  let initialBaseState = {isActive: false, type: 'x'};
  
  const linksData = useLoaderData()
  if (linksData){
    console.log('GOT IT');
    console.log(linksData);
    initialLinkState = linksData.data.links;
    initialBaseState = linksData.data.base;
  }


 
  const [links, setLinks] = useState(initialLinkState);
  const [base, setBase] = useState(initialBaseState);
  const guiRef = useRef();

  const handleDownloadData = () => {
    const dataToDownload = {
      data:{
        links: links,
        base: base,
      }
    };

    const jsonData = JSON.stringify(dataToDownload);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'project_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  let lastLink = [];
  let lastLinkRot = [];
  let lastLinkLength = 0.2;
  const getData = (valuePos, valueRot, valueLength) => {
    lastLink = [valuePos.x, valuePos.y, valuePos.z];
    lastLinkRot = [valueRot.x, valueRot.y, valueRot.z];
    lastLinkLength = valueLength;
    console.log('my try for end:', links)
  }
 
    
  useEffect(() => {
    console.log('useRffect, NewProject, prints')
    console.log(links)
    console.log('--------------------')
  },[links])
  

const handleAddBase = () => {
  setBase({isActive: true, type: 'x'})
}


  const handleAddLink = (type) => {
    return () => {
      console.log('Button, prints');
      if (links.length>0) {
        console.log('looking for child')
       // links[ links.length - 1].linkLength = linkRef.current.children[2].position.y - linkRef.current.children[0].position.y
        console.log('Found it')
        let updateLinks = links;
        updateLinks[ links.length - 1].linkLength = lastLinkLength; 
        const newLink = {
          positionStart: [
            lastLink[0],
            lastLink[1],
            lastLink[2],
          ],
          rotationStart: [
            lastLinkRot[0],
            lastLinkRot[1],
            lastLinkRot[2]
          ],
          linkLength: 0.2,
          type: type,
        };
        
        setLinks([...updateLinks, newLink]);
      } else {
        setLinks([
          ...links,
          {
            positionStart: [0, 0, 0],
            linkLength: 0.2,
            rotationStart: [0,0,0],
            type: type,
          },
        ]);
      }
      console.log(links)
      console.log('Button end prints -----------------------');
      
    };
  };

  const handleRemoveLink = () => {
    console.log('Remove Button, prints');
    if (base.isActive){
      if (links.length>0) {
        const updatedLinks = [...links.slice(0, -1)];
        setLinks(updatedLinks);
        console.log(links)
      }
      else{
        setBase({isActive: false, type: 'x'})
      }

    }

    console.log('Remove Button end prints -----------------------');
  } 




  return (
    <div className="NewProject">
      <div className="panel">
        {/* Pass handleAddLink function to SidePanel component */}
        <SidePanel onAddBase={handleAddBase} onAddLinkRev={handleAddLink('rev')} onAddLinkTr={handleAddLink('tr')} onAddLinkFix={handleAddLink('fix')} onRemoveLink={handleRemoveLink} isBase={links.length}
                  onDownload={handleDownloadData}/>
      </div>
      <div className="scene">
        <Canvas camera={{ position: [-0.5, 1, 2] }}>
          <Suspense fallback={null}>
            <Environment files="./environment.hdr" background blur={0.5} />
            <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
            <Base position={[0,0,0]} name="Base" isBase={base.isActive} />
            {links.map((link, index) => (
              <LinkCompo key={index} positionStart={link.positionStart} linkLength={link.linkLength} rotationStart={link.rotationStart} onSetLinks_end={getData}  ref={guiRef} />
            ))}
            <OrbitControls />
            <axesHelper args={[5]} />
            
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
