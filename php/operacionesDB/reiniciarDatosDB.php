<?php
// En este script se cargan una lista de alumnos y examenes a la aplicacion con el fin de poder probar la aplicacion
// Este script puede ser usado para desplegar el proyecto

try {
    $db = new PDO('sqlite:' . '../../basedatos/bd.sqlite');

    $sqlAlumnos = <<<SQL
    DELETE FROM students;
    UPDATE sqlite_sequence SET seq=0 WHERE name=students;
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Marta Maria, Toro", "2001-04-17" ,621234567 ,"Calle Primavera, 123" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Gemma Araujo,", "2002-09-05" ,734567890 ,"Calle del Sol, 456" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Kevin, Rodrigues", "2003-11-20" ,965432178 ,"Calle de la Luna, 789" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Gael, Tejera", "2004-07-08" ,689012345 ,"Calle Rosas, 1011" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Jose Alejandro, Carmona", "2005-02-14" ,656789012 ,"Calle del Bosque, 1314" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Jose Manuel, Dieguez", "2001-10-29" ,923456789 ,"Calle Amapola, 1516" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Maria Mar, Sevilla", "2002-05-12" ,678901234 ,"Calle de los Pinos, 1718" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Gemma, Canovas", "2003-01-25" ,690123456 ,"Calle Azahar, 1920" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Noe, Martinez", "2004-08-31" ,679012345 ,"Calle Jazmín, 2122" );
    INSERT INTO students (student_name, student_bd, student_tel, student_address) VALUES ("Ismael, Iniesta", "2005-06-16" ,742198765 ,"Calle de la Montaña, 2324" );
    SQL;
    $sqlExamen = <<<SQL
    DELETE FROM exams;
    UPDATE sqlite_sequence SET seq=0 WHERE name=exams;
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (1, "2023-02-19", "Matematicas", 6, "Bastante Mejorable");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (1, "2023-10-07", "Lenguaje", 4, "Varios fallos en el ejecicio sintactico");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (2, "2023-02-19", "Matematicas", 7, "Muy bien!");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (2, "2023-10-07", "Lenguaje", 10, "Perfecto");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (3, "2023-02-19", "Matematicas", 4, "Error en una de las ecuaciones");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (3, "2023-10-07", "Lenguaje", 2, "El alumno se debe esforzar mas");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (4, "2023-02-19", "Matematicas", 10, "Perfecto");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (4, "2023-10-07", "Lenguaje", 6, "Se podria mejorar mas");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (5, "2023-02-19", "Matematicas", 7, "Bien");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (5, "2023-10-07", "Lenguaje", 6, "Retroalimentacion");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (6, "2023-02-19", "Matematicas", 2, "Hay demasidos errores de calculo");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (6, "2023-10-07", "Lenguaje", 0, "No entregado");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (7, "2023-02-19", "Matematicas", 4, "Entregado tarde");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (7, "2023-10-07", "Lenguaje", 10, "Muy buen examen");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (8, "2023-02-19", "Matematicas", 7, "Falta el desarrollo");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (8, "2023-10-07", "Lenguaje", 4, "Debe estudiar mas");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (9, "2023-02-19", "Matematicas", 8, "Bastante vien en general");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (9, "2023-10-07", "Lenguaje", 9, "Todo bien menos el ultimo ejercicio");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (10, "2023-02-19", "Matematicas", 3, "Podria estar mejor");
    INSERT INTO exams (student_id, exam_date, exam_subject, exam_grade, exam_notes) VALUES (10, "2023-10-07", "Lenguaje", 6, "Se podria mejorar un poco la caligrafia");

    SQL;

    $db->exec($sqlAlumnos);
    $db->exec($sqlExamen);
    echo "ok";
} catch (PDOException $e) {
    echo "ERROR!: " . $e;
    unset($db);
    die();
}
