<?php
/* Este script se encarga de añadir alumnos a la base de datos por medio de POST */

// Se reciben los datos del formulario desde 
$dataReceived = json_decode(file_get_contents("php://input"), true);


// Comprobacion de que los datos han llegado
if (
    !isset($dataReceived['student_name']) ||
    !isset($dataReceived['student_bd']) ||
    !isset($dataReceived['student_tel']) ||
    !isset($dataReceived['student_address'])
) {
    // En el caso de que la validacion fallara se manda un id negativo y se cierra la conexion
    $response = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $response;
    unset($db);
    die();
}

// TODO Validacion de datos


try {
    /* Conexion PDO */
    $db = new PDO('sqlite:' . '../basedatos/bd.sqlite');

    // Se prepara la query y se manda a la DB
    $query = "INSERT INTO students (
    student_name, 
    student_bd, 
    student_tel, 
    student_address) 
    VALUES (
    :student_name, 
    :student_bd, 
    :student_tel, 
    :student_address)";

    $stmt = $db->prepare($query);

    // Ejecuta la consulta con los datos del nuevo alumno
    $stmt->execute(array(
        ':student_name' => $dataReceived['student_name'],
        ':student_bd' => $dataReceived['student_bd'],
        ':student_tel' => $dataReceived['student_tel'],
        ':student_address' => $dataReceived['student_address'],
    ));

    // Se obtiene el id del nuevo alumno
    $studentId = $db->lastInsertId();

    // Se responde en forma de JSON
    $response = json_encode(array('student_id' => $studentId));
    header('Content-Type: application/json');
    echo $response;
    unset($db);
} catch (PDOException $e) {
    // En el caso de que fallara se manda un id negativo
    $response = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $response;
    unset($db);
}
