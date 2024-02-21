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
    let row = document.createElement("tr");
    let idTd = document.createElement("td");
    let nameTd = document.createElement("td");
    let telTd = document.createElement("td");
    let optTd = document.createElement("td");
    optTd.innerHTML = `
    <button name="detalles">Detalles</button><button name="borrar">Borrar</button><button name="modificar">Modificar</button><button name="calificar">Calificar</button>`;
    idTd.innerText = this.id;
    nameTd.innerText = this.name;
    telTd.innerText = this.tel;
    row.appendChild(idTd);
    row.appendChild(nameTd);
    row.appendChild(telTd);
    row.appendChild(optTd);
    return row;
  }
}
