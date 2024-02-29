"use strict";

/* La clase App se encarga del control de todas las funciones de la aplicacion*/

class App {
  constructor() {}

  ///////////////////////////
  // Funciones Tabla Alumnos
  /////////////////////////

  obtenerAlumnos(callback) {
    /* Esta funcion obtiene todos los alumnos de la base de datos,
    Esta funcion se llama al principio de la aplicacion y para 
    actualizar los registros por pantalla */

    fetch("../../php/tablaAlumnos/listarAlumnos.php")
      .then((response) => response.json())
      .then((JSONalumnos) => {
        let arrAlumnos = [];
        // Luego recorre el objeto JSON recibido y va instanciando alumnos y metiendolos en un array
        JSONalumnos.forEach((e) => {
          let alumno = new Alumno(
            e.student_id,
            e.student_name,
            e.student_bd,
            e.student_tel,
            e.student_address
          );
          arrAlumnos.push(alumno);
        });

        // Este array se pasara a una funcion de callback para que se procesen los datos
        // El array es una lista objetos tipo alumno
        // Funcion de callback
        callback(arrAlumnos);
      })
      .catch((error) => {
        // En caso de que haya un error en la aplicacion se mostrara un toast y la tabla vacia
        createToast("Ha ocurrido un error en el servidor", "error");
        this.mostrarTablaAlumnos([]);
      });
  }

  obtenerAlumnosFiltrados(callback, filtros) {
    /* Esta funcion obtiene todos los alumnos de la base de datos y filtra a los alumnos */

    fetch("../../php/tablaAlumnos/listarAlumnos.php")
      .then((response) => response.json())
      .then((JSONalumnos) => {
        let arrAlumnos = [];
        // Luego recorre el objeto JSON recibido y va instanciando alumnos y aplicando los filtros
        JSONalumnos.forEach((e) => {
          let alumno = new Alumno(
            e.student_id,
            e.student_name,
            e.student_bd,
            e.student_tel,
            e.student_address
          );

          // Se procesan los filtros

          let nombreAlumno = alumno.name.toLowerCase();
          let nombreComparar = filtros["name"].toLowerCase();
          let telefonoAlumno = String(alumno.tel);
          let telefonoComparar = String(filtros["tel"]);

          // Aqui se evaluan los casos para filtrar

          if (!(nombreComparar.length == 0) && !(telefonoComparar == 0)) {
            // Se van a filtrar el nombre y el telefono

            if (
              nombreAlumno.includes(nombreComparar) &&
              telefonoAlumno.includes(telefonoComparar)
            ) {
              arrAlumnos.push(alumno);
            }
          } else {
            if (!(nombreComparar.length == 0)) {
              // Se va a filtrar solo por el nombre

              if (nombreAlumno.includes(nombreComparar)) {
                arrAlumnos.push(alumno);
              }
            } else {
              // Se va a filtrar por el telefono
              if (telefonoAlumno.includes(telefonoComparar)) {
                arrAlumnos.push(alumno);
              }
            }
          }
        });

        callback(arrAlumnos);
      })
      .catch((error) => {
        // En caso de que haya un error en la aplicacion se mostrara un toast y la tabla vacia
        createToast("Ha ocurrido un error en el servidor", "error");
        this.mostrarTablaAlumnos([]);
      });
  }

  mostrarTablaAlumnos(arrAlumnos) {
    // Esta funcion borra el cuerpo de la tabla actual y representa a los alumnos
    document.querySelector("#listaAlumnos").innerHTML = "";

    // En caso de que no haya alumnos que representar se le hara saber al usuario
    if (arrAlumnos.length == 0) {
      document.querySelector("#listaAlumnos").innerHTML =
        "<tr ><td colspan='4'>No se han encontrado alumnos</td></tr>";
    } else {
      // Si hay alumnos estos se mostraran por pantalla
      arrAlumnos.forEach((alumno) => {
        /* Para obtener el TR con los datos del alumno y 
        las funciones se hace uso de la fucnion alumnoToRow de la clase Alumno */
        document
          .querySelector("#listaAlumnos")
          .appendChild(alumno.alumnoToRow());
      });
    }
  }
  buscarAlumno(id, callback) {
    /* Esta funcion obtiene a base de un id el registro con los datos de un alumno */
    /* Como parametros esta el id del alumno a buscar y la funcion de callback a ejecutar */

    // Realizar la solicitud Fetch POST, el id se mandara en forma de URL
    fetch("../../php/tablaAlumnos/obtenerAlumno.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + encodeURIComponent(id),
    })
      .then((response) => {
        // Aqui se verifica si el servidor ha respondido
        if (!response.ok) {
          throw new Error("server");
        }
        // Aqui se devuelve dicho JSON
        return response.json();
      })
      .then((JSONAlumno) => {
        /* En caso de que el servidor devuelva la peticion con un 
        id == -1 significa que el alumno no existe en la base de datos por lo que se mostrara un error 
        Esto no deberia ocurrir nunca pero se maneja el error */

        if (JSONAlumno.student_id == -1) {
          throw new Error("notFound");
        } else {
          /* Ahora se instancia el alumno requerido y se le manda a la funcion de callback para sacarlo por pantalla*/
          let alumno = new Alumno(
            JSONAlumno.student_id,
            JSONAlumno.student_name,
            JSONAlumno.student_bd,
            JSONAlumno.student_tel,
            JSONAlumno.student_address
          );

          // Funcion de callback
          callback(alumno);
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud

        if (error == "server") {
          createToast("Ha ocurrido en error en el servidor", "error");
        } else {
          createToast("No se ha encontrado al alumno", "error");
        }
      });
  }

