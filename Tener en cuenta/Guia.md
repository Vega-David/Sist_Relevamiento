# 📂 Guía de Separación y Modularización de Proyectos JS

Esta guía sirve como referencia para organizar tu proyecto en carpetas y archivos, evitando mezclar toda la lógica en un único JS.

---

## 📌 Separación de proyectos

Cuando desarrolles:
- **Frontend** → HTML, CSS, JS para la interfaz y la interacción del usuario.
- **Backend** → Lógica de servidor, conexión a base de datos, APIs.
- En local puede estar todo junto, pero para producción conviene separar cada parte.

Ejemplo básico de estructura para un proyecto **solo frontend**:

```
/css
  estilos.css
/js
  main.js
  data.js
  ui.js
  storage.js
index.html
```

---

## 📌 Modularización en JavaScript

**Objetivo:** Dividir la lógica en archivos pequeños y especializados.

- **`main.js`** → Coordina eventos y el flujo general.
- **`data.js`** → Estado global de la aplicación.
- **`ui.js`** → Funciones que modifican el DOM.
- **`storage.js`** → Guardado y lectura de datos en LocalStorage o base de datos.

Ejemplo:
```javascript
// main.js
import { informacion } from './data.js'
import { limpiarInputs } from './ui.js'
import { almacenarInfo, verInfo } from './storage.js'

document.getElementById("Guardar").addEventListener("click", () => {
  almacenarInfo(informacion)
})

// ui.js
export function limpiarInputs(...inputs) {
  inputs.forEach((input, i) => {
    input.value = ''
    if (i === 0) input.focus()
  })
}
```

---

## 📌 Organización por funcionalidades

Si tu aplicación tiene **múltiples secciones** (por ejemplo “Relevamiento” y “Revisión”), podés organizarlas así:

```
/relevamiento
  index.html
  main.js
  ui.js
  storage.js
/revision
  index.html
  main.js
  ui.js
  storage.js
/shared
  data.js
  helpers.js
index.html  ← Menú o punto de entrada
```

- Cada **carpeta** contiene la lógica específica de esa funcionalidad.
- **`shared/`** contiene código común a todas las secciones.

---

## 📌 Beneficios

- Código **limpio y fácil de mantener**.
- Evitás que cambios en una parte rompan otra.
- Escalable para agregar funciones.
- Facilita el despliegue y la colaboración.

---
