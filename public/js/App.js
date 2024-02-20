"use strict";

/* La clase App se encarga del control de todas las funciones de la aplicacion*/

class App {
  constructor() {
    this.arrAlumnos = [];
  }

  obtenerAlumnos() {
    fetch("../../php/listarAlumnos.php")
      .then((response) => response.json())
      .then((data) => {
        let arr = [];
        data.forEach((e) => {
          let alumno = new Alumno(
            e.student_id,
            e.student_name,
            e.student_bd,
            e.student_tel,
            e.student_address
          );

          arr.push(alumno);
        });

        this.arrAlumnos = arr;
        this.mostrarTablaAlumnos();
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }

  mostrarTablaAlumnos() {
    this.arrAlumnos.forEach((alumno) => {
      document.querySelector("#tablaAlumnos").appendChild(alumno.alumnoToRow());
    });
  }
}
