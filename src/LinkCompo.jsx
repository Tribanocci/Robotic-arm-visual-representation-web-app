// LinkCompo.jsx


import * as THREE from 'three';
import { forwardRef, useEffect, useRef, useState   } from 'react'
import { LinkBase, LinkNext } from './Links';
import { GUI } from 'dat.gui'




const LinkCompo = forwardRef( function LinkCompo( {positionStart, linkLength}, ref) {
  const link_support_offset = 0.03;
  const startPos = new THREE.Vector3(positionStart[0], positionStart[1], positionStart[2]);

  useEffect(() => {
    console.log("in effect", ref.current)
    const gui = new GUI()
    var obj = { add:function(){ gui.destroy();   }};
    gui.add(obj,'add');

  const cylinderFolder = gui.addFolder('Cylinder Height');
  cylinderFolder.add(LinkCompoHeight, 'cylinderHeight', 0.1, 2)
  
    .onChange((value) => {
      // Update the state variable (cylinderHeight) when the GUI value changes
      setCyl({cylinderHeight: value - 2 * link_support_offset, endLinkPos: value});
    });
  
    return () => {
      console.log("in destroy")
      gui.destroy()
    }
  }, [])

  
  const [LinkCompoHeight, setCyl] = useState({cylinderHeight: linkLength - 2 * link_support_offset, endLinkPos: linkLength });
  console.log(LinkCompoHeight)
  const linkBody =  new THREE.CylinderGeometry(0.025, 0.025, LinkCompoHeight.cylinderHeight)
  const linkBodyLength = useRef()
  
  const cylinderPos = new THREE.Vector3(0, LinkCompoHeight.cylinderHeight / 2 + link_support_offset, 0);
  const endLinkPos = new THREE.Vector3(0, LinkCompoHeight.endLinkPos, 0);

  cylinderPos.add(startPos);
  endLinkPos.add(startPos);



  return (
   
      <group ref={ref} >
        
        <LinkBase position={startPos} name="LinkA" />
        <mesh position={cylinderPos} geometry={linkBody} ref={linkBodyLength}>
          <meshStandardMaterial metalness={1} color={'#c0c0c0'} roughness={0.5} />  
        </mesh>
        <LinkNext position={endLinkPos} name="LinkB" rotation={[0, 0, Math.PI]} />
      </group>
 

    )

})

export default LinkCompo;