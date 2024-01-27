// App.jsx

import React, { useState, useRef, useEffect  } from 'react';
import { Suspense } from 'react';
import { Stats, OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import SidePanel from './SidePanel';
import LinkCompo from './LinkCompo';

import { Base } from './Links';

import './App.css';

export default function App() {

  const linkRef = useRef();
  const [links, setLinks] = useState([]);


 
    
  useEffect(() => {
    if (linkRef.current){
      console.log(linkRef.current.children[2].position.x)
      console.log('----------------')
      console.log(links)
    }
  },[links])




  const handleAddLink = () => {
    console.log('Button')
    if (linkRef.current){
    setLinks([...links,{ 
      positionStart: [linkRef.current.children[2].position.x, linkRef.current.children[2].position.y, linkRef.current.children[2].position.z ] // HERE it should be -> linkRef.current.children[2].position but it is not resolved initially
      , linkLength: 0.5
    }]);
  }
  else {
    setLinks([...links,{ 
      positionStart: [0, 0, 0] , linkLength: 0.5 }]);
  }
    console.log('Button end')
  };



  return (
    <div className="App">
      <div className="panel">
        {/* Pass handleAddLink function to SidePanel component */}
        <SidePanel onAddLink={handleAddLink} />
      </div>
      <div className="scene">
        <Canvas camera={{ position: [-0.5, 1, 2] }}>
          <Suspense fallback={null}>
            <Environment files="./environment.hdr" background blur={0.5} />
            <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
            <Base position={[0,0,0]} name="Base" />
            {links.map((link, index) => (
              <LinkCompo key={index} positionStart={link.positionStart} linkLength={link.linkLength} ref={linkRef} />
            ))}
            <OrbitControls />
            <axesHelper args={[5]} />
            <Stats />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
