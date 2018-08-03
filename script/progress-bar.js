class ProgressBar {
    constructor(el, duration, start) {
        this.$el = el;
        this.elapsed = 0;
        this.duration = duration || 0;
        this.progress = 0;
        this.$progress = this.$el.querySelector(".progress-bar-progress");
        this.$elapsed = this.$el.querySelector(".progress-elapsed");
        this.$elapsed.innerHTML = this.formatTime(this.elapsed);
        this.$duration.innerText = this.formatTime(this.duration);
        this.render();
        if (start) {
            this.start();
        }
    }

    start() {
        this.intervalId = setInterval(this.update.bind(this), 50);
    }

    pause() {
        clearInterval(this.intervalId);
    }

    update() {
        this.elapsed += 0.05;
        if (this.elapsed >= this.duration) {
            this.reset();
        }
        this.progress = this.elapsed / this.duration;
        this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`;
        this.$elapsed.innerText = this.formatTime(this.elapsed);
    }

    render() {
        this.$el.innerHTML =
            `<div class="progress-time progress-elpsed"></div>
            <div class="progress-bar">
                <div class="progress-bar-progress"></div>
            </div>
        <div class="progress-time progress-duration"></div>
        `
    }

    formatTime(time) {
        let mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        mins = mins > 10 ? "" + mins : "0" + mins;
        secs = secs > 10 ? "" + secs : "0" + secs;
        return `${mins}:${secs}`;
    }
}