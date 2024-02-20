"use strict";
// Functions
function inicializacion() {
  let aManager = new App();
  aManager.obtenerAlumnos();
  aManager.mostrarTablaAlumnos();
  return aManager;
}

// Main

let aManager = inicializacion();
