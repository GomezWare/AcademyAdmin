<?php
/* En este fichero se devolvera un JSON con todos los datos de los alumnos de la DB */

// Conexion DB
$db = new PDO('sqlite:' . '../basedatos/bd.sqlite');

$query = "SELECT * FROM student";