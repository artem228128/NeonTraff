import React from 'react';
import ReactHowler from 'react-howler';

const BackgroundSound = ({ playing }) => {
  return (
    <ReactHowler
      src="/sounds/cyberpunk-ambient.mp3"
      playing={playing}
      loop={true}
      volume={0.3}
      html5={true}
    />
  );
};

export default BackgroundSound; 