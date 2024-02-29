"use strict";
/* La clase Examen representa a la entidad alumnno de la BD*/

class Examen {
  constructor(id, alumno, fecha, asignatura, calificacion, anotaciones) {
    this.id = id;
    this.alumno = alumno;
    this.fecha = fecha;
    this.asignatura = asignatura;
    this.calificacion = calificacion;
    this.anotaciones = anotaciones;
  }

  examenToRow() {
    /* Esta funcion devuelve un TR con algunos datos de los Examenes*/

    // Para añadir los elementos se utiliza el DOM
    let row = document.createElement("tr");
    let nombreTd = document.createElement("td");
    nombreTd.innerText = this.alumno["nombre"];
    nombreTd.setAttribute("data-idExamen", this.id);

    let asignaturaTd = document.createElement("td");
    asignaturaTd.innerText = this.asignatura;

    let calificacionTd = document.createElement("td");
    calificacionTd.innerText = this.calificacion;

    // Tambien se crearan los botones para las funciones principales de la aplicacion
    let optTd = document.createElement("td");

    // A cada boton se le asinara un name y una imagen luego sera usado en el EventListener de la tabla
    let btnDetalles = document.createElement("button");
    btnDetalles.name = "detalles";
    btnDetalles.title = "Ver detalles del alumno";
    btnDetalles.innerHTML = `<img width='24' style="pointer-events:none;" src='../img/opcionesTabla/detalles.png' />`;

    let btnBorrar = document.createElement("button");
    btnBorrar.name = "borrar";
    btnBorrar.title = "Eliminar al Alumno";
    btnBorrar.innerHTML = `<img width='24' style="pointer-events:none;" src='../img/opcionesTabla/borrar.png' />`;

    let btnModificar = document.createElement("button");
    btnModificar.name = "modificar";
    btnModificar.title = "Modificar al Alumno";
    btnModificar.innerHTML = `<img width='24' style="pointer-events:none;" src='../img/opcionesTabla/modificar.png' />`;

    // Se añaden los elementos mediante appendChild
    row.appendChild(nombreTd);
    row.appendChild(asignaturaTd);
    row.appendChild(calificacionTd);
    row.appendChild(optTd);
    optTd.appendChild(btnDetalles);
    optTd.appendChild(btnBorrar);
    optTd.appendChild(btnModificar);

    // Se devuelve el TR
    return row;
  }
}
