var windowWidth = window.innerWidth;

function updateTitleOnResize() {

    var default_text = "dheerajshenoy.github.io";
    var small_text = "dheerajshenoy";
    var very_small_text = "djs";

    var text_element = document.getElementById("header_title");
    var windowWidth = window.innerWidth;

    if (windowWidth >= 600) {
        text_element.innerHTML= default_text;
    }
    else if (windowWidth < 600 && windowWidth > 400) {
        text_element.innerHTML= small_text;
    }

    else if (windowWidth <= 400) {
        text_element.innerHTML= very_small_text;
    }

}

// Handle todo button behaviour
function todo_btn_click() {
    var todo_box = $("#todo-box");
    todo_box.toggle("slow");
}

window.onload = function () {
    window.addEventListener("input", updateTitleOnResize);
    window.addEventListener("resize", updateTitleOnResize);
    window.dispatchEvent(new Event('resize'));
}
