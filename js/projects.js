const username = 'dheerajshenoy';
const apiUrl = `https://api.github.com/users/${username}/repos`;

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

        let repoTemplate = document.getElementById("repo-template");
        const mainContentContainer = document.getElementById("project-main-content");

        let gridContainer = document.createElement("div");
        gridContainer.id = 'projects-grid-container';

        // handle for each repo in the github account
        data.forEach(repo => {

            let repoBox = repoTemplate.content.cloneNode(true);

            let repoTitle = repoBox.querySelector('#repoTitle');
            repoTitle.textContent = repo.name;

            let repoGitImg = repoBox.querySelector('#repoLink');
            repoGitImg.href = repo.url;

            gridContainer.appendChild(repoBox);
        });

        mainContentContainer.appendChild(gridContainer);
    })
    .catch(error => {
        console.error('Error fetching GitHub repositories:', error);
    });
