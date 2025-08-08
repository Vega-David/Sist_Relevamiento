// Lógica principal y eventos
import { informacion } from './data.js';
import { mostrarData, tabla, limpiarInputs } from './ui.js';
import { almacenarInfo, verInfo } from './storage.js';
import { crearPDF, crearExcel } from './helpers.js';

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
    const btn_Cargar = document.getElementById("Cargar");
    const btn_Guardar = document.getElementById("Guardar");
    const btn_PDF = document.getElementById("CrearPDF");
    const btn_Excel = document.getElementById("CrearExcel");
    const btn_Especifico = document.getElementById("Especifico");

    btn_Cargar.addEventListener("click", () => {
        const datos = crearObjeto();
        if (!datos) return;
        if (!informacion[datos.Cuadrilla]) {
            informacion[datos.Cuadrilla] = [];
        }
        informacion[datos.Cuadrilla].push(datos);
        mostrarData(informacion, datos.Cuadrilla);
        alert("Datos cargados!");
    });

    btn_Guardar.addEventListener("click", () => {
        almacenarInfo(informacion);
        alert("Información guardada en localStorage");
    });

    btn_PDF.addEventListener("click", () => {
        const cuadrilla = document.getElementById("Cuadrilla").value.trim();
        crearPDF(cuadrilla, verInfo());
    });

    btn_Excel.addEventListener("click", () => {
        const cuadrilla = document.getElementById("Cuadrilla").value.trim();
        crearExcel(verInfo(), cuadrilla);
    });

    if (btn_Especifico) {
        btn_Especifico.addEventListener("click", () => {
            const cuadrilla = document.getElementById("Cuadrilla").value.trim();
            const info = verInfo();
            if (!info[cuadrilla]) {
                console.log("No existe información cargada para esa cuadrilla");
            } else {
                console.log(`Datos de la cuadrilla N° ${cuadrilla}:`);
                tabla(info, cuadrilla);
            }
        });
    }
});

