var windowWidth = window.innerWidth;
const wallpaper = document.getElementById('wallpaper-container');

function updateTitleOnResize() {

    const default_text = "dheerajshenoy.github.io";
    const small_text = "dheerajshenoy";
    const very_small_text = "djs";

    var text_element = document.getElementById("navbar--title");
    var windowWidth = window.innerWidth;

    if (windowWidth >= 400) {
        text_element.innerHTML= default_text;
    }
    else if (windowWidth < 600 && windowWidth > 200) {
        text_element.innerHTML= small_text;
    }

    else if (windowWidth <= 200) {
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

function closeSideNav() {
    const sideNav = document.getElementById("sidenav");
    sideNav.style.width = "0px";
}

function openSideNav() {
    const sideNav = document.getElementById("sidenav");
    sideNav.style.width = "150px";
}

function toggleSideNav() {

}

function gradientBG() {
    var granimInstance = new Granim({
        element: '#bg-canvas',
        name: 'granim',
        opacity: [1, 1],
        states : {
            "default-state": {
                gradients: [
                    ['#834D9B', '#D04ED6'],
                    ['#1CD8D2', '#93EDC7']
                ]
            }
        }
    });
}

window.onload = function () {
    window.addEventListener("input", updateTitleOnResize);
    window.addEventListener("resize", updateTitleOnResize);
    window.dispatchEvent(new Event('resize'));
    gradientBG();

}
