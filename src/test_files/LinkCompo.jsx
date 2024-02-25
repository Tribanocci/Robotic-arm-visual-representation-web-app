// LinkCompo.jsx


import * as THREE from 'three';
import { forwardRef, useEffect, useRef, useState   } from 'react'
import { LinkBase, LinkNext } from './Links';
import { GUI } from 'dat.gui'




const LinkCompo = forwardRef( function LinkCompo( {positionStart, linkLength}, ref) {
  console.log('LinkCompo prints the ref', ref.current)
  const link_support_offset = 0.03;
  const startPos = new THREE.Vector3(positionStart[0], positionStart[1], positionStart[2]);

  useEffect(() => { console.log("useEffect LinkCompo prints the ref", ref.current)
    const gui = new GUI()
    var obj = { Apply:function(){ gui.destroy();}};
    const cylinderFolder = gui.addFolder('Link height');
    cylinderFolder.add(LinkCompoHeight, 'LinkHeight', 0.1, 2)
      .onChange((value) => {
        setCyl({cylinderHeight: value - 2 * link_support_offset, LinkHeight: value});
      });
    gui.add(obj,'Apply');
    return () => {
      
      console.log("in destroy")
      console.log(ref.current)
      gui.destroy()
    }
  }, [LinkCompoHeight])

  
  const [LinkCompoHeight, setCyl] = useState({cylinderHeight: linkLength - 2 * link_support_offset, LinkHeight: linkLength });
  
  const linkBody =  new THREE.CylinderGeometry(0.025, 0.025, LinkCompoHeight.cylinderHeight)
  
  
  const cylinderPos = new THREE.Vector3(0, LinkCompoHeight.cylinderHeight / 2 + link_support_offset, 0);
  const endLinkPos = new THREE.Vector3(0, LinkCompoHeight.LinkHeight, 0);

  cylinderPos.add(startPos);
  endLinkPos.add(startPos);


  console.log('LinkCompo ends', '--------------------------')
  return (
   
      <group ref={ref} >
        <LinkBase position={startPos} name="LinkA" />
        <mesh position={cylinderPos} geometry={linkBody} >
          <meshStandardMaterial metalness={1} color={'#c0c0c0'} roughness={0.5} />  
        </mesh>
        <LinkNext position={endLinkPos} name="LinkB" rotation={[0, 0, Math.PI]} />
      </group>
 

    )

})

export default LinkCompo;