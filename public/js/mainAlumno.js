"use strict";
//////////////
// Functions
/////////////

function abrirDialogDetalles() {
  document.querySelector("#dDatosAlumno").showModal();
}

///////////
// Events
///////////

// Control de la tabla principal
document.querySelector("#tablaAlumnos").addEventListener("click", (e) => {
  // En funcion del boton que se seleciono se hara una funcion
  if (e.target.tagName === "BUTTON") {
    let botonClickeado = e.target;
    let funcion = e.target.name;
    // Se obtiene el id de la tabla
    let id = Number(
      e.target.parentElement.parentElement.children[0].textContent
    );

    if (funcion == "detalles") {
      // Aqui se ejecuta la funcion buscar alumnos con la funcion detalles alumnos y se le pasa el id
      aManager.buscarAlumno(id, aManager.mostrarDetallesAlumno);
      abrirDialogDetalles();
      return;
    }
    if (funcion == "borrar") {
      // Aqui se pone el en dialog el nombre del alumno
      document.querySelector("#alumnoAEliminar").innerHTML =
        e.target.parentElement.parentElement.children[1].textContent;
      // Para poder seleccionar al alumno a borrar se le añade el id por medio de un atributo xdata
      document.querySelector("#alumnoAEliminar").setAttribute("idABorrar", id);
      document.querySelector("#dEliminarAlumno").showModal();
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

// Evento para cerrar el dialog de eliminar alumno
document
  .querySelector("#btnCancelarEliminacion")
  .addEventListener("click", () => {
    document.querySelector("#dEliminarAlumno").close();

    // TODO TOAST se ha cancelado la eliminacion del alumno
  });

// Evento por si se decide borrar a un alumno
document.querySelector("#btnEliminar").addEventListener("click", () => {
  // Se recupera el id desde el xData y este es mandado a la funcion eliminar
  aManager.eliminarAlumno(
    document.querySelector("#alumnoAEliminar").getAttribute("idABorrar")
  );

  // Una vez se ha completado se cierra la ventana
  document.querySelector("#dEliminarAlumno").close();
});

//////////
// Main
/////////

/* Se instancia aManager que es la App principal y se muestran todos los alumnos de la DB*/
let aManager = new App();
aManager.obtenerAlumnos(aManager.mostrarTablaAlumnos);
