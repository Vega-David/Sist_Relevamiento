document.addEventListener("DOMContentLoaded", () => {
    const btn_Cargar = document.getElementById("Cargar");
    const btn_Guardar = document.getElementById("Guardar");
    const btn_PDF = document.getElementById("CrearPDF");
    const btn_Excel = document.getElementById("CrearExcel");
    const btn_Especifico = document.getElementById("Especifico"); // opcional

    let informacion = {};

    // Agregar productos
    btn_Cargar.addEventListener("click", () => {
        const datos = crearObjeto();
        if (!datos) return;

        agregarProductos(datos.Cuadrilla, datos);
        mostrarData(datos.Cuadrilla);
        alert("Datos cargados!");
    });

    function agregarProductos(cuadrilla, producto) {
        if (!informacion[cuadrilla]) {
            informacion[cuadrilla] = [];
        }
        informacion[cuadrilla].push(producto);
    }

    // Guardar productos en localStorage
    btn_Guardar.addEventListener("click", () => {
        almacenarInfo(informacion);
        alert("Información guardada en localStorage");
    });

    function almacenarInfo(info) {
        localStorage.setItem("informacion", JSON.stringify(info));
    }

    function verInfo() {
        return JSON.parse(localStorage.getItem("informacion")) || {};
    }

    function mostrarData(cuadrilla) {
        console.log(informacion[cuadrilla]);
    }

    function tabla(cuadrilla) {
        console.table(informacion[cuadrilla]);
    }

    // Generar PDF
    function crearPDF(cuadrillaActual, info) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Listado de elementos - Cuadrilla ${cuadrillaActual}`, 14, 20);

    const elementos = info[cuadrillaActual];

    if (!elementos || elementos.length === 0) {
        alert("No hay datos para generar el PDF.");
        return;
    }

    const encabezado = [['Nombre', 'Característica', 'Código', 'Estado']];
    const cuerpo = elementos.map(obj => [
        obj.Nombre,
        obj.Caracteristica,
        obj.Codigo,
        obj.Estado
    ]);

    doc.autoTable({
        head: encabezado,
        body: cuerpo,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [16, 43, 82] },
    });

    doc.save(`Reporte_Cuadrilla_${cuadrillaActual}.pdf`);
}



    btn_PDF.addEventListener("click", () => {
        const cuadrilla = document.getElementById("Cuadrilla").value.trim();
        crearPDF(cuadrilla, verInfo());
    });

    // Generar Excel
    function crearExcel(info) {
        const cuadrilla = document.getElementById("Cuadrilla").value.trim();
        const data = info[cuadrilla];

        if (!data || data.length === 0) {
            alert("No hay datos para exportar en esta cuadrilla");
            return;
        }

        const hoja = XLSX.utils.json_to_sheet(data);
        const libro = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(libro, hoja, `Cuadrilla_${cuadrilla}`);

        XLSX.writeFile(libro, `reporte-cuadrilla-${cuadrilla}.xlsx`);
    }

    btn_Excel.addEventListener("click", () => {
        crearExcel(verInfo());
    });

    // Botón opcional: Ver por consola
    if (btn_Especifico) {
        btn_Especifico.addEventListener("click", () => {
            const cuadrilla = document.getElementById("Cuadrilla").value.trim();
            const info = verInfo();

            if (!info[cuadrilla]) {
                console.log("No existe información cargada para esa cuadrilla");
            } else {
                console.log(`Datos de la cuadrilla N° ${cuadrilla}:`);
                console.table(info[cuadrilla]);
            }
        });
    }

    // Crear objeto
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

        // Limpiar
        Nombre.value = "";
        Caracteristica.value = "";
        Codigo.value = "";
        EstadoRadio.checked = false;
        Nombre.focus();

        return objeto;
    }

    // Crear reporte
    function crearReporte(listadoObjetos) {
        const Fecha = new Date().toLocaleDateString('es-AR');
        const Relevador = document.getElementById("Relevador")?.value.trim() || "Desconocido";

        return {
            Fecha,
            Relevador,
            Objetos: listadoObjetos
        };
    }
});
