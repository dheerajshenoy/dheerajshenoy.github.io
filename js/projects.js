const username = 'dheerajshenoy';
const apiUrl = `https://api.github.com/users/${username}/repos`;
const gitUrl = "https://github.com/dheerajshenoy/";

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
