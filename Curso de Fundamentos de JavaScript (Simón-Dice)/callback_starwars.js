const API_URL = 'https://swapi.dev/api/'
const PEOPLE_URL = 'people/:id'

const onPeopleResponse = function(persona){
    console.log(`Hola soy, ${persona.name}`)
}


function obtenerPersonaje(id){
    const url = `${API_URL}${PEOPLE_URL.replace(':id', id)}` 
    $.get(url , {cossDomain:true},onPeopleResponse)
}

obtenerPersonaje(1)
obtenerPersonaje(2)
obtenerPersonaje(5)


