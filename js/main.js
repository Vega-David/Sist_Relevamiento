// Lógica principal y eventos
import { informacion } from './data.js';
import { mostrarData, tabla, limpiarInputs, renderizarTablaDinamica } from './ui.js';
import { almacenarInfo, verInfo } from './storage.js';
import { crearPDF, crearExcel } from './helpers.js';

let editando = false;
let editIdx = null;
let editCuadrilla = null;

function crearObjeto() {
    const Nombre = document.getElementById("Nombre");
    const Caracteristica = document.getElementById("Caracteristica");
    const Codigo = document.getElementById("Codigo");
    const EstadoRadio = document.querySelector('input[name="Estado"]:checked');
    const Cuadrilla = document.getElementById("Cuadrilla");
    if (!Nombre || !Caracteristica || !Codigo || !EstadoRadio || !Cuadrilla) {
        alert("Faltan campos por completar.");
        return null;
    }
    if (Cuadrilla.disabled) Cuadrilla.disabled = false;
    const objeto = {
        Nombre: Nombre.value.trim(),
        Caracteristica: Caracteristica.value.trim(),
        Codigo: Codigo.value.trim(),
        Estado: EstadoRadio.value.trim(),
        Cuadrilla: Cuadrilla.value.trim()
    };
    limpiarInputs(Nombre, Caracteristica, Codigo);
    EstadoRadio.checked = false;
    return objeto;
}

document.addEventListener("DOMContentLoaded", () => {
    // Menú desplegable de acciones
    const menuToggle = document.getElementById('menu-toggle');
    const menuDropdown = document.querySelector('.menu-dropdown');
    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', () => {
            menuDropdown.classList.toggle('open');
        });
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!menuDropdown.contains(e.target) && menuDropdown.classList.contains('open')) {
                menuDropdown.classList.remove('open');
            }
        });
    }
    const btn_Cargar = document.getElementById("Cargar");
    const btn_Guardar = document.getElementById("Guardar");
    const btn_PDF = document.getElementById("CrearPDF");
    const btn_Excel = document.getElementById("CrearExcel");

    // Mostrar tabla dinámica al cargar la página si hay datos
    const todos = Object.values(informacion).flat();
    renderizarTablaDinamica(todos);

    btn_Cargar.addEventListener("click", () => {
        const datos = crearObjeto();
        if (!datos) return;
        if (editando && editIdx !== null && editCuadrilla) {
            // Guardar cambio
            if (informacion[editCuadrilla] && informacion[editCuadrilla][editIdx]) {
                informacion[editCuadrilla][editIdx] = datos;
            }
            editando = false;
            editIdx = null;
            editCuadrilla = null;
            btn_Cargar.textContent = "Cargar Elemento";
            alert("Elemento editado!");
        } else {
            if (!informacion[datos.Cuadrilla]) {
                informacion[datos.Cuadrilla] = [];
            }
            informacion[datos.Cuadrilla].push(datos);
            alert("Datos cargados!");
        }
        mostrarData(informacion, datos.Cuadrilla);
        // Mostrar tabla dinámica de todos los elementos cargados (todas las cuadrillas)
        const todos = Object.values(informacion).flat();
        renderizarTablaDinamica(todos);
    });

    btn_Guardar.addEventListener("click", () => {
        almacenarInfo(informacion);
        alert("Información guardada en localStorage");
        // Refrescar tabla dinámica tras guardar
        const todos = Object.values(informacion).flat();
        renderizarTablaDinamica(todos);
    });

    // Delegación de eventos para editar/eliminar
    document.getElementById('tabla-dinamica').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-editar')) {
            const idx = parseInt(e.target.dataset.idx);
            // Buscar el elemento real y su cuadrilla
            let count = 0, found = false;
            for (const cuadrilla in informacion) {
                for (let i = 0; i < informacion[cuadrilla].length; i++) {
                    if (count === idx) {
                        // Cargar datos en el formulario
                        const el = informacion[cuadrilla][i];
                        document.getElementById("Nombre").value = el.Nombre;
                        document.getElementById("Caracteristica").value = el.Caracteristica;
                        document.getElementById("Codigo").value = el.Codigo;
                        document.getElementById("Relevador").value = el.Relevador || '';
                        document.getElementById("Cuadrilla").value = el.Cuadrilla;
                        // Estado
                        const radios = document.getElementsByName("Estado");
                        radios.forEach(r => { r.checked = (r.value === el.Estado); });
                        editando = true;
                        editIdx = i;
                        editCuadrilla = cuadrilla;
                        btn_Cargar.textContent = "Guardar cambio";
                        found = true;
                        break;
                    }
                    count++;
                }
                if (found) break;
            }
        }
        if (e.target.classList.contains('btn-eliminar')) {
            const idx = parseInt(e.target.dataset.idx);
            if (!confirm('¿Seguro que deseas eliminar este elemento?')) return;
            // Buscar el elemento real y su cuadrilla
            let count = 0, found = false;
            for (const cuadrilla in informacion) {
                for (let i = 0; i < informacion[cuadrilla].length; i++) {
                    if (count === idx) {
                        informacion[cuadrilla].splice(i, 1);
                        // Si la cuadrilla queda vacía, eliminarla
                        if (informacion[cuadrilla].length === 0) delete informacion[cuadrilla];
                        found = true;
                        break;
                    }
                    count++;
                }
                if (found) break;
            }
            // Refrescar tabla
            const todos = Object.values(informacion).flat();
            renderizarTablaDinamica(todos);
        }
    });

    btn_PDF.addEventListener("click", () => {
        const cuadrilla = document.getElementById("Cuadrilla").value.trim();
        crearPDF(cuadrilla, verInfo());
    });

    btn_Excel.addEventListener("click", () => {
        const cuadrilla = document.getElementById("Cuadrilla").value.trim();
        crearExcel(verInfo(), cuadrilla);
    });
});

