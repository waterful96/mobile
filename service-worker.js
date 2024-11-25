
// 캐시 이름 및 캐시할 리소스 목록
const CACHE_NAME = "mobile-webpage-cache-v1";
const urlsToCache = [
  "/",
  "/mobile_webpage.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png"
];

// 설치 이벤트: 캐시 생성
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching resources");
      return cache.addAll(urlsToCache);
    })
  );
});

// 활성화 이벤트: 오래된 캐시 제거
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache");
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// 요청 가로채기: 캐시에서 반환하거나 네트워크 요청
self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
