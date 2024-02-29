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
    row.appendChild(idTd);
    row.appendChild(nameTd);
    row.appendChild(telTd);
    row.appendChild(optTd);
    optTd.appendChild(btnDetalles);
    optTd.appendChild(btnBorrar);
    optTd.appendChild(btnModificar);

    // Se devuelve el TR
    return row;
  }
}
