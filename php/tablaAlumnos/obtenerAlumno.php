<?php
/* En este fichero se devolvera un JSON con un alumno cuyo ID se recibe por post (URL Params)*/

// Validación de datos se verifica si el ID ha llegado mediante POST
if (!isset($_POST['id'])) {
    // Si el ID no se ha recibido por POST, devuelve un JSON con student_id en -1
    $respuesta = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $respuesta;
    die(); // Termina la ejecución del script
}

try {
    /* Conexión PDO */
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    // Se hace un PreparedQuery y se ejecuta en la BD
    $query = "SELECT * FROM students WHERE student_id = :student_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':student_id', $_POST['id'], PDO::PARAM_INT);
    $stmt->execute();

    // Se Obtienen los datos del estudiante
    $estudiante = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si el estudiante existe, devuelve sus datos; de lo contrario, devuelve un id -1
    if ($estudiante) {
        $respuesta = json_encode($estudiante);
    } else {
        $respuesta = json_encode(array('student_id' => -1));
    }

    // Se establecen las cabeceras y se manda el JSON
    header('Content-Type: application/json');
    echo $respuesta;

    unset($db);
} catch (PDOException $e) {
    // En caso de fallo, devuelve un JSON con student_id en -1
    $respuesta = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $respuesta;
    unset($db);
}
