"use strict";

/* La clase App se encarga del control de todas las funciones de la aplicacion*/

class App {
  constructor() {}

  obtenerAlumnos(callback) {
    /* Esta funcion obtiene todos los alumnos de la base de datos,
    Esta funcion se llama al principio de la aplicacion y para 
    actualizar los registros por pantalla */

    fetch("../../php/listarAlumnos.php")
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
        // TODO TOAST mostrar error de serviodor
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
    fetch("../../php/obtenerAlumno.php", {
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
          // TODO TOAST con error del servidor
        } else {
          // TODO TOAST con error no se encuentra el alumno
        }
      });
  }

  eliminarAlumno(id) {
    /* Esta funcion elimina a alumno, no tiene callback */

    fetch("../../php/eliminarAlumno.php", {
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
          // TODO TOAST confirmando la eliminacion del alumno

          /*Se refresca la lista de alumnos*/
          this.obtenerAlumnos(this.mostrarTablaAlumnos);
        } else {
          throw new Error("notErased");
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud

        if (error == "server") {
          // TODO TOAST con error del servidor
          console.log("Error servidor");
        } else {
          // TODO TOAST con error no se ha podido eliminar el alumno
          console.log("Error al eliminar");
        }
      });
  }

  mostrarDetallesAlumno(alumnno) {
    /* Recibe como parametro un objeto alumno, simplemente va navegando
    por el DOM del formulario ubicado en el DIALOG y le va poniendo sus respectivos valores */

    let formDetalles = document.forms[1].children;
    formDetalles[0].children[0].value = alumnno.id;
    formDetalles[2].children[0].value = alumnno.name;
    formDetalles[4].children[0].value = alumnno.bd;
    formDetalles[6].children[0].value = alumnno.tel;
    formDetalles[8].children[0].value = alumnno.addr;
  }

  crearAlumno(Alumno) {
    // Funcion encargadas de añadir un alumno a la DB a partir de un objeto Alumno

    fetch("../../php/crearAlumno.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Alumno),
    })
      .then((response) => {
        if (!response.ok) {
          // TODO TOAST Error de red
        }
        return response.json();
      })
      .then((data) => {
        // TODO Manejar errores
        if (data["estado"] == "ok") {
          console.log("me ha llegado el ok");
          // Se actualiza introduce el alumno a la DB mediante PHP y se actualiza la alumno
          // TODO TOAST Alumno Añadido
          this.obtenerAlumnos(this.mostrarTablaAlumnos);
        } else {
          // TODO TOAST No se ha podido añadir al alumno
        }
      })
      .catch((error) => {
        // TODO TOAST No se ha podido añadir al alumno
      });
  }

  // DEBUG
  pruebaDeCallback(datos) {
    console.log("Se ha llegado a la funcion");
    console.log(datos);
  }
}
