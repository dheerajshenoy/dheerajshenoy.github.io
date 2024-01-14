var windowWidth = window.innerWidth;

function updateTitleOnResize() {
    
    var default_text = "dheerajshenoy.github.io";
    var small_text = "dheerajshenoy";

    var text_element = document.getElementById("header_title");
    var windowWidth = window.innerWidth;

    if (windowWidth >= 600) {
        text_element.innerHTML= default_text;
    }
    else {
        text_element.innerHTML= small_text;
    }
    
}

window.onload = function () {
    window.addEventListener("input", updateTitleOnResize);
    window.addEventListener("resize", updateTitleOnResize);
    window.dispatchEvent(new Event('resize'));
}
