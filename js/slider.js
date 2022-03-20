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
    start: [1950, 2022],
    connect: true,
	tooltips:true,
	step:1,
    range: {
        'min': 1900,
        'max': 2050
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