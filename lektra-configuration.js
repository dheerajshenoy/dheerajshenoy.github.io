function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

async function read_config() {
    const response = await fetch("lektra-files/config.json");
    return await response.json();
}

function renderType(type) {
    const colors = {
        'bool':  '#79c0ff',
        'int':   '#ffa657',
        'float': '#ffa657',
        'str':   '#a5d6ff',
        'table': '#d2a8ff',
    };
    const color = colors[type] || 'var(--muted, #888)';
    return `<code class="inline" style="color:${color}">${type || '—'}</code>`;
}

function renderSection(section) {
    const slug = slugify(section.name);
    const desc = section.section_desc
        ? `<p>${section.section_desc}</p>`
        : '';

    const rows = section.fields.map(f => `
        <tr>
            <td><code class="inline">${f.name}</code></td>
            <td>${renderType(f.type)}</td>
            <td>${f.desc || '—'}${f.choice ? renderChoices(f.choice) : ''}</td>
            <td>${renderDefault(f.default)}</td>
        </tr>`
    ).join('');

    const table = section.fields.length > 0 ? `
        <table class="table">
            <thead>
                <tr><th>Key</th><th>Type</th><th>Description</th><th>Default</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>` : '';

    return `
        <section id="${slug}" class="section">
            <h2>${section.name}</h2>
            ${desc}
            ${table}
        </section>
        <hr class="sep">`;
}

function renderChoices(choice) {
    const items = choice.split(',').map(c => c.trim()).filter(Boolean);
    return `<div class="choices"><strong>Options</strong>
        ${items.map(c => `<code class="inline">${c}</code>`).join(' ')}
    </div>`;
}


function renderDefault(value) {
    if (!value && value !== 0) return '—';
    const clean = String(value).replace(/^(-?\d+\.?\d*)f$/, '$1');
    const colors = {
        'true':  '#79c0ff',
        'false': '#ffa657',
    };
    const color = colors[clean] || 'var(--text, #fff)';
    return `<code class="inline" style="color:${color}">${clean}</code>`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const SECTIONS = await read_config();
    document.getElementById('sections').innerHTML =
        SECTIONS.map(renderSection).join('');
    hljs.highlightAll();
});
