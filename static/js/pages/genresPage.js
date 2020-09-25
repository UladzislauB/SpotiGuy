let getGenresList = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch('http://localhost:8000/api/genres/', options)
            .then(response => response.json())
            .then(response => response.results)
            .then(async genres => {
                for (const genre of genres) {
                    genre.firstPlaylistImage = await getFirstPlaylistImage(genre);
                }
                return genres
            });
    } catch (e) {
        console.error('Error getting genres', e)
    }
}

let getFirstPlaylistImage = async (genre) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch(genre.playlist_set[0], options)
            .then(response => response.json())
            .then(playlist => playlist.image);
    } catch (e) {
        console.error("Couldn't load playlist image", e);
    }
}

let GenresPage = {
    render: async () => {
        let genres = await getGenresList();
        console.log(genres);
        let view = genres.map(genre => `
            <a href="#/genres/${genre.id}" class="genre-card__background" id="genre-${genre.id}" 
                style="background-color: rgb(${genre.background_color})" draggable="false">
                <div class="genre-card__foreground">
                    <img src=${genre.firstPlaylistImage} class="genre-card__image"
                        draggable="false">
                    <h3 class="genre-card__name">${genre.name}</h3>
                </div>
            </a>
        `).join('\n');
        return view
    },
    after_render: async () => {

    }
}

export default GenresPage;