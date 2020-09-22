fetch('http://localhost:8000/api/genres/')
    .then(response => response.json())
    .then(response => response.results)
    .then(genres => {
        let elements = [];
        genres.forEach(genre => {
            let elem1 = document.createElement('div');
            let elem2 = document.createElement('div');
            let image = document.createElement('img');
            let h3 = document.createElement('h3');
            fetch(genre.playlist_set[0])
                .then(response => response.json())
                .then(playlist => {
                    image.src = playlist.image
                });
            elem1.style.width = '170px';
            elem1.style.height = '170px';
            elem1.style.margin = '10px';
            elem1.style.borderRadius = '8px';
            elem1.style.backgroundColor = 'rgb(' + genre.background_color + ')';
            elem1.style.overflow = 'hidden';
            elem1.id = 'genre' + genre.id;
            elem2.style.width = '100%';
            elem2.style.height = '100%';
            elem2.style.background = 'linear-gradient(0deg,transparent,rgba(0,0,0,0.4))';
            elem2.style.position = 'relative';
            image.style.position = 'absolute';
            image.style.width = '100px';
            image.style.height = '100px';
            image.style.bottom = '0';
            image.style.right = '0';
            image.style.transform = 'rotate(25deg) translate(18%,-2%)';
            h3.style.padding = '16px';
            h3.style.position = 'absolute';
            h3.style.fontSize = '24px';
            h3.style.lineHeight = '1.3em';
            h3.style.letterSpacing = '-.04em';
            h3.style.overflowWrap = 'break-word';
            h3.style.color = 'white';
            h3.textContent = genre.name;
            elem2.append(image);
            elem2.append(h3);
            elem1.append(elem2);
            elements.push(elem1);
        })
        main.append(...elements)
    });