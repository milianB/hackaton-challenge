//VARIABLES//
//content//
var $content = $("#content");
//sections//
var $navMenu = $("#nav-menu");
var $screen1 = $("#screen1");
var $screen2 = $("#screen2");
var $screen3 = $("#screen3");
var $screen4 = $("#screen4");
var $screen5 = $("#screen5");
//buttons//
var $loginBtn = $("#login-btn");
var $signupBtn = $("#signup-btn");
var $recoveryBtn = $('#recovery-btn');
var $addMovieBtn = $("#add-movie-btn");
var $removeMovieBtn = $("#remove-movie-btn");
var $infoMovieBtn = $("#infoMovie-btn");
var $favoriteBtn = $("#favorite-btn");
//info//
var $movieTitle = $('#movie-title');
var $movieDirector = $('#movie-director');
var $movieYear = $('#movie-year');
var $movieGenre = $('#movie-genre');
//soundtrack//
var $trackNumber = $('#track-number');
var $trackTitle = $('#track-title');
var $trackDuration = $('#track-duration');
//lists//
var $addListBtn = $("#add-list-btn");
var $removeListBtn = $("#remove-list-btn");

//api enpoints
// const request = superagent; // 
// axios
const api_endpoint_genres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=308ef47d4177eecfbb266f41f2617b5f&language=en-US';
const api_endpoint_movies = 'https://api.themoviedb.org/3/discover/movie?api_key=308ef47d4177eecfbb266f41f2617b5f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=';
const api_endpoint_movie = 'https://api.themoviedb.org/3/movie/';

const api_endpoint_key = '?api_key=308ef47d4177eecfbb266f41f2617b5f&language=en-US';
const api_endpoint_posters = 'http://image.tmdb.org/t/p/w200//';
//DOCUMENT//
// $(document).ready(function(e){

// }
//SPLASH//

//LOGIN WITH EMAIL AND PASSWORD//
function loginWithEmailAndPassword(){


}
//LOGIN WITH EMAIL AND PASSWORD END//

//REGISTER NEW USER//
function signup(){

}
//REGISTER NEW USER END//

//HOME CARROUSEL//
function homeCarrousel(){
	// brenda
  	// Objetivo Carrousel de inicio
  	// Nombre Carrousel 1
  	// Paso # 1 Crear carrousel
  	// Paso # 2 Agregar imagenes del API IMDB
  	// Paso # 3 Controles de carrousel
  	// Resultado Muestra los posters de las peliculas recientes.

}
//HOME CARROUSEL END//



//SOUNDTRACK LIST//
function showSoundTrackList(){
	// Elz
//   Funci�n #8
//   	Objetivo Mostrar Soundtrack List
//   	Nombre Modal Soundtrack
//   	Paso # 1 Crear lista ordenada
//   	Paso # 2 Mostrar n�mero del track
//   	Paso # 3 Mostrar t�tulo del track
//   	Paso # 4 Mostrar duraci�n del track
//   	Resultado Soundtrack list
}
//SOUNDTRACK LIST END//

//USER PROFILE//
function showUserProfileInfo(){
//   Funci�n #9 Perfil de usuario
//   	Objetivo Mostrar los datos de identificaci�n del usuario
//   	Nombre Usuario
//   	Paso # 1 Mostrar imagen/avatar del usuario
//   	Paso # 2 Mostrar nombre de usuario
//   	Paso # 3 Mostar Listas personales
}
//USER PROFILE END//

//USER LISTS//
function showUserLists(){
  	// Paso # 4 Modal lista
  	// Paso # 4A Muestra miniposter
  	// Paso # 4B Muestra t�tulo de la lista
  	// Paso # 4C Bot�n eliminar lista
  	// Paso # 4D Bot�n ir a (pantalla informacion de la pel�cula).
  	// Resultado
}
//USER LISTS END//

//LOGOUT//
function logout(){
//   Funci�n #10
//   	Objetivo Cerrar Sesi�n
//   	Nombre Logout
//   	Paso # 1 Evento bot�n cerrar sesi�n
//   	Paso # 2 Cambio a pantalla de inicio
//   	Resultado Cierre de sesi�n.
}
//LOGOUT END//

function loadPage() {
	$('#inicio').click(paintButtons);
}

function paintButtons(e) {
	var $button;
	var containButtons = $('#buttons');
	containButtons.empty(); //limpiamos la seccion donde se pintan los generos
	request.get(api_endpoint_genres).then(function (response) {//response es de donde vamos a extraer información
		// console.log(response);
		var genresMovie = response.body.genres

		genresMovie.forEach(element => {
			// console.log(element);

			var genresId = element.id; // extraemos los id del genero
			var movieName = element.name;  //extraemos los nombres de los generos

			$button = $('<input>').attr('type', 'button').attr('value', movieName).attr('data-movies', genresId).addClass('button-gnr');
			//por cada interaccion se crear un elemento se le asigna el value del nombre del genero y un data del id del genero

			containButtons.append($button);
			//  se agregan los botones al contenedor

		});

		$button.each(element => {
			$('.button-gnr').click(paintTitleMovies);
			//Se agrega un evento click a cada elemento boton con la funcion que pinta la coleccion de peliculas por genero
		});
	});
}


function paintTitleMovies(event) {
	var titles;

	var containerTitles = $('#titles'); //traer contenedor de peliculas
	containerTitles.empty();

	var moviesId = this.dataset.movies;
	//obtenemo el data-movies de cada boton que es el id de los generos
	// console.log(movieId);
	var url_list_genres = api_endpoint_movies + moviesId;
	//concatenamos nuestro enpoint de movies con nuestro id de genero
	// console.log(url_list_genres);
	request.get(url_list_genres).then(function (response) {
		var movies = response.body.results;
		// console.log(movies);
		// entrar a title y a id
		movies.forEach(element => {
			// console.log(element);
			var movieTitle = element.title;
			var movieId = element.id;
			//  console.log(movieId);


			titles = $('<h4 />').text(movieTitle).attr('data-movie', movieId).addClass('title');
			containerTitles.append(titles);
			// crear elemento h2 para titulos
		});

		titles.each(element => {
			$('.title').click(paintInfoMovie);
		});
	});
}


function paintInfoMovie(event) {

	var infoMovie = $('#info-movie');
	infoMovie.empty();
	// api_endpoint_info + movieId + api_endpoint_key    ruta para pintar info de cada pelicula
	var movieIds = this.dataset.movie;
	//  console.log(movieIds);

	var api_endpoint_info = api_endpoint_movie + movieIds + api_endpoint_key;

	request.get(api_endpoint_info).then(function (response) {
		var movieBody = response.body;

		var posterPath = movieBody.poster_path

		var moviePoster = api_endpoint_posters + posterPath;

		var movieTitle = movieBody.title;
		var movieTagline = movieBody.tagline;
		var movieDate = movieBody.release_date;
		var moviePage = movieBody.homepage;


		console.log(moviePoster);  //poster
		console.log(movieTitle);   //titulo
		console.log(movieTagline); //tagline
		console.log(movieDate);    //fecha de lanzamiento
		console.log(moviePage);    //página
								   // soundtrack


		//   crear elementos
		// agregar contenido
		// append a conteneores

	});


}

$(document).ready(loadPage);

// referencias emc6
// <img src="${movie.propiedad}" class="clase">}
// <h2>${movie.propiedad}</h2>
// todo el output entre comillas ``
