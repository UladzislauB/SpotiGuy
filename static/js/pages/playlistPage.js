import Utils from "../services/utils.js";
import Player from "../services/player.js";


let getPlaylist = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch(`/api/playlists/${id}`, options)
            .then(response => response.json())
            .then(async playlist => {
                playlist.songsList = []
                for (const songURL of playlist.songs) {
                    playlist.songsList.push(await getSong(songURL));
                }
                playlist.ownerModel = await getPlaylistOwner(playlist.owner);
                return playlist
            })
    } catch (e) {
        console.error("Couldn't load this playlist", e)
    }
}

let getSong = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch(url, options)
            .then(response => response.json())
    } catch (e) {
        console.error("Couldn't load this song", e)
    }
}

let getPlaylistOwner = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch(url, options)
            .then(response => response.json())
    } catch (e) {
        console.error("Couldn't load owner of playlist")
    }
}

let PlaylistPage = {
    playlist: undefined,

    render: async function () {
        let request = Utils.parseRequestURL();
        let playlist = await getPlaylist(request.id);

        this.playlist = playlist;

        let view = `
            <div class="playlist__header">
                <img src="${playlist.image}" draggable="false">
                <div class="playlist__info">
                    <h2>playlist</h2>
                    <h1 class="playlist__name">${playlist.name}</h1>
                    <span class="playlist__description">${playlist.description}</span>
                    <a href="" class="playlist__owner" draggable="false">${playlist.ownerModel.username}</a>
                </div>
            </div>
            <div class="grid playlist__songs">
                <div></div>
                <div></div>
                <div class="grid-item"><span style="margin-left: 35px">Title</span></div>
                <div class="grid-item"><span>Artist</span></div>
                <div class="grid-item"><span>Album</span></div>
                <div class="grid-item">
                    <svg id="clock_icon" enable-background="new 0 0 443.294 443.294" viewBox="0 0 443.294 443.294"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z" />
                        <path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z" />
                    </svg>
                </div>
                ${playlist.songsList.map((song, index) => `
                    <button class="btn-play-song" id="btn-play-song-${index}">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 512 512" style="enable-background:new 0 0 45 45;" xml:space="preserve">
                            <g><g><path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M357.771,264.969
                            l-149.333,96c-1.75,1.135-3.771,1.698-5.771,1.698c-1.75,0-3.521-0.438-5.104-1.302C194.125,359.49,192,355.906,192,352V160
                            c0-3.906,2.125-7.49,5.563-9.365c3.375-1.854,7.604-1.74,10.875,0.396l149.333,96c3.042,1.958,4.896,5.344,4.896,8.969
                            S360.813,263.01,357.771,264.969z"/></g></g>
                        </svg>
                    </button>
                    <div class="grid-item img-container"><img class="song-img" src=${song.image}></div>
                    <div class="grid-item"><span class="song-name">${song.name}</span></div>
                    <div class="grid-item"><a href="#" class="song-owner">${song.owner_name}</a></div>
                    <div class="grid-item"><a href="#" class="song-album">${song.album_name}</a></div>
                    <div class="grid-item"><span class="song-duration">${song.song_duration.slice(4)}</span></div>
                `).join('\n')}
            </div>
        `
        return view
    },
    after_render: async function () {
        document.querySelectorAll('.grid.playlist__songs .btn-play-song').forEach(btn => {
            btn.addEventListener("click", () => {
                Player.set_playlist(this.playlist)
                Player.set_current_song(btn.id);
            })
        })
    }
}

export default PlaylistPage;