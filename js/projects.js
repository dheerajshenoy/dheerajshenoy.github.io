let main_container = null;
let projects_container = null;
const loading_spinner = createLoadingSpinner();

// Get all the repos in my github account
async function getGithubRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const gitUrl = `https://github.com/${username}/`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Your GitHub Repositories:');
            console.log(data.length);

            // set the project count
            document.getElementById("project_count").innerHTML = data.length;

            let repoTemplate = document.getElementById("project-template");
            const mainContentContainer = document.getElementById("project-main-content");

            let gridContainer = document.createElement("div");
            gridContainer.id = 'projects-grid-container';

            // handle for each repo in the github account
            data.forEach(repo => {

                let repoBox = repoTemplate.content.cloneNode(true);
                repoBox.className = "project-card";

                let repoTitle = repoBox.querySelector('#project-title');
                repoTitle.textContent = repo.name.charAt(0).toUpperCase() + repo.name.slice(1);

                let repoGitImg = repoBox.querySelector('#project-link');
                repoGitImg.href = gitUrl + repo.name;

                gridContainer.appendChild(repoBox);
            });

            mainContentContainer.appendChild(gridContainer);
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
        });
}

// return a spinner
function createLoadingSpinner() {
    const loaderContainer = document.createElement("div");
    loaderContainer.classList.add("loading-spinner-container");

    const spinner = document.createElement("div");
    spinner.classList.add("loading-spinner");

    loaderContainer.appendChild(spinner);
    return loaderContainer;
}

function showLoadingSpinner(container) {
    container.appendChild(loading_spinner);
}

function stopLoadingSpinner(container) {
    container.removeChild(loading_spinner);
}

// add on load listener
window.addEventListener("load", projectsPageOnLoad);

// JS code for project page
function projectsPageOnLoad() {
    main_container = document.getElementById("main-container");
    projects_container = document.getElementById("project-main-content");
    showLoadingSpinner(projects_container);
    const username = 'dheerajshenoy';
    getGithubRepos(username).then(
        function(value) { stopLoadingSpinner(projects_container);},
    );
}
