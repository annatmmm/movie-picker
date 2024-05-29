function getMovieSuggestion() {
    const rating = document.getElementById('rating-input').value;
    const genre = document.getElementById('genre-input').value;
    const duration = document.getElementById('duration-input').value;

    // Encode the input values as URL parameters
    const urlParams = new URLSearchParams({ rating, genre, duration }).toString();
    console.log(urlParams);
    window.location.href = `movie.html?${urlParams}`;
}
