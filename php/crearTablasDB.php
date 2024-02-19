<?php

/* En este fichero se incializara la base de datos para su funcinamiento */
error_reporting(E_ALL);

/* Conexion PDO */
$db = new PDO('sqlite:' . '../basedatos/bd.sqlite');

/* Codigo SQL de la tabla students */
$studentSQL = <<<SQL
CREATE TABLE IF NOT EXISTS students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name VARCHAR(50),
    student_bd DATE,
    student_tel INTEGER(9),
    student_address VARCHAR(100)
);
SQL;

/* Codigo SQL de la tabla students */
$examSQL = <<<SQL
CREATE TABLE IF NOT EXISTS exam (
    exam_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    exam_date DATE,
    exam_grade INTEGER CHECK(exam_grade >= 0 AND exam_grade <= 10),
    exam_notes VARCHAR(256),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);
SQL;


// Se ejecutan las queries
try {
    $db->exec($studentSQL);
    $db->exec($examSQL);
    echo "Success";
} catch (PDOException $e) {
    echo 'Error:' . $e;
    die();
}