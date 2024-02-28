"use strict";

// Script utilizado para generar toasts y mostrarlos por pantalla

const createToast = (mensaje, prioridad) => {
  /* Se recibe un mensaje y la prioridad del toast */

  // Se crea el elemento que es un DIV
  let toast = document.createElement("div");

  // Se le asigna la clase base toast
  toast.classList.add("toast");

  // En funcion de la prioridad se le asigna una paleta de colores y su icono correspondiente
  let img = document.createElement("IMG");
  switch (prioridad) {
    case "warning":
      toast.classList.add("toast-warning");
      img.setAttribute("src", "../img/toasts/warning.png");
      toast.appendChild(img);
      break;

    case "error":
      toast.classList.add("toast-error");
      img.setAttribute("src", "../img/toasts/error.png");
      toast.appendChild(img);
      break;

    case "success":
      toast.classList.add("toast-success");
      img.setAttribute("src", "../img/toasts/success.png");
      toast.appendChild(img);
      break;

    default:
      toast.classList.add("toast-normal");
      img.setAttribute("src", "../img/toasts/normal.png");
      toast.appendChild(img);
      break;
  }

  // se crea un P que contendrea el mensaje
  let msg = document.createElement("P");

  // Se introduce el mensaje que se quiera mostrar
  msg.innerText = mensaje;
  toast.appendChild(msg);

  // Se añade el Toast completo a la pagina
  document.body.appendChild(toast);

  setTimeout(() => {
    /* Esta funcion borra el toast en 3 segundos */
    removeToast(toast);
  }, 2500);
};

const removeToast = (toast) => {
  /* Funcion para quitar los toast, lo hara con una animacion */

  toast.classList.add("hide");
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 500);
};
