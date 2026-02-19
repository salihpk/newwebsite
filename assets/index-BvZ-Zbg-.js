import{j as e,a as o,u as k,L as D,c as F,d as I,e as Y,H as B}from"./react-vendor-NXI3TDBC.js";import{C as K,O as V,F as $,S as W,M as J}from"./three-vendor-okpeD690.js";import{m as h,A as T}from"./framer-vendor-ChyTco4z.js";import"./vendor-BISychH0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const S=""+new URL("profile-B0fQePuG.png",import.meta.url).href,X={initial:{opacity:0,y:20,scale:.98,filter:"blur(10px)"},animate:{opacity:1,y:0,scale:1,filter:"blur(0px)",transition:{duration:.6,ease:[.22,1,.36,1],staggerChildren:.1}},exit:{opacity:0,y:-20,scale:.98,filter:"blur(10px)",transition:{duration:.4,ease:[.22,1,.36,1]}}},A=({children:i,className:a})=>e.jsx(h.div,{className:a,initial:"initial",animate:"animate",exit:"exit",variants:X,children:i}),q=({scale:i=2.4,color:a="#00ff41"})=>e.jsx($,{speed:2,rotationIntensity:1,floatIntensity:2,children:e.jsx(W,{args:[1,100,200],scale:i,children:e.jsx(J,{color:a,attach:"material",distort:.6,speed:6,roughness:0,emissive:a,emissiveIntensity:1.2,wireframe:!0})})}),Q=()=>{const[i,a]=o.useState(!1),[t,c]=o.useState(""),[r,s]=o.useState(0),[u,p]=o.useState(2.4),[l,f]=o.useState("#00ff41"),[d,x]=o.useState(!1);o.useEffect(()=>{const m=()=>{const b=document.documentElement.getAttribute("data-theme");f(b==="light"?"#2563eb":"#00ff41")};m();const v=new MutationObserver(m);return v.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>v.disconnect()},[]),o.useEffect(()=>{const m=()=>{window.innerWidth<768?p(2.8):window.innerWidth<1024?p(3.2):p(2.4)};return m(),window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]);const n=["BOOTING_EXPLOIT_KIT_v4.2...","BYPASSING_BROWSER_SANDBOX...","ACQUIRING_SYSTEM_PRIVILEGES...","ACCESSING_LOCAL_FILESYSTEM...","UPLOADING_PERSONAL_DATA...","INJECTING_RANSOMWARE_PAYLOAD...","ENCRYPTING_USER_ROOT...","SYSTEM_COMPROMISED."],N=()=>{a(!0);let m=0;const v=setInterval(()=>{m<n.length?(c(n[m]),s(b=>Math.min(b+15,100)),m++):(clearInterval(v),c("⚠️ CRITICAL ERROR: SYSTEM FAILURE IMMINENT ⚠️"),x(!0),setTimeout(()=>{x(!1),new Audio("https://www.myinstants.com/media/sounds/fahhh_KcgAXfs.mp3").play().catch(g=>console.error("Audio playback failed:",g)),c("JUST KIDDING! YOU'RE SAFE... FOR NOW. ;)"),setTimeout(()=>{a(!1),s(0)},4e3)},2500))},800)};return e.jsxs(A,{className:`page-container home-page ${d?"shake-active":""}`,children:[e.jsx(T,{children:i&&e.jsx(h.div,{className:"scary-overlay mono",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:e.jsxs("div",{className:"scary-content",children:[e.jsx("div",{className:"alert-text",children:"!!! WARNING: UNAUTHORIZED_ACCESS !!!"}),e.jsxs("div",{className:"scan-log",children:[">"," ",t]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${r}%`}})}),e.jsx("div",{className:"glitch-overlay"})]})})}),e.jsxs("div",{className:"hero-section",children:[e.jsxs("div",{className:"hero-content",children:[e.jsx(h.h2,{className:"mono terminal-text",initial:{x:-50},animate:{x:0},transition:{delay:.2},children:"[ DISCOVERING_VULNERABILITIES ]"}),e.jsx(h.h1,{className:"glitch-text","data-value":"MUHAMMED SALIH",initial:{scale:.9},animate:{scale:1},onMouseEnter:m=>{const v="SPIDO",b="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let g=0;clearInterval(m.target.interval),m.target.interval=setInterval(()=>{m.target.innerText=v.split("").map((E,j)=>j<g?v[j]:b[Math.floor(Math.random()*26)]).join(""),g>=v.length&&clearInterval(m.target.interval),g+=1/3},30)},onMouseLeave:m=>{const v="MUHAMMED SALIH",b="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let g=0;clearInterval(m.target.interval),m.target.interval=setInterval(()=>{m.target.innerText=v.split("").map((E,j)=>j<g?v[j]:b[Math.floor(Math.random()*26)]).join(""),g>=v.length&&clearInterval(m.target.interval),g+=1/3},30)},children:"MUHAMMED SALIH"}),e.jsx("p",{className:"hero-subtext",children:"Cyber security Aspirant | AI Enthusiast | Creative Developer"}),e.jsxs("div",{className:"hero-cta",children:[e.jsxs("button",{className:"cyber-btn",onClick:N,children:[e.jsx("span",{className:"btn-glitch"}),"INITIAL_SCAN()"]}),e.jsx("a",{href:"https://res.cloudinary.com/dbzplt80r/image/upload/1770145046975_1_vjiwmh.jpg",target:"_blank",rel:"noopener noreferrer",className:"cyber-btn secondary",style:{textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"},children:"DOWNLOAD_CV"})]})]}),e.jsxs("div",{className:"hero-visual",children:[e.jsxs(K,{camera:{position:[0,0,5],fov:75},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none"},children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10],color:l}),e.jsx(o.Suspense,{fallback:null,children:e.jsx(q,{scale:u,color:l})}),e.jsx(V,{enableZoom:!1,enablePan:!1,enableRotate:!1})]}),e.jsxs("div",{className:"profile-container",children:[e.jsx("img",{src:S,alt:"Muhammad Salih P.K.",className:"profile-img"}),e.jsx("div",{className:"profile-shader"})]})]})]}),e.jsxs("section",{className:"info-grid",children:[e.jsxs(h.div,{className:"info-card",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.3,duration:.6},whileHover:{scale:1.03,y:-5},children:[e.jsx("h3",{className:"mono",children:"01_VULN_RESEARCH"}),e.jsx("p",{children:"Analyzing and identifying security flaws through ethical hacking and deep system inspection."})]}),e.jsxs(h.div,{className:"info-card",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.5,duration:.6},whileHover:{scale:1.03,y:-5},children:[e.jsx("h3",{className:"mono",children:"02_AI_LOGIC"}),e.jsx("p",{children:"Integrating artificial intelligence into cybersecurity workflows for predictive analysis."})]}),e.jsxs(h.div,{className:"info-card",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.7,duration:.6},whileHover:{scale:1.03,y:-5},children:[e.jsx("h3",{className:"mono",children:"03_SECURE_BUILD"}),e.jsx("p",{children:"Architecting hardened, scalable web applications with a focus on security by design."})]})]})]})},Z=[{id:1,title:"PORTFOLIO_v1.0",category:"WEB / SECURITY",description:"A showcase of next-gen web development, this portfolio was entirely coded using advanced Agentic AI systems. It features real-time Steam API data, a neural-link visual aesthetics, and a responsive cyber-dashboard. This project stands as a testament to the symbiotic future of human creativity and artificial intelligence.",tech:["React.js","Three.js","Framer Motion"],link:"/"},{id:2,title:"PROJECT_BETA: COMING_SOON",category:"REDACTED",description:"Archive record [RESTRICTED]. New neural-interface project under active development. Connection expected soon.",tech:["???","???","???"],link:"#"},{id:3,title:"PROJECT_GAMMA: COMING_SOON",category:"RESEARCH",description:"Core module under construction. Initializing data-sets for next-gen cybersecurity framework.",tech:["???","???","???"],link:"#"}],ee=({project:i,index:a})=>e.jsxs(h.div,{className:"project-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:a*.1},whileHover:{scale:1.02},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{className:"mono category",children:i.category}),e.jsxs("span",{className:"mono id",children:["ID:00",i.id]})]}),e.jsx("h3",{className:"mono",children:i.title}),e.jsx("p",{children:i.description}),e.jsx("div",{className:"tech-stack",children:i.tech.map(t=>e.jsx("span",{className:"tech-tag mono",children:t},t))}),e.jsxs("a",{href:i.link,className:"cyber-btn sm mono",children:["ACCESS_DATA =",">"]}),e.jsx("div",{className:"card-glitch"})]}),te=()=>e.jsxs(A,{className:"page-container projects-page",children:[e.jsxs("header",{className:"page-header",children:[e.jsx("h1",{className:"mono border-title",children:"REPOSITORIES_"}),e.jsx("p",{className:"mono opacity-50",children:"ARCHIVE DATA RETRIEVED: 2026-02-06"})]}),e.jsx("div",{className:"projects-grid",children:Z.map((i,a)=>e.jsx(ee,{project:i,index:a},i.id))}),e.jsx("style",{jsx:!0,children:`
        .projects-page {
          padding-bottom: 100px;
        }

        .page-header {
          margin-bottom: 60px;
        }

        .border-title {
          font-size: 2.5rem;
          margin-bottom: 10px;
          border-left: 4px solid var(--primary-color);
          padding-left: 20px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .project-card {
          border: 1px solid var(--border-color);
          background: var(--surface-color);
          padding: 30px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 0.75rem;
        }

        .category { color: var(--primary-color); }
        
        .project-card h3 {
          margin-bottom: 15px;
          font-size: 1.4rem;
        }

        .project-card p {
          color: var(--text-dim);
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }

        .tech-tag {
          font-size: 0.65rem;
          background: rgba(0, 255, 65, 0.1);
          color: var(--primary-color);
          padding: 4px 8px;
          border: 0.5px solid var(--primary-color);
        }



        .card-glitch {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 49%, var(--primary-color) 50%, transparent 51%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .card-glitch {
          opacity: 0.05;
          animation: glitch-sweep 2s infinite;
        }

        @keyframes glitch-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: 1fr; }
          .border-title { 
            font-size: 1.8rem; 
            padding-left: 15px;
          }
          .project-card {
            padding: 20px;
          }
          .project-card h3 {
            font-size: 1.1rem;
            margin-bottom: 10px;
          }
          .project-card p {
            font-size: 0.85rem;
            margin-bottom: 15px;
          }
          .tech-tag {
            font-size: 0.6rem;
            padding: 3px 6px;
          }
          .view-project {
            font-size: 0.8rem;
          }
        }
      `})]}),ae=()=>{const i="76561199815687878",[t,c]=o.useState(null),[r,s]=o.useState([]),[u,p]=o.useState(!0),[l,f]=o.useState(null);o.useEffect(()=>{const g=async()=>{try{const j=localStorage.getItem("steam_data_cache_v2");if(j){const y=JSON.parse(j);if(Date.now()-y.timestamp<3e5){c(y.profile),s(y.games),p(!1);return}}const z=["https://api.codetabs.com/v1/proxy?quest=","https://corsproxy.io/?","https://api.allorigins.win/raw?url="];let O=null,w=null,R=!1;for(const y of z)try{const M=`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=undefined&steamids=${i}`,U=`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=undefined&steamid=${i}&format=json`,[P,_]=await Promise.all([fetch(y+encodeURIComponent(M)),fetch(y+encodeURIComponent(U)).catch(()=>null)]);if(P.ok){if(O=await P.json(),_&&_.ok)try{w=await _.json()}catch(H){console.warn("Failed to parse games JSON",H),w={response:{games:[]}}}else w={response:{games:[]}};R=!0;break}}catch{console.warn(`Proxy ${y} failed, trying next...`);continue}if(!R)throw new Error("Unable to establish connection to Steam API Services");const C=O?.response?.players?.[0],G=w?.response?.games||[];if(!C)throw new Error("Profile not found in Steam response");const L=G.map(y=>({name:y.name,playTime:`${(y.playtime_2weeks/60).toFixed(1)} hrs`,totalPlayTime:`${(y.playtime_forever/60).toFixed(1)} hrs`,icon:`https://media.steampowered.com/steamcommunity/public/images/apps/${y.appid}/${y.img_icon_url}.jpg`,header:`https://cdn.cloudflare.steamstatic.com/steam/apps/${y.appid}/header.jpg`,appid:y.appid}));c(C),s(L),p(!1),f(null),localStorage.setItem("steam_data_cache_v2",JSON.stringify({profile:C,games:L,timestamp:Date.now()}))}catch(j){console.error("Steam API Error:",j),f("CONNECTION_FAILED"),p(!1)}};g();const E=setInterval(g,6e4);return()=>clearInterval(E)},[]);const x=[{label:"COMMUNITY_STATUS",value:(u&&!t?"CONNECTING...":l?"ERR_NET_FAIL":t&&["Offline","Online","Busy","Away","Snooze","Looking to Trade","Looking to Play"][t.personastate]||"OFFLINE").toUpperCase()},{label:"NOW_PLAYING",value:t?.gameextrainfo?t.gameextrainfo.toUpperCase():u?"SCANNING...":"IDLE"},{label:"API_LATENCY",value:l?"TIMEOUT":"32ms"}],n={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1,delayChildren:.2}}},N={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{type:"spring",stiffness:100,damping:12}}},m={hidden:{opacity:0,scale:.9},visible:{opacity:1,scale:1,transition:{duration:.6,ease:"easeOut"}}},v={hidden:{opacity:0,x:-50},visible:{opacity:1,x:0,transition:{type:"spring",stiffness:80,damping:15}}},b={hidden:{opacity:0,scale:.8},visible:g=>({opacity:1,scale:1,transition:{delay:g*.1,type:"spring",stiffness:100}})};return e.jsxs(A,{className:"page-container gaming-page",children:[e.jsx(h.div,{className:"gaming-hero",variants:m,initial:"hidden",animate:"visible",children:e.jsx("h1",{className:"mono glitch-text","data-text":"GAMING_HUB.SYS",children:"GAMING_HUB.SYS"})}),e.jsxs(h.div,{className:"gaming-content",variants:n,initial:"hidden",animate:"visible",children:[e.jsxs(h.section,{className:"steam-profile-card",variants:v,children:[e.jsxs("div",{className:"card-header mono",children:[e.jsxs("span",{children:["CONNECTION: ",l?"FAILED":"SECURE"]}),e.jsx("div",{className:`status-dot ${t?.personastate>0?"online":"offline"}`})]}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"avatar-wrapper",children:[e.jsx("img",{src:t?.avatarfull||S,alt:"Steam Avatar",className:"steam-avatar",onError:g=>g.target.src=S}),e.jsx("div",{className:"avatar-glitch"})]}),e.jsxs("div",{className:"profile-info",children:[e.jsx("h2",{className:"mono",children:t?.personaname||"SPIDO"}),e.jsxs("p",{className:"mono text-xs opacity-50",children:["STEAM_64_ID: ",i]}),e.jsxs("div",{className:"profile-actions",children:[e.jsx("a",{href:t?.profileurl,target:"_blank",rel:"noopener noreferrer",className:"cyber-btn sm mono",children:"OPEN_STEAM_DB"}),e.jsx("a",{href:"https://discord.gg/zcXGkH98Qk",target:"_blank",rel:"noopener noreferrer",className:"cyber-btn sm mono discord-btn",children:"JOIN_DISCORD"})]})]})]})]}),e.jsx(h.section,{className:"stats-strip",variants:N,children:x.map((g,E)=>e.jsxs(h.div,{className:"stat-node",custom:E,variants:b,whileHover:{scale:1.05,borderColor:"var(--primary-color)",transition:{duration:.2}},children:[e.jsx("span",{className:"node-label mono",children:g.label}),e.jsxs("div",{className:"value-container",children:[g.label==="NOW_PLAYING"&&t?.gameid&&e.jsx(h.img,{src:`https://cdn.cloudflare.steamstatic.com/steam/apps/${t.gameid}/capsule_231x87.jpg`,alt:"",className:"now-playing-icon",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.3}}),e.jsx("span",{className:"node-value mono terminal-text",children:g.value}),g.label==="NOW_PLAYING"&&t?.gameid&&e.jsxs("span",{className:"mono text-xs opacity-75",style:{marginTop:"5px"},children:["TOTAL_TIME: ",r.find(j=>j.appid==t.gameid)?.totalPlayTime||"UNKNOWN"]})]})]},E))}),e.jsxs(h.section,{className:"games-grid",variants:N,children:[e.jsx("h3",{className:"mono border-title",children:"RECENT_BOOT_LOGS"}),e.jsx("div",{className:"games-list",children:r.length>0?r.map((g,E)=>e.jsxs(h.div,{className:"game-item",initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{delay:E*.1,type:"spring",stiffness:100,damping:15},whileHover:{scale:1.02,x:10,transition:{duration:.2}},whileTap:{scale:.98},children:[e.jsx("div",{className:"game-img",style:{backgroundImage:`url(${g.header})`},children:e.jsx("img",{src:g.icon,alt:"",className:"game-avatar-icon"})}),e.jsxs("div",{className:"game-details",children:[e.jsx("div",{className:"game-name mono",children:g.name}),e.jsxs("div",{className:"play-time mono text-xs",children:["RUNTIME: ",g.playTime]})]}),e.jsx("div",{className:"game-status mono",children:"STABLE"})]},E)):e.jsx(h.div,{className:"mono text-xs opacity-50",initial:{opacity:0},animate:{opacity:.5},transition:{duration:.5},children:"NO_RECENT_SESSIONS_FOUND"})})]})]}),e.jsx("style",{jsx:!0,children:`
                .gaming-page { padding-bottom: 100px; }
                .gaming-hero { margin-bottom: 60px; text-align: center; }
                .gaming-hero h1 { font-size: 3.5rem; margin-bottom: 10px; }
                
                .gaming-content {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 30px;
                }

                .steam-profile-card {
                    grid-column: span 2;
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    padding: 30px;
                    position: relative;
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.7rem;
                    color: var(--text-dim);
                    margin-bottom: 20px;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 10px;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #ff003c;
                    border-radius: 50%;
                }
                .status-dot.online { background: var(--primary-color); box-shadow: 0 0 10px var(--primary-glow); }
                .status-dot.offline { background: #555; }

                .card-body { display: flex; gap: 30px; align-items: center; }

                .avatar-wrapper {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    flex-shrink: 0;
                }

                .steam-avatar {
                    width: 100%;
                    height: 100%;
                    border: 1px solid var(--primary-color);
                    object-fit: cover;
                }

                .profile-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                    flex-wrap: wrap;
                }

                .stats-strip {
                    grid-column: span 2;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                .stat-node {
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 160px;
                    text-align: center;
                }

                .node-label { font-size: 0.6rem; color: var(--text-dim); margin-bottom: 5px; }
                .value-container { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%; }
                .node-value { font-size: 1.2rem; font-weight: bold; word-break: break-word; line-height: 1.2; }
                .now-playing-icon { width: 100%; max-width: 180px; height: auto; border: 1px solid var(--primary-color); box-shadow: 0 0 10px var(--primary-glow); margin-bottom: 10px; }

                .games-grid { grid-column: span 2; }
                .border-title { border-left: 3px solid var(--primary-color); padding-left: 15px; margin-bottom: 30px; }

                .games-list { display: flex; flex-direction: column; gap: 15px; }

                .game-item {
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    display: grid;
                    grid-template-columns: 120px 1fr 100px;
                    align-items: center;
                    padding-right: 20px;
                    overflow: hidden;
                    height: 80px;
                }

                .game-img {
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    border-right: 1px solid var(--border-color);
                    position: relative;
                }

                .game-avatar-icon {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    width: 24px;
                    height: 24px;
                    border: 1px solid var(--primary-color);
                    background: var(--bg-color);
                }

                .game-details { padding: 0 20px; overflow: hidden; }
                .game-name { font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .play-time { font-size: 0.75rem; color: var(--text-dim); }
                .game-status { font-size: 0.7rem; color: var(--primary-color); text-align: right; }

                @media (max-width: 1024px) {
                    .gaming-hero h1 { font-size: 2.5rem; }
                    .gaming-content { grid-template-columns: 1fr; }
                    .steam-profile-card { padding: 25px; }
                    .stats-strip { gap: 15px; }
                }

                @media (max-width: 768px) {
                    .gaming-hero h1 { font-size: 2rem; }
                    .gaming-hero .terminal-text { font-size: 0.75rem; }
                    
                    .card-body { flex-direction: column; text-align: center; gap: 20px; }
                    .avatar-wrapper { margin: 0 auto; }
                    .profile-info { width: 100%; }
                    .profile-info h2 { font-size: 1.4rem; margin-bottom: 5px; }
                    .profile-actions { justify-content: center; }
                    
                    .stats-strip { grid-template-columns: 1fr; gap: 15px; }
                    .stat-node { 
                        padding: 15px; 
                        min-height: auto; 
                        flex-direction: row; 
                        justify-content: space-between; 
                        align-items: center; 
                        text-align: left; 
                    }
                    .stat-node:nth-child(2) { flex-direction: column; text-align: center; }
                    
                    /* Reset mobile alignment for stat-node children */
                    .value-container { width: auto; align-items: flex-end; }
                    .node-value { font-size: 1rem; }
                    .now-playing-icon { max-width: 100px; margin: 0; }

                    .game-item { 
                        grid-template-columns: 80px 1fr 80px; 
                        padding-right: 10px;
                        gap: 10px;
                        height: 70px;
                    }
                    .game-details { padding: 0 10px; }
                    .game-name { font-size: 0.95rem; }
                    .play-time { font-size: 0.7rem; }
                    .game-status { font-size: 0.65rem; }
                }

                @media (max-width: 480px) {
                    .gaming-page { padding-bottom: 80px; }
                    .gaming-hero { margin-bottom: 30px; }
                    .gaming-hero h1 { font-size: 1.5rem; }
                    
                    .steam-profile-card { padding: 20px; }
                    .card-body { gap: 15px; }
                    .avatar-wrapper { width: 80px; height: 80px; }
                    
                    .stats-strip { gap: 10px; }
                    .stat-node { padding: 12px; }
                    .node-value { font-size: 0.9rem; }
                    
                    .game-item { 
                        grid-template-columns: 60px 1fr; 
                        padding-right: 15px;
                        height: 60px;
                        gap: 10px;
                    }
                    .game-img { width: 60px; }
                    .game-status { display: none; }
                    .game-avatar-icon { width: 18px; height: 18px; right: 2px; bottom: 2px; }
                    
                    .game-details { padding-left: 5px; padding-right: 5px; }
                    .game-name { font-size: 0.85rem; margin-bottom: 2px; }
                    .play-time { font-size: 0.65rem; }
                    
                    .cyber-btn { width: 100%; text-align: center; justify-content: center; padding: 10px; font-size: 0.7rem; }
                    .profile-actions { gap: 8px; width: 100%; flex-direction: column; }
                }
            `})]})},ie=()=>{const[i,a]=o.useState({subject:"",message:"",email:""}),[t,c]=o.useState(!1),[r,s]=o.useState(["> SYSTEM_INIT: COMPLETE","> CONNECTING_TO_HOST...","> CONNECTION_ESTABLISHED"]);o.useEffect(()=>{const p=["PACKET_VERIFIED: OK","PING: 24ms","UPDATING_CACHE...","VIRUS_DB: UPDATED","FIREWALL_STATUS: NOMINAL","ENCRYPTING_TRAFFIC...","HANDSHAKE_ACK: RECEIVED","SCANNING_PORTS: 443 OPEN","LATENCY_CHECK: PASS","SYNCING_NODES..."],l=setInterval(()=>{s(f=>{const x=`> [${new Date().toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}] ${p[Math.floor(Math.random()*p.length)]}`,n=[...f,x];return n.length>5?n.slice(1):n})},1500);return()=>clearInterval(l)},[]);const u=async p=>{p.preventDefault();const l="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfPSPD3Rw36VP0tEDpGm4x-STrA85Gui3YmNaONa-oHMm-wRg/formResponse",f=new FormData;f.append("entry.1070221655",i.email),f.append("entry.536187874",i.subject),f.append("entry.894360633",i.message);try{await fetch(l,{method:"POST",mode:"no-cors",body:f}),c(!0),a({email:"",subject:"",message:""}),setTimeout(()=>c(!1),5e3)}catch(d){console.error("Transmission Error:",d),alert("DATA_TRANSMISSION_FAILED_RETRY_LATER")}};return e.jsxs(A,{className:"page-container contact-page",children:[e.jsxs("div",{className:"contact-grid",children:[e.jsxs("div",{className:"contact-info",children:[e.jsx("h1",{className:"mono",children:"CONNECT_"}),e.jsx("p",{className:"mono terminal-text",children:"ESTABLISHING PEER-TO-PEER ENCRYPTION..."}),e.jsxs("div",{className:"social-links mono",children:[e.jsxs("div",{className:"social-item",children:[e.jsx("span",{className:"label",children:"INSTAGRAM:"}),e.jsx("a",{href:"https://www.instagram.com/_sali___h?igsh=eXZhcm54MHQxYXhw",target:"_blank",rel:"noopener noreferrer",children:"@_sali___h"})]}),e.jsxs("div",{className:"social-item",children:[e.jsx("span",{className:"label",children:"LINKEDIN:"}),e.jsx("a",{href:"https://www.linkedin.com/in/muhammed-salih-p-k",target:"_blank",rel:"noopener noreferrer",children:"in/muhammed-salih-p-k"})]}),e.jsxs("div",{className:"social-item",children:[e.jsx("span",{className:"label",children:"LOCATION:"}),e.jsx("a",{href:"https://maps.app.goo.gl/gN8rQi3eZUN84p7d8",target:"_blank",rel:"noopener noreferrer",children:`11°18'02.0"N 75°59'26.2"E`})]})]}),e.jsxs("div",{className:"system-status mono",children:[e.jsx("h3",{children:"SYSTEM_LOG:"}),e.jsx("div",{className:"log-scroll",children:r.map((p,l)=>e.jsx("div",{className:"log-line",children:p},l))})]})]}),e.jsx("div",{className:"contact-form-container",children:e.jsxs("form",{className:"contact-form",onSubmit:u,children:[e.jsx("div",{className:"form-header mono",children:"SEND_DATA_PACKET"}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"mono",children:"IDENTIFIER_EMAIL:"}),e.jsx("input",{type:"email",required:!0,className:"mono",value:i.email,onChange:p=>a({...i,email:p.target.value})})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"mono",children:"DATA_SUBJECT:"}),e.jsx("input",{type:"text",required:!0,className:"mono",value:i.subject,onChange:p=>a({...i,subject:p.target.value})})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"mono",children:"PAYLOAD_MESSAGE:"}),e.jsx("textarea",{required:!0,className:"mono",rows:"5",value:i.message,onChange:p=>a({...i,message:p.target.value})})]}),e.jsx("button",{type:"submit",className:"cyber-btn mono",disabled:t,children:t?"TRANSMISSION_COMPLETE":"TRANSMIT()"}),t&&e.jsxs(h.div,{initial:{opacity:0},animate:{opacity:1},className:"mono text-xs mt-4",style:{color:"var(--primary-color)"},children:[">"," PACKET_RECEIVED: ENCRYPTED_AND_STORED"]})]})})]}),e.jsx("style",{jsx:!0,children:`
        .contact-page {
          padding-bottom: 100px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          margin-top: 50px;
        }

        .contact-info h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }

        .social-links {
          margin: 40px 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .social-item {
          display: flex;
          gap: 10px;
          font-size: 0.9rem;
        }

        .social-item .label { color: var(--primary-color); }
        .social-item a { color: var(--text-color); text-decoration: none; border-bottom: 1px dashed #444; }
        .social-item a:hover { border-bottom-color: var(--primary-color); }

        .system-status {
          margin-top: 60px;
          padding: 20px;
          border: 1px solid var(--border-color);
          background: var(--surface-color);
        }

        .log-scroll {
          height: 100px;
          overflow-y: auto;
          margin-top: 10px;
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .contact-form-container {
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          padding: 40px;
          position: relative;
        }

        .form-header {
          font-size: 1.2rem;
          margin-bottom: 30px;
          color: var(--primary-color);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 10px;
        }

        .input-group {
          margin-bottom: 25px;
        }

        .input-group label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-dim);
          margin-bottom: 8px;
        }

        .input-group input, .input-group textarea {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border-color);
          padding: 12px;
          color: var(--text-color);
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .input-group input:focus, .input-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.1);
        }

        .cyber-btn {
          width: 100%;
          margin-top: 10px;
        }

        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr; gap: 30px; }
          .contact-info h1 { font-size: 2rem; }
          .contact-info .terminal-text { font-size: 0.75rem; }
          .social-links { margin: 25px 0; gap: 10px; }
          .social-item { font-size: 0.8rem; }
          .contact-form-container { padding: 25px 15px; }
          .form-header { font-size: 1rem; margin-bottom: 20px; }
          .input-group { margin-bottom: 15px; }
          .input-group label { font-size: 0.7rem; }
          .input-group input, .input-group textarea { font-size: 0.9rem; padding: 10px; }
          .contact-page { padding-bottom: 40px; }
        }

        @media (max-width: 480px) {
          .contact-info h1 { font-size: 1.6rem; }
          .social-item { font-size: 0.75rem; }
          .log-scroll { height: 70px; }
        }
      `})]})},se=({toggleMusic:i,isMusicPlaying:a})=>{const t=k(),[c,r]=o.useState(localStorage.getItem("theme")||"dark");o.useEffect(()=>{document.documentElement.setAttribute("data-theme",c),localStorage.setItem("theme",c)},[c]);const s=n=>{n.preventDefault(),r(c==="dark"?"light":"dark")},[u,p]=o.useState(!1),l=()=>p(!u);o.useEffect(()=>{p(!1)},[t.pathname]);const f=[{name:"HOME",path:"/"},{name:"PROJECTS",path:"/projects"},{name:"GAMING",path:"/gaming"},{name:"CONTACT",path:"/contact"}],d=o.useRef(null),x=o.useRef(!1);return e.jsxs("nav",{className:"navbar",children:[e.jsx("div",{className:"nav-logo",children:e.jsxs(h.div,{className:"nav-profile-link",style:{cursor:"pointer"},onClick:n=>{if(n.preventDefault(),x.current){x.current=!1;return}s(n)},onContextMenu:n=>{n.preventDefault(),i()},onPointerDown:()=>{x.current=!1,d.current=setTimeout(()=>{i(),x.current=!0},600)},onPointerUp:()=>{clearTimeout(d.current)},onPointerLeave:()=>{clearTimeout(d.current)},whileTap:{scale:.9},children:[e.jsx(h.img,{src:S,alt:"System Controls",className:`nav-avatar ${a?"playing":""}`,animate:a?{rotate:360}:{rotate:0},transition:a?{duration:4,repeat:1/0,ease:"linear"}:{duration:.5}}),e.jsx("span",{className:`mono status-indicator ${a?"active":""}`}),e.jsxs("div",{className:"theme-tooltip mono",children:[e.jsx("span",{className:"desktop-info",children:a?"L: THEME | R: PAUSE":"L: THEME | R: PLAY"}),e.jsx("span",{className:"mobile-info",children:a?"TAP: THEME | HOLD: PAUSE":"TAP: THEME | HOLD: PLAY"})]})]})}),e.jsx("div",{className:"mobile-toggle",onClick:l,children:e.jsxs("div",{className:`hamburger ${u?"open":""}`,children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsx("div",{className:"nav-links desktop-only",children:f.map(n=>e.jsxs(D,{to:n.path,className:`nav-item mono ${t.pathname===n.path?"active":""}`,children:[n.name,t.pathname===n.path&&e.jsx(h.div,{layoutId:"nav-underline",className:"nav-underline",initial:!1})]},n.path))}),e.jsx(T,{children:u&&e.jsxs(h.div,{className:"mobile-menu-overlay",initial:{opacity:0,x:"100%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"100%"},transition:{type:"spring",damping:25,stiffness:200},onClick:n=>{n.target.classList.contains("mobile-menu-overlay")&&p(!1)},children:[e.jsx("div",{className:"mobile-menu-bg-graphic",children:e.jsx("img",{src:S,alt:""})}),e.jsxs("div",{className:"mobile-menu-content",children:[e.jsxs(h.div,{className:"mobile-menu-header mono",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.1},children:[e.jsx("div",{className:"menu-title",children:"NAVIGATION_MENU"}),e.jsx("div",{className:"menu-subtitle",children:"SELECT_DESTINATION"})]}),f.map((n,N)=>e.jsx(h.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:N*.1+.2},children:e.jsxs(D,{to:n.path,className:`mobile-nav-item mono ${t.pathname===n.path?"active":""}`,onClick:()=>p(!1),children:[e.jsxs("span",{className:"item-index accent",children:["0",N+1]}),e.jsx("span",{className:"item-name",children:n.name}),e.jsx("div",{className:"hover-indicator"}),t.pathname===n.path&&e.jsx(h.div,{className:"active-badge mono",layoutId:"active-badge",children:"ACTIVE"})]})},n.path)),e.jsxs(h.div,{className:"mobile-menu-footer mono",initial:{opacity:0},animate:{opacity:1},transition:{delay:.6},children:[e.jsx("div",{className:"footer-line"}),e.jsx("p",{children:"CORE_INTERFACE_v4.2"}),e.jsx("p",{className:"opacity-50",children:"STATUS: ENCRYPTED"})]})]})]})})]})},ne=()=>{const i=o.useRef(null);return o.useEffect(()=>{const a=i.current,t=a.getContext("2d");let c;const r=()=>{a.width=window.innerWidth,a.height=window.innerHeight};window.addEventListener("resize",r),r();const s=[],u=40;class p{constructor(){this.reset()}reset(){this.x=Math.random()*a.width,this.y=Math.random()*a.height,this.vx=(Math.random()-.5)*.5,this.vy=(Math.random()-.5)*.5,this.size=Math.random()*2,this.alpha=Math.random()*.5+.2}update(){this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>a.width||this.y<0||this.y>a.height)&&this.reset()}draw(){t.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--primary-color"),t.globalAlpha=this.alpha,t.beginPath(),t.arc(this.x,this.y,this.size,0,Math.PI*2),t.fill()}}for(let d=0;d<u;d++)s.push(new p);const l=()=>{const d=getComputedStyle(document.documentElement).getPropertyValue("--primary-color");t.strokeStyle=d,t.lineWidth=.5;const x=100,N=performance.now()*.5/50%x;t.globalAlpha=.05;for(let m=N;m<a.width;m+=x)t.beginPath(),t.moveTo(m,0),t.lineTo(m,a.height),t.stroke();for(let m=N;m<a.height;m+=x)t.beginPath(),t.moveTo(0,m),t.lineTo(a.width,m),t.stroke()},f=()=>{t.clearRect(0,0,a.width,a.height),l(),s.forEach(d=>{d.update(),d.draw()}),t.globalAlpha=.03,t.beginPath();for(let d=0;d<s.length;d++)for(let x=d+1;x<s.length;x++)Math.hypot(s[d].x-s[x].x,s[d].y-s[x].y)<200&&(t.moveTo(s[d].x,s[d].y),t.lineTo(s[x].x,s[x].y));t.stroke(),c=requestAnimationFrame(f)};return f(),()=>{window.removeEventListener("resize",r),cancelAnimationFrame(c)}},[]),e.jsx("canvas",{ref:i,style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,pointerEvents:"none",opacity:.6}})},re=({isPlaying:i})=>e.jsx(e.Fragment,{children:i&&e.jsx("div",{style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:e.jsx("iframe",{width:"100%",height:"100",src:"https://www.youtube.com/embed/videoseries?list=PLim7UVED5wuvc5CKu1KwrFfhunbpYjWM3&autoplay=1&loop=1",title:"Music Engine",allow:"autoplay; encrypted-media",style:{border:"none"}})})}),oe=({isActive:i,onClose:a})=>{const t=o.useRef(null);return o.useEffect(()=>{if(!i)return;const c=t.current,r=c.getContext("2d");c.width=window.innerWidth,c.height=window.innerHeight;const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`",u=16,p=c.width/u,l=Array(Math.floor(p)).fill(1);let f;const d=()=>{r.fillStyle="rgba(0, 0, 0, 0.05)",r.fillRect(0,0,c.width,c.height),r.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--primary-color")||"#00ff41",r.font=`${u}px monospace`;for(let n=0;n<l.length;n++){const N=s[Math.floor(Math.random()*s.length)];r.fillText(N,n*u,l[n]*u),l[n]*u>c.height&&Math.random()>.975&&(l[n]=0),l[n]++}f=requestAnimationFrame(d)};d();const x=()=>{c.width=window.innerWidth,c.height=window.innerHeight};return window.addEventListener("resize",x),()=>{cancelAnimationFrame(f),window.removeEventListener("resize",x)}},[i]),i?e.jsx(T,{children:e.jsxs(h.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:9999,cursor:"pointer"},onClick:a,children:[e.jsx("canvas",{ref:t,style:{display:"block",background:"#000"}}),e.jsxs(h.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.5},style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",textAlign:"center",color:"var(--primary-color)",fontFamily:"monospace",fontSize:"2rem",fontWeight:"bold",textShadow:"0 0 20px var(--primary-glow)",pointerEvents:"none",zIndex:1e4},children:[e.jsx("div",{style:{marginBottom:"20px"},children:"SYSTEM_BREACH_DETECTED"}),e.jsx("div",{style:{fontSize:"1rem",opacity:.7},children:"CLICK_ANYWHERE_TO_EXIT"})]})]})}):null};function le(){const[i,a]=o.useState("FETCHING..."),[t,c]=o.useState(!1),[r,s]=o.useState(!1),u=k(),p=()=>c(!t);return o.useEffect(()=>{fetch("https://api.ipify.org?format=json").then(l=>l.json()).then(l=>a(l.ip)).catch(()=>a("127.0.0.1"))},[]),o.useEffect(()=>{let l="";const f="matrix",d=x=>{l+=x.key.toLowerCase(),l.length>f.length&&(l=l.slice(-f.length)),l===f&&(s(!0),l="")};return window.addEventListener("keypress",d),()=>window.removeEventListener("keypress",d)},[]),e.jsxs("div",{className:"app-container",children:[e.jsx(ne,{}),e.jsx("div",{className:"crt-overlay"}),e.jsx("div",{className:"scanline"}),e.jsxs(h.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:1},children:[e.jsx(se,{toggleMusic:p,isMusicPlaying:t}),e.jsx("main",{children:e.jsx(T,{mode:"wait",children:e.jsxs(F,{location:u,children:[e.jsx(I,{path:"/",element:e.jsx(Q,{})}),e.jsx(I,{path:"/projects",element:e.jsx(te,{})}),e.jsx(I,{path:"/gaming",element:e.jsx(ae,{})}),e.jsx(I,{path:"/contact",element:e.jsx(ie,{})})]},u.pathname)})}),e.jsx("footer",{className:"footer",children:e.jsxs("div",{className:"mono text-xs opacity-50 footer-stats",children:[e.jsx("span",{children:"SYSTEM STATS: STABLE"}),e.jsx("span",{className:"separator",children:"|"}),e.jsx("span",{children:"NODE_01: ONLINE"}),e.jsx("span",{className:"separator",children:"|"}),e.jsx("span",{children:"LOC: KOZHIKODE, KERALA"}),e.jsx("span",{className:"separator",children:"|"}),e.jsxs("span",{children:["IP: ",i]})]})}),e.jsx(re,{isPlaying:t})]},"content"),e.jsx(oe,{isActive:r,onClose:()=>s(!1)})]})}Y.createRoot(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(B,{children:e.jsx(le,{})})}));
