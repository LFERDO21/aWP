//Verificamos si el navegador soporta Service Workers

if('serviceWorker' in navigator) {
//Registramos el service Worker
    navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
        console.log('service Worker registrado con exito.', registration);
    })
    .catch((error) => {
    console.log('Error en el registro del Service Worker', error);
    });
}



