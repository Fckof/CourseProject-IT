function showMovies(data){
	$(".main").html(" ");
	console.log(data.films)
	switch(data.films){
		case undefined:data.items.forEach((movie) => {
			if(isNaN(Number(movie.rating))){
				movie.rating=0;
			}
			let rating1=`<div class="movie__average movie__average--${getClassByRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>`
			let rating2=`<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>`
			var rating
			switch(movie.ratingKinopoisk){
				case undefined:rating=rating2
				break
				default: rating=rating1
				break
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
					   ${rating}
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
function getClassByRate(vote) {
	if (vote >= 7) {
	  return "green";
	} else if (vote > 5) {
	  return "orange";
	} else {
	  return "red";
	}
	
  }