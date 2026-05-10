// ==========================================
// Cloudflare Worker: Ultimate Proxy & Cloak System
// ==========================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const path = url.pathname;

    // কুকি পার্সিং (অথেনটিকেশন চেক)
    const cookies = request.headers.get('Cookie') || '';
    const isAdmin = cookies.includes('role=admin');
    const userPinMatch = cookies.match(/auth_pin=([0-9]+)/);
    const userPin = userPinMatch ? userPinMatch[1] : null;

    // ১. API: পিন ভেরিফিকেশন (মাস্টার অ্যাডমিন এবং ইউজার)
    if (path === '/api/verify_pin' && request.method === 'POST') {
      const body = await request.json();
      const inputPin = body.pin;

      // মাস্টার অ্যাডমিন পিন চেক
      if (inputPin === env.ADMIN_SECRET_PIN) {
        return new Response(JSON.stringify({ success: true, redirect: '/dashboard' }), {
          headers: {
            'Set-Cookie': `role=admin; Path=/; HttpOnly; Secure; Max-Age=86400`,
            'Content-Type': 'application/json'
          }
        });
      }

      // ইউজার পিন চেক
      const pinDataStr = await env.CLOAK_KV.get(`pin_${inputPin}`);
      if (pinDataStr) {
        const pinData = JSON.parse(pinDataStr);
        if (pinData.status === 'active') {
          return new Response(JSON.stringify({ success: true, redirect: '/dashboard' }), {
            headers: {
              'Set-Cookie': `auth_pin=${inputPin}; Path=/; HttpOnly; Secure; Max-Age=86400`,
              'Content-Type': 'application/json'
            }
          });
        }
      }
      return new Response(JSON.stringify({ success: false, message: 'Invalid PIN' }), { status: 401 });
    }

    // ২. API: ডাটা সেভ করা (শুধুমাত্র অ্যাডমিনের জন্য)
    if (isAdmin && path.startsWith('/api/admin/')) {
      const body = await request.json();
      if (path === '/api/admin/save_site') {
        let sites = await env.CLOAK_KV.get('all_sites', 'json') || [];
        // আপডেট বা নতুন ইনসার্ট
        const existingIndex = sites.findIndex(s => s.id === body.siteId);
        if (existingIndex > -1) { sites[existingIndex] = { id: body.siteId, name: body.name }; } 
        else { sites.push({ id: body.siteId, name: body.name }); }
        
        await env.CLOAK_KV.put('all_sites', JSON.stringify(sites));
        await env.CLOAK_KV.put(`site_${body.siteId}`, body.targetUrl);
        return new Response(JSON.stringify({ success: true }));
      }
      if (path === '/api/admin/save_pin') {
        await env.CLOAK_KV.put(`pin_${body.pin}`, JSON.stringify({ status: body.status, sites: body.sites }));
        return new Response(JSON.stringify({ success: true }));
      }
    }

    // ৩. ড্যাশবোর্ড রাউটিং
    if (path === '/dashboard') {
      if (isAdmin) {
        const sites = await env.CLOAK_KV.get('all_sites', 'json') || [];
        return new Response(getAdminDashboardHTML(sites), { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
      } else if (userPin) {
        const pinDataStr = await env.CLOAK_KV.get(`pin_${userPin}`);
        if (pinDataStr) {
          const pinData = JSON.parse(pinDataStr);
          const allSites = await env.CLOAK_KV.get('all_sites', 'json') || [];
          const userSites = allSites.filter(site => pinData.sites.includes(site.id));
          return new Response(getUserDashboardHTML(userSites, userPin, hostname), { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
        }
      }
      return Response.redirect(`https://${hostname}`, 302);
    }

    // ৪. রিভার্স প্রক্সি লজিক (ডায়নামিক সাবডোমেইন: siteId-pin.site247.xyz)
    const proxyMatch = hostname.match(/^([a-zA-Z0-9]+)-([0-9]+)\./);
    if (proxyMatch) {
      const requestedSiteId = proxyMatch[1];
      const requestedPin = proxyMatch[2];

      if (userPin === requestedPin || isAdmin) {
        const targetUrlStr = await env.CLOAK_KV.get(`site_${requestedSiteId}`);
        if (targetUrlStr) {
          const proxyRequest = new Request(targetUrlStr + path + url.search, {
            method: request.method,
            headers: request.headers,
            body: request.body
          });
          return fetch(proxyRequest);
        }
      }
      return new Response("Unauthorized Proxy Access", { status: 403 });
    }

    // ৫. ডিফল্ট: ফেক রিয়েল এস্টেট সাইট (Decoy)
    return new Response(getDecoyHTML(), { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
  }
};

// ==========================================
// UI Templates
// ==========================================

function getDecoyHTML() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Premium Real Estate</title>
      <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; background: #f4f6f8; text-align: center; color: #333; -webkit-tap-highlight-color: transparent; }
          .header { background: #1a1a1a; color: white; padding: 25px; font-size: 22px; font-weight: 600; }
          .hero { padding: 60px 20px; background: #ffffff; border-bottom: 1px solid #e1e4e8; }
          .hero h2 { margin: 0 0 10px 0; font-size: 24px; color: #111; }
          .hero p { margin: 0; color: #666; font-size: 15px; line-height: 1.5; }
          .footer { margin-top: 50px; padding: 20px; color: #888; font-size: 13px; }
          
          /* Hidden Search Overlay */
          #hiddenSearchOverlay {
              display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(0,0,0,0.85); justify-content: center; align-items: center; z-index: 9999;
              backdrop-filter: blur(5px);
          }
          .search-box { background: #ffffff; padding: 30px; border-radius: 20px; width: 85%; max-width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
          .search-box input { width: 100%; padding: 16px; box-sizing: border-box; border: 1px solid #e1e4e8; border-radius: 12px; font-size: 16px; margin-bottom: 16px; outline: none; background: #f9fafb; transition: all 0.2s; text-align: center; letter-spacing: 2px; }
          .search-box input:focus { border-color: #007AFF; background: #ffffff; }
          .search-box button { width: 100%; padding: 16px; background: #007AFF; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
          .search-box button:active { background: #005bb5; }
          #trigger { user-select: none; }
      </style>
  </head>
  <body>
      <div class="header">Luxury Properties</div>
      <div class="hero">
          <h2>Find Your Dream Home</h2>
          <p>Explore top-rated real estate properties in the most exclusive locations.</p>
      </div>
      <div class="footer">
          &copy; 2026 Luxury Properties Inc.<br><br>
          <span id="trigger" ondblclick="showSearch()">Terms & Conditions</span>
      </div>

      <div id="hiddenSearchOverlay">
          <div class="search-box">
              <input type="password" id="pinInput" placeholder="Enter ID...">
              <button onclick="verifyPin()">Continue</button>
          </div>
      </div>

      <script>
          function showSearch() {
              document.getElementById('hiddenSearchOverlay').style.display = 'flex';
              setTimeout(() => document.getElementById('pinInput').focus(), 100);
          }
          
          document.getElementById('hiddenSearchOverlay').addEventListener('dblclick', function(e) {
              if(e.target === this) this.style.display = 'none';
          });

          async function verifyPin() {
              const pin = document.getElementById('pinInput').value;
              if(!pin) return;
              
              const btn = document.querySelector('.search-box button');
              btn.innerText = 'Checking...';
              
              try {
                  const res = await fetch('/api/verify_pin', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ pin })
                  });
                  const data = await res.json();
                  if(data.success) {
                      window.location.href = data.redirect;
                  } else {
                      alert('Access Denied');
                      document.getElementById('hiddenSearchOverlay').style.display = 'none';
                      document.getElementById('pinInput').value = '';
                      btn.innerText = 'Continue';
                  }
              } catch(e) {
                  alert('Network Error');
                  btn.innerText = 'Continue';
              }
          }
      </script>
  </body>
  </html>
  `;
}

function getAdminDashboardHTML(sites) {
  let siteOptions = sites.map(s => `
      <label style="display:flex; align-items:center; padding: 12px; background: #f9fafb; margin-bottom: 8px; border-radius: 10px; border: 1px solid #eee;">
          <input type="checkbox" value="${s.id}" class="site-cb" style="width: auto; margin: 0 10px 0 0;"> 
          <span style="font-weight: 500; color: #333;">${s.name} <span style="color: #888; font-size: 12px;">(${s.id})</span></span>
      </label>
  `).join('');
  
  return `
  <!DOCTYPE html>
  <html lang="bn">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>মাস্টার ড্যাশবোর্ড</title>
      <style>
          body { background: linear-gradient(to bottom, #EAF6FF, #CFE9FF); margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; min-height: 100vh; padding-bottom: 30px; }
          .header { background: #ffffff; padding: 20px; text-align: center; font-size: 18px; font-weight: 700; border-radius: 0 0 24px 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); margin-bottom: 25px; color: #111; }
          .container { padding: 0 20px; max-width: 500px; margin: auto; }
          .card { background: #ffffff; padding: 24px; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
          h3 { margin: 0 0 18px 0; font-size: 16px; color: #111; }
          input[type="text"], input[type="url"], select { width: 100%; padding: 15px; margin-bottom: 15px; box-sizing: border-box; border: 1px solid #e1e4e8; border-radius: 12px; background: #f9fafb; outline: none; font-size: 15px; transition: border 0.2s; }
          input:focus, select:focus { border-color: #007AFF; background: #ffffff; }
          button { width: 100%; padding: 16px; background: #007AFF; color: #fff; border: none; border-radius: 12px; font-weight: 600; font-size: 16px; cursor: pointer; transition: background 0.2s; }
          button:active { background: #005bb5; }
      </style>
  </head>
  <body>
      <div class="header">সিস্টেম কন্ট্রোল</div>
      <div class="container">
          <div class="card">
              <h3>১. নতুন সাইট যুক্ত করুন</h3>
              <input type="text" id="siteId" placeholder="Site ID (যেমন: portal1)">
              <input type="text" id="siteName" placeholder="Site Name (যেমন: Main Exchange)">
              <input type="url" id="targetUrl" placeholder="Target URL (https://...)">
              <button onclick="saveSite()">সাইট সেভ করুন</button>
          </div>
          
          <div class="card">
              <h3>২. ইউজার পিন অ্যাক্সেস</h3>
              <input type="text" id="userPin" placeholder="ইউজার পিন দিন (যেমন: 62826)">
              <select id="pinStatus">
                  <option value="active">অ্যাক্টিভ (Active)</option>
                  <option value="suspended">সাসপেন্ড (Suspended)</option>
              </select>
              <p style="margin: 5px 0 10px 0; font-size: 14px; color: #666; font-weight: 500;">অ্যাক্সেস প্রদান করুন:</p>
              <div style="max-height: 200px; overflow-y: auto; margin-bottom: 15px;">
                  ${siteOptions || '<p style="color: #888; font-size: 14px;">কোনো সাইট নেই। আগে সাইট যুক্ত করুন।</p>'}
              </div>
              <button onclick="savePin()">পিন সেভ করুন</button>
          </div>
      </div>
      <script>
          async function saveSite() {
              const siteId = document.getElementById('siteId').value.trim();
              const name = document.getElementById('siteName').value.trim();
              const targetUrl = document.getElementById('targetUrl').value.trim();
              if(!siteId || !targetUrl) return alert('Site ID এবং Target URL আবশ্যক!');
              
              const btn = document.querySelector('button');
              btn.innerText = 'সেভ হচ্ছে...';
              await fetch('/api/admin/save_site', { method: 'POST', body: JSON.stringify({ siteId, name, targetUrl }) });
              alert('সাইট সফলভাবে সেভ হয়েছে!'); location.reload();
          }
          async function savePin() {
              const pin = document.getElementById('userPin').value.trim();
              const status = document.getElementById('pinStatus').value;
              const sites = Array.from(document.querySelectorAll('.site-cb:checked')).map(cb => cb.value);
              if(!pin) return alert('দয়া করে পিন দিন!');
              
              await fetch('/api/admin/save_pin', { method: 'POST', body: JSON.stringify({ pin, status, sites }) });
              alert('পিনের অ্যাক্সেস সফলভাবে সেভ হয়েছে!');
          }
      </script>
  </body>
  </html>
  `;
}

function getUserDashboardHTML(sites, pin, baseDomain) {
  let mainDomain = baseDomain;
  const parts = baseDomain.split('.');
  if(parts.length > 2) {
      mainDomain = parts.slice(-2).join('.');
  }
  
  let cards = sites.map(s => `
      <div class="card">
          <div class="info">
              <h3>${s.name}</h3>
              <span class="status">Secured Node</span>
          </div>
          <button onclick="window.location.href='https://${s.id}-${pin}.${mainDomain}'">প্রবেশ করুন</button>
      </div>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="bn">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>আমার প্যানেল</title>
      <style>
          body { background: linear-gradient(to bottom, #EAF6FF, #CFE9FF); margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; min-height: 100vh; padding-bottom: 30px; }
          .header { background: #ffffff; padding: 20px; text-align: center; font-size: 18px; font-weight: 700; border-radius: 0 0 24px 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); margin-bottom: 25px; color: #111; }
          .container { padding: 0 20px; max-width: 500px; margin: auto; }
          .card { background: #ffffff; padding: 20px; border-radius: 20px; margin-bottom: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; justify-content: space-between; align-items: center; }
          .card .info h3 { margin: 0 0 4px 0; font-size: 16px; color: #111; }
          .card .info .status { font-size: 12px; color: #28a745; font-weight: 600; background: #e6f4ea; padding: 4px 8px; border-radius: 6px; display: inline-block; }
          button { padding: 12px 20px; background: #007AFF; color: #fff; border: none; border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s; }
          button:active { background: #005bb5; }
          .empty-state { text-align: center; padding: 40px 20px; background: #ffffff; border-radius: 20px; color: #888; }
      </style>
  </head>
  <body>
      <div class="header">সিকিউর অ্যাক্সেস পোর্টাল</div>
      <div class="container">
          ${cards || '<div class="empty-state"><h3>কোনো সাইট অ্যাসাইন করা নেই।</h3><p>অ্যাডমিনের সাথে যোগাযোগ করুন।</p></div>'}
      </div>
  </body>
  </html>
  `;
}
