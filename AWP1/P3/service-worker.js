// Nombre del cache
const cacheName = 'proyecto';

// Archivos y recursos para almacenar en caché
const cacheAssets = [
    'index.html',
    'main.js',
    'aviso_privacidad',
    'contacto',
    'mision',
    'vision',
    'valores',
    'servicios_ofrecidos',
    'politica_privacidad',
    'portafolios'
    // Agregar más recursos que se necesiten como imágenes, CSS, etc.
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: INSTALADO');

    // Precarga de los recursos para guardar en caché

    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Activar el Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: ACTIVADO');

    // Eliminar Caches antiguas
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

// Escuchamos el evento push para mostrar la notificación
self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Recibido');
    console.log('[Service Worker] Datos de Push: "' + event.data.text() + '"');
    // Usamos const para manejar y controlar las notificaciones del Service Worker y la API implementada
    const title = 'No se Duerman';
    const options = {
        body: event.data.text(),
        icon: 'icono.png',
        badge: 'insignia.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Manejamos peticiones
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                // El recurso está en caché, lo servimos desde allí
                return response;
            } else {
                // El recurso no está en caché, lo solicitamos al servidor y lo almacenamos en caché
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
