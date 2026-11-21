const C="notebook-v8",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!="GET")return;
e.respondWith((async()=>{const o={ignoreSearch:true};const r=await caches.match(q,o);
const net=fetch(q).then(n=>{if(n&&n.ok){const c=n.clone();caches.open(C).then(x=>x.put(q,c))}return n});
if(r){net.catch(()=>{});return r}
try{return await net}catch(err){if(q.mode=="navigate"){const i=await caches.match("index.html")||await caches.match("./");if(i)return i}return new Response("",{status:503})}})())});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("./"))});
