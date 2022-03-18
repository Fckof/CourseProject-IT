
const API_KEY="8c8e1a50-6322-4135-8875-5d40a5420d86"//"b3dea457-5eed-439d-9797-911342e41cbd"
const API_URL_TOP100="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"
const API_URL_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const API_URL_SEARCH_FILM_BY_ID="https://kinopoiskapiunofficial.tech/api/v2.2/films/"
const API_URL_CUSTOM="https://kinopoiskapiunofficial.tech/api/v2.2/films/"
const API_URL_SEARCH_SEQUELS="https://kinopoiskapiunofficial.tech/api/v2.1/films/"
const API_URL_STAFF="https://kinopoiskapiunofficial.tech/api/v1/staff?filmId="
const API_URL_TOP_250="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1"
const API_URL_AWAITING="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1"
const API_URL_RELEASES="https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?"
const API_URL_FILTERS="https://kinopoiskapiunofficial.tech/api/v2.2/films/filters"
const API_URL_FILMS="https://kinopoiskapiunofficial.tech/api/v2.2/films?type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1"
//getFilms(API_URL_TOP100)
getFilters(API_URL_FILTERS)

var slider = document.getElementById('slider');
var slider2 = document.getElementById('slider2');
noUiSlider.create(slider, {
    start: [3, 8],
    connect: true,
	tooltips:true,
	step:1,
    range: {
        'min': 0,
        'max': 10
    },
	format:{
		to:function (value){
			return parseInt(value)
		},
		from:function (value){
			return parseInt(value)
		}
	}
});
slider.noUiSlider.on("change",(values,handle)=>{
	console.log(slider.noUiSlider.get())
})

noUiSlider.create(slider2, {
    start: [1950, 2000],
    connect: true,
	tooltips:true,
	step:1,
    range: {
        'min': 1900,
        'max': 2100
    },
	format:{
		to:function (value){
			return parseInt(value)
		},
		from:function (value){
			return parseInt(value)
		}
	}
});
slider2.noUiSlider.on("change",(values,handle)=>{
	console.log(slider2.noUiSlider.get())
})
async function getFilters(url){
	const res=await fetch(url,{
		headers: {
		  "Content-Type": "application/json",
		  "X-API-KEY": API_KEY
		}
	});
	const resData = await res.json();
	console.log(resData)
	showGenres(resData)
	showCountries(resData)
}
function showGenres(data){
data.genres.forEach((genre)=>{
	if(genre.genre==""){
		return
	}
	$(".group_genres").append(`
<div class="genres_item m-2">
<input type="radio" class="btn-check radio-button" name="options-outlined" id="success-outlined${genre.id}" autocomplete="off" value="${genre.id}">
<label class="btn btn-outline-warning" for="success-outlined${genre.id}">${genre.genre}</label>
</div>
`);

})
}
function showCountries(data){
	data.countries.forEach((country)=>{
		if(country.country==""){
			return
		}
		$(".group_countries").append(`
	<div class="country_item m-2">
	<input type="radio" class="btn-check radio-button ctry" name="options-outlined" id="danger-outlined${country.id}" autocomplete="off" value="${country.id}">
	<label class="btn btn-outline-danger" for="danger-outlined${country.id}">${country.country}</label>
	</div>
	`);
	
	})
	}
$(".hg").click((e)=>{
	alert(
		$(".ctry:checked").val()
	)
})




$(".top250").click(function (e) { 
	e.preventDefault()
	getFilms(API_URL_TOP_250)
});
$(".waiting").click(function (e) { 
	e.preventDefault()
	getFilms(API_URL_AWAITING)
});
$(".releases").click(function (e) { 
	e.preventDefault()
	var d=new Date()
	var months_names = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  var month=$(this).attr('href')
//console.log(`${API_URL_RELEASES}year=${d.getFullYear()}&month=${months_names[month]}`)
	linkCheckActive(this,".dropdown-item")
	getFilms(`${API_URL_RELEASES}year=${d.getFullYear()}&month=${months_names[month]}`)
});

$(".nav-link").click(function (e) { 
	e.preventDefault();
	linkCheckActive(this,".nav-link")
	$(".dropdown-item").removeClass("active")
});

// $(".btn_country").click(function (e) { 
// 	e.preventDefault();
// 	let dest=$(this).offset().top
// 	$(".offcanvas-body").animate({scrollTop:dest},800)
// 	return false
// });
// $(".btn_genre").click(function (e) { 
// 	e.preventDefault();
// 	let dest=$(this).offset().top
// 	$(".offcanvas-body").animate({scrollTop:dest},800)
// });

