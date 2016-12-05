// Insertar imagen
	window.imagenVacia = 'img/user.png';
	window.mostrarVistaPrevia = function mostrarVistaPrevia() {
    var Archivos, Lector;
    //Para navegadores antiguos
    if (typeof FileReader !== "function") {
        jQuery('#infoNombre').text('[Vista previa no disponible]');
        jQuery('#infoTamaño').text('(su navegador no soporta vista previa!)');
        return;
    }
    Archivos = jQuery('#archivo')[0].files;
    if (Archivos.length > 0) {
      Lector = new FileReader();
      Lector.onloadend = function(e) {
        var origen, tipo;
        //Envia la imagen a la pantalla
        origen = e.target; //objeto FileReader
        //Prepara la información sobre la imagen
        tipo = window.obtenerTipoMIME(origen.result.substring(0, 30));

        jQuery('#infoNombre').text(Archivos[0].name + ' (Tipo: ' + tipo + ')');
        jQuery('#infoTamaño').text('Tamaño: ' + e.total + ' bytes');
        //Si el tipo de archivo es válido lo muestra, 
        //sino muestra un mensaje 
        if (tipo !== 'image/jpeg' && tipo !== 'image/png' && tipo !== 'image/gif') {
            jQuery('#usuarioLogo').attr('src', window.imagenVacia);
            alert('El formato de imagen no es válido: debe seleccionar una imagen JPG, PNG o GIF.');
        }else {
          jQuery('#usuarioLogo').attr('src', origen.result);
          window.obtenerMedidas();
          var perfil=origen.result;
          localStorage.setItem("imagen", perfil);  
          $("#usuarioLogo").attr("src", localStorage.getItem("imagen")); 		
        }
      };
      Lector.onerror = function(e) {
        console.log(e)
      }
      Lector.readAsDataURL(Archivos[0]);
    }else{
      var objeto = jQuery('#archivo');
      objeto.replaceWith(objeto.val('').clone());
      jQuery('#user').attr('src', window.imagenVacia);
      jQuery('#infoNombre').text('[Seleccione una imagen]');
      jQuery('#infoTamaño').text('');
    };
	};

	//Lee el tipo MIME de la cabecera de la imagen
	window.obtenerTipoMIME = function obtenerTipoMIME(cabecera) {
	  return cabecera.replace(/data:([^;]+).*/, '\$1');
	}

	//Obtiene las medidas de la imagen y las agrega a la 
	//etiqueta infoTamaño
	window.obtenerMedidas = function obtenerMedidas(){
	  jQuery('<img/>').bind('load', function(e) {
	    var tamaño = jQuery('#infoTamaño').text() + '; Medidas: ' + this.width + 'x' + this.height;
	    jQuery('#infoTamaño').text(tamaño);
	  }).attr('src', jQuery('#user').attr('src'));
	}

	jQuery(document).ready(function() {
	  //Cargamos la imagen "vacía" que actuará como Placeholder
	  jQuery('#user').attr('src', window.imagenVacia);
	  //El input del archivo lo vigilamos con un "delegado"
	  jQuery('#botonera').on('change', '#archivo', function(e) {
	      window.mostrarVistaPrevia();
	  });
	  //El botón Cancelar lo vigilamos normalmente
	  jQuery('#cancelar').on('click', function(e) {
	    var objeto = jQuery('#archivo');
	    objeto.replaceWith(objeto.val('').clone());
	    jQuery('#user').attr('src', window.imagenVacia);
	    jQuery('#infoNombre').text('[Seleccione una imagen]');
	    jQuery('#infoTamaño').text('');
	  });
	});
  	$(".usuario_icono").attr("src", localStorage.getItem("imagen"));
		$(".usuario_icono_map").attr("src", localStorage.getItem("imagen"));

		