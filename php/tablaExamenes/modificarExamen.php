<?php
/* Este script se encarga de modificar examenes de la base de datos y devolver un JSON con el estado */

// Recibir datos JSON
$json_data = file_get_contents('php://input');

// Decodificar datos JSON
$Examen = json_decode($json_data, true);

// Verificar si la decodificación fue exitosa
if ($Examen === null && json_last_error() !== JSON_ERROR_NONE) {
    // En caso de que no se mandara un estado al cliente y terminara la ejecucion
    header('Content-Type: application/json');
    echo json_encode(array('estado' => 'ErrorJSON'));
    die();
}

// Funcion para validar datos

// funcion para verificar si el alumno existe en la tabla Alumnos
function studentExists($db, $student_id)
{
    $stmt = $db->prepare("SELECT COUNT(*) FROM students WHERE student_id = :student_id");
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchColumn() > 0;
}

// TODO Comprobacion de datos


// Conexion PDO
try {
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    // Verificar si el alumno existe antes de la actualizacion de datos
    if (!studentExists($db, $Examen['alumno'])) {
        header('Content-Type: application/json');
        echo json_encode(array('estado' => "errorAlumno"));
        die();
    }

    // Se hace un PreparedQuery que se ejecutara en la BD
    $query = "UPDATE exams SET student_id = :student_id , exam_date = :exam_date , exam_subject = :exam_subject , exam_grade = :exam_grade , exam_notes = :exam_notes WHERE exam_id = :exam_id;";
    $stmt = $db->prepare($query);
    // Se bindean los atributos y se ejecuta la query
    $stmt->bindParam(':student_id', $Examen['alumno'], PDO::PARAM_INT);
    $stmt->bindParam(':exam_date', $Examen['fecha'], PDO::PARAM_STR);
    $stmt->bindParam(':exam_subject', $Examen['asignatura'], PDO::PARAM_STR);
    $stmt->bindParam(':exam_grade', $Examen['calificacion'], PDO::PARAM_INT);
    $stmt->bindParam(':exam_notes', $Examen['anotaciones'], PDO::PARAM_STR);
    $stmt->bindParam(':exam_id', $Examen['id'], PDO::PARAM_INT);

    $ok = $stmt->execute();

    // Se comprueba que se ha insertado el examen
    if ($ok) {
        header('Content-Type: application/json');
        echo json_encode(array('estado' => 'ok'));
        die();
    } else {
        throw new PDOException("Examen no actualizado");
    }
} catch (PDOException $e) {
    // Manejo de excepciones DB
    header('Content-Type: application/json');
    echo json_encode(array('estado' => "PDOException"));
    die();
}
