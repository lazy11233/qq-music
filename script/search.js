class Search {
    constructor(el) {
        this.$el = el;
        this.$input = this.$el.querySelector("#search");
        this.$input.addEventListener("keyup", this.onKeyUp.bind(this));
        this.keyword = "";
        this.page = 1;
        this.perpage = 20;
        this.songs = [];
        this.onscroll = this.onScroll.bind(this);
        this.nomore = false;
        this.fetching = false;
        this.$songs = this.$el.querySelector(".song-list");
        window.addEventListener("scroll", this.onscroll);
    }
    onKeyUp(event) {
        //这里的this指向Search对象本身，而不是事件对象，因为在调用的时候绑定了this。
        this.keyword = event.target.value.trim();
        if (!this.keyword) {
            return this.reset()
        }
        if (event.key != "Enter") {
            return;
        }
        this.search(this.keyword);
    }
    
    search(keyword, page) {
        if(this.fetching){
            return;
        }
        this.fetching = true;
        fetch(`http://localhost:4000/search?keyword=${keyword}&page=${this.page || page}`)
            .then(res => res.json())
            .then(json => json.data.song.list)
            .then(songs => this.append(songs))
            .then(() => this.fetching = false)
            .catch(() => this.fetching = false);
    }
    append(songs) {
        let html = songs.map(song =>
            `<li class="song-item">
            <i class="icon icon-music"></i>
            <div class="song-name ellipsis">${song.songname}</div>
            <div class="song-artist ellipsis">${song.singer.map(s => s.name).join("")}</div>
            </li>`
        ).join("");
        this.$songs.insertAdjacentHTML("beforeend", html);
    }
    reset() {
        this.page = 1;
        this.keyword = "";
        this.songs = [];
        this.$songs.innerHTML = "";
    }
    onScroll(event) {
        if (this.nomore) {
            return;
        }
        if(document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight){
            this.search(this.keyword, this.page + 1);
        }
    }
}