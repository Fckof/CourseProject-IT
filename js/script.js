const API_KEY="8c8e1a50-6322-4135-8875-5d40a5420d86"//"b3dea457-5eed-439d-9797-911342e41cbd"
const API_URL_TOP100="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"
const API_URL_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const API_URL_SEARCH_FILM_BY_ID="https://kinopoiskapiunofficial.tech/api/v2.2/films/"

//getFilms(API_URL_TOP100)

async function getFilms(url){
	const res=await fetch(url,{
		headers: {
		  "Content-Type": "application/json",
		  "X-API-KEY": API_KEY
		}
	});
	const resData = await res.json();
	console.log(resData)
	showMovies(resData)
	  
}

async function getFilmById(url){
	const res=await fetch(url,{
		headers: {
		  "Content-Type": "application/json",
		  "X-API-KEY": API_KEY
		}
	});
	const resData = await res.json();
	console.log(resData)
	showCurrentFilm(resData)
}

function showCurrentFilm(data){
	$(".main").html(" ");

	$(".main").append(`
	<div class="film_page">
        	<div class="film_poster">
          		<img
           		 	src="${data.posterUrl}"
            		alt="" class="film_poster_img"
          		/>
        	</div>
			<div class="film_info">
				<span class="film_nameRu">${data.nameRu} (${data.year})</span>
				<span class="film_nameEn">${data.nameOriginal} <span class="film_age">${data.ratingAgeLimits.substr(3)}+</span></span>
				<p class="film_description">${data.description}</p>
				<a type="button" class="btn btn-outline-warning watchFilmBtn" href="${data.webUrl}">Смотреть</a>
			</div>
			<div class="film_sidebar">
			<span class="film_rating">${data.ratingKinopoisk}</span>
			<span class="film_reviwes"> ${data.ratingKinopoiskVoteCount} оценок</span>
			<span class="film_critics"> ${data.ratingFilmCriticsVoteCount} рецензий</span>
			</div>
		</div>
	`)
}

function showMovies(data){
	$(".main").html(" ");
	data.films.forEach((movie) => {
		if(isNaN(Number(movie.rating))){
			movie.rating=0;
		}
		$(".main").append(`
	<div class="film">
			<div class="film_img_wrap">
				  <img
					src="${movie.posterUrlPreview}"
					alt="Film"
					class="film_img cover"
				  />
				  </div>
				  <span class="film_name">${movie.nameRu}</span>
				  <span class="film_genre">${movie.genres.map((genre)=>
					  ` ${genre.genre}`
				  )}</span>
				 <button class="darkener" value="${movie.filmId}"></button>
				  <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
				  
				  
				</div>
		`);
	});
}



	
	$("#search_form").submit(function (e) { 
		e.preventDefault();
		const search=$("#search_input").val();
		console.log(search)
		const ApiSearchUrl=`${API_URL_SEARCH}${search}`
		console.log(ApiSearchUrl)
		if(search){
			getFilms(ApiSearchUrl)
			$("#search_input").val("")
		}
	});

	function getClassByRate(vote) {
		if (vote >= 7) {
		  return "green";
		} else if (vote > 5) {
		  return "orange";
		} else {
		  return "red";
		}
		
	  }

	$(".main").on("click",".darkener",function(e){
		const filmId = $(this).attr('value');
		console.log(filmId);
		const ApiSearchUrl=`${API_URL_SEARCH_FILM_BY_ID}${filmId}`;
		getFilmById(ApiSearchUrl);
	});

