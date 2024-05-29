function updateSlider(slider, output) {
    slider.addEventListener("input", function(){
    output.innerHTML = this.value;
    });
}

const ratingSlider = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");


updateSlider(ratingSlider, ratingValue);

