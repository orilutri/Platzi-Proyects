//antes de fetch(), sin promesas

//importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let API = 'https://rickandmortyapi.com/api/character/';

//función principal
function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest(); //instanciamos la conexión
    xhttp.open('GET', url_api, true); //abre una conexión con el método, la ruta y si es asíncrono o no
    //validación del llamado 
    xhttp.onreadystatechange = function(event) {
        if(xhttp.readystate === 4) { //si el state es 4 es el último de la petición
            if(xhttp.status === 200) { //verificamos que el status esté en 200 (todo está bien) y no en 400 ni en 500
                callback(null, JSON.parse(xhttp.responseText)); //ejecutamos el callback con el resultado
            }else { 
                //si no es 200 matamos el proceso con un error
                const error = new Error('Error ' + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send(); //por último enviamos la petición
}

//Múltiples peticiones a una API con callbacks

//primero buscamos la lista de personajes
fetchData(API, function(error1, data1) {
    if (error1) return console.error(error1);
    // si no hay error buscamos en la API el id del primer personaje
    fetchData(API + data1.results[0].id, function(error2, data2) {
        if (error2) return console.error(error2);
        //si no hay error consultamos a la API el origen/dimensión
        fetchData(data2.origin.url, function(error3, data3) {
            if (error3) return console.error(error3);

            //mostramos los resultados
            console.log(data1.info.count); //cuántos personajes existen
            console.log(data2.name); //nombre del primer personaje
            console.log(data3.dimension); //dimensión del personaje
            
        });
    }); 
});