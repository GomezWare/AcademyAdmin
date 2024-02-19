"use strict";

/* La clase App se encarga del control de todas las funciones de la aplicacion*/

class App {
  constructor() {
    this.arrAlumnos = this.fetchAlumnos();
    this.arrAlumnos = this.fetchExamenes();
  }
  fetchAlumnos() {
    let arrAlumnos;

    // Realiza una solicitud GET a listarAlumnos.php
    fetch("../../php/listarAlumnos.php")
      .then((response) => {
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        // Parsea la respuesta JSON
        return response.json();
      })
      .then((data) => {
        /* A partir del JSON recibido se instanciaran alumnos que se añadiran al array  */
      })
      .catch((error) => {
        // Maneja errores de red u otras excepciones
        console.error("Error:", error);
      });
  }
  fetchExamenes() {
    return "algo";
  }
}
