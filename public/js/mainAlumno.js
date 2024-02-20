"use strict";
// Functions

// Events

// Control de la tabla principal
document.querySelector("#tablaAlumnos").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    let botonClickeado = e.target;
    let funcion = e.target.classList;
    let id = Number(
      e.target.parentElement.parentElement.children[0].textContent
    );
    alert(funcion);
    alert(id);
  }
});

// Evento para cerrar el dialog de los detalles
document.querySelector("#btnCerrarDetalles").addEventListener("click", () => {
  dialogDetalles.close();
});

// Main
let aManager = new App();
aManager.obtenerAlumnos();

let dialogDetalles = document.querySelector("#dDatosAlumno");
dialogDetalles.showModal();
