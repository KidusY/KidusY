//fetches data from the omdbapi server
const fetchData = async (req) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        //api search params 
        params: {
            apikey: '24dc8b1',
            s: req,

        }

    });
    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
}
//creates the timeout so that the user has enough time to type the input
const debounce = (func) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, 500);
    }
}
const listMovies = (movies) => {
    for (let movie of movies) {
        if (movie.Poster == 'N/A') {
            movie.Poster = 'https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg'
        }
        let div = document.createElement('div');
        div.innerHTML = `<div><img src ="${movie.Poster}" class="img-fluid img-thumbnail"> <h6>${movie.Title}</h6></div>`;
        div.classList.add('list');
        dropdown.appendChild(div);
        div.addEventListener('click', () => {
            input.value = movie.Title;
            dropdown.style.display = 'none';
            moveSelected(movie.imdbID);
            relatedMoviesContainer.style.display = 'block';
            relatedMoviesHeader.innerHTML = 'Related Search';
            relatedMovies.style.display = 'flex';
        })

    }
}
//displays related searches 
const relatedMoviesDisplay = (movies) => {
    for (let movie of movies) {
        let div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<img src ="${movie.Poster}" class="img-fluid img-thumbnail"><h6>${movie.Title}</h6></div>`
        relatedMovies.appendChild(div);
        div.addEventListener('click', () => {
            moveSelected(movie.imdbID);
        })
    }


}
//displays info about the searched movie in home page
const writeInfo = (response, id) => {
    return `
        <div class="media">
        <img src="${response.Poster}" class="mr-3" alt="...">
        <div class="media-body">
            <h5 class="mt-0">${response.Title}</h5>
            <p class="card-text">${response.Plot}</p>
            <h6 class="card-subtitle text-muted">IMDB Rating:</h6>
            <a href="https://www.imdb.com/title/${id}/" class="btn btn-success">${response.imdbRating}</a>
            <h6 class = "card-subtitle text-muted">Meta Score:</h6>
            <a href="https://www.metacritic.com/movie/${response.Title}" class="btn btn-success">${response.Metascore}</a>
            <h6 class="card-subtitle text-muted">Awards:</h6>
            <a href="" class="btn btn-success">${response.Awards}</a>
            <ul>
                <li><h6 class="card-subtitle">Director:</h6>${response.Director}</li>
                <li><h6 class="card-subtitle">Writer:</h6>  ${response.Writer}</li>
                <li><h6 class="card-subtitle">Actors:</h6>  ${response.Actors}</li>
                <li><h6 class="card-subtitle">Genre:</h6>   ${response.Genre}</li>
            </ul>

            <a href="https://1watchfree.me/?s=${response.Title}" class="btn btn-info"> <i class="fas fa-camera-movie"></i> Watch Movie</a>
        </div>
        </div>
    
    `;
}
//displays info about the movie selected in the our movies section
const movieInfo = (data) => {
    return `
        <div class="media">
        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" class="mr-3" alt="...">
        <div class="media-body">
            <h1 class="mt-0">${data.original_title}</h1>
            <div class="example"></div>
            <p class="card-text">${data.overview}</p>
           
            <h6 class = "card-subtitle">Popularity: </h6>
            <a href="https://www.metacritic.com/movie/${data.title}" class="btn btn-success">${data.popularity}</a>
            <h6 class="card-subtitle">Awards:<a class="btn btn-success">${data.release_date}</a></h6>             
            <a href="https://1watchfree.me/?s=${data.title}" class="btn btn-success"> <i class="fas fa-camera-movie"></i> Watch Movie</a>
        </div>
        </div>
    
    `;
}