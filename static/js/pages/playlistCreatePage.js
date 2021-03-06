import {getCookie} from "./logoutPage.js";

let getGenres = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch('/api/genres/', options)
            .then(response => response.json())
            .then(response => response.results)
    } catch (e) {
        console.error('Error getting genres', e)
    }
};

let getSongs = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        return await fetch('/api/songs/', options)
            .then(response => response.json())
            .then(response => response.results)
    } catch (e) {
        console.error('Error getting songs', e)
    }
};

let createPlaylist = async (data) => {
    let options = {
        method: 'POST',
        mode: 'same-origin',
        body: data
    };
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        '/api/playlists/', {
            headers: {
                'X-CSRFToken':
                csrftoken
            }
        }
        )
    ;
    try {
        await fetch(request, options)
            .then(response => {
                if (response.status === 201) {
                    document.getElementById("create-playlist-status").innerHTML = 'Created!';
                    setTimeout(() => {

                        window.location.hash = '#/'
                    }, 2000);
                } else {
                    document.getElementById("create-playlist-status").innerHTML = 'Error'
                }
            })
    } catch (e) {
        console.error(e);
        document.getElementById("create-playlist-status").innerHTML = 'Error!';
    }
}


let PlaylistCreatePage = {
    render: async () => {
        let genres = await getGenres();
        let songs = await getSongs();
        let view = `
        <form id="create-playlist-form">
            <input type="text" placeholder="Name" id="playlist-name-input">
            <textarea placeholder="Description" id="playlist-description-input" cols="40" rows="2"></textarea>
            <p>Choose genre for your playlist:</p>
            ${genres.map(genre => `
                <div class="input-genre-block">
                    <input type="radio" id="${genre.name}" name="genre" value='http://localhost:8000/api/genres/${genre.id}/'>
                    <label for="${genre.name}">${genre.name}</label>
                </div> 
            `).join("\n")}
            <p>Choose songs for playlist  <strong>(please choose at list one song)</strong>:</p>
            ${songs.map(song => `
                <div class="input-song-block">
                    <input type="checkbox" id="song__${song.id}" value="/api/songs/${song.id}/">
                    <label for="song__${song.id}"><span class="name">${song.name}</span> by ${song.owner_name}</label>
                </div>
            `).join('\n')}
            <label for="file"><strong>Choose an image for playlist</strong></label>
            <input type="file" id="file-image-playlist" />
            <button type="button" id="create-playlist-btn">Create</button>
            <div id="create-playlist-status"></div>
        </form>
        `;
        return view
    },
    after_render: async () => {
        document.getElementById("create-playlist-btn").addEventListener("click", async () => {
            let name = document.getElementById("playlist-name-input").value;
            let description = document.getElementById("playlist-description-input").value;
            let genreInput = document.querySelector("input[name='genre']:checked");
            let image = document.getElementById("file-image-playlist");
            let songsInputs = document.querySelectorAll("form#create-playlist-form > .input-song-block > input:checked");
            let songs = Array.from(songsInputs.values()).map(node => node.value);

            if (name !== '' && description !== '' && genreInput !== null && songs.length !== 0) {

                const formData = new FormData();

                formData.append('image', image.files[0]);
                formData.append('name', name);
                formData.append('description', description);
                formData.append('genre', genreInput.value);
                formData.append('songs', JSON.stringify(songs));
                console.log(typeof formData.get('songs'), formData.get('songs'));
                await createPlaylist(formData);
            }
        });
    }
};


export default PlaylistCreatePage;