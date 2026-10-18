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
