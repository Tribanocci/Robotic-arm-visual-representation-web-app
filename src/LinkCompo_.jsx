// LinkCompo.jsx


import * as THREE from 'three';
import { forwardRef, useEffect, useRef, useState   } from 'react'
import { LinkBase, LinkNext } from './Links_';
import { GUI } from 'dat.gui'

const rotationOptions = {
  'X Rotation': new THREE.Vector3(0, Math.PI/2, 0),
  'Y Rotation': new THREE.Vector3(0, 0, 0),
  'Z Rotation': new THREE.Vector3(0, 0, 0),
};


const link_support_offset = 0.03;

const LinkCompo = forwardRef( function LinkCompo({positionStart, linkLength, rotationStart, onSetLinks_end}, guiRef)  {

  const ref = useRef();
  const [LinkCompoProps, setCyl] = useState({cylinderHeight: linkLength - 2 * link_support_offset, LinkHeight: linkLength, linkRotation: new THREE.Vector3(rotationStart[0], rotationStart[1], rotationStart[2]) });
  

  useEffect(() => {

    if (guiRef.current){
      console.log("GUI exist", guiRef.current)
      guiRef.current.destroy();

    }
    const gui = new GUI();
    guiRef.current = gui;

    const obj = { Apply: function () { gui.destroy(); guiRef.current = null; } };
    // Create a single folder
    const mainFolder = gui.addFolder('Link Controls');
    mainFolder.open(); // Open the folder by default
  
    mainFolder.add(LinkCompoProps, 'LinkHeight', 0.1, 2)
      .onChange((value) => {
        setCyl(prevState => ({ 
          ...prevState, 
          cylinderHeight: value - 2 * link_support_offset,
          LinkHeight: value
        }));
        console.log('LinksState', LinkCompoProps)
      });
  
    mainFolder.add({rotationOptions: 'Z Rotation'}, 'rotationOptions',  Object.keys(rotationOptions))
      .onChange((value) => {
        setCyl(prevState => ({ 
          ...prevState,
          linkRotation: {
            ...prevState.linkRotation,
            x: rotationOptions[value].x,
            y: rotationOptions[value].y,
            
          }
    //      rotationOptions[value].x, rotationOptions[value].y, rotationOptions[value].z
        }));
        console.log('LinksState', LinkCompoProps)
        console.log('linkRotation', LinkCompoProps.linkRotation)
      });
    gui.add(obj, 'Apply');
  
    return () => {
      console.log("in destroy")
      gui.destroy();
    }
  }, [])

  
  
  const startPos = new THREE.Vector3(positionStart[0], positionStart[1], positionStart[2]);
  const startLinkRot = new THREE.Vector3(rotationStart[0], rotationStart[1], rotationStart[2]);
  const finalStartLinkRot = new THREE.Vector3(rotationStart[0], rotationStart[1], rotationStart[2]);
  finalStartLinkRot.add(LinkCompoProps.linkRotation)
  const endLinkRot = new THREE.Vector3(0, 0, Math.PI);
  endLinkRot.add(finalStartLinkRot)
 



  
  
  
  const linkBody =  new THREE.CylinderGeometry(0.025, 0.025, LinkCompoProps.cylinderHeight)
  
  
  const cylinderPos = new THREE.Vector3(0, LinkCompoProps.cylinderHeight / 2 + link_support_offset, 0);
  const endLinkPos = new THREE.Vector3(0, LinkCompoProps.LinkHeight, 0);

  cylinderPos.add(startPos);
  endLinkPos.add(startPos);
 

 onSetLinks_end(endLinkPos, finalStartLinkRot, LinkCompoProps.LinkHeight); 


  console.log('LinkCompo ends', '--------------------------')
  return (
   
      <group ref={ref} >
        <LinkBase position={startPos} name="LinkA"  rotation={[startLinkRot.x, startLinkRot.y, startLinkRot.z]}/>
        <mesh position={cylinderPos} geometry={linkBody} >
          <meshStandardMaterial metalness={1} color={'#c0c0c0'} roughness={0.5} />  
        </mesh>
        <LinkNext position={endLinkPos} name="LinkB" rotation={[endLinkRot.x, endLinkRot.y, endLinkRot.z]} />
      </group>
 

    )

})

export default LinkCompo;