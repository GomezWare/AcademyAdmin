"use script";
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
    let row = document.createElement("TR");
    let idTr = document.createElement("TD");
    let nameTr = document.createElement("TD");
    let telTr = document.createElement("TD");
    idTr.innerText = this.id;
    nameTr.innerText = this.name;
    telTr.innerText = this.tel;
    row.append(idTr, nameTr, telTr);
    return row;
  }
}
