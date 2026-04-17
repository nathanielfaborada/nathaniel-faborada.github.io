const GITHUB_ORGANIZATIONS = [
    "college-of-mary-immaculate",
    "Jenather-Auto-Shop",
    "Immaculearn",
    "Treads-Clone"
];

const ORG_CACHE_KEY = "github_orgs_cache_v1";
const ORG_CACHE_TTL = 1000 * 60 * 60 * 24; // 1 day

function getOrgCache() {
    try {
        const raw = localStorage.getItem(ORG_CACHE_KEY);
        if (!raw) return null;
        const { data, timestamp } = JSON.parse(raw);
        if (Date.now() - timestamp > ORG_CACHE_TTL) {
            localStorage.removeItem(ORG_CACHE_KEY);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

function setOrgCache(data) {
    localStorage.setItem(ORG_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

function createOrgCard(org) {
    return `
        <div class="group-card">
            <img class="group-thumb" src="${org.avatar_url}" alt="${org.name || org.login}" style="object-fit:cover; width:52px; height:52px; border-radius:8px;">
            <div class="group-info">
                <p class="group-name" title="${org.name || org.login}">${org.name || org.login}</p>
                <div class="group-meta">
                    <svg class="globe-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
                        <ellipse cx="8" cy="8" rx="2.5" ry="6.5" stroke="currentColor" stroke-width="1.2"/>
                        <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="currentColor" stroke-width="1.2"/>
                    </svg>
                    <span>Public · ${org.public_repos} repos</span>
                </div>
            </div>
            <a class="collab-visit" href="${org.html_url}" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Visit
            </a>
        </div>
    `;
}

function skeletonOrgCards(count) {
    return Array.from({ length: count }, () => `
        <div class="group-card collab-skeleton">
            <div class="skeleton-avatar"></div>
            <div class="collab-info">
                <div class="skeleton-line" style="width:70%"></div>
                <div class="skeleton-line" style="width:50%"></div>
            </div>
        </div>
    `).join("");
}

function renderOrgCards(orgs) {
    const gridFull = document.getElementById("organization-grid-full");
    if (!gridFull) return;

    if (!orgs.length) {
        gridFull.innerHTML = `<p style="color:var(--color-text-secondary); font-size:14px;">No organizations found.</p>`;
        return;
    }

    gridFull.innerHTML = orgs.map(org => createOrgCard(org)).join("");
}

async function renderGithubOrganization() {
    const gridFull = document.getElementById("organization-grid-full");
    if (!gridFull) return;

    const cached = getOrgCache();
    if (cached) {
        renderOrgCards(cached);
        return;
    }

    gridFull.innerHTML = skeletonOrgCards(GITHUB_ORGANIZATIONS.length);

    const results = await Promise.allSettled(
        GITHUB_ORGANIZATIONS.map(org =>
            fetch(`https://api.github.com/orgs/${org}`).then(r => r.json())
        )
    );

    const orgs = results
        .filter(r => r.status === "fulfilled" && r.value.avatar_url)
        .map(r => r.value);

    setOrgCache(orgs);
    renderOrgCards(orgs);
}

renderGithubOrganization();