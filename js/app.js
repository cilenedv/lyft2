$(document).ready(function() {
	$(".num_1").focus();
	$("#numero").focus();
	$("#name").focus();

	$("#numero").keydown(function(evento) {
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});

	$("#numero").keyup(function(evento) {
		var numeroCelular=$(this).val();
		var longitud = numeroCelular.length;
		localStorage.setItem("numeroCelular", numeroCelular);
		if (longitud == 9) {
			$("#next").attr("href", "verify.html");
			$(this).attr("maxlength","9"); 
		} else {
			$("#next").removeAttr("href");
		}
	});

	$("#next").click(function(evento){
		var longitud=$("#numero").val().length;
		var codigo=Math.round(Math.random()*890+100);
		localStorage.setItem("clave",codigo);
		if(longitud==9){
			$(this).attr("href", "verify.html");
			var mensaje="Lab - "+codigo;
     		alert(mensaje);
		}	
	});

	$("#resend").click(function(evento){
		var codigo=Math.round(Math.random()*890+100);
		localStorage.setItem("clave",codigo);
		var mensaje="Lab - "+codigo;
     	alert(mensaje);
     	$(".num_1").focus();

	});

	var numeroValido=localStorage.getItem("numeroCelular");
	$("#cop_num").append(numeroValido);

	$("#next-2").click(function(evento){
		var numeroClave=$(".num_clave").eq(0).val()+$(".num_clave").eq(1).val()+$(".num_clave").eq(2).val();
		var num_1=$(".num_clave").eq(0).val().length;
		var numeroRandon=localStorage.getItem("clave");
		if(numeroClave==numeroRandon){
			$(this).attr("href","datos.html");
		}
		if(num_1==0){
			alert("Ingrese la clave");
		}
		if(numeroClave!=numeroRandon && num_1!=0){
			alert("Su clave es incorrecto");
			$(".num_clave").val("");
			$(".num_1").focus();
		}
	});

	$(".num_clave").keyup(function(evento){
		var ascii = evento.keyCode;
		var longitud = $(this).val().length;
		if (longitud == 1) {
	        $(this).next().focus();
	    }
	    if (ascii == 8) {
	    	$(this).prev().focus();
	    }
	});

	$(".num_clave").keydown(function(){
		var ascii = evento.keyCode;
		var longitud = $(this).val().length;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57 && longitud == 0)) {
			return true;
		} else {
			return false;
		}
	});

	$("#next3").click(function(evento){
		if($("#check").is(":checked")){
			if(validar()){
				$("#next3").attr("href","localizacion.html");
			}

		}else{
			alert("Debe aceptar las condiciones");
		}
	});
	var nombreValido=localStorage.getItem("nombre");
	$("#copiaNombre").append(nombreValido);
	var apellidoValido=localStorage.getItem("apellido");
	$("#copiaApellido").append(apellidoValido);

});
function validar(){
	var nombre=$("#name").val();
	var apellido=$("#lastName").val();
	var correo=$("#email").val();
	var regexNombre = /^[a-zñáéíóúü]+$/gi;
	var regexApellido = /^[a-zñáéíóúü]+$/gi;
	var regexCorreo = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	localStorage.setItem("nombre", nombre);
	localStorage.setItem("apellido", apellido);

	if ((regexNombre.test(nombre))&&(regexApellido.test(apellido) &&(regexCorreo.test(correo)))) {
		if((nombre.length>=2 && nombre.length<=20) && (apellido.length>=2 && apellido.length<=20)){
				return true;
		}else{
			alert("cantidad de letras no admitidas");
		}
	}
	else{
		alert("Ingrese datos correctos");
	}
	
}