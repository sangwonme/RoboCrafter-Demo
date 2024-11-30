import React from 'react';

const Wokwi = () => {
  return ( 
      <iframe
      src="https://wokwi.com/projects/new/arduino-uno"
      title="Wokwi Arduino Simulator"
      width="100%"
      height="100%"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
      allow="fullscreen"
      ></iframe>
   );
}
 

export default Wokwi;