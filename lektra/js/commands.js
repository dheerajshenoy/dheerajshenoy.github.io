function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

async function read_commands() {
    const response = await fetch("files/commands.json");
    return await response.json();
}

function renderCommand(command) {
    const slug = slugify(command.name);
    return `
    <div id="${slug}" class="command-item">
            <code class="command-name">${command.name}</code>
            ${command.description
                    ? `<p class="command-desc">${command.description}</p>`
                    : '<p class="command-desc">—</p>'}
        </div>`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const commands = await read_commands();
    document.getElementById('sections').innerHTML =
        commands.map(renderCommand).join('');
    document.getElementById('result-count').textContent = `${commands.length} commands`;

    document.getElementById('command-search').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const commandItems = document.querySelectorAll('.command-item');
        let visible = 0;
        commandItems.forEach(item => {
            const name = item.querySelector('.command-name').textContent.toLowerCase();
            const desc = item.querySelector('.command-desc').textContent.toLowerCase();
            const show = name.includes(query) || desc.includes(query);
            item.style.display = show ? '' : 'none';
            if (show) visible++;
        });
        document.getElementById('result-count').textContent = `${visible} commands`;
    });

    hljs.highlightAll();
});
