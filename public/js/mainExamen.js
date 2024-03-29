"use strict";

///////////////////////
// Variables globales
/////////////////////
var idAEliminar = -1;
var idAModificar = -1;
var idAlumnoAModificar = -1;

//////////////
// Functions
/////////////
const validarExamen = (
  alumno,
  fecha,
  asignatura,
  calificacion,
  anotaciones
) => {
  let arrErrores = Array();

  // Comprobaciones del id alumno

  if (!(Number.isInteger(alumno) && alumno >= 0)) {
    arrErrores.push("Error en el ID");
  }

  // Validaciones de la fecha del examen

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    arrErrores.push("La fecha del examen no concuerda");
  }

  const valFecha = new Date(fecha);
  if (isNaN(valFecha.getTime())) {
    arrErrores.push("La fecha que se ha introducido es erronea");
  } else {
    if (valFecha.getFullYear() <= 1900 || valFecha.getFullYear() >= 2099) {
      arrErrores.push("El año debe estar entre 1900 y 2099");
    }
  }

  // Validaciones de la Asignatura
  if (!asignatura || asignatura.length < 4 || asignatura.length > 50) {
    arrErrores.push("La asignatura debe tener entre 4 y 50 caracteres");
  }

  //  Validaciones de la Calificacion
  if (calificacion < 0 || calificacion > 10) {
    arrErrores.push("La calificación debe estar entre 0 y 10");
  }

  // Validaciones de las Anotaciones
  if (anotaciones.length < 2 || anotaciones.length > 256) {
    arrErrores.push("Las anotaciones deben estar entre 2 y 256 caracteres");
  }

  // Se devuelven los errores
  return arrErrores;
};

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
      aManager.buscarExamen(id, aManager.mostrarDetallesExamen);
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
      // Aqui se abre el DIALOG para modificar alumnos
      document.querySelector("#dModificarExamen").showModal();

      // Se guarda el id del alumno en una variable global
      idAModificar = id;

      // Se muestran los datos actuales del alumno en el formulario
      aManager.buscarExamen(idAModificar, aManager.mostrarModificarExamen);

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
    aManager.construirSelect("#selectAlumnos");
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

  // Validacion de datos

  let errores = validarExamen(
    alumno,
    fecha,
    asignatura,
    calificacion,
    anotaciones
  );

  if (errores.length == 0) {
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
document.querySelector("#btnModificarCerrar").addEventListener("click", () => {
  document.querySelector("#dModificarExamen").close();
  const divErrores = (document.querySelector(
    "#divErroresModificar"
  ).firstElementChild.innerHTML = "");
  createToast("No se ha modificado ningun Examen", "warning");
});

// Evento por si se decide Modificar el examen en el DIALOG para modificar el examen
document.querySelector("#btnModificarExamen").addEventListener("click", () => {
  const divErrores = document.querySelector(
    "#divErroresModificar"
  ).firstElementChild;

  let form = document.querySelector("#formModificarExamen");

  let fecha = String(form[1].value);
  let asignatura = String(form[2].value);
  let calificacion = Number(form[3].value);
  let anotaciones = String(form[4].value);

  // Validacion de datos
  let errores = validarExamen(
    idAlumnoAModificar,
    fecha,
    asignatura,
    calificacion,
    anotaciones
  );

  if (errores.length == 0) {
    // Si no hay errores se sigue
    let examen = new Examen(
      idAModificar,
      idAlumnoAModificar,
      fecha,
      asignatura,
      calificacion,
      anotaciones
    );

    aManager.modificarExamen(examen);
    document.querySelector("#dModificarExamen").close();
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

// Evento para el boton de filtrar Examenes
document.querySelector("#btnFiltrarAlumnos").addEventListener("click", () => {
  let form = document.querySelector("#formFiltrarExamenes");
  let alumno = Number(form[0].value);
  let asignatura = String(form[1].value);
  let suspenso = form[2].value;

  // Se establecen un array asociativo con los filtros
  let filtros = new Array();
  filtros["alumno"] = alumno;
  filtros["asignatura"] = asignatura;
  filtros["suspenso"] = suspenso;

  // Se ejecuta la funcion para filtrar los Examenes
  aManager.obtenerExamenesFiltrados(filtros, aManager.mostrarTablaExamen);
});

// Evento para reiniciar filtros
document.querySelector("#btnReiniciar").addEventListener("click", () => {
  let form = document.querySelector("#formFiltrarExamenes");
  form[1].value = "";

  // Se reincia la tabla
  aManager.obtenerExamenes(aManager.mostrarTablaExamen);
});

//////////
// Main
/////////

/* Se instancia aManager que es la App principal y se muestran todos los examenes de la DB*/
let aManager = new App();
aManager.obtenerExamenes(aManager.mostrarTablaExamen);

// Se construye el select de filtros
aManager.construirSelect("#selectAlumnosFiltrar");
