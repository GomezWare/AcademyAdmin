"use strict";
/* Fichero encargado de las funcion de la Navbar y de la redirecciones de la pagina */

// Evento por si se pulsa el boton de menu en el modo movil
document.querySelector("#btnMenuMovil").addEventListener("click", () => {
  // Se recupera el menu, si esta abierto se cierra y si no se abre
  let menuMovil = document.querySelector("#enlaces-movil");
  menuMovil.classList.toggle("oculto");
});

// Eventos por si se pulsa el boton gestionar alumnos (Movil y escritorio)
document.querySelector("#aAlumnos").addEventListener("click", () => {
  let dominio = window.location.protocol + "//" + window.location.host;
  window.location.href = dominio + "/public/html/alumno.html";
});

document.querySelector("#aAlumnosM").addEventListener("click", () => {
  let dominio = window.location.protocol + "//" + window.location.host;
  window.location.href = dominio + "/public/html/alumno.html";
});

// Eventos por si se pulsa el boton gestionar examen (Movil y escritorio)
document.querySelector("#aExamenes").addEventListener("click", () => {
  let dominio = window.location.protocol + "//" + window.location.host;
  window.location.href = dominio + "/public/html/examen.html";
});

document.querySelector("#aExamenesM").addEventListener("click", () => {
  let dominio = window.location.protocol + "//" + window.location.host;
  window.location.href = dominio + "/public/html/examen.html";
});

// Evento por si se pulsa el logo (Volver al landing)
document.querySelector("#aInicio").addEventListener("click", () => {
  let dominio = window.location.protocol + "//" + window.location.host;
  window.location.href = dominio + "/index.html";
});

// Evento por si se pulsa el boton github
document.querySelector("#aGithub").addEventListener("click", () => {
  window.location.href = "https://github.com/GomezWare/AcademyAdmin";
});

// Evento por si se pulsa el boton github movil
document.querySelector("#aGithubM").addEventListener("click", () => {
  window.location.href = "https://github.com/GomezWare/AcademyAdmin";
});
