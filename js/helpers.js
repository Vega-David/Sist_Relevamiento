// Funciones auxiliares: PDF y Excel

export function crearPDF(cuadrilla, info) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Listado de elementos - Cuadrilla ${cuadrilla}`, 14, 20);
    const elementos = info[cuadrilla];
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
    if (doc.autoTable) {
        doc.autoTable({
            head: encabezado,
            body: cuerpo,
            startY: 30,
            theme: 'grid',
            headStyles: { fillColor: [16, 43, 82] },
        });
    } else {
        let y = 40;
        cuerpo.forEach(row => {
            doc.text(row.join(' | '), 14, y);
            y += 10;
        });
    }
    doc.save(`Reporte_Cuadrilla_${cuadrilla}.pdf`);
}

export function crearExcel(info, cuadrilla) {
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
