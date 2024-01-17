var windowWidth = window.innerWidth;

function updateTitleOnResize() {

    var default_text = "dheerajshenoy.github.io";
    var small_text = "dheerajshenoy";
    var very_small_text = "djs";

    var text_element = document.getElementById("navbar--title");
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
    var todo_btn = $("#todo-btn");
    todo_box.toggle(375);
    if (todo_btn.css("left") === "0px") {
        todo_btn.css("left", $(".main_content").width() - todo_btn.width() - 50, 500);
        todo_btn.text("Close TODO");
    } else {
        todo_btn.css("left", "0px");
        todo_btn.text("See TODO");
    }
}

window.onload = function () {
    window.addEventListener("input", updateTitleOnResize);
    window.addEventListener("resize", updateTitleOnResize);
    window.dispatchEvent(new Event('resize'));
}
