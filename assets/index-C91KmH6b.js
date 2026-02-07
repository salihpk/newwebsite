import{a as c,j as e,u as E,L as b,c as w,d as j,e as T,H as C}from"./react-vendor-NXI3TDBC.js";import{C as _,O,F as R,S as L,M as D}from"./three-vendor-okpeD690.js";import{m as h,A as N}from"./framer-vendor-ChyTco4z.js";import"./vendor-BISychH0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const y=""+new URL("profile-B0fQePuG.png",import.meta.url).href,M=({scale:i=2.4})=>e.jsx(R,{speed:2,rotationIntensity:1,floatIntensity:2,children:e.jsx(L,{args:[1,100,200],scale:i,children:e.jsx(D,{color:"#00ff41",attach:"material",distort:.6,speed:6,roughness:0,emissive:"#00ff41",emissiveIntensity:1.2,wireframe:!0})})}),P=()=>{const[i,s]=c.useState(!1),[a,l]=c.useState(""),[o,r]=c.useState(0),[p,d]=c.useState(2.4);c.useEffect(()=>{const t=()=>{window.innerWidth<768?d(2.8):window.innerWidth<1024?d(3.2):d(2.4)};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const g=["BOOTING_EXPLOIT_KIT_v4.2...","BYPASSING_BROWSER_SANDBOX...","ACQUIRING_SYSTEM_PRIVILEGES...","ACCESSING_LOCAL_FILESYSTEM...","UPLOADING_PERSONAL_DATA...","INJECTING_RANSOMWARE_PAYLOAD...","ENCRYPTING_USER_ROOT...","SYSTEM_COMPROMISED."],x=()=>{s(!0);let t=0;const m=setInterval(()=>{t<g.length?(l(g[t]),r(n=>Math.min(n+15,100)),t++):(clearInterval(m),setTimeout(()=>{new Audio("https://www.myinstants.com/media/sounds/fahhh_KcgAXfs.mp3").play().catch(f=>console.error("Audio playback failed:",f)),l("JUST KIDDING! YOU'RE SAFE... FOR NOW. ;)"),setTimeout(()=>{s(!1),r(0)},3e3)},1e3))},800)};return e.jsxs(h.div,{className:"page-container home-page",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.5},children:[e.jsx(N,{children:i&&e.jsx(h.div,{className:"scary-overlay mono",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:e.jsxs("div",{className:"scary-content",children:[e.jsx("div",{className:"alert-text",children:"!!! WARNING: UNAUTHORIZED_ACCESS !!!"}),e.jsxs("div",{className:"scan-log",children:[">"," ",a]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${o}%`}})}),e.jsx("div",{className:"glitch-overlay"})]})})}),e.jsxs("div",{className:"hero-section",children:[e.jsxs("div",{className:"hero-content",children:[e.jsx(h.h2,{className:"mono terminal-text",initial:{x:-50},animate:{x:0},transition:{delay:.2},children:"[ DISCOVERING_VULNERABILITIES ]"}),e.jsx(h.h1,{className:"glitch-text","data-text":"MUHAMMED SALIH P K",initial:{scale:.9},animate:{scale:1},children:"MUHAMMED SALIH P K"}),e.jsx("p",{className:"hero-subtext",children:"Cyber security Aspirant | AI Enthusiast | Creative Developer"}),e.jsxs("div",{className:"hero-cta",children:[e.jsxs("button",{className:"cyber-btn",onClick:x,children:[e.jsx("span",{className:"btn-glitch"}),"INITIAL_SCAN()"]}),e.jsx("a",{href:"https://drive.google.com/file/d/1WJguwotFTdxvnBEWUnSefAqsh43uCT8E/view?usp=drivesdk",target:"_blank",rel:"noopener noreferrer",className:"cyber-btn secondary",style:{textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"},children:"DOWNLOAD_CV"})]})]}),e.jsxs("div",{className:"hero-visual",children:[e.jsxs(_,{camera:{position:[0,0,5],fov:75},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none"},children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10],color:"#00ff41"}),e.jsx(c.Suspense,{fallback:null,children:e.jsx(M,{scale:p})}),e.jsx(O,{enableZoom:!1,enablePan:!1,enableRotate:!1})]}),e.jsxs("div",{className:"profile-container",children:[e.jsx("img",{src:y,alt:"Muhammad Salih P.K.",className:"profile-img"}),e.jsx("div",{className:"profile-shader"})]})]})]}),e.jsxs("section",{className:"info-grid",children:[e.jsxs("div",{className:"info-card",children:[e.jsx("h3",{className:"mono",children:"01_VULN_RESEARCH"}),e.jsx("p",{children:"Analyzing and identifying security flaws through ethical hacking and deep system inspection."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("h3",{className:"mono",children:"02_AI_LOGIC"}),e.jsx("p",{children:"Integrating artificial intelligence into cybersecurity workflows for predictive analysis."})]}),e.jsxs("div",{className:"info-card",children:[e.jsx("h3",{className:"mono",children:"03_SECURE_BUILD"}),e.jsx("p",{children:"Architecting hardened, scalable web applications with a focus on security by design."})]})]})]})},k=[{id:1,title:"PORTFOLIO_v1.0",category:"WEB / SECURITY",description:"A high-performance cyberpunk portfolio with real-time Steam integration, 3D elements, and neural-link animations.",tech:["React.js","Three.js","Framer Motion"],link:"/"},{id:2,title:"PROJECT_BETA: COMING_SOON",category:"REDACTED",description:"Archive record [RESTRICTED]. New neural-interface project under active development. Connection expected soon.",tech:["???","???","???"],link:"#"},{id:3,title:"PROJECT_GAMMA: COMING_SOON",category:"RESEARCH",description:"Core module under construction. Initializing data-sets for next-gen cybersecurity framework.",tech:["???","???","???"],link:"#"}],z=({project:i,index:s})=>e.jsxs(h.div,{className:"project-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:s*.1},whileHover:{scale:1.02},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{className:"mono category",children:i.category}),e.jsxs("span",{className:"mono id",children:["ID:00",i.id]})]}),e.jsx("h3",{className:"mono",children:i.title}),e.jsx("p",{children:i.description}),e.jsx("div",{className:"tech-stack",children:i.tech.map(a=>e.jsx("span",{className:"tech-tag mono",children:a},a))}),e.jsxs("a",{href:i.link,className:"view-project mono",children:["ACCESS_DATA =",">"]}),e.jsx("div",{className:"card-glitch"})]}),G=()=>e.jsxs(h.div,{className:"page-container projects-page",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e.jsxs("header",{className:"page-header",children:[e.jsx("h1",{className:"mono border-title",children:"REPOSITORIES_"}),e.jsx("p",{className:"mono opacity-50",children:"ARCHIVE DATA RETRIEVED: 2026-02-06"})]}),e.jsx("div",{className:"projects-grid",children:k.map((i,s)=>e.jsx(z,{project:i,index:s},i.id))}),e.jsx("style",{jsx:!0,children:`
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

        .view-project {
          text-decoration: none;
          color: var(--primary-color);
          font-size: 0.9rem;
          font-weight: bold;
          transition: letter-spacing 0.3s ease;
        }

        .view-project:hover {
          letter-spacing: 2px;
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
      `})]}),U=()=>{const i="76561199815687878",s="A85AB7E7DAD7CC9E40A540C56BA2E0F7",[a,l]=c.useState(null),[o,r]=c.useState([]),[p,d]=c.useState(!0);c.useEffect(()=>{const t=async()=>{try{const n="https://api.allorigins.win/raw?url=",f=`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${s}&steamids=${i}`,S=(await(await fetch(n+encodeURIComponent(f))).json()).response.players[0],A=`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${s}&steamid=${i}&format=json`,I=(await(await fetch(n+encodeURIComponent(A))).json()).response.games||[];l(S),r(I.map(v=>({name:v.name,playTime:`${(v.playtime_2weeks/60).toFixed(1)} hrs (Last 2 weeks)`,icon:`https://media.steampowered.com/steamcommunity/public/images/apps/${v.appid}/${v.img_icon_url}.jpg`,header:`https://cdn.cloudflare.steamstatic.com/steam/apps/${v.appid}/header.jpg`,appid:v.appid}))),d(!1)}catch(n){console.error("Steam API Error:",n),d(!1)}};t();const m=setInterval(t,6e4);return()=>clearInterval(m)},[]);const x=[{label:"COMMUNITY_STATUS",value:(a&&["Offline","Online","Busy","Away","Snooze","Looking to Trade","Looking to Play"][a.personastate]||"OFFLINE").toUpperCase()},{label:"NOW_PLAYING",value:a?.gameextrainfo?a.gameextrainfo.toUpperCase():"IDLE"},{label:"NODE_STABILITY",value:"99.9%"}];return e.jsxs(h.div,{className:"page-container gaming-page",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e.jsxs("div",{className:"gaming-hero",children:[e.jsx("h1",{className:"mono glitch-text","data-text":"GAMING_HUB.SYS",children:"GAMING_HUB.SYS"}),e.jsx("p",{className:"mono terminal-text",children:"GEO_LOC: KERALA_IN_NODE_01"})]}),e.jsxs("div",{className:"gaming-content",children:[e.jsxs("section",{className:"steam-profile-card",children:[e.jsxs("div",{className:"card-header mono",children:[e.jsx("span",{children:"CONNECTION: SECURE"}),e.jsx("div",{className:`status-dot ${a?.personastate>0?"online":""}`})]}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"avatar-wrapper",children:[e.jsx("img",{src:a?.avatarfull||y,alt:"Steam Avatar",className:"steam-avatar",onError:t=>t.target.src=y}),e.jsx("div",{className:"avatar-glitch"})]}),e.jsxs("div",{className:"profile-info",children:[e.jsx("h2",{className:"mono",children:a?.personaname||"SALIH_PK"}),e.jsxs("p",{className:"mono text-xs opacity-50",children:["STEAM_64_ID: ",i]}),e.jsx("div",{className:"profile-actions",children:e.jsx("a",{href:a?.profileurl,target:"_blank",rel:"noreferrer",className:"cyber-btn sm mono",children:"OPEN_STEAM_DB"})})]})]})]}),e.jsx("section",{className:"stats-strip",children:x.map((t,m)=>e.jsxs("div",{className:"stat-node",children:[e.jsx("span",{className:"node-label mono",children:t.label}),e.jsxs("div",{className:"value-container",children:[t.label==="NOW_PLAYING"&&a?.gameid&&e.jsx("img",{src:`https://cdn.cloudflare.steamstatic.com/steam/apps/${a.gameid}/capsule_231x87.jpg`,alt:"",className:"now-playing-icon"}),e.jsx("span",{className:"node-value mono terminal-text",children:t.value})]})]},m))}),e.jsxs("section",{className:"games-grid",children:[e.jsx("h3",{className:"mono border-title",children:"RECENT_BOOT_LOGS"}),e.jsx("div",{className:"games-list",children:o.length>0?o.map((t,m)=>e.jsxs(h.div,{className:"game-item",whileHover:{scale:1.02,x:10},children:[e.jsx("div",{className:"game-img",style:{backgroundImage:`url(${t.header})`},children:e.jsx("img",{src:t.icon,alt:"",className:"game-avatar-icon"})}),e.jsxs("div",{className:"game-details",children:[e.jsx("div",{className:"game-name mono",children:t.name}),e.jsxs("div",{className:"play-time mono text-xs",children:["RUNTIME: ",t.playTime]})]}),e.jsx("div",{className:"game-status mono",children:"STABLE"})]},m)):e.jsx("div",{className:"mono text-xs opacity-50",children:"NO_RECENT_SESSIONS_FOUND"})})]})]}),e.jsx("style",{jsx:!0,children:`
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

                .card-body { display: flex; gap: 30px; align-items: center; }

                .avatar-wrapper {
                    position: relative;
                    width: 120px;
                    height: 120px;
                }

                .steam-avatar {
                    width: 100%;
                    height: 100%;
                    border: 1px solid var(--primary-color);
                    object-fit: cover;
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
                }

                .node-label { font-size: 0.6rem; color: var(--text-dim); margin-bottom: 5px; }
                .value-container { display: flex; flex-direction: column; align-items: center; gap: 10px; }
                .node-value { font-size: 1.2rem; font-weight: bold; }
                .now-playing-icon { width: 120px; height: auto; border: 1px solid var(--primary-color); box-shadow: 0 0 10px var(--primary-glow); }

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
                }

                .game-img {
                    height: 70px;
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

                .game-details { padding: 0 20px; }
                .game-status { font-size: 0.7rem; color: var(--primary-color); text-align: right; }

                .cyber-btn.sm { padding: 6px 12px; font-size: 0.7rem; margin-top: 15px; display: inline-block; text-decoration: none; border: 1px solid var(--primary-color); color: var(--primary-color); }
                .cyber-btn.sm:hover { background: var(--primary-color); color: var(--bg-color); }

                @media (max-width: 1024px) {
                    .gaming-hero h1 { font-size: 1.8rem; }
                    .gaming-hero .terminal-text { font-size: 0.75rem; }
                    .gaming-content { grid-template-columns: 1fr; }
                    .steam-profile-card { padding: 20px; }
                    .card-body { flex-direction: column; text-align: center; gap: 15px; }
                    .avatar-wrapper { width: 100px; height: 100px; }
                    .profile-info h2 { font-size: 1.1rem; }
                    .stats-strip { grid-template-columns: 1fr; gap: 10px; }
                    .stat-node { padding: 12px; }
                    .node-label { font-size: 0.55rem; }
                    .node-value { font-size: 0.9rem; }
                }

                @media (max-width: 768px) {
                    .game-item { 
                        grid-template-columns: 100px 1fr; 
                        padding-right: 10px;
                    }
                    .game-details { padding: 0 15px; }
                    .game-name { font-size: 0.8rem; }
                    .game-status { display: none; }
                    .play-time { font-size: 0.6rem; }
                }

                @media (max-width: 480px) {
                    .gaming-hero h1 { font-size: 1.8rem; }
                    .game-item { grid-template-columns: 1fr; text-align: center; }
                    .game-img { height: 120px; border-right: none; border-bottom: 1px solid var(--border-color); }
                    .game-details { padding: 15px; }
                    .game-avatar-icon { right: 10px; bottom: 10px; }
                }
            `})]})},H=()=>{const[i,s]=c.useState({subject:"",message:"",email:""}),[a,l]=c.useState(!1),o=async r=>{r.preventDefault();const p="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfPSPD3Rw36VP0tEDpGm4x-STrA85Gui3YmNaONa-oHMm-wRg/formResponse",d=new FormData;d.append("entry.1070221655",i.email),d.append("entry.536187874",i.subject),d.append("entry.894360633",i.message);try{await fetch(p,{method:"POST",mode:"no-cors",body:d}),l(!0),s({email:"",subject:"",message:""}),setTimeout(()=>l(!1),5e3)}catch(g){console.error("Transmission Error:",g),alert("DATA_TRANSMISSION_FAILED_RETRY_LATER")}};return e.jsxs(h.div,{className:"page-container contact-page",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e.jsxs("div",{className:"contact-grid",children:[e.jsxs("div",{className:"contact-info",children:[e.jsx("h1",{className:"mono",children:"CONNECT_"}),e.jsx("p",{className:"mono terminal-text",children:"ESTABLISHING PEER-TO-PEER ENCRYPTION..."}),e.jsxs("div",{className:"social-links mono",children:[e.jsxs("div",{className:"social-item",children:[e.jsx("span",{className:"label",children:"INSTAGRAM:"}),e.jsx("a",{href:"https://www.instagram.com/_sali___h?igsh=eXZhcm54MHQxYXhw",target:"_blank",rel:"noreferrer",children:"@_sali___h"})]}),e.jsxs("div",{className:"social-item",children:[e.jsx("span",{className:"label",children:"LINKEDIN:"}),e.jsx("a",{href:"https://www.linkedin.com/in/muhammed-salih-p-k",target:"_blank",rel:"noreferrer",children:"in/muhammed-salih-p-k"})]}),e.jsxs("div",{className:"social-item",children:[e.jsx("span",{className:"label",children:"LOCATION:"}),e.jsx("span",{children:"GEO_COORDS: 11.2588° N, 75.7804° E"})]})]}),e.jsxs("div",{className:"system-status mono",children:[e.jsx("h3",{children:"SYSTEM_LOG:"}),e.jsxs("div",{className:"log-scroll",children:[e.jsxs("div",{className:"log-line",children:[">"," SMTP_RELAY: CHECKING..."]}),e.jsxs("div",{className:"log-line",children:[">"," SOCKET_0: LISTENING"]}),e.jsxs("div",{className:"log-line",children:[">"," PACKET_LOSS: 0%"]})]})]})]}),e.jsx("div",{className:"contact-form-container",children:e.jsxs("form",{className:"contact-form",onSubmit:o,children:[e.jsx("div",{className:"form-header mono",children:"SEND_DATA_PACKET"}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"mono",children:"IDENTIFIER_EMAIL:"}),e.jsx("input",{type:"email",required:!0,className:"mono",value:i.email,onChange:r=>s({...i,email:r.target.value})})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"mono",children:"DATA_SUBJECT:"}),e.jsx("input",{type:"text",required:!0,className:"mono",value:i.subject,onChange:r=>s({...i,subject:r.target.value})})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{className:"mono",children:"PAYLOAD_MESSAGE:"}),e.jsx("textarea",{required:!0,className:"mono",rows:"5",value:i.message,onChange:r=>s({...i,message:r.target.value})})]}),e.jsx("button",{type:"submit",className:"cyber-btn mono",disabled:a,children:a?"TRANSMISSION_COMPLETE":"TRANSMIT()"}),a&&e.jsxs(h.div,{initial:{opacity:0},animate:{opacity:1},className:"mono text-xs mt-4",style:{color:"var(--primary-color)"},children:[">"," PACKET_RECEIVED: ENCRYPTED_AND_STORED"]})]})})]}),e.jsx("style",{jsx:!0,children:`
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
          background: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          padding: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cyber-btn:hover {
          background: var(--primary-color);
          color: black;
          box-shadow: 0 0 20px var(--primary-glow);
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
      `})]})},B=({toggleMusic:i,isMusicPlaying:s})=>{const a=E(),[l,o]=c.useState(localStorage.getItem("theme")||"dark");c.useEffect(()=>{document.documentElement.setAttribute("data-theme",l),localStorage.setItem("theme",l)},[l]);const r=n=>{n.preventDefault(),o(l==="dark"?"light":"dark")},[p,d]=c.useState(!1),g=()=>d(!p),x=[{name:"HOME",path:"/"},{name:"PROJECTS",path:"/projects"},{name:"GAMING",path:"/gaming"},{name:"CONTACT",path:"/contact"}],t=c.useRef(null),m=c.useRef(!1);return e.jsxs("nav",{className:"navbar",children:[e.jsx("div",{className:"nav-logo",children:e.jsxs(h.div,{className:"nav-profile-link",style:{cursor:"pointer"},onClick:n=>{if(n.preventDefault(),m.current){m.current=!1;return}r(n)},onContextMenu:n=>{n.preventDefault(),i()},onPointerDown:()=>{m.current=!1,t.current=setTimeout(()=>{i(),m.current=!0},600)},onPointerUp:()=>{clearTimeout(t.current)},onPointerLeave:()=>{clearTimeout(t.current)},whileTap:{scale:.9},children:[e.jsx(h.img,{src:y,alt:"System Controls",className:`nav-avatar ${s?"playing":""}`,animate:s?{rotate:360}:{rotate:0},transition:s?{duration:4,repeat:1/0,ease:"linear"}:{duration:.5}}),e.jsx("span",{className:`mono status-indicator ${s?"active":""}`}),e.jsxs("div",{className:"theme-tooltip mono",children:[e.jsx("span",{className:"desktop-info",children:s?"L: THEME | R: PAUSE":"L: THEME | R: PLAY"}),e.jsx("span",{className:"mobile-info",children:s?"TAP: THEME | HOLD: PAUSE":"TAP: THEME | HOLD: PLAY"})]})]})}),e.jsx("div",{className:"mobile-toggle",onClick:g,children:e.jsxs("div",{className:`hamburger ${p?"open":""}`,children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsx("div",{className:"nav-links desktop-only",children:x.map(n=>e.jsxs(b,{to:n.path,className:`nav-item mono ${a.pathname===n.path?"active":""}`,children:[n.name,a.pathname===n.path&&e.jsx(h.div,{layoutId:"nav-underline",className:"nav-underline",initial:!1})]},n.path))}),e.jsx(N,{children:p&&e.jsx(h.div,{className:"mobile-menu-overlay",initial:{opacity:0,x:"100%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"100%"},transition:{type:"spring",damping:25,stiffness:200},children:e.jsxs("div",{className:"mobile-menu-content",children:[x.map((n,f)=>e.jsx(h.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:f*.1},children:e.jsxs(b,{to:n.path,className:`mobile-nav-item mono ${a.pathname===n.path?"active":""}`,onClick:()=>d(!1),children:[e.jsxs("span",{className:"accent",children:["0",f+1,"_"]})," ",n.name]})},n.path)),e.jsxs("div",{className:"mobile-menu-footer mono",children:[e.jsx("p",{children:"CORE_INTERFACE_v4.2"}),e.jsx("p",{className:"opacity-50",children:"STATUS: ENCRYPTED"})]})]})})})]})},Y=()=>{const[i,s]=c.useState(!1),[a,l]=c.useState([{text:"SYSTEM_ACCESS_GRANTED. I am your AI assistant. How can I help you today?",isBot:!0}]),[o,r]=c.useState(""),p=d=>{if(d.preventDefault(),!o.trim())return;const g={text:o,isBot:!1};l(x=>[...x,g]),r(""),setTimeout(()=>{let x="Analyzing input... [REDACTED]";const t=o.toLowerCase();t.includes("who")||t.includes("salih")?x="MUHAMMED SALIH P K is a Cyber security Aspirant & Creative Developer. Security is his prime directive.":t.includes("project")?x="Accessing 'Projects' partition... I recommend checking the GitHub repositories for source code.":t.includes("contact")?x="Establishing connection protocol... You can reach the user via the CONTACT section or Instagram.":t.includes("gaming")||t.includes("steam")?x="Opening GAMING_HUB... Steam ID: 76561199815687878 is currently online.":x="Input received. Processing with high-priority encryption... No further data found on this query.",l(m=>[...m,{text:x,isBot:!0}])},1e3)};return e.jsxs("div",{className:"chatbot-container",children:[e.jsxs(h.button,{className:`chatbot-trigger ${i?"active":""}`,onClick:()=>s(!i),whileHover:{scale:1.05},whileTap:{scale:.95},children:[e.jsx("div",{className:"trigger-icon",children:i?e.jsx("span",{className:"close-icon",style:{fontSize:"1.5rem",display:"block",marginTop:"-2px"},children:"×"}):e.jsxs("div",{className:"ai-brain",children:[e.jsx("span",{className:"dot"}),e.jsx("span",{className:"dot"}),e.jsx("span",{className:"dot"})]})}),!i&&e.jsxs("div",{className:"pulse-aura",children:[e.jsx("div",{className:"ring"}),e.jsx("div",{className:"ring"})]})]}),e.jsx(N,{children:i&&e.jsxs(h.div,{className:"chatbot-window",initial:{opacity:0,scale:.9,y:20,transformOrigin:"bottom right"},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},children:[e.jsxs("div",{className:"chatbot-header mono",children:[e.jsxs("div",{className:"header-info",children:[e.jsx("span",{className:"title",children:"NEURAL_INTERFACE_v4.2"}),e.jsx("span",{className:"status",children:"STABLE"})]}),e.jsx("div",{className:"header-status-dot"})]}),e.jsx("div",{className:"chatbot-messages",children:a.map((d,g)=>e.jsx(h.div,{className:`message-wrapper ${d.isBot?"bot":"user"}`,initial:{opacity:0,x:d.isBot?-10:10},animate:{opacity:1,x:0},children:e.jsxs("div",{className:"message-content mono",children:[e.jsx("span",{className:"msg-prefix",children:d.isBot?"AI>":"USER>"}),d.text]})},g))}),e.jsxs("form",{onSubmit:p,className:"chatbot-input-area",children:[e.jsx("input",{type:"text",className:"mono",placeholder:"EXECUTE_COMMAND...",value:o,onChange:d=>r(d.target.value)}),e.jsx("button",{type:"submit",className:"mono",children:"RUN"})]})]})})]})},F=()=>{const i=c.useRef(null);return c.useEffect(()=>{const s=i.current,a=s.getContext("2d");let l;const o=()=>{s.width=window.innerWidth,s.height=window.innerHeight};window.addEventListener("resize",o),o();const r=[],p=40;class d{constructor(){this.reset()}reset(){this.x=Math.random()*s.width,this.y=Math.random()*s.height,this.vx=(Math.random()-.5)*.5,this.vy=(Math.random()-.5)*.5,this.size=Math.random()*2,this.alpha=Math.random()*.5+.2}update(){this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>s.width||this.y<0||this.y>s.height)&&this.reset()}draw(){a.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--primary-color"),a.globalAlpha=this.alpha,a.beginPath(),a.arc(this.x,this.y,this.size,0,Math.PI*2),a.fill()}}for(let t=0;t<p;t++)r.push(new d);const g=()=>{const t=getComputedStyle(document.documentElement).getPropertyValue("--primary-color");a.strokeStyle=t,a.lineWidth=.5;const m=100,f=performance.now()*.5/50%m;a.globalAlpha=.05;for(let u=f;u<s.width;u+=m)a.beginPath(),a.moveTo(u,0),a.lineTo(u,s.height),a.stroke();for(let u=f;u<s.height;u+=m)a.beginPath(),a.moveTo(0,u),a.lineTo(s.width,u),a.stroke()},x=()=>{a.clearRect(0,0,s.width,s.height),g(),r.forEach(t=>{t.update(),t.draw()}),a.globalAlpha=.03,a.beginPath();for(let t=0;t<r.length;t++)for(let m=t+1;m<r.length;m++)Math.hypot(r[t].x-r[m].x,r[t].y-r[m].y)<200&&(a.moveTo(r[t].x,r[t].y),a.lineTo(r[m].x,r[m].y));a.stroke(),l=requestAnimationFrame(x)};return x(),()=>{window.removeEventListener("resize",o),cancelAnimationFrame(l)}},[]),e.jsx("canvas",{ref:i,style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,pointerEvents:"none",opacity:.6}})},$=({isPlaying:i,toggleMusic:s})=>{const a="PLim7UVED5wuvc5CKu1KwrFfhunbpYjWM3",l=c.useRef(null);return e.jsx("div",{className:"music-engine-container",children:e.jsx("div",{style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:e.jsx("iframe",{ref:l,width:"100%",height:"100",src:`https://www.youtube.com/embed/videoseries?list=${a}&enablejsapi=1&autoplay=${i?1:0}&mute=0`,title:"Music Engine",allow:"autoplay; encrypted-media"})})})};function K(){const[i,s]=c.useState("FETCHING..."),[a,l]=c.useState(!1),o=E(),r=()=>l(!a);return c.useEffect(()=>{fetch("https://api.ipify.org?format=json").then(p=>p.json()).then(p=>s(p.ip)).catch(()=>s("127.0.0.1"))},[]),e.jsxs("div",{className:"app-container",children:[e.jsx(F,{}),e.jsx("div",{className:"crt-overlay"}),e.jsx("div",{className:"scanline"}),e.jsxs(h.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:1},children:[e.jsx(B,{toggleMusic:r,isMusicPlaying:a}),e.jsx("main",{children:e.jsx(N,{mode:"wait",children:e.jsxs(w,{location:o,children:[e.jsx(j,{path:"/",element:e.jsx(P,{})}),e.jsx(j,{path:"/projects",element:e.jsx(G,{})}),e.jsx(j,{path:"/gaming",element:e.jsx(U,{})}),e.jsx(j,{path:"/contact",element:e.jsx(H,{})})]},o.pathname)})}),e.jsx("footer",{className:"footer",children:e.jsxs("div",{className:"mono text-xs opacity-50 footer-stats",children:[e.jsx("span",{children:"SYSTEM STATS: STABLE"}),e.jsx("span",{className:"separator",children:"|"}),e.jsx("span",{children:"NODE_01: ONLINE"}),e.jsx("span",{className:"separator",children:"|"}),e.jsx("span",{children:"LOC: KERALA_IN"}),e.jsx("span",{className:"separator",children:"|"}),e.jsxs("span",{children:["IP: ",i]})]})}),e.jsx(Y,{}),e.jsx($,{isPlaying:a})]},"content")]})}T.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(C,{children:e.jsx(K,{})})}));
