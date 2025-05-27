document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-icon");

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);

    // Set initial icon based on theme
    if (savedTheme === "dark") {
        icon.src = "files/sun.svg";
        icon.alt = "Dark Mode";
    } else {
        icon.src = "files/moon.svg";
        icon.alt = "Light Mode";
    }

    // Toggle theme & icon on button click
    toggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.replace("dark", "light");
            icon.src = "files/moon.svg";
            icon.alt = "Light Mode";
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.replace("light", "dark");
            icon.src = "files/sun.svg";
            icon.alt = "Dark Mode";
            localStorage.setItem("theme", "dark");
        }
    });
});

