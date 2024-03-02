<?php
/* Este script se encarga de añadir examenes a la base de datos y devolver un JSON con el estado */

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


// funcion para verificar si el alumno existe en la tabla Alumnos
function studentExists($db, $student_id)
{
    $stmt = $db->prepare("SELECT COUNT(*) FROM students WHERE student_id = :student_id");
    $stmt->execute([$student_id]);
    return $stmt->fetchColumn() > 0;
}

// Funcion para validar datos
function validacionDeDatos($Examen)
{
    $isOk = true;

    // Validaciones de la fecha del examen
    if (!isset($Examen['fecha']) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $Examen['fecha'])) {
        $arrErrores[] = "La fecha del examen no concuerda";
    }

    $valFecha = strtotime($Examen['fecha']);
    if ($valFecha === false) {
        $isOk = false;
    } else {
        $anio = date('Y', $valFecha);
        if ($anio <= 1900 || $anio >= 2099) {
            $isOk = false;
        }
    }

    // Validaciones de la asigunatura
    if (!isset($Examen['asignatura']) || empty($Examen['asignatura']) || strlen($Examen['asignatura']) < 4 || strlen($Examen['asignatura']) > 50) {
        $isOk = false;
    }

    // Validacion de la calificacion
    if (!isset($Examen['calificacion']) || !is_numeric($Examen['calificacion']) || $Examen['calificacion'] < 0 || $Examen['calificacion'] > 10) {
        $isOk = false;
    }

    // Validaciones de las Anotaciones
    if (!isset($Examen['anotaciones']) || strlen($Examen['anotaciones']) < 2 || strlen($Examen['anotaciones']) > 256) {
        $isOk = false;
    }

    return $isOk;
}
//  Comprobacion de datos
if (!validacionDeDatos($Examen)) {
    // Si falla la validacion
    header('Content-Type: application/json');
    echo json_encode(array('estado' => "ValidateException"));
    die();
}


// Conexion PDO
try {
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    // Verificar si el alumno existe antes de la inserción
    if (!studentExists($db, $Examen['alumno'])) {
        header('Content-Type: application/json');
        echo json_encode(array('estado' => "errorAlumno"));
        die();
    }

    // Se hace un PreparedQuery que se ejecutara en la BD
    $query = "INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (:student_id, :exam_date, :exam_subject, :exam_grade, :exam_notes);";
    $stmt = $db->prepare($query);
    // Se bindean los atributos y se ejecuta la query
    $stmt->bindParam(':student_id', $Examen['alumno'], PDO::PARAM_INT);
    $stmt->bindParam(':exam_date', $Examen['fecha'], PDO::PARAM_STR);
    $stmt->bindParam(':exam_subject', $Examen['asignatura'], PDO::PARAM_STR);
    $stmt->bindParam(':exam_grade', $Examen['calificacion'], PDO::PARAM_INT);
    $stmt->bindParam(':exam_notes', $Examen['anotaciones'], PDO::PARAM_STR);


    //$ok = 
    $ok = $stmt->execute();

    // Se comprueba que se ha insertado el examen
    if ($ok) {
        header('Content-Type: application/json');
        echo json_encode(array('estado' => 'ok'));
        die();
    } else {
        throw new PDOException("Examen no insertado");
    }
} catch (PDOException $e) {
    // Manejo de excepciones DB
    header('Content-Type: application/json');
    echo json_encode(array('estado' => "PDOException"));
    die();
}
