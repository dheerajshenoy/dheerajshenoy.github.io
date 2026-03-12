function getStars() {
    fetch('https://api.github.com/repos/dheerajshenoy/lektra')
        .then(r => r.json())
        .then(data => {
            document.querySelector('.star-count').textContent =
                data.stargazers_count ?? '—';
        })
        .catch(() => {});
}

document.addEventListener("DOMContentLoaded", () => {
    getStars();
})
