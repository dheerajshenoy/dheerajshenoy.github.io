function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

async function read_lua_api() {
    const response = await fetch("files/lua_api.json");
    return await response.json();
}

const TYPE_COLORS = {
    integer:  '#ffa657',
    int:      '#ffa657',
    number:   '#ffa657',
    float:    '#ffa657',
    string:   '#a5d6ff',
    boolean:  '#79c0ff',
    bool:     '#79c0ff',
    table:    '#d2a8ff',
    'function': '#7ee787',
    nil:      '#8b949e',
};

function typeColor(t) {
    const base = (t || '').split('|')[0].trim().replace(/[\[\]?]/g, '');
    return TYPE_COLORS[base] || 'var(--muted)';
}

function renderTypeTag(t) {
    if (!t) return '';
    return `<code class="type-tag" style="color:${typeColor(t)}">${t}</code>`;
}

function escapeHtml(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderParams(params) {
    if (!params || !params.length) return '';
    const rows = params.map(p => `
        <tr>
            <td><code class="param-name">${p.name}</code></td>
            <td>${renderTypeTag(p.type)}</td>
            <td class="param-desc">${p.desc || ''}</td>
        </tr>`).join('');
    return `<div class="func-params">
        <span class="label">Parameters</span>
        <table class="params-table">${rows}</table>
    </div>`;
}

function renderReturns(ret) {
    if (!ret) return '';
    const parts = ret.split('—');
    const typeAndName = parts[0].trim();
    const desc = parts[1] ? parts[1].trim() : '';
    const [typePart, ...nameParts] = typeAndName.split(/\s+/);
    return `<div class="func-returns">
        <span class="label">Returns</span>
        ${renderTypeTag(typePart)}
        ${nameParts.length ? `<code class="return-name">${nameParts.join(' ')}</code>` : ''}
        ${desc ? `<span class="return-desc"> — ${desc}</span>` : ''}
    </div>`;
}

function renderEntry(entry, prefix) {
    const slug = prefix + '-' + slugify(entry.name);
    const paramText = (entry.params || []).map(p => `${p.name} ${p.type || ''} ${p.desc || ''}`).join(' ');
    const searchText = [entry.name, entry.sig || '', entry.desc || '', paramText, entry.returns || ''].join(' ').toLowerCase();
    return `
    <div id="${slug}" class="func-item" data-search="${searchText}">
        <div class="func-header">
            <code class="func-sig">${escapeHtml(entry.sig || entry.name)}</code>
        </div>
        ${entry.desc ? `<p class="func-desc">${entry.desc}</p>` : ''}
        ${renderParams(entry.params)}
        ${renderReturns(entry.returns)}
    </div>`;
}

function renderFields(fields) {
    if (!fields || !fields.length) return '';
    const rows = fields.map(f => `
        <tr>
            <td><code class="field-name">${f.name}</code></td>
            <td>${renderTypeTag(f.type)}</td>
            <td class="field-desc">${f.desc || ''}</td>
        </tr>`).join('');
    return `<table class="fields-table">${rows}</table>`;
}

function renderClass(cls, moduleSlug) {
    const hasMethods = cls.methods && cls.methods.length > 0;
    const hasFields  = cls.fields  && cls.fields.length  > 0;
    if (!hasMethods && !hasFields) return '';

    const slug = moduleSlug + '-class-' + slugify(cls.name);
    const methods = hasMethods
        ? cls.methods.map(m => renderEntry(m, slug)).join('')
        : '';

    return `
    <div class="class-block">
        <div class="class-header" id="${slug}">
            <code class="class-name">${cls.name}</code>
            ${cls.desc ? `<span class="class-desc"> — ${cls.desc}</span>` : ''}
        </div>
        ${hasFields ? renderFields(cls.fields) : ''}
        ${hasMethods ? `<div class="method-list">${methods}</div>` : ''}
    </div>`;
}

function renderModule(mod) {
    const slug = slugify(mod.module || '');
    const classes   = (mod.classes   || []).map(c => renderClass(c, slug)).join('');
    const functions = (mod.functions || []).map(f => renderEntry(f, slug + '-fn')).join('');

    return `
    <section id="${slug}" class="module-section">
        <h2><code class="module-name">${mod.module}</code></h2>
        ${mod.module_desc ? `<p class="module-desc">${mod.module_desc}</p>` : ''}
        ${classes}
        ${functions ? `<div class="func-list">${functions}</div>` : ''}
    </section>`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const modules = await read_lua_api();
    document.getElementById('sections').innerHTML = modules.map(renderModule).join('');

    const allEntries = document.querySelectorAll('.func-item');
    document.getElementById('result-count').textContent = `${allEntries.length}`;

    document.getElementById('lua-api-search').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        let visible = 0;
        allEntries.forEach(el => {
            const match = !q || el.dataset.search.includes(q);
            el.style.display = match ? '' : 'none';
            if (match) visible++;
        });
        document.getElementById('result-count').textContent = `${visible}`;

        // Show/hide module sections and class blocks based on visible children
        document.querySelectorAll('.class-block').forEach(block => {
            const anyVisible = [...block.querySelectorAll('.func-item')].some(el => el.style.display !== 'none');
            block.style.display = (!q || anyVisible) ? '' : 'none';
        });
        document.querySelectorAll('.module-section').forEach(sec => {
            const anyVisible = [...sec.querySelectorAll('.func-item')].some(el => el.style.display !== 'none');
            sec.style.display = (!q || anyVisible) ? '' : 'none';
        });
    });

    hljs.highlightAll();
});
