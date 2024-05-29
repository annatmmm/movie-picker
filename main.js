function updateSlider(slider, output) {
    slider.addEventListener("input", function(){
    output.innerHTML = this.value;
    });
}

const ratingSlider = document.getElementById("rating-input");
const ratingValue = document.getElementById("rating-display");

updateSlider(ratingSlider, ratingValue);

