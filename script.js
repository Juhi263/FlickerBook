const main = document.getElementById('main');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

const imagePath = 'https://image.tmdb.org/t/p/w500/';

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = searchInput.value.trim();

    if (title === '') {
        alert('Please enter a valid title.');
        return;
    }

    getMovies(title);
    getTVShows(title);
    main.classList.remove('hidden');
});

let getMovies = async (title = '') => {
    let apiUrl;
    if (title === '' || title === undefined || title === null) {
        apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8efa0b4e7c669e03a8316e4bd924e6ae&page=9`;
    } 
    else {
        apiUrl = `https://api.themoviedb.org/3/search/movie?&api_key=8efa0b4e7c669e03a8316e4bd924e6ae&query=${title}`;
    }

    let fetchData = await fetch(apiUrl);
    let finalData = await fetchData.json();

    renderMovies(finalData.results);
};

let getTVShows = async (title = '') => {
    let apiUrl;
    if (title === '' || title === undefined || title === null) {
        apiUrl = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=8efa0b4e7c669e03a8316e4bd924e6ae&page=9`;
    } 
    else {
        apiUrl = `https://api.themoviedb.org/3/search/tv?&api_key=8efa0b4e7c669e03a8316e4bd924e6ae&query=${title}`;
    }

    let fetchData = await fetch(apiUrl);
    let finalData = await fetchData.json();

    renderTVShows(finalData.results);
};

let renderMovies = (movies) => {
    let mItems = '';
    movies.forEach((movie, i) => {
        let posterPath = movie.poster_path ? imagePath + movie.poster_path : 'https://via.placeholder.com/1280x720';

        mItems += `<div class="movieItems">
        <img src="${posterPath}" alt="">
        <h3>${movie.title}</h3>
        <p class="box-para"><span>Release Date:</span> ${movie.release_date}</p>
        <p class="box-para"><span>Synopsis:</span> ${movie.overview}</p>
        <p class="box-para"><span>Original Language: </span>${movie.original_language}</p>
        </div>`;
    });

    main.innerHTML = mItems;
};

let renderTVShows = (tvshows) => {
    let mItems = '';
    tvshows.forEach((tvshow, i) => {
        let posterPath = tvshow.poster_path ? imagePath + tvshow.poster_path : 'https://via.placeholder.com/1280x720';

        mItems += `<div class="tvshowItems">
        <img src="${posterPath}" alt="">
        <h3>${tvshow.name}</h3>
        <p class="box-para"><span>First Air Date:</span> ${tvshow.first_air_date}</p>
        <p class="box-para"><span>Synopsis:</span> ${tvshow.overview}</p>
        <p class="box-para"><span>Original Language: </span>${tvshow.original_language}</p>
        </div>`;
    });

    main.innerHTML += mItems;
};

getMovies();
getTVShows();