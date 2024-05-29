function updateSlider(slider, output) {
    slider.addEventListener("input", function(){
    output.innerHTML = this.value;
    });
}

const yearSlider = document.getElementById("year");
const yearValue = document.getElementById("yearValue");

const ratingSlider = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");



updateSlider(yearSlider, yearValue);

updateSlider(ratingSlider, ratingValue);

