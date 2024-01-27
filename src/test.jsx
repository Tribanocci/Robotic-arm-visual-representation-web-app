// LinkCompo.jsx
import * as THREE from 'three';
import { forwardRef, useState, useEffect } from 'react';
import { LinkBase, LinkNext } from './Links';

const LinkCompo = forwardRef(function LinkCompo({ positionStart, linkLength }, ref) {
  const link_support_offset = 0.03;
  const cylinderHeight = linkLength - 2 * link_support_offset;
  const linkBody = new THREE.CylinderGeometry(0.025, 0.025, cylinderHeight);

  const startPos = new THREE.Vector3(positionStart[0], positionStart[1], positionStart[2]);
  const cylinderPos = new THREE.Vector3(0, cylinderHeight / 2 + link_support_offset, 0);
  const endLinkPos = new THREE.Vector3(0, linkLength, 0);

  cylinderPos.add(startPos);
  endLinkPos.add(startPos);

  return (
    <group ref={ref}>
      <LinkBase position={startPos} name="LinkA" />
      <mesh position={cylinderPos} geometry={linkBody}>
        <meshBasicMaterial color={'lime'} />
      </mesh>
      <LinkNext position={endLinkPos} name="LinkB" rotation={[0, 0, Math.PI]} />
    </group>
  );
});

export default function App() {
  const [links, setLinks] = useState([{ positionStart: [0, 0, 0], linkLength: 0.5 }]);

  useEffect(() => {
    const lastLink = links[links.length - 1];
    console.log(lastLink.endLinkPos);
  }, [links]);

  const handleAddLink = () => {
    setLinks((prevLinks) => [
      ...prevLinks,
      {
        positionStart: [0, 0.6, 0],
        linkLength: 0.5,
      },
    ]);
  };

  return (
    <div className="App">
      {/* ... */}
    </div>
  );
}
