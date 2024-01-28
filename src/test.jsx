import React, { useState } from 'react';
import { GUI, useControls } from 'react-dat-gui';

const MyComponent = () => {
  const [state, setState] = useState({ variable: 0.5 });

  const handleChange = (data) => {
    // 'data' contains the updated values
    setState(data);
  };

  const { variable } = useControls({
    variable: 0.5,
  }, { onChange: handleChange });

  return (
    <div>
      {/* Render your component here */}
      <GUI data={state} onUpdate={setState} />
    </div>
  );
};

export default MyComponent;
