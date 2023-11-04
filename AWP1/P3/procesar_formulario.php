<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $comentarios = $_POST["comentarios"];

    // Correo de destino
    $destinatario = "20307023@utcgg.edu.mx";
    $asunto = "Nuevo mensaje de contacto de $nombre";

    // Construir el mensaje
    $mensaje = "Nombre: $nombre\n";
    $mensaje .= "Email: $email\n";
    $mensaje .= "Teléfono: $telefono\n";
    $mensaje .= "Comentarios:\n$comentarios";

    // Enviar el correo
    mail($destinatario, $asunto, $mensaje);

    // Redirigir de vuelta a la página de contacto o mostrar un mensaje de éxito
    header("Location: contacto.html?enviado=1");
} else {
    // Si el formulario no se envió, redirigir a la página de contacto
    header("Location: contacto.html");
}
