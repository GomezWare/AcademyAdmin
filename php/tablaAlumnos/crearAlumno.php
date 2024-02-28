<?php
/* Este script se encarga de añadir alumnos a la base de datos y devolver un JSON con el estado */

// Recibir datos JSON
$json_data = file_get_contents('php://input');

// Decodificar datos JSON
$Alumno = json_decode($json_data, true);

// Verificar si la decodificación fue exitosa
if ($Alumno === null && json_last_error() !== JSON_ERROR_NONE) {
    // En caso de que no se mandara un estado al cliente y terminara la ejecucion
    header('Content-Type: application/json');
    echo json_encode(array('estado' => 'ErrorJSON'));
    die();
}

// TODO Comprobacion de datos


// Conexion PDO
try {
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');
    // Se hace un PreparedQuery que se ejecutara en la BD
    $query = "INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES (:student_name, :student_bd , :student_tel , :student_address);";
    $stmt = $db->prepare($query);
    // Se bindean los atributos y se ejecuta la query
    $stmt->bindParam(':student_name', $Alumno['name'], PDO::PARAM_STR);
    $stmt->bindParam(':student_bd', $Alumno['bd'], PDO::PARAM_STR);
    $stmt->bindParam(':student_tel', $Alumno['tel'], PDO::PARAM_INT);
    $stmt->bindParam(':student_address', $Alumno['addr'], PDO::PARAM_STR);

    //$ok = 
    $ok = $stmt->execute();

    // Se comprueba que se ha insertado el alumno
    if ($ok) {
        header('Content-Type: application/json');
        echo json_encode(array('estado' => 'ok'));
        die();
    } else {
        throw new PDOException("Alumno no insertado");
    }
} catch (PDOException $e) {
    // Manejo de excepciones DB
    header('Content-Type: application/json');
    echo json_encode(array('estado' => "PDOException"));
    die();
}
