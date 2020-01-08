const root = document.querySelector('.autoComplete');
root.innerHTML = `
<label><b> Search For Movies</b></label>
<input class = "input" />
<div class = "dropdown"> </div>
 `;
const input = document.querySelector('.input');
const dropdown = document.querySelector(".dropdown");
const summary = document.querySelector('.summary');
const relatedMovies = document.querySelector('.relatedMovies');
const relatedMoviesContainer = document.querySelector('.relatedMoviesContainer');
const relatedMoviesHeader = document.querySelector('.relatedMoviesContainer h1');

const onInput = async e => {
    const movies = await fetchData(input.value);
    //clear the search input if there are no txt 
    if (movies.length == 0) {
        dropdown.style.display = 'none';
        return;
    }
    //clears the dropdown for the auto complete
    dropdown.innerHTML = '';
    dropdown.style.display = 'block';
    //displays the search results 
    listMovies(movies);
    //displays related movies
    relatedMovies.innerHTML = '';
    relatedMoviesDisplay(movies);
}



const moveSelected = async (movieId) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        //api search params 
        params: {
            apikey: '24dc8b1',
            i: movieId
        }

    });
    if (response.data.Error) {
        response = [];
    }
    if (response.data.Poster == 'N/A') {
        response.data.Poster = 'https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg'
    }
    summary.innerHTML = writeInfo(response.data, movieId);

}









const list = document.querySelector('.list');

//debounce creates a timeout to help the user input data more slowly 
//refer to utils 
input.addEventListener('input', debounce(onInput));