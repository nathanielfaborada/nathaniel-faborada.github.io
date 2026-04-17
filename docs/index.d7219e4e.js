const e=["college-of-mary-immaculate","Jenather-Auto-Shop","Immaculearn","Treads-Clone"],t="github_orgs_cache_v1";function l(e){let t=document.getElementById("organization-grid-full");if(t){if(!e.length){t.innerHTML='<p style="color:var(--color-text-secondary); font-size:14px;">No organizations found.</p>';return}t.innerHTML=e.map(e=>`
        <div class="group-card">
            <img class="group-thumb" src="${e.avatar_url}" alt="${e.name||e.login}" style="object-fit:cover; width:52px; height:52px; border-radius:8px;">
            <div class="group-info">
                <p class="group-name" title="${e.name||e.login}">${e.name||e.login}</p>
                <div class="group-meta">
                    <svg class="globe-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
                        <ellipse cx="8" cy="8" rx="2.5" ry="6.5" stroke="currentColor" stroke-width="1.2"/>
                        <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="currentColor" stroke-width="1.2"/>
                    </svg>
                    <span>Public \xb7 ${e.public_repos} repos</span>
                </div>
            </div>
            <a class="collab-visit" href="${e.html_url}" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Visit
            </a>
        </div>
    `).join("")}}!async function(){let r=document.getElementById("organization-grid-full");if(!r)return;let o=function(){try{let e=localStorage.getItem(t);if(!e)return null;let{data:l,timestamp:r}=JSON.parse(e);if(Date.now()-r>864e5)return localStorage.removeItem(t),null;return l}catch{return null}}();if(o){l(o);return}r.innerHTML=Array.from({length:e.length},()=>`
        <div class="group-card collab-skeleton">
            <div class="skeleton-avatar"></div>
            <div class="collab-info">
                <div class="skeleton-line" style="width:70%"></div>
                <div class="skeleton-line" style="width:50%"></div>
            </div>
        </div>
    `).join("");let i=(await Promise.allSettled(e.map(e=>fetch(`https://api.github.com/orgs/${e}`).then(e=>e.json())))).filter(e=>"fulfilled"===e.status&&e.value.avatar_url).map(e=>e.value);localStorage.setItem(t,JSON.stringify({data:i,timestamp:Date.now()})),l(i)}();
//# sourceMappingURL=index.d7219e4e.js.map
