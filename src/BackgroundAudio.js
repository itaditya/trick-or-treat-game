import React from 'react'
import soundFile from './music.mp3'

const BackgroundAudio = () => {
    return (
        <audio
            id='bgAudio'
            ref={audio => audio.volume = 0.15}
            src={soundFile}
            autoPlay
            loop
        />
    )
}

export default BackgroundAudio
