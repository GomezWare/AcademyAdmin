<?php
// Validación de datos: Verificar si el ID ha llegado mediante POST
if (!isset($_POST['id'])) {
    // Si el ID no se ha recibido por POST, devuelve un JSON con student_id en -1
    $respuesta = json_encode(array('student_id' => -1));
    header('Content-Type: application/json');
    echo $respuesta;
    die(); // Termina la ejecución del script
}

try {
    /* Conexión PDO */
    $db = new PDO('sqlite:' . '../basedatos/bd.sqlite');

    // Prepara la consulta y ejecútala
    $query = "SELECT * FROM students WHERE student_id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute(array(':id' => $_POST['id']));

    // Obtiene los datos del estudiante
    $estudiante = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si el estudiante existe, devuelve sus datos; de lo contrario, devuelve un mensaje de error
    if ($estudiante) {
        $respuesta = json_encode($estudiante);
    } else {
        $respuesta = json_encode(array('student_id' => -1));
    }

    // Establece el encabezado de la respuesta y muestra la respuesta
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
