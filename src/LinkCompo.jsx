// LinkCompo.jsx


import * as THREE from 'three';
import { forwardRef } from 'react'
import { LinkBase, LinkNext } from './Links';

const LinkCompo = forwardRef( function LinkCompo( {positionStart, linkLength}, ref) {
  const link_support_offset = 0.03;
  const cylinderHeight = linkLength - 2 * link_support_offset;
  const linkBody =  new THREE.CylinderGeometry(0.025, 0.025, cylinderHeight)

  const startPos = new THREE.Vector3(positionStart[0], positionStart[1], positionStart[2]);
  const cylinderPos = new THREE.Vector3(0, cylinderHeight / 2 + link_support_offset, 0);
  const endLinkPos = new THREE.Vector3(0, linkLength, 0);

  cylinderPos.add(startPos);
  endLinkPos.add(startPos);

  return (
      <group ref={ref}>
        <LinkBase position={startPos} name="LinkA" />
        <mesh position={cylinderPos} geometry={linkBody}>
          <meshStandardMaterial metalness={1} color={'#c0c0c0'} roughness={0.5} />  
        </mesh>
        <LinkNext position={endLinkPos} name="LinkB" rotation={[0, 0, Math.PI]} />
      </group>
    )

})

export default LinkCompo;