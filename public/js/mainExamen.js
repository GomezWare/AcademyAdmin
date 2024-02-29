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
      e.target.parentElement.parentElement.children[0].getAttribute(
        "data-idExamen"
      )
    );

    if (funcion == "detalles") {
      // Aqui se ejecuta la funcion buscar examenes con la que se abren los detalles del examen y se le pasa el id
      aManager.buscarExamen(id, aManager.mostrarDetallesAlumno);
      document.querySelector("#dDatosExamen").showModal();
      return;
    }
    if (funcion == "borrar") {
      // Se guarda el id del examen en una variable global
      idAEliminar = id;

      // Mostrar el dialogo para borrar examenes
      document.querySelector("#dEliminarExamen").showModal();
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
document.querySelector("#btnCerrarDetalles").addEventListener("click", () => {
  document.querySelector("#dDatosExamen").close();
});

// Evento para cerrar el dialog de eliminar examen
document
  .querySelector("#btnCancelarEliminacion")
  .addEventListener("click", () => {
    document.querySelector("#dEliminarExamen").close();

    createToast("No se ha eliminado ningun Examen", "warning");
  });
// Evento por si se decide borrar a un examen
document.querySelector("#btnEliminar").addEventListener("click", () => {
  // Se recupera el id desde el xData y este es mandado a la funcion eliminar
  aManager.eliminarExamen(idAEliminar);

  // Una vez se ha completado se cierra la ventana
  document.querySelector("#dEliminarExamen").close();
});

// Evento para cuando se pulsa el boton añadir examenes
document
  .querySelector("#btnAbrirDialogAñadirExamen")
  .addEventListener("click", () => {
    // Se recuperan los alumnos utilizando el fetch de la tabla Alumnos (Esto se hace para mostrar los posibles alumnos a calificar)
    aManager.construirSelectAñadirExamen();
    // Se muestra el formulario para añadir examenes
    document.querySelector("#dAñadirExamen").showModal();
  });

// Evento para cuando se pulsa el boton cerrar de el dialog para añadir examenes

document.querySelector("#btnAñadirCerrar").addEventListener("click", () => {
  document.querySelector("#dAñadirExamen").close();
  document.querySelector("#divErroresAñadir").firstElementChild.innerHTML = "";

  createToast("No se ha añadido ningun examen", "warning");
});

// Evento por si se decide añadir el examen en el dialog para añadir el examen
document.querySelector("#btnAñadirExamen").addEventListener("click", () => {
  const divErrores =
    document.querySelector("#divErroresAñadir").firstElementChild;

  let form = document.querySelector("#formAñadirExamenes");

  let alumno = Number(form[0].value);
  let fecha = String(form[1].value);
  let asignatura = String(form[2].value);
  let calificacion = Number(form[3].value);
  let anotaciones = String(form[4].value);

  // TODO Validar Datos
  console.log(alumno, fecha, asignatura, calificacion, anotaciones);
  if (true) {
    // Si no hay errores se sigue
    let examen = new Examen(
      -1,
      alumno,
      fecha,
      asignatura,
      calificacion,
      anotaciones
    );
    aManager.crearExamen(examen);
    document.querySelector("#dAñadirExamen").close();
  } else {
    // Si hay errores se muestran al usuario
    divErrores.innerHTML = "";
    errores.forEach((error) => {
      let e = document.createElement("LI");
      e.innerText = error;
      divErrores.appendChild(e);
    });
  }
});

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
