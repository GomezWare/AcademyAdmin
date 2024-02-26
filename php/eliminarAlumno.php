<?php
/* En este fichero se eliminara a un alumno y se mandara una respuesta */

// Validación de datos se verifica si el ID ha llegado mediante POST
if (!isset($_POST['id'])) {
    // Si el ID no se ha recibido por POST, devuelve un JSON con estado en error
    $respuesta = json_encode(array('estado' => "noIDReceived"));
    header('Content-Type: application/json');
    echo $respuesta;
    die(); // Termina la ejecución del script
}

try {
    /* Conexión PDO */
    $db = new PDO('sqlite:' . '../basedatos/bd.sqlite');

    // HACK Arreglar la preparedQuery con un BIND

    // Se hace un PreparedQuery y se ejecuta en la BD
    $query = "DELETE FROM students WHERE student_id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute(array(':id' => $_POST['id']));

    // Se comprueba que efectivamente se ha borrado el alumno
    // Si no se ha borrado nada se devuelve un JSON con estado en error si se ha borrado se JSON con estado en ok
    if ($stmt->rowCount()) {
        $respuesta = json_encode(array('estado' => "ok"));
    } else {
        $respuesta = json_encode(array('estado' => "errorQuery"));
    }

    // Se establecen las cabeceras y se manda el JSON
    header('Content-Type: application/json');
    echo $respuesta;

    unset($db);
} catch (PDOException $e) {
    // En caso de fallo, devuelve un JSON con estado en error
    $respuesta = json_encode(array('estado' => "phpException"));
    header('Content-Type: application/json');
    echo $respuesta;
    unset($db);
}
