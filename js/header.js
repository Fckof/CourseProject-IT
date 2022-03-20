$(".main").before(`
<nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
		<div class="container-fluid">
		  <a class="navbar-brand header_logo" href="index.html">КиноКаеф</a>
		  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarScroll">
			<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
			  <li class="nav-item">
				<a class="nav-link top250" aria-current="page" href="#">ТОП 250</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link waiting" href="#">Ожидаемые</a>
			  </li>
			  <li class="nav-item relis">
				<!-- <a class="nav-link releases" href="#">Релизы</a> -->
				<div class="dropdown">
					<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
					  Релизы
					</a>
				  
					<ul class="dropdown-menu">
						<li><a class="dropdown-item releases" href="0">Январь</a></li>
						<li><a class="dropdown-item releases" href="1" aria-current="true">Февраль</a></li>
						<li><a class="dropdown-item releases" href="2">Март</a></li>
						<li><a class="dropdown-item releases" href="3">Апрель</a></li>
						<li><a class="dropdown-item releases" href="4">Май</a></li>
						<li><a class="dropdown-item releases" href="5">Июнь</a></li>
						<li><a class="dropdown-item releases" href="6">Июль</a></li>
						<li><a class="dropdown-item releases" href="7">Август</a></li>
						<li><a class="dropdown-item releases" href="8">Сентябрь</a></li>
						<li><a class="dropdown-item releases" href="9">Октябрь</a></li>
						<li><a class="dropdown-item releases" href="10">Ноябрь</a></li>
						<li><a class="dropdown-item releases" href="11">Декабрь</a></li>
					  </ul>
				  </div>
			  </li>
			</ul>
			<button class="btn btn-primary adv_search_btn me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Расширенный поиск</button>

			<form class="d-flex" id="search_form">
				
				
			  <input class="form-control me-2 " id="search_input" type="search" placeholder="Найти кино, сериал..." aria-label="Search">
			  <button class="btn btn-outline-success" type="submit">Поиск</button>
			  </form>
			  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
				<div class="offcanvas-header">
				  <h5 id="offcanvasRightLabel" class="adv_search_header">Выбор параметров</h5>
				  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				

					<form class="d-flex" id="adv_search_form">
						<div class="offcanvas-body">
					<input class="form-control adv_search_input mb-3" id="adv_search_input" type="text" placeholder="Название, ключевые слова..." aria-label="deafult input example">
					<select class="form-select form-select-md mb-3" id="form_select_sort" aria-label=".form-select-lg example">
						<option selected value="">Вариант сортировки</option>
						<option value="RATING">Рейтинг</option>
						<option value="YEAR">Год</option>
						<option value="NUM_VOTE">Число голосов</option>
					  </select>
					  <select class="form-select form-select-md mb-3" id="form_select_type" aria-label=".form-select-lg example">
						<option selected value="">Тип фильма</option>
						<option value="FILM">Фильм</option>
						<option value="TV_SHOW">Телешоу</option>
						<option value="ALL">Все</option>
					  </select>
					  <span class="genres_header">Рейтинг</span>
					  <div id="slider" class="sldr"></div>
					  <span class="genres_header">Год</span>
					  <div id="slider2" class="sldr"></div>
						  <a class="btn btn-primary btn_genre mb-2" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapse1Example1">
						Выбрать жанр
					  </a>
					  <button type="submit" id="adv_btn" class="btn btn-success mb-2 ml-3">Найти</button>

					<!-- <span class="genres_header">Жанры</span><br> -->
					

						<div class="collapse" id="collapseExample1">
							<div class="group_genres"></div>
						</div><br>
					  <a class="btn btn-primary btn_country me-2" data-bs-toggle="collapse" id="top_country" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
					Выбрать страну
				  </a>
					<!-- <button class="hg">Страна</button> -->
					<div class="collapse" id="collapseExample">
						<div class="group_countries" ></div>
					</div>
					
					</div>
				</form>

				</div>
			  </div>
			
			
		  </div>
		</div>
		
	  </nav>
`);

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
<input type="radio" class="btn-check radio-button gnr" name="options-outlined" id="success-outlined${genre.id}" autocomplete="off" value="${genre.id}">
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
	<input type="radio" class="btn-check radio-button ctry" name="options-outlined1" id="danger-outlined${country.id}" autocomplete="off" value="${country.id}">
	<label class="btn btn-outline-danger" for="danger-outlined${country.id}">${country.country}</label>
	</div>
	`);
	
	})
	}