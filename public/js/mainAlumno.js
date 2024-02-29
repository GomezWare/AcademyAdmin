"use strict";

///////////////////////
// Variables globales
/////////////////////
var idAEliminar = -1;
var idAModificar = -1;

//////////////
// Functions
/////////////
const validarAlumno = (nombre, bd, telefono, address) => {
  // Funcion encargada de las validaciones de datos del lado del cliente

  let errores = Array();

  // Validaciones del nombre
  if (nombre.length == 0 || nombre.length < 3) {
    errores.push("El nombre del alumno es demasiado corto minimo 3 caracteres");
  }

  if (nombre.length > 50) {
    errores.push(
      "El nombre del alumno es demasiado largo maximo 50 caracteres"
    );
  }

  if (/\d/.test(nombre)) {
    errores.push("El nombre del alumno no puede contener numeros");
  }
  // Validaciones de la fecha de nacimiento

  if (!/^\d{4}-\d{2}-\d{2}$/.test(bd)) {
    errores.push("La fecha de nacimiento no concuerda");
  }

  const valFecha = new Date(bd);
  if (isNaN(valFecha.getTime())) {
    errores.push("La fecha que se ha introducido es erronea");
  } else {
    if (valFecha.getFullYear() <= 1900 || valFecha.getFullYear() >= 2099) {
      errores.push("El año debe estar entre 1900 y 2099");
    }
  }

  // Validaciones del telefono
  if (telefono.toString().length !== 9) {
    errores.push("El numero de telefono debe de ser de 9 digitos");
  }

  if (/[a-zA-Z]/.test(telefono.toString())) {
    errores.push("El numero de telefono no es correcto");
  }

  if (/^[^679]/.test(telefono.toString())) {
    errores.push("El numero de telefono debe comenzar por 6, 7 o 9");
  }

  // Validaciones de la direccion
  if (address.length == 0 || address.length < 6) {
    errores.push("La direccion es demasiado corta, minimo 7 caracteres");
  }

  if (address.length > 100) {
    errores.push("La direccion no puede exceder los 100 caracteres");
  }

  return errores;
};

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

    createToast("No se ha eliminado ningun Alumno", "warning");
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
  document.querySelector("#DivErroresAñadir").firstElementChild.innerHTML = "";
  createToast("No se ha eliminado añadido ningun Alumno", "warning");
});

// Evento por si se decide añadir el alumno en el dialog para añadir al alumno
document.querySelector("#btnAñadirAlumno").addEventListener("click", () => {
  const divErrores =
    document.querySelector("#DivErroresAñadir").firstElementChild;
  let nombre = String(document.forms[0].children[0].children[0].value);
  let bd = String(document.forms[0].children[2].children[0].value);
  let tel = Number(document.forms[0].children[4].children[0].value);
  let addr = String(document.forms[0].children[6].children[0].value);

  let errores = validarAlumno(nombre, bd, tel, addr);

  if (errores.length == 0) {
    // Si no hay errores se sigue
    let al = new Alumno(-1, nombre, bd, tel, addr);
    aManager.crearAlumno(al);
    document.querySelector("#dAñadirAlumno").close();
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

// Evento para cerrar el dialog Modificar Alumnos
document.querySelector("#btnModificarCerrar").addEventListener("click", () => {
  document.querySelector("#dModificarAlumno").close();
  const divErrores = (document.querySelector(
    "#DivErroresModificar"
  ).firstElementChild.innerHTML = "");
  createToast("No se ha modificado ningun Alumno", "warning");
});

// Evento por si se decide Modificar el alumno en el DIALOG para modificar al alumno
document.querySelector("#btnModificarAlumno").addEventListener("click", () => {
  const divErrores = document.querySelector(
    "#DivErroresModificar"
  ).firstElementChild;
  let nombre = String(document.forms[2].children[0].children[0].value);
  let bd = String(document.forms[2].children[2].children[0].value);
  let tel = Number(document.forms[2].children[4].children[0].value);
  let addr = String(document.forms[2].children[6].children[0].value);

  // Se validan los datos
  let errores = validarAlumno(nombre, bd, tel, addr);

  if (errores.length == 0) {
    // Si no hay errores se sigue
    let al = new Alumno(idAModificar, nombre, bd, tel, addr);
    aManager.modificarAlumno(al);
    document.querySelector("#dModificarAlumno").close();
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

// Evento para el boton de filtrar Alumnos
document.querySelector("#btnFiltrarAlumnos").addEventListener("click", () => {
  let form = document.forms[3];
  let nombre = String(form.children[0].firstElementChild.value);
  let telefono = Number(form.children[1].firstElementChild.value);

  // Se crea un array que contiene los posibles filtros
  let filtros = new Array();
  filtros["name"] = nombre;
  filtros["tel"] = telefono;

  // Se ejecuta la funcion
  aManager.obtenerAlumnosFiltrados(aManager.mostrarTablaAlumnos, filtros);
});

// Evento para reiniciar filtros
document.querySelector("#btnReiniciar").addEventListener("click", () => {
  // Tambien se reinician los campos
  let form = document.forms[3];
  form.children[0].firstElementChild.value = "";
  form.children[1].firstElementChild.value = "";
  // Se vuelve a mostrar el listado de alumnos
  aManager.obtenerAlumnos(aManager.mostrarTablaAlumnos);
});

//////////
// Main
/////////

/* Se instancia aManager que es la App principal y se muestran todos los alumnos de la DB*/
let aManager = new App();
aManager.obtenerAlumnos(aManager.mostrarTablaAlumnos);
