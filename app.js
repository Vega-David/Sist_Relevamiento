let btn_Cargar=document.getElementById("Cargar")
let btn_Guardar=document.getElementById("Guardar")
let btn_Revisar=document.getElementById("Revisar")
let btn_PDF=document.getElementById("CrearPDF")
let btn_Excel=document.getElementById("CrearExcel")
let btn_Especifico=document.getElementById("Especifico")
let informacion={}

//Agregar productos
btn_Cargar.addEventListener("click",()=>{
    
    let datos=crearObjeto()
    agregarProductos(datos.Cuadrilla,datos)
    mostrarData(datos.Cuadrilla)
    alert("Datos cargados!")

})

function agregarProductos(cuadrilla,producto){
    if(!informacion[cuadrilla]){
        informacion[cuadrilla]=[]
    }
    informacion[cuadrilla].push(producto)
}

//--------------------------------------------------------------------------------------------------------------------------------------------
//Guarda productos en localStorage
btn_Guardar.addEventListener("click",()=>{
    alert("Guardar")
    almacenarInfo(informacion)
})

function almacenarInfo(info){
    localStorage.setItem("informacion",JSON.stringify(info))
}

//--------------------------------------------------------------------------------------------------------------------------------------------
//Listar Productos desde localStorage
// btn_Revisar.addEventListener("click",()=>{
//     alert("Revisar")
//     verInfo() 
// })

//Muestra informacion de una cuadrilla en especifico
function mostrarData(cuadrilla){

    console.log(informacion[cuadrilla]);
}

function tabla(cuadrilla){
    console.table(informacion[cuadrilla])
}
function verInfo(){
    let info=JSON.parse(localStorage.getItem("informacion"))
    return info
}
//--------------------------------------------------------------------------------------------------------------------------------------------
//Generar PDF
function crearPDF(cuadrilla,info){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let textoLargo = doc.splitTextToSize(`La cuadrilla N°.${cuadrilla} tiene`, 180);
    let textoLargo2 = doc.splitTextToSize(`Todos estos elementos : ${info[cuadrilla]}`, 180);
    doc.text(textoLargo, 10, 10);
    doc.text(textoLargo2, 10, 30);
    // doc.autoTable({
    //     head: [['Nombre', 'Edad']],
    //     body: [['Juan', 28], ['Ana', 33]]
    // });
    doc.save(`Informacion_Cuadrilla_${cuadrilla}.pdf`);
}

btn_PDF.addEventListener("click",()=>{
    let input_cuadrilla=document.getElementById("Cuadrilla")    
    let cuadrilla=input_cuadrilla.value
    crearPDF(cuadrilla,verInfo())
})

//--------------------------------------------------------------------------------------------------------------------------------------------
//Generar Excel
function crearExcel(informacion){
    // Datos como array de objetos
      const data = informacion
      
      // Convertir a hoja de Excel
      const nuevaHoja = XLSX.utils.json_to_sheet(data);

      // Crear libro y agregar la hoja
    //   const nombreHoja=
      const nuevoLibro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(nuevoLibro, nuevaHoja,"nombreHoja");

      // Descargar el archivo
      XLSX.writeFile(workbook, `reporte-de-cuadrilla.xlsx`);
}

btn_Excel.addEventListener("click",()=>{
    let informacion=verInfo() 
    crearExcel(informacion)
})

//Especifico
// btn_Especifico.addEventListener("click",()=>{
//     let input_cuadrilla=document.getElementById("Cuadrilla")    
//     let cuadrilla=input_cuadrilla.value
//     if(!informacion[cuadrilla]){
//         console.log("No existe informacion cargada a esa cuadrilla");  
//     }
//     else{
//         console.log(`Los datos de la cuadrilla N°.${cuadrilla} son:`);
//         tabla(cuadrilla)
//     }
// })




function crearObjeto(){
    let Nombre=document.getElementById("Nombre")
    let Caracteristica=document.getElementById("Caracteristica")
    let Codigo=document.getElementById("Codigo")
    let Estado=document.getElementById("Estado")
    let Cuadrilla=document.getElementById("Cuadrilla")
    let objeto={}
    objeto={"Nombre":Nombre.value,
            "Caracteristica":Caracteristica.value,
            "Codigo":Codigo.value,
            "Estado":Estado.value,
            "Cuadrilla":Cuadrilla.value
    }
    Nombre.value=""
    Caracteristica.value=""
    Codigo.value=""
    Estado.value=""
    Nombre.focus()
    return objeto
}

function crearReporte(listadoObjetos){
    let Fecha=new Date().toLocaleDateString('es-AR');
    let Relevador=document.getElementById("Relevador")
    let Reporte={}
    Reporte={"Fecha":Fecha,
             "Relevador":Relevador,
             "Objetos":listadoObjetos
    }
}



