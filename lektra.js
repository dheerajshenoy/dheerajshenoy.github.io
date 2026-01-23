// Tiny tabs controller (no dependencies)
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
};

document.addEventListener("DOMContentLoaded", () => {
    tabController();
});
