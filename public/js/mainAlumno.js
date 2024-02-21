"use strict";
// Functions
function abrirDialogDetalles() {
  document.querySelector("#dDatosAlumno").showModal();
}
// Events

// Control de la tabla principal
document.querySelector("#tablaAlumnos").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let botonClickeado = e.target;
    let funcion = e.target.name;
    let id = Number(
      e.target.parentElement.parentElement.children[0].textContent
    );

    if (funcion == "detalles") {
      aManager.buscarAlumno(id, aManager.mostrarDetallesAlumno);
      abrirDialogDetalles();
      return;
    }
    if (funcion == "borrar") {
      alert(funcion + id);
      return;
    }
    if (funcion == "modificar") {
      alert(funcion + id);
      return;
    }
    if (funcion == "calificar") {
      alert(funcion + id);
      return;
    }
  }
});

// Evento para cerrar el dialog de los detalles
document.querySelector("#btnCerrarDetalles").addEventListener("click", () => {
  document.querySelector("#dDatosAlumno").close();
});

// Main

/* Se instancia aManager que es la App principal y se muestran todos los alumnos de la DB*/
let aManager = new App();
aManager.obtenerAlumnos(aManager.mostrarTablaAlumnos);
