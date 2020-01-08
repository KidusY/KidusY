const container = document.querySelector('.container-fluid');
const home = document.querySelector('.home');
const movieSelection = document.querySelector('.movieSelection');
const topmovies = document.querySelector('.topmovies');
const tvShows = document.querySelector('.tvShows');
const info = document.querySelector('.info');

window.addEventListener('click', (e) => {
	if (e.target.id == 'home') {
		container.style.display = 'block';
		home.style.display = 'block';
		movieSelection.style.display = 'none';
		info.style.display = 'none';
		tvShows.style.display = 'none';
	} else if (e.target.id == 'topMovies') {
		container.style.display = 'block';
		home.style.display = 'none';
		movieSelection.style.display = 'block';
		summary.style.display = 'none';
		topmovies.style.display = 'flex';
		tvShows.style.display = 'none';
		info.style.display = 'none';
		relatedMoviesContainer.style.display = 'none';
	} else if (e.target.id == 'tvShows') {
		container.style.display = 'block';
		home.style.display = 'none';
		movieSelection.style.display = 'none';
		tvShows.style.display = 'block';
		summary.style.display = 'none';
	}
});

const fetchData2 = async (req) => {
	const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
		//api search params
		params: {
			api_key: '7dd3ecbc408396caf9897c0d584666c0',
			language: 'en-US',
			sort_by: 'popularity.desc'
		}
	});
	if (response.data.Error) {
		return [];
	}
	console.log(response.data.results);
	return response.data.results;
};

const getTopten = async (req) => {
	const topTenMovies = await fetchData2();

	for (let topTenMovie of topTenMovies) {
		if (topTenMovie.poster_path == 'N/A') {
			topTenMovie.poster_path = `https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg`;
		}
		let div = document.createElement('div');
		div.classList.add('col-12');
		div.classList.add('col-md-4');
		div.innerHTML = `
                        <div class="card" style="width: 18rem;">
                        <img src="https://image.tmdb.org/t/p/w500/${topTenMovie.poster_path}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${topTenMovie.original_title}</h5>
                            <p class = "card-text" > ${topTenMovie.overview}                                                                                   
                            </p>
                            <a class = "btn btn-primary" id= "button"> More Info... </div></a>
                        </div>                      
                        </div> `;



		topmovies.appendChild(div);

		div.addEventListener('click', (e) => {
			if (e.target.id == "button") {
				info.style.display = 'block';
				container.style.display = 'none';
				displayInfo(topTenMovie);
			}
		});
	}


};

getTopten();

const displayInfo = (info) => {
	const display = document.querySelector('.info');
	const displayInfo = document.querySelector('.display');
	display.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/w500/${info.backdrop_path})`;
	displayInfo.innerHTML = movieInfo(info);


	movieSelection.style.display = 'none';
}