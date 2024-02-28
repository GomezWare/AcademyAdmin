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
      // Aqui se ejecuta la funcion buscar alumnos con la y se abren los detalles alumnos y se le pasa el id
      aManager.buscarAlumno(id, aManager.mostrarDetallesAlumno);
      document.querySelector("#dDatosAlumno").showModal();
      return;
    }
    if (funcion == "borrar") {
      // Aqui se pone el en dialog el nombre del alumno
      document.querySelector("#alumnoAEliminar").innerHTML =
        e.target.parentElement.parentElement.children[1].textContent;

      // Se guarda el id del alumno en una variable global
      idAEliminar = id;

      // Mostrar el dialogo alumnos
      document.querySelector("#dEliminarAlumno").showModal();
      return;
    }
    if (funcion == "modificar") {
      // Aqui se abre el DIALOG para modificar alumnos
      document.querySelector("#dModificarAlumno").showModal();

      // Se guarda el id del alumno en una variable global
      idAModificar = id;

      // Se muestran los datos actuales del alumno en el formulario
      aManager.buscarAlumno(idAModificar, aManager.mostrarModificarAlumno);
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
  aManager.eliminarAlumno(idAEliminar);

  // Una vez se ha completado se cierra la ventana
  document.querySelector("#dEliminarAlumno").close();
});

// Evento para cuando se pulsa el boton añadir alumno
document
  .querySelector("#btnAbrirDialogAñadirAlumno")
  .addEventListener("click", () => {
    document.querySelector("#dAñadirAlumno").showModal();
  });

// Evento para cuando se pulsa el boton cerrar de el dialog para añadir alumnos
document.querySelector("#btnAñadirCerrar").addEventListener("click", () => {
  document.querySelector("#dAñadirAlumno").close();

  // TODO TOAST No se ha añadido ningun Alumno
});

// Evento por si se decide añadir el alumno en el dialog para añadir lo alumno
document.querySelector("#btnAñadirAlumno").addEventListener("click", () => {
  const divErrores = document.querySelector("#DivErroresAñadir");
  let nombre = String(document.forms[0].children[0].children[0].value);
  let bd = String(document.forms[0].children[2].children[0].value);
  let tel = Number(document.forms[0].children[4].children[0].value);
  let addr = String(document.forms[0].children[6].children[0].value);

  // TODO Validacion de datos

  if (true) {
    let al = new Alumno(-1, nombre, bd, tel, addr);
    aManager.crearAlumno(al);
    document.querySelector("#dAñadirAlumno").close();
  } else {
    // TODO TOAST Decirle al usuario que compruebe los errores (Funcion validacion devuelve un ARRAY)
  }
});

// Evento para cerrar el dialog Modificar Alumnos
document.querySelector("#btnModificarCerrar").addEventListener("click", () => {
  document.querySelector("#dModificarAlumno").close();

  // TODO TOAST No se ha modificado el Alumno
});

// Evento por si se decide Modificar el alumno en el DIALOG para modificar al alumno
document.querySelector("#btnModificarAlumno").addEventListener("click", () => {
  const divErrores = document.querySelector("#DivErroresModificar");
  let nombre = String(document.forms[2].children[0].children[0].value);
  let bd = String(document.forms[2].children[2].children[0].value);
  let tel = Number(document.forms[2].children[4].children[0].value);
  let addr = String(document.forms[2].children[6].children[0].value);

  // TODO Validacion de datos

  if (true) {
    let al = new Alumno(idAModificar, nombre, bd, tel, addr);
    aManager.modificarAlumno(al);
    document.querySelector("#dModificarAlumno").close();
  } else {
    document.querySelector("#dModificarAlumno").close();
    // TODO TOAST Decirle al usuario que compruebe los errores (Funcion validacion devuelve un ARRAY)
  }
});

// Evento para el boton de filtrar Alumnos
document.querySelector("#btnFiltrarAlumnos").addEventListener("click", () => {
  let divErrores = document.querySelector("#divErroresFiltar");
  let form = document.forms[3];
  let nombre = String(form.children[0].firstElementChild.value);
  let telefono = Number(form.children[1].firstElementChild.value);

  // TODO Validacion de datos

  if (true) {
    let filtros = new Array();
    filtros["name"] = nombre;
    filtros["tel"] = telefono;
    aManager.obtenerAlumnosFiltrados(aManager.mostrarTablaAlumnos, filtros);
  } else {
    // TODO Mostrar errores
  }
});

// Evento para reiniciar filtros
document.querySelector("#btnReiniciar").addEventListener("click", () => {
  let form = document.forms[3];
  form.children[0].firstElementChild.value = "";
  form.children[1].firstElementChild.value = "";
  aManager.obtenerAlumnos(aManager.mostrarTablaAlumnos);
});

//////////
// Main
/////////

/* Se instancia aManager que es la App principal y se muestran todos los alumnos de la DB*/
let aManager = new App();
aManager.obtenerAlumnos(aManager.mostrarTablaAlumnos);
