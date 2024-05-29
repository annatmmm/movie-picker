document.addEventListener('DOMContentLoaded', () => {
    const randomButton = document.getElementById('random-btn');
    const movieDetails = document.getElementById('movie-details');
    const apiKey = '12384a24'; 
    const genreList = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const rating = getQueryParam('rating');
    console.log(rating);
    const genre = getQueryParam('genre');
    const duration = getQueryParam('duration');

    async function fetchRandomMovie(rating, genre, duration) {
        const randomGenre = genre || genreList[Math.floor(Math.random() * genreList.length)];
        console.log(randomGenre);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${randomGenre}`);
            const data = await response.json();
            
            if (data.Response === "True") {

                const movies = data.Search.filter(async movie => {
                    await fetchMovieDetails(movie.imdbID, rating, duration);
                    // return result;
                });

                const validMovies = movies.filter(movie => movie !== null);

                if (validMovies.length > 0) {
                    const randomMovie = validMovies[Math.floor(Math.random() * validMovies.length)];
                    await displayMovieDetails(randomMovie.imdbID);
                } else {
                    movieDetails.innerHTML = "<p>No movies found matching your criteria.</p>";
                }
            } else {
                movieDetails.innerHTML = "<p>No movies found.</p>";
            }
        } catch (error) {
            console.error('Error fetching movie list:', error);
            movieDetails.innerHTML = "<p>Could not retrieve movies list due to an error.</p>";
        }
    }

    async function fetchMovieDetails(movieId, rating, duration) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`);
            const movie = await response.json();

            if (movie.Response === "True") {
                const isValidRating = rating ? parseFloat(movie.imdbRating) >= parseFloat(rating) : true;
                const isValidDuration = duration ? parseInt(movie.Runtime) <= parseInt(duration) : true;
                return isValidRating && isValidDuration;
            }
            return false;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return false;
        }
    }

    async function displayMovieDetails(movieId) {
        try {
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
        } catch (error) {
            console.error('Error displaying movie details:', error);
            movieDetails.innerHTML = "<p>Could not retrieve movie details due to an error.</p>";
        }
    }

    // Fetch and display a movie based on URL parameters on page load
    fetchRandomMovie(rating, genre, duration);

    randomButton.addEventListener('click', () => {
        fetchRandomMovie(rating, genre, duration).catch(error => {
            console.error('Error fetching random movie:', error);
            movieDetails.innerHTML = "<p>Could not retrieve movie details due to an error.</p>";
        });
    });
});
