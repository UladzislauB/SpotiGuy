import Utils from "../services/utils.js";


let getGenre = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch(`/api/genres/${id}/`, options)
            .then(response => response.json())
            .then(async genre => {
                genre.playlist_objects = [];
                for (const playlistURL of genre.playlist_set) {
                    genre.playlist_objects.push(await getPlaylist(playlistURL));
                }
                return genre
            })
    } catch (e) {
        console.error("Couldn't load this playlist", e)
    }
}

let getPlaylist = async (url) => {
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
        console.error("Couldn't load this playlist", e)
    }
}


let GenreDetailPage = {

    render: async () => {
        let request = Utils.parseRequestURL();
        let genre = await getGenre(request.id);
        let view = genre.playlist_objects.map(playlist => `
            <a href="#/playlist/${playlist.id}" class="playlist-card__wrapper" id="playlist-${playlist.id}" draggable="false">
                <div class="playlist-card__container">
                    <img src="${playlist.image}" class="playlist-card__image" draggable="false">
                    <h4 class="playlist-card__name">${playlist.name}</h4>
                    <div class="playlist-card__description">${playlist.description.length < 42 ? playlist.description :
            playlist.description.slice(0, 43) + '...'}</div>
                </div>
            </a>
        `).join('\n');
        return view
    },

    after_render: async () => {

    }

};

export default GenreDetailPage;