import React, { useState, useRef, useEffect  } from 'react';
import { Suspense } from 'react';
import {  OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import SidePanel from './SidePanel';
import LinkCompo from './LinkCompo';
import { Base } from './Links';

import './NewProject.css';



export default function NewProject() {



  let linkRef = useRef();
  const [links, setLinks] = useState([]);
  
  const [rotationValues, setRotationValues] = useState({});


 
    
  useEffect(() => {
    console.log('useRffect, NewProject, prints')
    console.log(links)
    if (linkRef.current){
      console.log(linkRef.current)
      console.log('links:')
      console.log(links)
    }
    console.log('--------------------')
  },[links])
  




  const handleAddLink = (type) => {
    return () => {
      console.log('Button, prints');
      if (links.length>0) {
        console.log('looking for child')
        links[ links.length - 1].linkLength = linkRef.current.children[2].position.y - linkRef.current.children[0].position.y
        console.log('Found it')
        const newLink = {
          positionStart: [
            linkRef.current.children[2].position.x,
            linkRef.current.children[2].position.y,
            linkRef.current.children[2].position.z,
          ],
          linkLength: 0.2,
          type: type,
        };
        
        setLinks([...links, newLink]);
      } else {
        setLinks([
          ...links,
          {
            positionStart: [0, 0, 0],
            linkLength: 0.2,
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
    if (links.length>0) {
      const updatedLinks = [...links.slice(0, -1)];
      setLinks(updatedLinks);
      console.log(links)
      linkRef.current = null;
    }
    console.log('Remove Button end prints -----------------------');
  } 




  return (
    <div className="NewProject">
      <div className="panel">
        {/* Pass handleAddLink function to SidePanel component */}
        <SidePanel onAddLinkRev={handleAddLink('rev')} onAddLinkTr={handleAddLink('tr')} onAddLinkFix={handleAddLink('fix')} onRemoveLink={handleRemoveLink}/>
      </div>
      <div className="scene">
        <Canvas camera={{ position: [-0.5, 1, 2] }}>
          <Suspense fallback={null}>
            <Environment files="./environment.hdr" background blur={0.5} />
            <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
            <Base position={[0,0,0]} name="Base" />
            {links.map((link, index) => (
              <LinkCompo key={index} positionStart={link.positionStart} linkLength={link.linkLength} ref={linkRef}  />
            ))}
            <OrbitControls />
            <axesHelper args={[5]} />
            
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
