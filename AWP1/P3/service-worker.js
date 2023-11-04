// Nombre del caché
const cacheName = 'proyecto';

// Archivos y recursos para almacenar en caché
const cacheAssets = [
    'index.html',
    'main.js',
    'aviso_privacidad.html', // Agrega la extensión .html si es una página web
    'contacto.html', // Agrega la extensión .html
    'mision.html', // Agrega la extensión .html
    'vision.html', // Agrega la extensión .html
    'valores.html', // Agrega la extensión .html
    'servicios_ofrecidos.html', // Agrega la extensión .html
    'politica_privacidad.html', // Agrega la extensión .html
    'portafolios.html' // Agrega la extensión .html
    // Agrega más recursos que se necesiten como imágenes, CSS, etc.
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: INSTALADO');

    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: ACTIVADO');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Limpiando el caché antiguo');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Recibido');
    console.log('[Service Worker] Datos de Push: "' + event.data.text() + '"');
    const title = 'No se Duerman';
    const options = {
        body: event.data.text(),
        icon: 'icono.png',
        badge: 'insignia.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then((response) => {
                    const clonedResponse = response.clone();
                    caches.open(cacheName).then((cache) => {
                        cache.put(event.request, clonedResponse);
                    });
                    return response;
                });
            }
        })
    );
});
