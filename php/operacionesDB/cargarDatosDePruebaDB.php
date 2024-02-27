<?php
// En este script se cargan una lista de alumnos y examenes a la aplicacion con el fin de poder realizar debug
// Este script NO debe ser usado en produccion solo en desarrollo

try {
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    $sqlAlumnos = <<<SQL
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno1", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno2", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno3", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno4", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno5", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno6", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno7", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno8", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno9", "1991-09-17" ,600111222 ,"Alguna calle" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Alumno10", "1991-09-17" ,600111222 ,"Alguna calle" );
    SQL;

    $db->exec($sqlAlumnos);
    echo "ok";
} catch (PDOException $e) {
    echo "ERROR!: " . $e;
    unset($db);
    die();
}
