"use strict";

///////////////////////
// Variables globales
/////////////////////
var idAEliminar = -1;
var idAModificar = -1;

//////////////
// Functions
/////////////

///////////
// Events
///////////

// Control de la tabla principal
document.querySelector("#tablaExamenes").addEventListener("click", (e) => {
  // En funcion del boton que se seleciono se hara una funcion
  if (e.target.tagName === "BUTTON") {
    let botonClickeado = e.target;
    let funcion = e.target.name;
    // Se obtiene el id de la tabla
    let id = Number(
      e.target.parentElement.parentElement.children[0].getAttribute("data-id")
    );

    if (funcion == "detalles") {
      // Aqui se ejecuta la funcion buscar examenes con la que se abren los detalles del examen y se le pasa el id
      alert(id + funcion);
      return;
    }
    if (funcion == "borrar") {
      // Aqui se abre en el dialog el nombre del examen

      // Se guarda el id del examen en una variable global

      // Mostrar el dialogo de confirmacion
      alert(id + funcion);

      return;
    }
    if (funcion == "modificar") {
      // Aqui se abre el DIALOG para modificar examenes

      // Se guarda el id del examen en una variable global

      // Se muestran los datos actuales del examen en el formulario
      alert(id + funcion);

      return;
    }
  }
});
// Evento para cerrar el dialog de los detalles

// Evento para cerrar el dialog de eliminar examen

// Evento por si se decide borrar a un examen

// Evento para cuando se pulsa el boton añadir examenes

// Evento para cuando se pulsa el boton cerrar de el dialog para añadir examenes

// Evento por si se decide añadir el examen en el dialog para añadir el examen

// Evento para cerrar el dialog Modificar Examenes

// Evento por si se decide Modificar el examen en el DIALOG para modificar el examen

// Evento para el boton de filtrar Examenes

// Evento para reiniciar filtros

//////////
// Main
/////////

/* Se instancia aManager que es la App principal y se muestran todos los examenes de la DB*/
let aManager = new App();
aManager.obtenerExamenes(aManager.mostrarTablaExamen);
