async function getStars() {
    try {
        const gh = await fetch('https://api.github.com/repos/dheerajshenoy/lektra').then(r => r.json());
        document.querySelector('.github-count').textContent = gh.stargazers_count ?? '—';
    } catch {}

    try {
        const cb = await fetch('https://codeberg.org/api/v1/repos/lektra/lektra').then(r => r.json());
        document.querySelector('.codeberg-count').textContent = cb.stars_count ?? '—';
    } catch {}
}

document.addEventListener("DOMContentLoaded", () => {
    getStars();
});
