const http = require('http')
const url = require('url')
const fs = require('fs')
http

//1. Crear un servidor en Node con el módulo http.
.createServer(function (req, res) {
const params = url.parse(req.url, true).query
const archivo = params.archivo
const contenido = params.contenido
const nombre = params.nombre
const nuevoNombre = params.nuevoNombre

//2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida.
if (req.url.includes('/crear')) {
let fecha;
/** 
 * 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
“dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la
izquierda. (Opcional)
 *  */    

let date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
console.log(month);
if(month < 10){
  fecha = `${day}/0${month}/${year}`;
}else{
  fecha = `${day}/${month}/${year}`;
}


let contenidoFecha = ` ${fecha}  -- ${contenido}`
fs.writeFile(archivo, contenidoFecha, () => {
res.write('Archivo creado con éxito!')
res.end()
})
}

// 3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es declarado en los parámetros de la consulta recibida.
if (req.url.includes('/leer')) {
fs.readFile(archivo, (err, data) => {
res.write(data)
res.end()
})
}


//4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es declarado en los parámetros de la consulta recibida.
if (req.url.includes('/renombrar')) {
fs.rename(nombre, nuevoNombre, (err, data) => {
/** 
 * 
 * 8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre
anterior del archivo y su nuevo nombre de forma dinámica . (Opcional)

 */

    res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
res.end()
})
}

// 5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los parámetros de la consulta recibida.
if (req.url.includes('/eliminar')) {

/**
 * 
 * 9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
mensaje: “Tu solicitud para eliminar el archivo <nombre_archivo> se está
procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el
nombre del archivo eliminado. (Opcional)
 * 
 */

//   setTimeout(function(){ res.write(`“Tu solicitud para eliminar el archivo ${archivo} se está procesando”`); }, 3000);
 
fs.unlink(archivo, (err, data) => {
 
    res.write(`Archivo ${archivo} eliminado con éxito`)
res.end()
})
}
})
.listen(8080, () => console.log('Escuchando el puerto 8080'))