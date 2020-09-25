import Utils from "../services/utils.js";


let getPlaylist = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch(`http://localhost:8000/api/playlists/${id}`, options)
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
    render: async () => {
        let request = Utils.parseRequestURL();
        let playlist = await getPlaylist(request.id);

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
            <ol>
                
            </ol>
        `
        return view
    },
    after_render: async () => {

    }
}

export default PlaylistPage;