class MusicPlayer {
    constructor(el) {
        this.$el = el;
        this.$el.addEventListener("click", this);
        this.createAudio();
        this.lyrics = new LyricsPlayers(this.$el.querySelector(".player-lyrics"));
        this.progress = new ProgressBar(this.$el.querySelector(".progress"),280,true);
    }
    createAudio() {
        this.$audio = document.createElement("audio");
        this.$audio.loop = true;
        docuement.appendChild($audio);
    }
    show() {
        this.$el.classList.add("show");
    }
    hide() {
        this.$el.classList.remove("show");
    }
    player() {

    }
    hanleEvent(event) {
        let target = event.target;
        switch (true) {
            case target.matches(".icon-play"):
                this.onPlay(event);
                break;
            case target.matches(".icon-pause"):
                this.onPause(event);
                break;
            default:
                break;
        }
    }
    onPlay(event){
        event.target.classList.remove("icon-play");
        event.target.classList.add("icon-pause");
    }
    onPause(event){
        event.target.classList.remove("icon-pause");
        event.target.classList.add("icon-play");
    }
}