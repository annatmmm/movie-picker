const randomButton = document.getElementById('random-btn');
const movieDetails = document.getElementById('movie-details');

const apiKey = '12384a24'; 
const genreList = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];

randomButton.addEventListener('click', () => {
    const rating = document.getElementById('rating-input').value;
    const genre = document.getElementById('genre-input').value;
    const duration = document.getElementById('duration-input').value;
    fetchRandomMovie(rating, genre, duration);
});

async function fetchRandomMovie(rating, genre, duration) {
    const randomGenre = genre || genreList[Math.floor(Math.random() * genreList.length)];
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${randomGenre}`);
    const data = await response.json();

    if (data.Response === "True") {
        const movies = data.Search.filter(movie => {
            // Fetch movie details to check rating and duration
            return fetchMovieDetails(movie.imdbID, rating, duration);
        });

        if (movies.length > 0) {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            await displayMovieDetails(randomMovie.imdbID);
        } else {
            movieDetails.innerHTML = "<p>No movies found matching your criteria.</p>";
        }
    } else {
        movieDetails.innerHTML = "<p>No movies found.</p>";
    }
}

async function fetchMovieDetails(movieId, rating, duration) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`);
    const movie = await response.json();

    if (movie.Response === "True") {
        const isValidRating = rating ? parseFloat(movie.imdbRating) >= parseFloat(rating) : true;
        const isValidDuration = duration ? parseInt(movie.Runtime) <= parseInt(duration) : true;
        return isValidRating && isValidDuration;
    }
    return false;
}

async function displayMovieDetails(movieId) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`);
    const movie = await response.json();

    if (movie.Response === "True") {
        movieDetails.innerHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Cast:</strong> ${movie.Actors}</p>
            <p><strong>Rating:</strong> ${movie.imdbRating}</p>
            <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
    } else {
        movieDetails.innerHTML = "<p>Could not retrieve movie details.</p>";
    }
}
