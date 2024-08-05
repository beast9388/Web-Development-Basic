document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = 'YOUR_API_KEY';
    const API_URL = `https://api.themoviedb.org/3`;
    const TRENDING_URL = `${API_URL}/trending/all/week?api_key=${API_KEY}`;
    const TOP_RATED_URL = `${API_URL}/movie/top_rated?api_key=${API_KEY}`;
    const ACTION_MOVIES_URL = `${API_URL}/discover/movie?with_genres=28&api_key=${API_KEY}`;

    fetchMovies(TRENDING_URL, 'trending-container');
    fetchMovies(TOP_RATED_URL, 'top-rated-container');
    fetchMovies(ACTION_MOVIES_URL, 'action-container');
    fetchBannerMovie();

    function fetchMovies(url, containerId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                displayMovies(movies, containerId);
            })
            .catch(error => {
                console.error('Error fetching the movie data:', error);
            });
    }

    function displayMovies(movies, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            moviePoster.alt = movie.title || movie.name;

            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');

            const movieTitle = document.createElement('h2');
            movieTitle.textContent = movie.title || movie.name;

            const movieRating = document.createElement('span');
            movieRating.textContent = `Rating: ${movie.vote_average}/10`;

            const movieGenre = document.createElement('span');
            movieGenre.textContent = `Genre: ${getGenreName(movie.genre_ids)}`;

            const movieIcon = document.createElement('i');
            movieIcon.classList.add('fas', 'fa-play');

            movieInfo.appendChild(movieTitle);
            movieInfo.appendChild(movieRating);
            movieInfo.appendChild(movieGenre);
            movieInfo.appendChild(movieIcon);

            movieElement.appendChild(moviePoster);
            movieElement.appendChild(movieInfo);
            container.appendChild(movieElement);
        });
    }

    function fetchBannerMovie() {
        fetch(TRENDING_URL)
            .then(response => response.json())
            .then(data => {
                const bannerMovie = data.results[0];
                displayBannerMovie(bannerMovie);
            })
            .catch(error => {
                console.error('Error fetching the banner movie:', error);
            });
    }

    function displayBannerMovie(movie) {
        const banner = document.getElementById('banner');
        banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

        const bannerContent = document.createElement('div');
        bannerContent.classList.add('banner-content');

        const bannerTitle = document.createElement('h1');
        bannerTitle.textContent = movie.title || movie.name;

        const bannerOverview = document.createElement('p');
        bannerOverview.textContent = movie.overview;

        const bannerButton = document.createElement('button');
        bannerButton.classList.add('banner-button');
        bannerButton.innerHTML = `<i class="fas fa-play"></i> Play`;

        bannerContent.appendChild(bannerTitle);
        bannerContent.appendChild(bannerOverview);
        bannerContent.appendChild(bannerButton);
        banner.appendChild(bannerContent);
    }

    function getGenreName(genreIds) {
        const genres = {
            28: 'Action',
            12: 'Adventure',
            16: 'Animation',
            35: 'Comedy',
            80: 'Crime',
            99: 'Documentary',
            18: 'Drama',
            10751: 'Family',
            14: 'Fantasy',
            36: 'History',
            27: 'Horror',
            10402: 'Music',
            9648: 'Mystery',
            10749: 'Romance',
            878: 'Science Fiction',
            10770: 'TV Movie',
            53: 'Thriller',
            10752: 'War',
            37: 'Western'
        };

        return genreIds.map(id => genres[id]).join(', ');
    }

    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            const SEARCH_URL = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
            fetchMovies(SEARCH_URL, 'trending-container');
        }
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
