var _data = [];
var _projects = [];

class Project {

    constructor(num, name, desc, link, state) {
        this.num = num;
        this.name = name;
        this.desc = desc;
        this.link = link;
        this.state = state;
        this.getElement();
    }

    getElement() {
        var div = document.createElement("div");
        var _project_label = document.createElement("h3");
        _project_label.innerHTML = this.num + ". " + this.name;

        _project_label.classList.add("project-title");
        
        var _img_link = document.createElement("a");

        _img_link.setAttribute("href", this.link);
        _img_link.setAttribute("target", "_blank");

        var _git_img = document.createElement("img");

        _git_img.setAttribute("src", "../images/github.svg");
        _git_img.setAttribute("class", "git_img");

        _img_link.appendChild(_git_img);


        var _project_desc = document.createElement("h4");
        var _hr = document.createElement("hr");
        _hr.classList.add("custom-hr");
        _project_desc.innerHTML = this.desc;

        var _project_heading_div = document.createElement("div");
        var _project_state = document.createElement("h4");
        _project_state.classList.add("project-state");
        _project_state.innerHTML = "<i>[" + this.state + "]</i>";

        _project_heading_div.appendChild(_project_label);
        _project_heading_div.appendChild(_project_state);

        _project_heading_div.classList.add("project-heading-div");

        // div.appendChild(_project_label);
        div.appendChild(_project_heading_div);
        div.appendChild(_img_link);
        div.appendChild(_hr);
        div.appendChild(_project_desc);

        div.classList.add("project-card");
        var main_content = document.getElementById("project-main-content");
        main_content.appendChild(div);
    }
};

async function loadJSON (url) {
    const res = await fetch(url);
    return await res.json();
}

async function getProjects() {
    loadJSON('../js/projects.json').then(
        (data) => {
            var projectCount = document.getElementById("project_count");
            projectCount.innerHTML = data.length;
            for(let i=0; i < data.length; i++) {
                new Project(i + 1, data[i].name, data[i].desc, data[i].link, data[i].state);
            }
        }
    );
}

window.onload = function() {
    getProjects();
};
