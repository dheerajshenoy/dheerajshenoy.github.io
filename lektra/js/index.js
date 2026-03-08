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

const features = [
    {
        title: "Performance",
        desc: "Smooth, high-performance scrolling with keyboard and mouse support.",
        media: { type: "img", src: "files/Scrolling.gif", alt: "Scrolling Demo" }
    },
    {
        title: "Tabs and Splits",
        desc: "Open multiple documents in tabs and splits, with customizable layouts.",
        media: { type: "img", src: "files/Tabs_and_Splits.gif", alt: "Tabs and Splits Demo" }
    },
    {
        title: "Layouts",
        desc: "Choose between <b>top to bottom</b>, <b>left to right</b>, <b>book</b> and <b>single</b> layouts.",
        media: { type: "img", src: "files/Layouts.gif", alt: "Layouts Demo" }
    },
    {
        title: "Portals",
        desc: "Open \"portal\" to view different sections of the same document side by side.",
        media: { type: "img", src: "files/Portals.gif", alt: "Portals Demo" }
    },
    {
        title: "Preview",
        desc: "Open floating \"preview\" to target location and toggle it's visibility.",
        media: { type: "img", src: "files/preview.gif", alt: "Preview Demo" }
    },
    {
        title: "Visual Line Mode",
        desc: "Highlights your active line and subtly dim the rest of the document, navigatable with keyboard or mouse click)",
        media: { type: "img", src: "files/visual_line_mode.gif", alt: "Visual Line Mode Demo" }
    },
    {
        title: "Search",
        desc: "Instantly search through the document with highlighted results and a scrollbar overview.",
        media: { type: "img", src: "files/Search-Hits-Scrollbar.gif", alt: "Search Hits in Scrollbar" }
    },
    {
        title: "Jump Marker &amp; History Navigation",
        desc: "Track jump destinations and move back and forth through your reading history.",
        media: { type: "img", src: "files/Jump-Marker.gif", alt: "Jump Marker" }
    },
    {
        title: "SyncTeX Support",
        desc: "Jump seamlessly between LaTeX source and the corresponding PDF location.",
        media: { type: "img", src: "files/synctex.gif", alt: "SyncTeX support" }
    },
    {
        title: "Annotation Support",
        desc: "Highlight, rectangle and popup annotations supported.<br><b>(Only highlight shown here)</b>",
        media: { type: "img", src: "files/Highlight Annotation.gif", alt: "Highlight Annotation" }
    },
    {
        title: "Link Hints",
        desc: "Navigate links quickly using the keyboard with hint overlays.",
        media: { type: "img", src: "files/link_hint.png", alt: "Link Hint" }
    },
    {
        title: "Searchable Text Highlight",
        desc: "Highlighted text remains searchable across the document.",
        media: { type: "img", src: "files/Search Text Highlight.gif", alt: "Search Text Highlight" }
    },
    {
        title: "Configured Using TOML",
        desc: "Fully customizable through a clean, readable TOML configuration file.",
        media: { type: "img", src: "files/config.png", alt: "TOML config" }
    },
];

const otherFeatures = [
    "Full support for both local and global bookmarks (similar to Vim's)",
    "Lazy loading tabs",
    "Session management",
    "Completely customizable keybindings",
    "Automatic non-PDF URL detection",
];

function addFeatures() {
    const showcase = document.getElementById("features");

    features.forEach((feature, index) => {
        const div = document.createElement("div");
        div.className = `feature${index % 2 !== 0 ? " reverse" : ""}`;
        div.innerHTML = `
            <div class="feature-media">
                <img src="${feature.media.src}" alt="${feature.media.alt}">
            </div>
            <div class="feature-body">
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-desc">${feature.desc}</p>
            </div>
        `;
        showcase.appendChild(div);
    });

    const fullCard = document.createElement("div");
    fullCard.className = "feature full";
    fullCard.innerHTML = `
        <div class="feature-body">
            <h3 class="feature-title">Other Features</h3>
            <ul class="bullets">
                ${otherFeatures.map(f => `<li>${f}</li>`).join("")}
            </ul>
        </div>
    `;
    showcase.appendChild(fullCard);
}


document.addEventListener("DOMContentLoaded", () => {
    hljs.highlightAll(); // add this
    tabController();
    addFeatures();
});
