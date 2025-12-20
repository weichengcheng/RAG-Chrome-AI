// 缓存名
const CACHE = 'pwa-v1';

// 要离线访问的资源
const FILES = ['/', '/index.html', '/manifest-pwa.json', '/pwa-192.png', '/pwa-512.png'];

// 1. 安装时缓存
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

// 2. 网络优先，失败则读缓存（可改成缓存优先）
// self.addEventListener('fetch', e => {
//   e.respondWith(
//     fetch(e.request)
//       .catch(() => caches.match(e.request))
//   );
// });

// 3. 可选：激活时清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE && caches.delete(key))
      )
    )
  );
});