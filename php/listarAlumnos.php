<?php
/* En este fichero se devolvera un JSON con todos los datos de los alumnos de la DB */

// Conexion DB
$db = new PDO('sqlite:' . '../basedatos/bd.sqlite');

// Preparacion de la query
$query = "SELECT * FROM students";
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