function linkCheckActive(item, selector){
	let active=$(this).hasClass("active")
	if(!active){
		$(selector).removeClass("active")
		$(item).addClass("active")
	}
}

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

async function getFilmById(general,money,similars,sequels,images,staff){
	
		var res1 = await fetch(general,{
			headers: {
			  "Content-Type": "application/json",
			  "X-API-KEY": API_KEY
			}
		});
		const resGeneral = await res1.json();
		var res2 = await fetch(money,{
			headers: {
			  "Content-Type": "application/json",
			  "X-API-KEY": API_KEY
			}
		});
		const resMoney = await res2.json();
		var res3 = await fetch(similars,{
			headers: {
			  "Content-Type": "application/json",
			  "X-API-KEY": API_KEY
			}
		});
		const resSimilars = await res3.json();
		var res4 = await fetch(sequels,{
			headers: {
			  "Content-Type": "application/json",
			  "X-API-KEY": API_KEY
			}
		});
		const resSequels = await res4.json();
		var res5 = await fetch(images,{
			headers: {
			  "Content-Type": "application/json",
			  "X-API-KEY": API_KEY
			}
		});
		const resImages = await res5.json();
		var res6 = await fetch(staff,{
			headers: {
			  "Content-Type": "application/json",
			  "X-API-KEY": API_KEY
			}
		});
		const resStaff = await res6.json();
	
	console.log(resGeneral,resMoney,resSimilars,resSequels,resImages,resStaff)
	showCurrentFilm(resGeneral,resMoney,resSimilars,resSequels,resImages,resStaff)
}

$(".main").on("click",".darkener",function(e){
	const filmId = $(this).attr('value');
	console.log(filmId);
	
		const general=`${API_URL_SEARCH_FILM_BY_ID}${filmId}`
		const money=`${API_URL_CUSTOM}${filmId}/box_office`
		const similars=`${API_URL_CUSTOM}${filmId}/similars`
	 	const sequels=`${API_URL_SEARCH_SEQUELS}${filmId}/sequels_and_prequels`
	 	const images=`${API_URL_CUSTOM}${filmId}/images?type=STILL&page=1`
		 const staff=`${API_URL_STAFF}${filmId}`
	getFilmById(general,money,similars,sequels,images,staff);
});

