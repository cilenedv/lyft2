// geolocalización
	var cargarPagina = function() {
	$(".button-collapse").sideNav();

	if (navigator.geolocation) { 
		// también se puede usar if ("geolocation" in navigator) {}
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
};


var funcionExito = function(posicion) {
  var lati = posicion.coords.latitude;
  var long = posicion.coords.longitude;
  var map=  new GMaps({
    div: '#map',
    zoom: 15,
    lat: lati,
    lng: long,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });
  map.addMarker({
    lat: lati,
    lng: long,
    title: 'Lima',
    click: function(e) {
      alert('You clicked in this marker');
    }
  });

  var dir = "";
  var latlng = new google.maps.LatLng(lati, long);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({"latLng": latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        dir = results[0].formatted_address;
      } else {
        dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
      }
    }
    $("#direccion").val(dir);
  });

  $("#destino").click(function(){
    GMaps.geocode({
      address: $('#direccion').val(),
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          
          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            title: 'Lima',
            click: function(e) {
              alert('You clicked in this marker');
            }
          });
          map.drawRoute({
            origin: [lati, long],
            zoom:1,
            destination: [latlng.lat(), latlng.lng()],
            travelMode: 'driving',
            strokeColor: '#4285F4',
            strokeOpacity: 0.9,
            strokeWeight: 6
          });
        }
      }
    }); 
  });
};  

var funcionError = function (error) {
  console.log(error);
};
$(document).ready(cargarPagina);






