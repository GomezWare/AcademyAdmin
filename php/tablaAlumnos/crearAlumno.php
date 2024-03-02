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

// Comprobacion de datos
// Comprobacion de datos
function validacionDeDatos($Alumno)
{
    $isOk = true;

    // Verificacion del nombre
    if (!isset($Alumno['name']) || strlen($Alumno['name']) < 3 || strlen($Alumno['name']) > 50) {
        // El nombre está vacío o tiene menos de 3 caracteres o mas de 50
        $isOk = false;
    }

    // Verificacion de la fecha
    if (!isset($Alumno['bd']) || !preg_match("/^\d{4}-\d{2}-\d{2}$/", $Alumno['bd']) || strtotime($Alumno['bd']) === false) {
        // La fecha no es válida
        $isOk = false;
    } else {
        $year = date('Y', strtotime($Alumno['bd']));
        if ($year < 1950 || $year > 2099) {
            // El año está fuera del rango
            $isOk = false;
        }
    }

    // Verificacion del telefono
    if (isset($Alumno['tel']) && !preg_match("/^[679]\d{8}$/", $Alumno['tel'])) {
        // El teléfono no es válido
        $isOk = false;
    }

    if (isset($Alumno['addr']) && (strlen($Alumno['addr']) < 7 || strlen($Alumno['addr']) > 100)) {
        // La dirección no es válida
        $isOk = false;
    }

    return $isOk;
}

if (!validacionDeDatos($Alumno)) {
    // Si falla la validacion
    header('Content-Type: application/json');
    echo json_encode(array('estado' => "ValidateException"));
    die();
}


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
