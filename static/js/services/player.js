// import {progressBar, volumeBar} from "../components/rangeSliders.js";

let Player = {
    _songs_queue: undefined,
    _current_song: undefined,
    audio_player: document.getElementById('player'),
    album_cover: document.getElementById('album-cover-img'),
    is_playing: false,
    play_btn: document.getElementById("play-btn"),
    next_btn: document.getElementById('play-next-btn'),


    init: function () {
        this.play_btn.addEventListener("click", function () {
            Player.on_play_click();
        });
        this.next_btn.addEventListener("click", function () {
            Player.on_play_next();
        });
        this.audio_player.addEventListener("ended", function () {
            Player.on_play_next();
        });
        this.audio_player.addEventListener("timeupdate", function () {
            if (Player.audio_player.currentTime % 60 < 10) {
                let curTime = (Player.audio_player.currentTime / 60 | 0) + ":0" + (Player.audio_player.currentTime % 60 | 0);
            } else {
                let curTime = (Player.audio_player.currentTime / 60 | 0) + ":" + (Player.audio_player.currentTime % 60 | 0);
            }
            progressBar.rangeSlider.update({
                "value": (Player.audio_player.currentTime / Player.audio_player.duration) * 300 | 0
            });
        })
    },

    set_playlist: function (playlist) {
        this._songs_queue = playlist.songsList.slice()
        console.log(this._songs_queue);
    },

    set_current_song: function (id) {
        this._current_song = parseInt((id.split('-'))[3], 10);
        let song = this._songs_queue[this._current_song];
        this.audio_player.src = song.audio_file;
        progressBar.value = 0;
        this.on_play_click();
        this.album_cover.src = song.image;
    },

    on_play_click: function () {
        if (this._current_song !== undefined) {
            if (this.is_playing) {
                this.audio_player.pause();
                this.play_btn.innerHTML = `
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#05386b"
                                 width="30px" height="30px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
                        <g>
                            <g id="play-circle-outline"><path d="M204,369.75L357,255L204,140.25V369.75z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255
                                    S395.25,0,255,0z M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"/></g>
                        </g>
                    </svg>
                `;
            } else {
                this.audio_player.play();
                this.play_btn.innerHTML = `
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#edf5e1"
                        width="30px" height="30px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
                        <g>
                            <g id="pause-circle-fill">
                            <path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M229.5,357h-51V153h51V357z
                             M331.5,357h-51V153h51V357z"/>
                            </g>
                        </g>
                    </svg>
                `;
            }
            this.is_playing = !this.is_playing;
        }
    },

    on_play_next: function () {
        if (this._current_song !== undefined) {
            this._current_song += 1;
            if (this._current_song >= this._songs_queue.length) {
                this._current_song = 0;
            }
            let song = this._songs_queue[this._current_song];
            this.audio_player.src = song.audio_file;
            this.is_playing = false;
            this.on_play_click();
            this.album_cover.src = song.image;
        }
    }
};


export default Player;