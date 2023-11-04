//Nombre del cache
const cacheName = 'proyecto';

//Archivos y recursos para almacenar en cache
const cacheAssets =[
    'index.html',
    'pagina1.html',
    'main.js'
    //agregar mas recursos que se necesiten como imagenes, css,etc.
];

//Instalar Service Worker
self.addEventListener('install',(event)=>{
    console.log('serviceWorker: INSTALADO');

    //Precarga de los recursos para guardar en cache

    event.waitUntil(
        caches.open(cacheName)
        .then((cache) =>{
            console.log('serviceWorker: Cacheado en archivos');
            return cache.addAll(cacheAssets);
        })
        .then(()=> self.skipWaiting())
    );
});


//Activar el service Worker
self.addEventListener('activate',(event)=>{
    console.log('Service Worker: ACTIVADO');

    //Eliminar Caches antiguas
    event.waitUntil(
        caches.keys().then(cacheName =>{
            return Promise.all(cacheName.map(cache =>{
                if (cache !== cacheName){console.log('service Worker: Limpiando el cache antiguo');
            return caches.delete(cache);
        }
        })
        );
        })
    );
});


//Escuchamos el evento push para mostrar la notificacion
self.addEventListener('push', function(event){
    console.log('`[Service Worker] Push Recibido');
    console.log('[Service Worker] Datos de Push: "${event.data.text ()}"')
//usamos consr para  manejar y controlar las notificaciones del service worker y la API immplementada
const tiitle = 'No se Duerman';
const options = {
    body: event.data.text(),
    icon: 'icono.png',
    badge: 'insignia.png'
};
event.waitUntil(self.registration.showNotification(tiitle, options));
})

//Manejamos peticiones
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                // La imagen está en caché, la servimos desde allí
                return response;
            } else {
                // La imagen no está en caché, la solicitamos al servidor y la almacenamos en caché
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
