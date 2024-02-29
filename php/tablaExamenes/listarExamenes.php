<?php
/* En este fichero se devolvera un JSON con todos los datos de los examens de la DB */

try {
    // Conexion DB
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    // Preparacion de la query
    // Se hace uso del JOIN debido a que tambien necesitaremos el nombre en el cliente
    $query = "SELECT exams.*, students.student_name  FROM exams JOIN students ON exams.student_id = students.student_id;";
    $stmt = $db->query($query);

    // Ejecucucion de la consulta
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Este es el array que se devolvera como un JSON
    $json = array();

    // Se vuelcan los datos en forma de array asociativo
    foreach ($rows as $row) {
        $json[] = $row;
    }

    // Se codifica el array en forma de JSON y se establecen las cabeceras de la peticion

    $response = json_encode($json);
    header('Content-Type: application/json');

    // Se responde con el JSON
    echo $response;

    unset($db);
} catch (PDOException $e) {
    // En caso de error se maneja la excepcion
    header('Content-Type: application/json');
    echo json_encode(array('estado' => "PDOError"));
    unset($db);
}
