// Funciones que modifican el DOM

export function mostrarData(info, cuadrilla) {
    console.log(info[cuadrilla]);
}

export function tabla(info, cuadrilla) {
    console.table(info[cuadrilla]);
}

export function limpiarInputs(...inputs) {
    // No limpiar Relevador ni Cuadrilla
    inputs.forEach((input, i) => {
        if (input.id !== 'Relevador' && input.id !== 'Cuadrilla') {
            input.value = '';
        }
        if (i === 0) input.focus();
    });
}

// Renderiza una tabla dinámica en el div #tabla-dinamica con los elementos cargados
export function renderizarTablaDinamica(elementos) {
    const contenedor = document.getElementById('tabla-dinamica');
    if (!contenedor) return;
    if (!elementos || elementos.length === 0) {
        contenedor.innerHTML = '<p>No hay elementos cargados.</p>';
        return;
    }
    let tabla = '<table class="tabla-dinamica tabla-profesional"><thead><tr>';
    // Encabezados
    const headers = Object.keys(elementos[0]);
    headers.forEach(h => {
        tabla += `<th>${h}</th>`;
    });
    tabla += '<th>Acciones</th></tr></thead><tbody>';
    // Filas
    elementos.forEach((el, idx) => {
        // Marcar fila si está Rechazado
        const esRechazado = (el.Estado && el.Estado.toLowerCase() === 'rechazado') || (el.Estado && el.Estado.toLowerCase().includes('desgaste'));
        tabla += `<tr class="${esRechazado ? 'fila-rechazado' : ''}">`;
        headers.forEach(h => {
            if (h === 'Estado' && esRechazado) {
                tabla += `<td><span class="estado-rechazado">${el[h]}</span></td>`;
            } else {
                tabla += `<td>${el[h]}</td>`;
            }
        });
        tabla += `<td style="min-width:120px;">
            <button class='btn-editar' data-idx='${idx}'>✏️ Editar</button>
            <button class='btn-eliminar' data-idx='${idx}'>🗑️ Eliminar</button>
        </td>`;
        tabla += '</tr>';
    });
    tabla += '</tbody></table>';
    contenedor.innerHTML = tabla;
}
