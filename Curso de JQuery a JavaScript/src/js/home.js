(async function load(){
    //action
    //drama
    //animation
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json();
        if(data.data.movie_count > 0){ //manejo de errores
            return data;
        }
        //si no hay películas 
        throw new Error('No se encontró ningun resultado');
    }

    const BASE_API = 'https://yts.mx/api/v2/';

    const $featuringContainer = document.getElementById('featuring');
    const $home = document.getElementById('home');
    const $form = document.getElementById('form');

    function setAttributes($element, attributes){
        for (const attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }

    function featuringTemplate(peli){
        return(
            `<div class="featuring">
            <div class="featuring-image">
              <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
            </div>
            <div class="featuring-content">
              <p class="featuring-title">Pelicula encontrada</p>
              <p class="featuring-album">${peli.title}</p>
            </div>
          </div>`
        )
    }

    $form.addEventListener('submit', async (event) => { //para la búsqueda de películas
        event.preventDefault();
        $home.classList.add('search-active');
        //creo un elemento html para poner el gif de loader cuando hago una búsqueda
        const $loader = document.createElement('img');
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width : 50,
        })
        $featuringContainer.append($loader);
        //obtengo los datos de la película que estoy buscando en el buscador
        const data = new FormData($form);
        try { //manejo de errores
            const { data: {movies: pelis}} = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
            const HTMLString = featuringTemplate(pelis[0]);
            $featuringContainer.innerHTML = HTMLString;

        } catch (error) {
            alert(error.message);
            $loader.remove();
            $home.classList.remove('search-active');
        }
    })

    //creación de templates de peliculas
    function videoItemTemplate(movie, category){ //crea la plantilla de texto
        return(
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
                <div class="primaryPlaylistItem-image">
                <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
          </div>`
        )
    }

    function createTemplate(HTMLString){ //agrega los templeates al html
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }

    function addEventClick($element){
        $element.addEventListener('click', () => {
            showModal($element);
        })
    }

    function renderMovieList(list, $container, category){ //muestra en cada contenedor los templates
        $container.children[0].remove(); //saco el gif de "esperando que cargue"
        list.forEach(movie => {
            const HTMLString = videoItemTemplate(movie, category);
            const movieElement = createTemplate(HTMLString);
            $container.append(movieElement);

            const movieImage = movieElement.querySelector('img');
            //espero a que carguen todas las imágenes
            movieImage.addEventListener('load', () => {
                movieImage.classList.add('fadeIn'); //le agrego la clase de animaciones
            }) 
            addEventClick(movieElement);
        });
    }

    //local storage
    async function cacheExist(categoryList){
        const cache = window.localStorage.getItem(categoryList);
        if (cache){
            return JSON.parse(cache);
        }
        const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${categoryList}`);
        window.localStorage.setItem(categoryList, JSON.stringify(data));
        return data;
    }

    //lista de peliculas por género, selectores del container y renderizo
    const actionList = await cacheExist('actionList');
    const $actionContainer = document.getElementById('action');
    renderMovieList(actionList, $actionContainer, 'action');
    
    const dramaList = await cacheExist('dramaList');
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList, $dramaContainer, 'drama');
    
    const animationList = await cacheExist('animationList');
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList, $animationContainer, 'animation');
    
    //modal
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    function findById(list, id){ //busca en la lista específica según su categoría
        return list.find( movie => movie.id === parseInt(id, 10))
    }

    function findMovie(id, category){ //busca la película para mostrar en el modal
        switch(category){
            case 'action':
                return findById(actionList, id);
            case 'drama':
                return findById(dramaList, id);
            case 'animation':
                return findById(animationList, id);
        }
    }

    function showModal($element){ //muestra el cartel de info de películas
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards'
        const id = $element.dataset.id;
        const category = $element.dataset.category;
        const data = findMovie(id, category);

        $modalTitle.textContent = data.title;
        $modalImage.setAttribute('src', data.medium_cover_image);
        $modalDescription.textContent = data.description_full;
    }

    $hideModal.addEventListener('click', hideModal); //para cerrar el modal
    function hideModal(){
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards'
    }


    //---------------------------RETO 1---------------------------------------//
    //usuarios random
    
    async function getUsers(url){
        const response = await fetch(url);
        const users = await response.json();
        return users;
    }

    const URL_API_USERS = 'https://randomuser.me/api/?results=10';

    //creación de templates de usuarios random
    function usersItemTemplate(user){ //crea la plantilla de texto
        return(
            `<li class="playlistFriends-item">
                <a href="#">
                    <img src="${user.picture.thumbnail}" alt="imágen usuario"/>
                    <span>
                        ${user.name.first} ${user.name.last}
                    </span>
                </a>
            </li>`
        )
    }

    function renderUsersList(usersList, $container){ //muestra en el contenedor los templates de usuarios
        usersList.forEach(user => {
            const HTMLString = usersItemTemplate(user);
            const userElement = createTemplate(HTMLString);
            $container.append(userElement);
        });
    }

    const { results:users } = await getUsers(`${URL_API_USERS}`);
    const $usersContainer = document.querySelector('.playlistFriends');
    renderUsersList(users, $usersContainer);

    //------------------------------RETO 2 ------------------------------//
    //playlist sugerencias

    async function getSuggestionsData(url){
        const response = await fetch(url);
        const suggestions = await response.json();
        return suggestions;
    }

    //creación de templates de usuarios random
    function playlistItemTemplate(suggestion){ //crea la plantilla de texto
        return(
            `<li class="myPlaylist-item">
                <a href="#">
                    <span>
                        ${suggestion.title}
                    </span>
                </a>
            </li>`
        )
    }

    function renderPlaylist(suggestionsList, $container){ //muestra en el contenedor los templates de usuarios
        suggestionsList.forEach(suggestion => {
            const HTMLString = playlistItemTemplate(suggestion);
            const playlistElement = createTemplate(HTMLString);
            $container.append(playlistElement);
        });
    }

    const { data: {movies: suggestions} } = await getSuggestionsData(`${BASE_API}list_movies.json?limit=10`);
    const $playlistContainer = document.querySelector('.myPlaylist');
    renderPlaylist(suggestions, $playlistContainer);

})()
