const features = [
    {
        title: "Performance",
        desc: "Smooth, high-performance scrolling with keyboard and mouse support.",
        media: { type: "img", src: "files/Scrolling.gif", alt: "Scrolling Demo" }
    },

    {
        title: "Search",
        desc: "Instantly search through the document with highlighted results and a scrollbar overview.",
        media: { type: "img", src: "files/Search-Hits-Scrollbar.gif", alt: "Search Hits in Scrollbar" }
    },

    {
        title: "Annotation Support",
        desc: "Add highlights, rectangles, and popup annotations — each with the ability to attach comments.",
        media: { type: "img", src: "files/Highlight Annotation.gif", alt: "Highlight Annotation" }
    },

    {
        title: "Searchable Text Highlight",
        desc: "Highlighted text stays searchable — find and jump to your highlights just like any other search result.",
        media: { type: "img", src: "files/Search Text Highlight.gif", alt: "Search Text Highlight" }
    },

    {
        title: "Visual Line Mode",
        desc: "Highlights your active line and subtly dims the rest of the document — navigable with the keyboard or a mouse click.",
        media: { type: "img", src: "files/visual_line_mode.gif", alt: "Visual Line Mode Demo" }
    },

    {
        title: "Outline",
        desc: "Navigate long documents quickly with a searchable table of contents.",
        media: { type: "img", src: "files/Outline.png", alt: "Document Outline" }
    },

    {
        title: "Jump Marker &amp; History Navigation",
        desc: "Track jump destinations and move back and forth through your reading history.",
        media: { type: "img", src: "files/Jump-Marker.gif", alt: "Jump Marker" }
    },

    {
        title: "Link Hints",
        desc: "Navigate links quickly using the keyboard with hint overlays.",
        media: { type: "img", src: "files/link_hint.png", alt: "Link Hint" }
    },

    {
        title: "Narrow Mode",
        desc: "Focus on a specific part of a document by narrowing to a drawn region, a page range, or a section from the outline.\
        Scrolling, search, and navigation stay confined to the narrowed area. Exit with <code>widen_region</code>.",
        media: { type: "img", src: "files/narrow.gif", alt: "Narrow Mode" }
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
        desc: "Open a portal to view different sections of the same document side by side.",
        media: { type: "img", src: "files/Portals.gif", alt: "Portals Demo" }
    },

    {
        title: "Preview",
        desc: "Open a floating preview window to peek at any location in the document without losing your place.",
        media: { type: "img", src: "files/preview.gif", alt: "Preview Demo" }
    },

    {
        title: "SyncTeX Support",
        desc: "Jump seamlessly between LaTeX source and the corresponding PDF location.",
        media: { type: "img", src: "files/synctex.gif", alt: "SyncTeX support" }
    },

    {
        title: "Command Palette",
        desc: "Access every command instantly by name — no need to remember keybindings.",
        media: { type: "img", src: "files/command_palette.png", alt: "Command Palette" }
    },
    {
        title: "Configure with <span class='hl-toml'>TOML</span> or <span class='hl-lua'>Lua</span>",
        desc: "Use a simple, readable TOML file for configuration — or go further and configure everything through Lua for full programmatic control.",
        media: { type: "img", src: "files/config.png", alt: "TOML config" }
    },

    {
        title: "Lua Scripting",
        subtitle: "For advanced users",
        desc: "Extend and automate LEKTRA with an embedded Lua engine — bind scripts to keys, interact with views, and build entirely custom workflows.",
        media: { type: "img", src: "files/lua.png", alt: "Lua Scripting" }
    },
];

const otherFeatures = [
    "<b>Bookmarks</b> — full support for both local and global bookmarks (similar to Vim's)",
    "<b>Marks</b> — Vim-style marks for quick in-document navigation",
    "<b>Lazy loading tabs</b> — open many files without upfront memory cost",
    "<b>Session management</b> — save and restore open documents and layout",
    "<b>Customizable keybindings</b> — bind any command to any key",
    "<b>URL detection</b> — automatic detection of non-PDF URLs in documents",
    "<b>Narrow to Region</b> — focus any rectangular area of a page (Emacs-style)",
    "<b>File Picker</b> — Emacs-style finder with directory navigation and tab completion",
    "<b>Rotation &amp; Flip</b> — rotate pages or flip horizontally / vertically",
];

function addFeatures() {
    const showcase = document.getElementById("features");

    features.forEach((feature, index) => {
        const div = document.createElement("div");
        div.className = `feature${index % 2 !== 0 ? " reverse" : ""}`;
        const isGif = feature.media.src.endsWith('.gif');
        const mediaSrc = isGif ? feature.media.src.replace(/\.gif$/, '.webm') : feature.media.src;
        const mediaHTML = isGif
            ? `<video autoplay loop muted playsinline><source src="${mediaSrc}" type="video/webm"></video>`
            : `<img src="${mediaSrc}" alt="${feature.media.alt}">`;
        div.innerHTML = `
            <div class="feature-media">
                ${mediaHTML}
            </div>
            <div class="feature-body">
                <h3 class="feature-title">${feature.title}</h3>
                ${feature.subtitle ? `<p class="feature-subtitle">${feature.subtitle}</p>` : ""}
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
    hljs.highlightAll();
    addFeatures();

});

