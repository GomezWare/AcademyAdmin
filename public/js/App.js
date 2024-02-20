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
        alert(
          "Ha ocurrido un error en la aplicacion, intentelo de nuevo mas tarde"
        );
      });
  }

  mostrarTablaAlumnos() {
    document.querySelector("#listaAlumnos").innerHTML = "";

    if (this.arrAlumnos.length == 0) {
      document.querySelector("#listaAlumnos").innerHTML =
        "<tr ><td colspan='4'>No se han encontrado alumnos</td></tr>";
    } else {
      this.arrAlumnos.forEach((alumno) => {
        document
          .querySelector("#listaAlumnos")
          .appendChild(alumno.alumnoToRow());
      });
    }
  }
  buscarAlumno(id) {}
}
