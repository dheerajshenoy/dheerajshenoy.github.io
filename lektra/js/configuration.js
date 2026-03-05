function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

async function read_config() {
    const response = await fetch("files/config.json");
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
    console.log(section);
    const slug = slugify(section.name);
    const desc = section.section_desc
        ? `<p>${section.section_desc}</p>`
        : '';


    const rows = section.fields
        .filter(f => f.type !== "struct") // skip struct fields
        .map(f => `
    <div class="field-item">
        <div class="field-header">
            <code class="field-name">${f.name}</code>
            ${f.added ? `<span class="field-added">Added in ${f.added}</span>` : ''}
        </div>
        ${f.desc ? `<p class="field-desc">${f.desc}</p>` : '<p class="field-desc">—</p>'}
        ${f.type ? `<span class="field-type">Type: ${renderType(f.type)}</span>` : ''}
        ${f.default ? `<span class="field-default">Default: ${renderDefault(f.default)}</span>` : ''}
        ${f.choice ? `<div class="field-choices">${renderChoices(f.choice)}</div>` : ''}
        ${f.note ? `<div class="callout note"><strong>Note</strong><br>${f.note}</div>` : ''}
    </div>
`).join('');


    return `
        <section id="${slug}" class="section">
            <h2>
            <!-- ${section.name} -->
            <div class="field-header">
            <code class="inline">[${slug}]</code>
            <span class="field-added">Added in ${section.section_added}</span>
            </div>
            </h2>
            <div class="desc">${desc}</div>
            ${section.section_note ? `<div class="callout note"><strong>Note</strong><br>${section.section_note}</div>` : ''}
            <div class="fields">
            <ol>
                ${rows}
            </ol>
            </div>
        </section>`
}

function renderChoices(choice) {
    const items = choice.split(',').map(c => c.trim()).filter(Boolean);
    return `<div class="choices"><strong>Options</strong>
        ${items.map(c => `<code class="inline">${c}</code>`).join(' ')}
    </div>`;
}

function renderDefault(value) {
    if (value === null || value === undefined) return '—';

    const strVal = String(value).trim();

    // Numbers with optional 'f'
    const numClean = strVal.replace(/^(-?\d+\.?\d*)f$/, '$1');

    // Boolean colors
    const boolColors = {
        'true':  '#79c0ff',
        'false': '#ffa657',
    };

    // Detect string literals (e.g., quoted strings)
    const isString = /^["'].*["']$/.test(strVal);

    let color = 'var(--text, #fff)'; // default

    if (boolColors.hasOwnProperty(strVal)) {
        color = boolColors[strVal];
    } else if (isString) {
        color = '#c792ea'; // any color you want for strings
    }

    const display = isString ? strVal : numClean;

    return `<code class="inline" style="color:${color}">${display}</code>`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const SECTIONS = await read_config();
    document.getElementById('sections').innerHTML =
        SECTIONS.map(renderSection).join('');
    hljs.highlightAll();
});
