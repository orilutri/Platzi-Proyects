//importamos la función
const fetchData = require('../utils/fetchData');
//ruta de la API
const API = 'https://rickandmortyapi.com/api/character/';

fetchData(API)
    .then(data => {
        console.log(data.info.count); //imprimimos el número de personajes
        //volvemos a hacer la promesa de pedir algo, en este caso el personaje 1
        return fetchData(`${API}${data.results[0]}`);
    })
    .then(data => {
        console.log(data.name); //imprimimos el nombre del personaje 1
        //volvemos a hacer la promesa, pre esta vez es sobre la dimensión del personaje 1
        return fetchData(data.origin.url);
    })
    .then(data => {
        console.log(data.dimension); //imprimimos la dimensión del personaje
    })
    //si hay un error
    .catch(err => console.err(err));