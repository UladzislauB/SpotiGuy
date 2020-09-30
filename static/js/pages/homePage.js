let getPlaylistsList = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch('/api/playlists/', options)
            .then(response => response.json())
            .then(response => response.results)
    } catch (e) {
        console.error('Error getting playlists', e)
    }
}

let HomePage = {
    render: async () => {
        let playlists = await getPlaylistsList();

        let view = playlists.map(playlist => `
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
}

export default HomePage;