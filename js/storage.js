// Guardado y lectura de datos en LocalStorage

export function almacenarInfo(info) {
    localStorage.setItem("informacion", JSON.stringify(info));
}

export function verInfo() {
    return JSON.parse(localStorage.getItem("informacion")) || {};
}
