var b = document.querySelector('#bouton');
var son = document.querySelector('#music');

var AudioContext = window.AudioContext || window.webkitAudioContext;
var contexteAudio = new AudioContext;
unlockAudioIOS(contexteAudio); // ok pour context = AudioContext;

function resumeAudio() {
    console.log(contexteAudio.state);

    if (contexteAudio.state == "suspended") {
        contexteAudio.resume();
        console.log('Playback resumed successfully');
        son.play();
        b.innerHTML = "SON OFF";
        console.log("SON OFF");
    }
    else {
        contexteAudio.suspend();
        console.log('Playback paused successfully');
        son.pause();
        b.innerHTML = "SON ON";
        console.log("SON ON");
    }
    //document.removeEventListener("click", resumeAudio);
}
b.onclick = resumeAudio;