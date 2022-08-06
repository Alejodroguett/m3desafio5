const listaTareas = [
    {
        id: 1234567899991,
        actividad: "Hacer ejercicio",
        realizado: false
    },
    {
        id: 1234567899992,
        actividad: "Enviar correo",
        realizado: false
    },
    {
        id: 1234567899993,
        actividad: "Ir a reunión de apoderados",
        realizado: false
    }
]

function cargarTareas(tareas) {

    limpiarLista();

    const listaHtml = document.getElementById("listaDeTareas");

    tareas.forEach(tarea => {

        listaHtml.innerHTML += `
        <li>
            <input id="checkbox-${tarea.id}" type="checkbox" ${esRealizado(tarea.realizado)} onClick="estadoActividad(${tarea.id})"/>            
            <button class="btn-eliminar" onClick="borrarTarea(${tarea.id})">X</button>
            ${tarea.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ${tarea.actividad}
        </li>
        `;
    });
}

function limpiarInput() {
    const inputNuevaTarea = document.getElementById("nuevasTareas")
    inputNuevaTarea.value = " "
}

function actualizarTareasRealizadas() {

    const tareasRealizadas = document.getElementById("tareasRealizadas");

    const totalTareasRealizadas = listaTareas.filter(tarea => tarea.realizado == true).length;

    tareasRealizadas.innerHTML = totalTareasRealizadas;
}

function actualizarTotal() {

    const totalTareas = document.getElementById("totalTareas");

    totalTareas.innerHTML = listaTareas.length;
}

function limpiarLista() {
    const listaHtml = document.getElementById("listaDeTareas");
    listaHtml.innerHTML = " ";
}

function agregarTarea() {
    const tareaNueva = document.getElementById("nuevasTareas");

    if (tareaNueva.value.trim().length == 0) {
        alert("No ingresaste una tarea");
        return false;
    }

    listaTareas.push({
        id: Date.now(),
        actividad: tareaNueva.value,
        realizado: false
    });

    cargarTareas(listaTareas);

    actualizarTotal();

    limpiarInput();
}

function cargarEventoBotonAgregar() {
    const botonAgregar = document.getElementById("agregar");
    botonAgregar.addEventListener("click", function () {
        agregarTarea();
    });
}

function borrarTarea(idTarea) {

    const indiceEliminarTarea = listaTareas.findIndex(tarea => tarea.id == idTarea);

    listaTareas.splice(indiceEliminarTarea, 1);

    cargarTareas(listaTareas);

    actualizarTotal();

    actualizarTareasRealizadas();
}

function esRealizado(realizado) {
    if (realizado == true) {
        return "checked";
    }
}

function estadoActividad(idTarea) {

    const indiceTarea = listaTareas.findIndex(tarea => tarea.id == idTarea);

    const tareaEncontrada = listaTareas[indiceTarea];
    tareaEncontrada.realizado = !tareaEncontrada.realizado;

    listaTareas.splice(indiceTarea, 1, tareaEncontrada);

    actualizarTareasRealizadas();
}

function cargaInicial() {
    cargarEventoBotonAgregar();
    cargarTareas(listaTareas);
    actualizarTotal();
    actualizarTareasRealizadas();
    limpiarInput();
}

cargaInicial();