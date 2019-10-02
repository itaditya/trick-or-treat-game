import React, {useEffect} from 'react'
import soundFile from './music.mp3'

const BackgroundAudio = (props) => {
    let { muted } = props
    let audio = null

    useEffect(() => {
        audio.volume = 0.12
        audio.muted = muted
        audio.play()
    }, [muted, audio])

    return (
        <audio
            src={soundFile}
            ref={ref => audio = ref}
            loop
        />
    )
}

export default BackgroundAudio
