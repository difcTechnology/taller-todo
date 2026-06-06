let categoriaSeleccionada = document.getElementById("categoria");
let botonAgregar = document.getElementById("botonAgregar");
let tareas = [];
let categoria = "estudio";
let id = 0;

class Tarea {
  constructor(id, nombre, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
  }
}

categoriaSeleccionada.addEventListener("change", (evento) => {
  categoria = evento.target.value;
  console.log(categoria);
  habilitarPanelOtraCategoria(categoria);
});

botonAgregar.addEventListener("click", function () {
  agregarTarea(categoria);
});

function habilitarPanelOtraCategoria(categoria) {
  let divOtraCategoria = document.getElementById("divOtraCategoria");
  if (categoria == "otra") {
    divOtraCategoria.style.display = "block";
  } else {
    divOtraCategoria.style.display = "none";
  }
}

function agregarTarea(categoria) {
  let textoTarea = document.getElementById("textoTarea").value;
  let mensajeError = document.getElementById("mensajeError");
  console.log(categoria);
  if (categoria == "otra") {
    let textoOtraCategoria =
      document.getElementById("textoOtraCategoria").value;
    if (textoOtraCategoria == "") {
      console.log("El texto es obligatorio");
      mensajeError.innerHTML = "El texto de la categoria es obligatoria";
    } else {
      id++;
      mensajeError.innerHTML = "";
      tareas.push(new Tarea(id, textoTarea, textoOtraCategoria));
      listaTareas.appendChild(crearTarea(textoTarea, id, textoOtraCategoria));
    }
  } else {
    if (textoTarea == "") {
      console.log("El campo tarea es obligatorio");
      mensajeError.innerHTML = "La tarea es obligatoria";
    } else {
      id++;
      mensajeError.innerHTML = "";
      tareas.push(new Tarea(id, textoTarea, categoria));
      listaTareas.appendChild(crearTarea(textoTarea, id, categoria));
    }
  }
}

function crearTarea(texto, id, categoria) {
  const divPadre = document.createElement("div");
  const nuevoDiv = document.createElement("div");
  const imagen = document.createElement("img");
  const label = document.createElement("label");
  const br = document.createElement("br");
  console.log(categoria);
  if(categoria.toLowerCase() == 'estudio'){
      imagen.src = "estudio.png";
  }else if(categoria.toLowerCase() == 'trabajo'){
     imagen.src = "work.png";
  }else if(categoria.toLowerCase() == 'personal'){
    imagen.src = "personal.png";
  }else if(categoria.toLowerCase() == 'urgente'){
    imagen.src = "urgente.png";
  }
  imagen.style.width = "50px";
  imagen.style.height = "50px";
  divPadre.className = "card border-3";
  divPadre.style.width = "18rem";
  divPadre.appendChild(imagen);
  divPadre.id = "div" + texto + id;
  label.innerHTML = texto;
  label.id = "label" + texto + id;
  nuevoDiv.appendChild(label);
  nuevoDiv.appendChild(br);
  nuevoDiv.style.padding = "10px";
  nuevoDiv.style.width = "18rem";
  nuevoDiv.className = "card-body";
  const botonEliminar = document.createElement("input");
  botonEliminar.type = "button";
  botonEliminar.value = "Eliminar";
  botonEliminar.className = "btn btn-outline-danger";
  botonEliminar.addEventListener("click", function (e) {
    let respuestaUsuario = confirm("Va a eliminar la tarea");
    if (respuestaUsuario) {
      console.log(e.target);
      console.log(e.target.parentNode.parentNode);
      console.log(e.target.parentNode.parentNode.id);
      document
        .getElementById(e.target.parentNode.parentNode.id).remove();
    }
  });

  const botonHecha = document.createElement("input");
  botonHecha.type = "button";
  botonHecha.value = "Hecha";
  botonHecha.className = "btn btn-outline-success";

  botonHecha.addEventListener("click", function (e) {
    Array.from(e.target.parentNode.children).forEach(elemento => {
    if(elemento.tagName == 'LABEL'){
        elemento.className="text-decoration-line-through";
    }
});
    /*document.getElementById(e.target.parentNode.parentNode.id).className =
      "card border-danger bg-warning border-3";*/
  });

  const botonUrgente = document.createElement("input");
  botonUrgente.type = "button";
  botonUrgente.value = "Urgente";
  botonUrgente.className = "btn btn-outline-danger";

  botonUrgente.addEventListener("click", function (e) {
    console.log(e.target);
    console.log(e.target.parentNode.parentNode);
    document.getElementById(e.target.parentNode.parentNode.id).className =
      "card border-danger bg-warning border-3";
  });

  nuevoDiv.appendChild(botonHecha);
  nuevoDiv.appendChild(botonUrgente);
  nuevoDiv.appendChild(botonEliminar);
  divPadre.appendChild(nuevoDiv);

  return divPadre;
}
