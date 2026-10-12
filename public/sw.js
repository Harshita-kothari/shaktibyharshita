const CACHE='shakti-shell-v1';
const SHELL=['/','/manifest.webmanifest','/icon-192.png','/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return; // never cache API or cross-origin (Maps) requests
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put('/',copy));return res;}).catch(()=>caches.match('/')));
  return;
 }
 if(url.pathname.startsWith('/assets/')){
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res;})));
 }
});
self.addEventListener('push',event=>{let data={};try{data=event.data.json();}catch{ /* Show a generic notification for an invalid payload. */ }event.waitUntil(self.registration.showNotification(data.title||'Shakti',{body:data.body||'You have a safety update.',tag:'raksha-'+Date.now(),data:{url:'/alert-history'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const windows=await clients.matchAll({type:'window',includeUncontrolled:true});const target=windows.find(client=>new URL(client.url).origin===self.location.origin);if(target){await target.navigate(new URL('/alert-history',self.location.origin).href);return target.focus();}return clients.openWindow(new URL('/alert-history',self.location.origin).href);})());});
