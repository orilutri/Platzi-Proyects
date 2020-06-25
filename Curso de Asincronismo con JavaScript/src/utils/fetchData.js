//ES6
//importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//función principal
const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest(); //instanciamos la conexión
        xhttp.open('GET', url_api, true); //abre una conexión con el método, la ruta y si es asíncrono o no
        //validación del llamado 
        xhttp.onreadystatechange = (() => {
            if(xhttp.readystate === 4) { //si el state es 4 es el último de la petición
                (xhttp.status === 200)  //verificamos que el status esté en 200 (todo está bien) y no en 400 ni en 500
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error ', url_api))
            }
        });
        xhttp.send(); //por último enviamos la petición
    });  
}

module.exports = fetchData;