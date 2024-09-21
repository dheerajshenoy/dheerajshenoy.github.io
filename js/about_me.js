let img_path = './images/'


const interests = {
    "Astrophysics" : "astrophysics",
    "Physics": "physics",
    "Computer Science": "programming",
    "Mathematics": "math",
    "Computational Physics": "comp_physics",
    "Creative Programming": "creative_prog",
    "Web Development": "webdev",
    "Open Source Softwares": "foss",
    "Neovim": "neovim",
    "Emacs" : "emacs",
    "Drums": "drums",
    "Drawing": "drawing",
    "Blogging": "blog",
    "Music" : "music",
};

const OS = {
    "Microsoft Windows" : "windows",
    "Linux" : "linux",
};

const proglangs = {
    "C" : "c",
    "C++" : "cpp",
    "Python" : "python",
    "Fortran" : "fortran",
    "LaTeX" : "latex",
    "Rust" : "rust",
    "Java" : "java",
    "Lua" : "lua",
    "Shell" : "shell",
    "HTML" : "html",
    "CSS" : "css",
    "Javascript" : "js",
    "PHP" : "php",
    "VB.NET" : "vbnet",
    "SQL" : "sql",
    "C#" : "Csharp",
    "Kotlin" : "kotlin",
    "Git" : "git",
}


function interestsSectionCode() {
    const cardTemplate = document.getElementById("interests-template");
    const interestsContainer = document.getElementById("interests-container");
    for (const i in interests) {
        let file_name = img_path + interests[i] + ".svg";
        let interestBox = cardTemplate.content.cloneNode(true);
        interestBox.className = "project-card";

        let interestTitle = interestBox.querySelector('#interests-title');
        interestTitle.textContent = i;

        let interestImage = interestBox.querySelector('#interests-image');
        interestImage.src = file_name;

        interestsContainer.appendChild(interestBox);
    }
}

function skillsSectionCode() {
    const cardTemplate = document.getElementById("interests-template");
    const interestsContainer = document.getElementById("prog-langs-container");
    for (const i in proglangs) {
        let file_name = img_path + proglangs[i] + ".svg";
        let interestBox = cardTemplate.content.cloneNode(true);
        interestBox.className = "project-card";

        let interestTitle = interestBox.querySelector('#interests-title');
        interestTitle.textContent = i;

        let interestImage = interestBox.querySelector('#interests-image');
        interestImage.src = file_name;

        interestsContainer.appendChild(interestBox);
    }
}

interestsSectionCode();
skillsSectionCode();