function showCurrentFilm(data,money,similars,sequels,images,staff){
	$(".main").html(" ");
	
	if(data.ratingAgeLimits!=null){
		data.ratingAgeLimits=data.ratingAgeLimits.substr(3)
	}
	if(data.ratingKinopoisk==null){
		data.ratingKinopoisk=0
	}
	$(".main").append(`
	<div class="film_cont container-fluid">
		  <div class="film_poster">
          		<img
           		 	src="${data.posterUrl}"
            		alt="" class="film_poster_img"
          		/>
				  <span class="similar">Похожие фильмы:</span>
				  <div class="similar_films_container"></div>
				</div>
				
		<div class="film_page">
        	
			<div class="film_info">
				<span class="film_nameRu">${data.nameRu} (${data.year})</span>
				<span class="film_nameEn">${data.nameOriginal} <span class="film_age">${data.ratingAgeLimits}+</span></span>
				<p class="film_description">${data.description}</p>
				<button type="button" class="btn btn-outline-warning watchFilmBtn" onclick="window.location.href = '${data.webUrl}';">Смотреть</button>
				
				<div class="table_info">
					<span class="about_film_span">О фильме</span>
					
					<div class="row">
						<div class="col-4">Год производства</div>
						<div class="col-8">${data.year}</div>
					</div>
					<div class="row">
						<div class="col-4">Страна</div>
						<div class="col-8">${data.countries.map((country) =>
							` ${country.country}`
						)}</div>
					</div>
					<div class="row">
						<div class="col-4">Жанр</div>
						<div class="col-8">${data.genres.map((genre)=>
							` ${genre.genre}`
						)}</div>
					</div>
					
					<div class="row">
						<div class="col-4">Режиссер</div>
						<div class="col-8 director"></div>
					</div>
					<div class="row">
						<div class="col-4">Сценарий</div>
						<div class="col-8 scenario"></div>
					</div>
					<div class="row">
						<div class="col-4">Продюсер</div>
						<div class="col-8 producer"></div>
					</div>
					<div class="row">
						<div class="col-4">Оператор</div>
						<div class="col-8 operator"></div>
					</div>
					<div class="row">
						<div class="col-4">Время</div>
						<div class="col-8">${data.filmLength} мин.</div>
					</div>
				</div>
			</div>
			<div class="film_sidebar">
				<span class="film_rating">${data.ratingKinopoisk}</span>
				<span class="film_reviews"> ${data.ratingKinopoiskVoteCount} оценки</span>
				<span class="film_critics"> ${data.ratingFilmCriticsVoteCount} рецензий</span>

				<span class="sequel_header">
						Сиквелы и приквелы:
					</span>
					<div class="sequels"></div>
			</div>
			
			
		</div>
		
	</div>
	`)
	staff.forEach((item)=>{
		switch(item.professionKey){
			case "DIRECTOR":$(".director").append(`${item.nameRu} `);
			break
			case "PRODUCER":$(".producer").append(`${item.nameRu} `);
			break
			case "WRITER":$(".scenario").append(`${item.nameRu} `);
			break
			case "OPERATOR":$(".operator").append(`${item.nameRu} `);
			break
		}
		console.log(item.professionKey)
	})
	if(images.total>0){
		$(".table_info").before(`
		<div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
						
		<div class="carousel-inner">
		</div>
		<a class="carousel-control-prev" href="#carouselControls" role="button" data-bs-slide="prev">
		  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		  <span class="visually-hidden">Previous</span>
		</a>
		<a class="carousel-control-next" href="#carouselControls" role="button" data-bs-slide="next">
		  <span class="carousel-control-next-icon" aria-hidden="true"></span>
		  <span class="visually-hidden">Next</span>
		</a>
	  </div>
		`);
		images.items.forEach((item)=>{
			$(".carousel-inner").append(`
		<div class="carousel-item">
			<img src="${item.imageUrl}" class="d-block w-100 slider_img" alt="...">
	  	</div>
		`);
		})
		$(".carousel-item").first().addClass("active");
		
	}

	sequels.forEach((film)=>{
		$(".sequels").append(`
		<div class="similar_films">
		<div class="film_img_card">
			  <img
				src="${film.posterUrl}"
				alt="Film"
				class="film_img cover"
			  />
			  </div>
			  <span class="film_name name">${film.nameRu}</span>
			 <button class="darkener" value="${film.filmId}"></button>
			
  		</div>
		`);
	})
	similars.items.forEach((item)=>{
		$(".similar_films_container").append(`
		<div class="similar_films">
					<div class="film_img_card">
						  <img
							src="${item.posterUrl}"
							alt="Film"
							class="film_img cover"
						  />
						  </div>
						  <span class="film_name name">${item.nameRu}</span>
						 <button class="darkener" value="${item.filmId}"></button>
						</div>
		`);
	})
	if(data.ratingAgeLimits!=null ){
		$(".table_info").append(`
		<div class="row">
			<div class="col-4">Возраст</div>
			<div class="col-8"><span class="film_age">${data.ratingAgeLimits}+</span></div>
		</div>
		`);
	}
	if(data.slogan!=null){
		$(".table_info").append(`
		<div class="row">
		<div class="col-4">Слоган</div>
		<div class="col-8">"${data.slogan}"</div>
	</div>
	`);
	}
	money.items.forEach((item)=>{
		switch(item.type){
			case "WORLD": item.type="Мировые сборы"
			break
			case "BUDGET":item.type="Общий бюджет"
			break
			case "MARKETING":item.type="Маркетинг"
			break
			case "USA":item.type="Сборы в США"
			break
		}
		$(".table_info").append(`
	<div class="row">
		<div class="col-4">${item.type}</div>
		<div class="col-8">${item.amount}${item.symbol}</div>
	</div>
`);
	})
	$(window).scrollTop(0);
}

function showMovies(data){
	$(".main").html(" ");
	console.log(data.films)
	switch(data.films){
		case undefined:data.items.forEach((movie) => {
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
					 <button class="darkener" value="${movie.kinopoiskId}"></button>
					  <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
					  
					  
					</div>
			`);
		});
			break
		default: data.films.forEach((movie) => {
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
		break
	}
	
	$(window).scrollTop(0);
}

$("#adv_search_form").submit(function (e) { 
	e.preventDefault();
	alert("jn")
});

	
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

	

