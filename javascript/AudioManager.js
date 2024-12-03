export class AudioManager {
    constructor() {
        this.audioList = {};
    }

    addAudio(name, path) {
        this.audioList[name] = new Audio(path);
    }

    play(name) {
        const audio = this.audioList[name];
        if (audio) audio.play();
    }

    stop(name) {
        const audio = this.audioList[name];
        if (audio) audio.pause();
    }

    setLoop(name, loop) {
        const audio = this.audioList[name];
        if (audio) audio.loop = loop;
    }

    setVolume(name, volume) {
        const audio = this.audioList[name];
        if (audio) audio.volume = volume;
    }
}