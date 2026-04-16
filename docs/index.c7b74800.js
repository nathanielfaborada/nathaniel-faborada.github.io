const l=[{label:"College Thesis Capstone",users:["raecellann","Wesmabe1129","zjdelossantos"]},{label:"Threads Clone",users:["johnpaul-bodino","DietherPano","Genniesysbracia","Nahiwagaan"]},{label:"Internship",users:["JabbyAlicante","beatricecoleene","sudonotrey","Haimonmon","lykhasalustiano","DietherPano"]}],e=[...new Set(l.flatMap(l=>l.users))],a="github_users_cache_v2";function t(l){return`
        <div class="collab-card">
            <img class="collab-avatar" src="${l.avatar_url}" alt="${l.name||l.login}">
            <div class="collab-info">
                <span class="collab-name">${l.name||l.login}</span>
                <span class="collab-stat">${l.followers.toLocaleString()} Followers</span>
                <span class="collab-stat">${l.following.toLocaleString()} Following</span>
            </div>
            <a class="collab-visit" href="${l.html_url}" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Visit
            </a>
        </div>
    `}function o(l){return Array.from({length:l},()=>`
        <div class="collab-card collab-skeleton">
            <div class="skeleton-avatar"></div>
            <div class="collab-info">
                <div class="skeleton-line" style="width:70%"></div>
                <div class="skeleton-line" style="width:50%"></div>
                <div class="skeleton-line" style="width:50%"></div>
            </div>
        </div>
    `).join("")}function s(a){let o=document.getElementById("collaborators-grid"),s=document.getElementById("collaborators-grid-full");if(o){let l=e.slice(0,3).map(l=>a[l]?t(a[l]):"").join("");o.innerHTML=l}s&&(s.innerHTML=l.map(l=>`
            <div class="collab-group">
                <h3 class="collab-group-label">\u{2014} ${l.label}</h3>
                <div class="collab-group-grid">
                    ${l.users.map(l=>a[l]?t(a[l]):'<div class="collab-card collab-error">Failed to load</div>').join("")}
                </div>
            </div>
        `).join(""))}!async function(){let l=document.getElementById("collaborators-grid"),t=document.getElementById("collaborators-grid-full"),n=function(){try{let l=localStorage.getItem(a);if(!l)return null;let{data:e,timestamp:t}=JSON.parse(l);if(Date.now()-t>864e5)return localStorage.removeItem(a),null;return e}catch{return null}}();if(n){s(n);return}l&&(l.innerHTML=o(3)),t&&(t.innerHTML=o(e.length));let i=await Promise.allSettled(e.map(l=>fetch(`https://api.github.com/users/${l}`).then(l=>l.json()))),r={};i.forEach((l,a)=>{"fulfilled"===l.status&&l.value.avatar_url&&(r[e[a]]=l.value)}),localStorage.setItem(a,JSON.stringify({data:r,timestamp:Date.now()})),s(r)}();
//# sourceMappingURL=index.c7b74800.js.map
