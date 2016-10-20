// geolocalización
	var cargarPagina = function() {
	$(".button-collapse").sideNav();

	if (navigator.geolocation) { 
		// también se puede usar if ("geolocation" in navigator) {}
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
};


var funcionExito = function(posicion) {
  var lat = posicion.coords.latitude;
  var lon = posicion.coords.longitude;
  var map=new GMaps({
	  div: '#map',
	  lat: lat,
	  lng: lon
	});
  map.addMarker({
  lat: lat,
  lng: lon,
  title: 'Lima',
  click: function(e) {
    alert('You clicked in this marker');
  }
});
      
};

var funcionError = function (error) {
	console.log(error);
};

$(document).ready(cargarPagina);
