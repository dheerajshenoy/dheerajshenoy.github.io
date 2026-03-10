function tabController() {
    const root = document.querySelector("[data-tabs]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll(".tab"));
    const panels = Array.from(root.querySelectorAll(".panel"));

    function activate(tab) {
        const id = tab.getAttribute("aria-controls");
        tabs.forEach(t => {
            const on = t === tab;
            t.classList.toggle("active", on);
            t.setAttribute("aria-selected", on ? "true" : "false");
        });
        panels.forEach(p => p.classList.toggle("active", p.id === id));
    }

    tabs.forEach(t => t.addEventListener("click", () => activate(t)));
}


function activateTab(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(btn.getAttribute('aria-controls'))?.classList.add('active');
}

// Update hash on tab click
document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
        history.pushState(null, '', `#${btn.id}`);
        activateTab(btn.id);
    });
});

// Activate tab from hash on load
const hash = window.location.hash.slice(1);
if (hash) activateTab(hash);

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    activateTab(window.location.hash.slice(1));
});

document.addEventListener("DOMContentLoaded", () => {
    hljs.highlightAll(); // add this
    tabController();
});
