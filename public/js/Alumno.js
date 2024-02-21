"use strict";
/* La clase Alumno representa a la entidad alumnno de la BD*/

class Alumno {
  constructor(id, name, bd, tel, addr) {
    this.id = id;
    this.name = name;
    this.bd = bd;
    this.tel = tel;
    this.addr = addr;
  }

  alumnoToRow() {
    /* Esta funcion devuelve un TR con algunos datos de los alumnos*/

    // Para añadir los elementos se utiliza el DOM
    let row = document.createElement("tr");
    let idTd = document.createElement("td");
    idTd.innerText = this.id;

    let nameTd = document.createElement("td");
    nameTd.innerText = this.name;

    let telTd = document.createElement("td");
    telTd.innerText = this.tel;

    // Tambien se crearan los botones para las funciones principales de la aplicacion
    let optTd = document.createElement("td");

    // A cada boton se le asinara un name luego sera usado en el EventListener de la tabla
    let btnDetalles = document.createElement("button");
    btnDetalles.name = "detalles";
    btnDetalles.innerText = "Detalles";

    let btnBorrar = document.createElement("button");
    btnBorrar.name = "borrar";
    btnBorrar.innerText = "Borrar";

    let btnModificar = document.createElement("button");
    btnModificar.name = "modificar";
    btnModificar.innerText = "Modificar";

    let btnCalificar = document.createElement("button");
    btnCalificar.name = "calificar";
    btnCalificar.innerText = "Calificar";

    // Se añaden los elementos mediante appendChild
    row.appendChild(idTd);
    row.appendChild(nameTd);
    row.appendChild(telTd);
    row.appendChild(optTd);
    optTd.appendChild(btnDetalles);
    optTd.appendChild(btnBorrar);
    optTd.appendChild(btnModificar);
    optTd.appendChild(btnCalificar);

    // Se devuelve el TR
    return row;
  }
}
