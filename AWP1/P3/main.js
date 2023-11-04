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

document.addEventListener("DOMContentLoaded", function () {
    const moreAboutUsLink = document.querySelector(".group");
    const moreAboutUsDropdown = moreAboutUsLink.querySelector("ul");

    moreAboutUsLink.addEventListener("click", function (event) {
        event.stopPropagation();
        moreAboutUsDropdown.classList.toggle("hidden");
    });

    const projectsLink = document.querySelectorAll(".group")[1]; // Obtiene el segundo elemento con la clase "group"
    const projectsDropdown = projectsLink.querySelector("ul");

    projectsLink.addEventListener("click", function (event) {
        event.stopPropagation();
        projectsDropdown.classList.toggle("hidden");
    });

    // Cierra la lista desplegable si se hace clic en cualquier parte del documento
    document.addEventListener("click", function () {
        moreAboutUsDropdown.classList.add("hidden");
        projectsDropdown.classList.add("hidden");
    });

    // Evita que se cierre la lista desplegable si se hace clic dentro de ella
    moreAboutUsDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    projectsDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});
