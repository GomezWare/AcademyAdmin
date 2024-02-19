<?php
/* Este script se encarga de añadir alumnos a la base de datos por medio de POST */

// Se reciben los datos del formulario desde 
$post = json_decode(file_get_contents("php://input"), true);

// TODO Validacion de datos
if (false) {
    // En el caso de que la validacion fallara se manda un id negativo y se cierra la conexion
    $response = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $response;
    unset($db);
    die();
}

// Se prepara la query y se manda a la DB

try {
    /* Conexion PDO */
    $db = new PDO('sqlite:' . '../basedatos/bd.sqlite');
} catch (PDOException $e) {
    // En el caso de que fallara se manda un id negativo
    $response = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $response;
}
