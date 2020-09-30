import {getCookie} from "./logoutPage.js";


let getCurrentUser = async function () {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await fetch("/api-auth/get_current_user/", options)
        .then(response => response.json())
        .then(results => results['user'])
}

let createAlbum = async (data) => {
    let options = {
        method: 'POST',
        mode: 'same-origin',
        body: data
    };
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        '/api/albums/', {
            headers: {
                'X-CSRFToken':
                csrftoken
            }
        }
        )
    ;
    try {
        await fetch(request, options)
            .then(async response => {
                if (response.status === 201) {
                    document.getElementById("create-album-status").innerHTML = 'Created!';
                    setTimeout(() => {
                        document.getElementById("create-album-status").innerHTML = '';
                    }, 3000);
                    document.getElementById("songs-add-block").innerHTML = await songsUploadSection.render();
                    return response.json()
                } else {
                    document.getElementById("create-album-status").innerHTML = 'Error'
                }
            }).then(result => songsUploadSection.after_render(result))
    } catch (e) {
        console.error(e);
        document.getElementById("create-album-status").innerHTML = 'Error!';
    }
};

let createSong = async (data) => {
    let options = {
        method: 'POST',
        mode: 'same-origin',
        body: data
    };
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        '/api/songs/', {
            headers: {
                'X-CSRFToken':
                csrftoken
            }
        }
        )
    ;
    try {
        await fetch(request, options)
            .then(async response => {
                if (response.status === 201) {
                    document.getElementById("create-song-status").innerHTML = 'Created!'
                    setTimeout(() => {
                        document.getElementById("create-song-status").innerHTML = '';
                    }, 3000);
                    return response.json()
                } else {
                    document.getElementById("create-song-status").innerHTML = 'Error'
                }
            }).then(result => {
                if (result !== undefined) {
                    let li = document.createElement('li');
                    li.innerHTML = result.name;
                    document.getElementById('ul-list-songs').append(li);
                }
            })
    } catch (e) {
        console.error(e);
        document.getElementById("create-song-status").innerHTML = 'Error!';
    }
}

let songsUploadSection = {
    render: async () => {
        let view = `
            <div class="advice">
                2) Now upload songs for this album
            </div>
            <form id="create-song-form" class="album-create-form">
                <input type="text" placeholder="Name" id="song-name-input">
                <textarea placeholder="Lyrics" id="song-lyrics-input" cols="40" rows="20"></textarea>
                <label for="#audio-file-song"><strong>Choose an audio file for song</strong></label>
                <input type="file" id="audio-file-song" />
                <button type="button" id="create-song-btn">Create</button>
                <div id="create-song-status"></div>
            </form>        
            `;
        return view
    },
    after_render: async (album) => {
        document.getElementById("create-song-btn").addEventListener("click", async () => {
            let name = document.getElementById("song-name-input").value;
            let audio_file = document.getElementById("audio-file-song");
            let lyrics = document.getElementById("song-lyrics-input").value;

            if (name !== '' && audio_file !== null) {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('audio_file', audio_file.files[0]);
                formData.append('album', `/api/albums/${album.id}/`);
                formData.append("lyrics", lyrics);
                formData.append("song_duration", "00:00:00");
                console.log(lyrics);
                await createSong(formData);
            }

        })
    }
}

let CreateAlbumPage = {
    _is_artist: false,

    render: async function () {
        let curr_user = await getCurrentUser();
        let view = ``;
        if (curr_user.role !== 1) {
            this._is_artist = true;
        }
        if (curr_user.role !== 1) {
            view = `
            <div class="create-album-info">
                <section class="first-part" id="album-add-block">
                    <div class="advice">
                        1) First create new album
                    </div>
                    <form id="create-album-form" class="album-create-form">
                        <input type="text" placeholder="Name" id="album-name-input">
                        <label for="#create-album-btn"><strong>Choose a cover for album(image)</strong></label>
                        <input type="file" id="file-image-album" />
                        <button type="button" id="create-album-btn">Create</button>
                        <div id="create-album-status"></div>
                    </form>
                </section>
                <section class="songs_list">
                    <ul id="ul-list-songs">
                        <li>List of album's songs:</li>
                    </ul>
                </section>
            </div>
            <section id="songs-add-block"></section>
          `
        }
        return view
    },
    after_render: async function () {
        document.getElementById("create-album-btn").addEventListener("click", async () => {
            let name = document.getElementById("album-name-input").value;
            let image = document.getElementById("file-image-album");
            if (name !== '' && image !== null) {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('image', image.files[0]);
                await createAlbum(formData);
            }
        })
    }
};

export default CreateAlbumPage;