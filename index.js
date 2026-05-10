export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetHost = "ag.tenx365x.live"; // আপনার মূল টার্গেট সাইট

    const cookieHeader = request.headers.get("Cookie") || "";
    const isUnlocked = cookieHeader.includes("proxy_unlocked=true");

    if (isUnlocked) {
      // ==========================================
      // রিভার্স প্রক্সি লজিক (আসল সাইট লোড হবে)
      // ==========================================
      const targetUrl = new URL(request.url);
      targetUrl.hostname = targetHost;
      targetUrl.protocol = "https:"; 

      const proxyHeaders = new Headers(request.headers);
      proxyHeaders.set("Host", targetHost);
      proxyHeaders.set("Origin", `https://${targetHost}`);
      proxyHeaders.set("Referer", `https://${targetHost}`);

      const proxyRequest = new Request(targetUrl.toString(), {
        method: request.method,
        headers: proxyHeaders,
        body: request.body,
        redirect: "manual" 
      });

      const response = await fetch(proxyRequest);
      const newHeaders = new Headers(response.headers);

      const location = newHeaders.get("Location");
      if (location) {
        newHeaders.set("Location", location.replace(new RegExp(`https://${targetHost}`, 'g'), url.origin));
      }

      const setCookies = response.headers.getSetCookie(); 
      newHeaders.delete("Set-Cookie");
      
      for (const cookie of setCookies) {
        let modifiedCookie = cookie.replace(/Domain=[^;]+;?/gi, "");
        newHeaders.append("Set-Cookie", modifiedCookie);
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });

    } else {
      // ==========================================
      // ডেমো সাইট লজিক (প্রাইভেসি প্রোটেকশন পেজ)
      // ==========================================
      return new Response(getPremiumUI(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }
  }
};

function getPremiumUI() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>System Modules</title>
      <style>
          :root {
              --bg-dark: #0a0a0a;
              --box-bg: #141414;
              --border-color: #2a2a2a;
              --text-primary: #e0e0e0;
              --text-secondary: #666;
              --accent-color: #333;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
          body { 
              background-color: var(--bg-dark); 
              color: var(--text-primary); 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              padding: 20px;
              overflow: hidden;
          }
          .header-text { text-align: center; margin-bottom: 50px; }
          .header-text h2 { font-size: 22px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #fff;}
          .header-text p { font-size: 13px; color: var(--text-secondary); letter-spacing: 1px;}
          
          .grid-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              width: 100%;
              max-width: 320px;
          }
          
          .module-box {
              background-color: var(--box-bg);
              border: 1px solid var(--border-color);
              border-radius: 0px; 
              aspect-ratio: 1 / 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease-in-out;
              position: relative;
              overflow: hidden;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
          }
          
          .module-box:active {
              background-color: var(--accent-color);
              transform: scale(0.96);
          }

          .icon-placeholder {
              width: 36px;
              height: 36px;
              background: linear-gradient(135deg, #333, #111);
              margin-bottom: 15px;
              border: 1px solid #444;
          }

          .module-title {
              font-size: 12px;
              font-weight: 500;
              letter-spacing: 1px;
              color: #aaa;
          }

          #loader {
              position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(10,10,10,0.9);
              display: none; align-items: center; justify-content: center;
              z-index: 10; flex-direction: column;
          }
          .spinner {
              width: 30px; height: 30px;
              border: 2px solid #333; border-top-color: #fff;
              border-radius: 50%; animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
      </style>
  </head>
  <body>

      <div class="header-text">
          <h2>Gateway</h2>
          <p>Select environment</p>
      </div>

      <div class="grid-container">
          <div class="module-box fake-node">
              <div class="icon-placeholder"></div>
              <div class="module-title">DATA NODE</div>
          </div>
          <div class="module-box fake-node">
              <div class="icon-placeholder"></div>
              <div class="module-title">SYNC OPS</div>
          </div>
          <div class="module-box fake-node">
              <div class="icon-placeholder"></div>
              <div class="module-title">ARCHIVE</div>
          </div>
          <div class="module-box" id="secret-trigger">
              <div class="icon-placeholder"></div>
              <div class="module-title">TERMINAL</div>
          </div>
      </div>

      <div id="loader">
          <div class="spinner"></div>
          <p style="margin-top: 15px; font-size: 12px; color: #888; letter-spacing: 2px;">AUTHENTICATING...</p>
      </div>

      <script>
          let tapCount = 0;
          let tapTimer;

          const secretBox = document.getElementById('secret-trigger');
          const fakeBoxes = document.querySelectorAll('.fake-node');
          const loader = document.getElementById('loader');

          // শুধুমাত্র TERMINAL বক্সে ৩ ট্যাপ করলে কাজ করবে
          secretBox.addEventListener('click', function() {
              tapCount++;
              
              clearTimeout(tapTimer);
              tapTimer = setTimeout(() => {
                  tapCount = 0;
              }, 1200); 

              if (tapCount === 3) {
                  clearTimeout(tapTimer);
                  loader.style.display = 'flex';
                  
                  document.cookie = "proxy_unlocked=true; path=/; max-age=86400; secure; samesite=strict";
                  
                  setTimeout(() => {
                      window.location.reload();
                  }, 800);
              }
          });

          // অন্য বক্সগুলোতে ক্লিক করলে ট্যাপ কাউন্ট জিরো হয়ে যাবে (সিকিউরিটির জন্য)
          fakeBoxes.forEach(box => {
              box.addEventListener('click', function() {
                  tapCount = 0; 
              });
          });
      </script>
  </body>
  </html>
  `;
}
