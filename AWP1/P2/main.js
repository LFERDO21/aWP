//Verificamos si el navegador soporta Service Workers

if('serviceWorker' in navigator && 'PushManager' in window) {
//Registramos el service Worker
    navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
        console.log('service Worker registrado con exito.', registration);

        //Solicitamos el permiso para la notificacion
        return Notification.requestPermission();
    })
    .then(permission => {
        if (permission === 'granted'){
            console.log('Permiso de  notificacion concedido');
        //Aqui agregamos la notificacion push de la api que estariamos usando
        return navigator.serviceWorker.ready;
    } else{
        console.log('Permiso de notificipon denegado');
    }
    })

    .then(swRegistration =>{

    })
        
    .catch((error) => {
    console.log('Error en el registro del Service Worker', error);
    });
}

console.log('hola.p')

