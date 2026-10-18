(() => {
    const lb = document.getElementById("lb"),
        im = lb.querySelector("img"),
        cap = lb.querySelector("p");
    const close = () => {
        lb.classList.remove("open");
        document.body.style.overflow = "";
    };
    document.querySelectorAll("figure img").forEach((i) =>
        i.addEventListener("click", () => {
            im.src = i.src;
            im.alt = i.alt;
            const c = i.parentElement.querySelector("figcaption");
            cap.innerHTML = c ? c.innerHTML.replace(/<span class="zh">.*?<\/span>/, "") : "";
            lb.classList.add("open");
            document.body.style.overflow = "hidden";
        }),
    );
    lb.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
})();

(() => {
    const el = document.getElementById("stars");
    fetch("https://api.github.com/repos/dheerajshenoy/hpvis")
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => {
            if (typeof d.stargazers_count !== "number") return;
            el.querySelector("span").textContent = d.stargazers_count.toLocaleString();
            el.hidden = false;
        })
        .catch(() => {});
})();

// Light shell highlighting for the code boxes of the installation section
(() => {
    const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const span = (cls, t) => `<span class="tok-${cls}">${esc(t)}</span>`;
    const re =
        /(#.*)|("[^"]*"|'[^']*')|(\$\{?\w+\}?)|(&&|\|\||[|;])|(\s--?[A-Za-z][\w-]*(?:=\S*)?)|(https?:\/\/\S+)|(\S+)|(\s+)/g;
    const highlight = (line) => {
        let out = "",
            expectCmd = true,
            m;
        re.lastIndex = 0;
        while ((m = re.exec(line))) {
            const [t, comment, str, vari, op, flag, url, word, space] = m;
            if (comment) out += span("comment", t);
            else if (str) out += span("str", t);
            else if (vari) out += span("var", t);
            else if (op) {
                out += span("op", t);
                expectCmd = true;
            } else if (flag) out += esc(flag.match(/^\s*/)[0]) + span("flag", flag.trim());
            else if (url) out += span("url", t);
            else if (word) {
                if (expectCmd) {
                    out += span(t === "sudo" ? "sudo" : "cmd", t);
                    expectCmd = t === "sudo";
                } else out += esc(t);
            } else out += esc(space);
        }
        return out;
    };
    document.querySelectorAll(".install pre").forEach((pre) => {
        pre.innerHTML = pre.textContent.split("\n").map(highlight).join("\n");
    });
})();

// Copy buttons on the code boxes of the installation section
(() => {
    document.querySelectorAll(".install pre").forEach((pre) => {
        const box = document.createElement("div");
        box.className = "code";
        pre.parentNode.insertBefore(box, pre);
        box.appendChild(pre);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy";
        btn.textContent = "Copy";
        btn.setAttribute("aria-label", "Copy to clipboard");
        box.appendChild(btn);

        let timer;
        btn.addEventListener("click", async () => {
            const text = pre.textContent.trim();
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                ta.remove();
            }
            btn.textContent = "Copied!";
            btn.classList.add("done");
            clearTimeout(timer);
            timer = setTimeout(() => {
                btn.textContent = "Copy";
                btn.classList.remove("done");
            }, 1500);
        });
    });
})();

// Highlight the nav link of the section currently in view
(() => {
    const links = [...document.querySelectorAll('nav a[href^="#"]')].filter((a) => a.hash.length > 1);
    const secs = links.map((a) => document.querySelector(a.hash)).filter(Boolean);
    const update = () => {
        const y = window.scrollY + 120;
        let cur = null;
        for (const s of secs) if (s.getBoundingClientRect().top + window.scrollY <= y) cur = s.id;
        links.forEach((a) => a.classList.toggle("active", a.hash === "#" + cur));
    };
    addEventListener("scroll", update, { passive: true });
    update();
})();
