import React, { useEffect } from 'react';
import soundFile from './music.mp3';

const BackgroundAudio = () => {
  const audio = React.useRef(null);

  const playAudio = e => {
    audio.current.volume = 0.12;
    audio.current.play();
  };

  useEffect(() => {
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
  }, []);

  return <audio src={soundFile} ref={audio} loop />;
};

export default BackgroundAudio;
