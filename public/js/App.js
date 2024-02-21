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
  buscarAlumno(id) {
    // Realizar la solicitud Fetch POST
    fetch("../../php/obtenerAlumno.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + encodeURIComponent(id),
    })
      .then((response) => {
        // Verificar si la respuesta del servidor
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then((JSONAlumno) => {
        if (JSONAlumno.student_id == -1) {
          throw new Error("No se ha encontrado el alumno");
        } else {
          console.log(JSONAlumno);
          let alumno = new Alumno(
            JSONAlumno.student_id,
            JSONAlumno.student_name,
            JSONAlumno.student_bd,
            JSONAlumno.student_tel,
            JSONAlumno.student_address
          );
          this.mostrarDetallesAlumno(alumno);
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error("Error al realizar la solicitud:", error);
      });
  }

  mostrarDetallesAlumno(alumnno) {
    let formDetalles = document.forms[1].children;
    formDetalles[0].children[0].value = alumnno.id;
    formDetalles[2].children[0].value = alumnno.name;
    formDetalles[4].children[0].value = alumnno.bd;
    formDetalles[6].children[0].value = alumnno.tel;
    formDetalles[8].children[0].value = alumnno.addr;
  }
}