  eliminarAlumno(id) {
    /* Esta funcion elimina a alumno, no tiene callback */

    fetch("../../php/tablaAlumnos/eliminarAlumno.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + encodeURIComponent(id),
    })
      .then((response) => {
        // Aqui se verifica si el servidor ha respondido
        if (!response.ok) {
          throw new Error("server");
        }
        // Aqui se devuelve dicho JSON
        return response.json();
      })
      .then((resultado) => {
        if (resultado.estado == "ok") {
          createToast(
            "Se ha eliminado al alumno con id " + id + " Correctamente",
            "success"
          );

          /*Se refresca la lista de alumnos*/
          this.obtenerAlumnos(this.mostrarTablaAlumnos);
        } else {
          throw new Error("notErased");
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud

        if (error == "server") {
          createToast("Ha ocurrido un error en el servidor", "error");
        } else {
          createToast("No se ha podido eliminar al Alumno", "error");
        }
      });
  }

  mostrarDetallesAlumno(alumnno) {
    /* Recibe como parametro un objeto alumno, simplemente va navegando
    por el DOM del formulario ubicado en el DIALOG y le va poniendo sus respectivos valores */

    let formDetalles = document.forms[1].children;
    formDetalles[0].children[0].value = Number(alumnno.id);
    formDetalles[2].children[0].value = String(alumnno.name);
    formDetalles[4].children[0].value = String(alumnno.bd);
    formDetalles[6].children[0].value = Number(alumnno.tel);
    formDetalles[8].children[0].value = String(alumnno.addr);
  }

