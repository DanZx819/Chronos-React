import beep from '../assets/audios/beep.mp3'

export function loadBeep(){
    const audio = new Audio(beep);
    audio.load();

    return () =>{
        audio.currentTime = 0;
        audio.play()
    }
}