if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const l=e=>n(e,r),d={module:{uri:r},exports:c,require:l};s[r]=Promise.all(i.map((e=>d[e]||l(e)))).then((e=>(o(...e),c)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Account.152176f5.js",revision:null},{url:"assets/Home.232689d1.js",revision:null},{url:"assets/Home.829663df.css",revision:null},{url:"assets/index.d5bdc4ce.css",revision:null},{url:"assets/index.e6f04826.js",revision:null},{url:"assets/Registration.15410281.js",revision:null},{url:"assets/UserFormComponent.9364dca7.js",revision:null},{url:"assets/webfontloader.cd097671.js",revision:null},{url:"index.html",revision:"0cd15b9984253357c2d167f3b46edf47"},{url:"registerSW.js",revision:"b5adf963134379464327d9ee6f22e054"},{url:"icons/icon-48x48.png",revision:"2cc1b6a2e4f4825c5aaae77f557589b2"},{url:"icons/icon-72x72.png",revision:"1b415d1b8b5eeeda9500c55d3b3c82f9"},{url:"icons/icon-96x96.png",revision:"6c753df8da03c28eb6bc1f499c3e45c6"},{url:"icons/icon-128x128.png",revision:"e832ce9899bcbfcdee964e8f52f494c1"},{url:"icons/icon-144x144.png",revision:"70a90f769dfd30c9d0b107cfbd683486"},{url:"icons/icon-152x152.png",revision:"04e55dea32a393f0d5a6844aabb3b96b"},{url:"icons/icon-192x192.png",revision:"95acbf438a0970451f57576776d1ac26"},{url:"icons/icon-384x384.png",revision:"1755068eef9a598c9bdd0ace57cafd6e"},{url:"icons/icon-512x512.png",revision:"ede05f98d7618d41f6eeb1fa329781be"},{url:"manifest.webmanifest",revision:"5fa2a787afad64b5a8bd94e3660e880e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
