<?php
/* En este fichero se devolvera un JSON con un examen cuyo ID se recibe por post (URL Params)*/

// Validación de datos se verifica si el ID ha llegado mediante POST
if (!isset($_POST['id'])) {
    // Si el ID no se ha recibido por POST, devuelve un JSON con student_id en -1
    $respuesta = json_encode(array('exam_id' => -1));
    header('Content-Type: application/json');
    echo $respuesta;
    die(); // Termina la ejecución del script
}

try {
    /* Conexión PDO */
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    // Se hace un PreparedQuery y se ejecuta en la BD
    $query = "SELECT exams.*, students.student_name FROM exams JOIN students ON exams.student_id = students.student_id WHERE exam_id = :exam_id ;";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':exam_id', $_POST['id'], PDO::PARAM_INT);
    $stmt->execute();

    // Se Obtienen los datos del examen
    $examen = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si el examen existe, devuelve sus datos; de lo contrario, devuelve un id -1
    if ($examen) {
        $respuesta = json_encode($examen);
    } else {
        $respuesta = json_encode(array('exam_id' => -1));
    }

    // Se establecen las cabeceras y se manda el JSON
    header('Content-Type: application/json');
    echo $respuesta;

    unset($db);
} catch (PDOException $e) {
    // En caso de fallo, devuelve un JSON con student_id en -1
    $respuesta = json_encode(array('exam_id' => -1));
    header('Content-Type: application/json');
    echo $respuesta;
    unset($db);
}