  crearAlumno(Alumno) {
    // Funcion encargada de añadir un alumno a la DB a partir de un objeto Alumno

    fetch("../../php/tablaAlumnos/crearAlumno.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Alumno),
    })
      .then((response) => {
        if (!response.ok) {
          createToast("Error en la red", "error");
        }
        return response.json();
      })
      .then((data) => {
        // Manejardor de errores
        if (data["estado"] == "ok") {
          // Se actualiza y se introduce el alumno a la DB mediante PHP y se actualiza la lista
          createToast("Alumno añadido correctamente", "success");

          this.obtenerAlumnos(this.mostrarTablaAlumnos);
        } else {
          createToast("No se ha podido añadir al Alumno", "error");
        }
      })
      .catch((error) => {
        createToast("No se ha podido añadir al Alumno", "error");
      });
  }

  mostrarModificarAlumno(alumnno) {
    /* Recibe como parametro un objeto alumno, simplemente va navegando
    por el DOM del formulario ubicado en el DIALOG para modificar alumnos 
    y le va poniendo sus respectivos valores 
    con la intencion de que el usuario los modifique, salvo el ID que se guarda en la variable 
    global*/
    let formModificar = document.querySelector("#formModificarAlumno");
    formModificar.children[0].children[0].value = String(alumnno.name);
    formModificar.children[2].children[0].value = String(alumnno.bd);
    formModificar.children[4].children[0].value = Number(alumnno.tel);
    formModificar.children[6].children[0].value = String(alumnno.addr);
  }

  modificarAlumno(Alumno) {
    // Funcion encargada de modificar los datos de un alumno de la DB a partir de un objeto Alumno

    fetch("../../php/tablaAlumnos/modificarAlumno.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Alumno),
    })
      .then((response) => {
        if (!response.ok) {
          createToast("Error en la red", "error");
        }
        return response.json();
      })
      .then((data) => {
        // Manejardor de errores
        if (data["estado"] == "ok") {
          // Se actualiza y se modifica el alumno a la DB mediante PHP y se actualiza la lista
          createToast("Alumno modificado correctamente", "success");

          this.obtenerAlumnos(this.mostrarTablaAlumnos);
        } else {
          createToast("No se ha podido modificar al Alumno", "error");
        }
      })
      .catch((error) => {
        createToast("No se ha podido modificar al Alumno", "error");
      });
  }

  ///////////////////////////
  // Funciones Tabla Examen
  /////////////////////////

  obtenerExamenes(callback) {
    /* Esta funcion obtiene todos los examenes de la base de datos,
    Esta funcion se llama al principio de la aplicacion y para 
    actualizar los registros por pantalla */

    fetch("../../php/tablaExamenes/listarExamenes.php")
      .then((response) => response.json())
      .then((JSONExamen) => {
        let arrExamenes = [];
        // Luego recorre el objeto JSON recibido y va instanciando Examenes y metiendolos en un array
        JSONExamen.forEach((e) => {
          const alumno = { id: e.student_id, nombre: e.student_name };

          let examen = new Examen(
            e.exam_id,
            alumno,
            e.exam_date,
            e.exam_subject,
            e.exam_grade,
            e.exam_notes
          );

          arrExamenes.push(examen);
        });

        // Este array se pasara a una funcion de callback para que se procesen los datos
        // El array es una lista objetos tipo Examen
        // Funcion de callback
        callback(arrExamenes);
      })
      .catch((error) => {
        // En caso de que haya un error en la aplicacion se mostrara un toast y la tabla vacia
        createToast("Ha ocurrido un error en el servidor", "error");
        this.mostrarTablaExamen([]);
      });
  }

  mostrarTablaExamen(arrExamenes) {
    // Esta funcion borra el cuerpo de la tabla actual y representa los Examenes
    document.querySelector("#listaExamenes").innerHTML = "";

    // En caso de que no haya alumnos que representar se le hara saber al usuario
    if (arrExamenes.length == 0) {
      document.querySelector("#listaExamenes").innerHTML =
        "<tr><td colspan='4'>No se han encontrado examenes</td></tr>";
    } else {
      // Si hay Examenes estos se mostraran por pantalla
      arrExamenes.forEach((examen) => {
        /* Para obtener el TR con los datos del examen y 
        las funciones se hace uso de la fucnion examenToRow de la clase Examen */
        document
          .querySelector("#listaExamenes")
          .appendChild(examen.examenToRow());
      });
    }
  }

  buscarExamen(id, callback) {
    /* Esta funcion obtiene a base de un id el registro con los datos de un examen */
    /* Como parametros esta el id del examen a buscar y la funcion de callback a ejecutar */

    // Realizar la solicitud Fetch POST, el id se mandara en forma de URL
    fetch("../../php/tablaExamenes/obtenerExamen.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + encodeURIComponent(id),
    })
      .then((response) => {
        // Aqui se verifica si el servidor ha respondido
        if (!response.ok) {
          throw new Error("server");
        }
        // Aqui se devuelve dicho JSON
        return response.json();
      })
      .then((JSONExamen) => {
        /* En caso de que el servidor devuelva la peticion con un 
        id == -1 significa que el examen no existe en la base de datos por lo que se mostrara un error 
        Esto no deberia ocurrir nunca pero se maneja el error */

        if (JSONExamen.exam_id == -1) {
          throw new Error("notFound");
        } else {
          const alumno = {
            id: JSONExamen.student_id,
            nombre: JSONExamen.student_name,
          };

          let examen = new Examen(
            JSONExamen.exam_id,
            alumno,
            JSONExamen.exam_date,
            JSONExamen.exam_subject,
            JSONExamen.exam_grade,
            JSONExamen.exam_notes
          );
          // Funcion de callback
          callback(examen);
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        if (error == "server") {
          createToast("Ha ocurrido en error en el servidor", "error");
        } else {
          createToast("No se ha encontrado el Examen", "error");
        }
      });
  }

  mostrarDetallesExamen(examen) {
    /* Recibe como parametro un objeto alumno, simplemente va navegando
    por el DOM del formulario ubicado en el DIALOG y le va poniendo sus respectivos valores */

    let formDetalles =
      document.querySelector("#dDatosExamen").firstElementChild;

    formDetalles[0].value = Number(examen.id);
    formDetalles[1].value = String(examen.alumno["nombre"]);
    formDetalles[2].value = String(examen.fecha);
    formDetalles[3].value = String(examen.asignatura);
    formDetalles[4].value = Number(examen.calificacion);
    formDetalles[5].value = String(examen.anotaciones);
  }

  eliminarExamen(id) {
    /* Esta funcion elimina a examen, no tiene callback */

    fetch("../../php/tablaExamenes/eliminarExamen.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + encodeURIComponent(id),
    })
      .then((response) => {
        // Aqui se verifica si el servidor ha respondido
        if (!response.ok) {
          throw new Error("server");
        }
        // Aqui se devuelve dicho JSON
        return response.json();
      })
      .then((resultado) => {
        if (resultado.estado == "ok") {
          createToast(
            "Se ha eliminado el Examen con id " + id + " Correctamente",
            "success"
          );

          /*Se refresca la lista de Examenes*/
          this.obtenerExamenes(this.mostrarTablaExamen);
        } else {
          throw new Error("notErased");
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        if (error == "server") {
          createToast("Ha ocurrido un error en el servidor", "error");
        } else {
          createToast("No se ha podido eliminar el Examen", "error");
        }
      });
  }

  construirSelectAñadirExamen() {
    /* Esta funcion obtiene todos los alumnos de la base de datos para representarlos en un select*/

    fetch("../../php/tablaAlumnos/listarAlumnos.php")
      .then((response) => response.json())
      .then((JSONalumnos) => {
        let select = document.querySelector("#selectAlumnos");
        select.innerHTML = "";

        if (JSONalumnos.length === 0) {
          throw new Error("alumnosEmpty");
        } else {
          JSONalumnos.forEach((e) => {
            let option = document.createElement("OPTION");
            option.innerText = e.student_name;
            option.setAttribute("value", e.student_id);
            select.appendChild(option);
          });
        }
      })
      .catch((error) => {
        createToast(
          "No se pueden mostrar alumnos, la tabla Alumnos esta vacia",
          "error"
        );
      });
  }

  crearExamen(Examen) {
    // Funcion encargada de añadir un examen a la DB a partir de un objeto Examen

    fetch("../../php/tablaExamenes/crearExamen.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Examen),
    })
      .then((response) => {
        if (!response.ok) {
          createToast("Error en la red", "error");
        }
        return response.json();
      })
      .then((data) => {
        // Manejardor de errores
        if (data["estado"] == "ok") {
          // Se actualiza y se introduce el examen a la DB mediante PHP y se actualiza la lista
          createToast("Alumno añadido correctamente", "success");

          this.obtenerExamenes(this.mostrarTablaExamen);
        }

        if (data["estado"] == "errorAlumno") {
          createToast(
            "El examen no puede ser añadido a un alumno que no existe",
            "error"
          );
        }
      })
      .catch((error) => {
        createToast("No se ha podido añadir el Examen", "error");
      });
  }

  mostrarModificarExamen(examen) {
    /* Recibe como parametro un objeto examen, simplemente va navegando
    por el DOM del formulario ubicado en el DIALOG para modificar examenes 
    y le va poniendo sus respectivos valores 
    con la intencion de que el usuario los modifique, salvo el ID que se guarda en la variable 
    global*/
    let formModificar =
      document.querySelector("#dModificarExamen").firstElementChild;

    // Tambien se guarda en la variable global el id del alumno, este es el que realmente se mandara
    idAlumnoAModificar = Number(examen.alumno["id"]);

    formModificar[0].value = String(examen.alumno["nombre"]);
    formModificar[1].value = String(examen.fecha);
    formModificar[2].value = String(examen.asignatura);
    formModificar[3].value = Number(examen.calificacion);
    formModificar[4].value = String(examen.anotaciones);
  }

  modificarExamen(Examen) {
    // Funcion encargada de modificar los datos de un examen de la DB a partir de un objeto Examen

    fetch("../../php/tablaExamenes/modificarExamen.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Examen),
    })
      .then((response) => {
        if (!response.ok) {
          createToast("Error en la red", "error");
        }
        return response.json();
      })
      .then((data) => {
        // Manejador de errores
        if (data["estado"] == "ok") {
          // Se actualiza y se modifica el examen de la DB mediante PHP y se actualiza la lista
          createToast("Examen modificado correctamente", "success");

          this.obtenerExamenes(this.mostrarTablaExamen);
        } else {
          createToast("No se ha podido modificar el Examen", "error");
        }
      })
      .catch((error) => {
        createToast("No se ha podido modificar el Examen", "error");
      });
  }
}
