// Funciones que modifican el DOM

export function mostrarData(info, cuadrilla) {
    console.log(info[cuadrilla]);
}

export function tabla(info, cuadrilla) {
    console.table(info[cuadrilla]);
}

export function limpiarInputs(...inputs) {
    inputs.forEach((input, i) => {
        input.value = '';
        if (i === 0) input.focus();
    });
}
