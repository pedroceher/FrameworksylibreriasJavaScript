//cambio de color en Main Titulo
function blanco(){
  $("div h1").animate(
    {
      color:"white"
    },900, function(){amarillo()}
  ).delay(1000);
}
function amarillo(){
  $("div h1").animate(
    {
      color:"#DCFF0E"
    },1200, function(){blanco()}
  );
}

//Inicializar el tablero
function iniciartablero(){
  var columnas = $('[class^="col-"]');
  columnas.each(function(){
    for (var i=0; i<7; i++){
      var aleatorio = Math.floor((Math.random()*4)+1);
      var hijoscolumna= $(this).children().length;
      if (hijoscolumna>0){
        $(this).find('img:first-of-type').before('<img src="image/' + aleatorio + '.png" class="elemento"></img>');
      } else {
        $(this).append('<img src="image/' + aleatorio + '.png" class="elemento"></img>')
      }
    }
  })
  dragdropElementos();
}

//Eventos para hacer draggable y droppable los elementos img
function dragdropElementos(){
  $('img').draggable({
		containment: '.panel-tablero',
    grid: [115, 95],
    droppable: 'img',
		revert: true,
		revertDuration: 400,
		opacity: 0.8,
		zIndex: 1,
	});
	$('img').droppable({
		drop: intercambiar
	});
}

//intercambiar los elementos, el arrastrado y el selecionado
function intercambiar(event, arrastrado){
  var arrastrado = $(arrastrado.draggable);
  var rutaArrastrado = arrastrado.attr('src');
  var seleccionado = $(this);
  var rutaSeleccionado = seleccionado.attr('src');
  arrastrado.attr('src', rutaSeleccionado);
  $(this).attr('src',rutaArrastrado);
}

//verificar si hay minimo tres dulces del mismo tipo
function verificar(){

}


//Boton iniciar
$('.btn-reinicio').click(function(){
  var texto_btn = $(this).text();
  if (texto_btn == "Iniciar"){
    $(this).text("Reiniciar");
    iniciartablero();
  //  contador();
  }else {
    $(this).text("Iniciar");
    reiniciar();
  }
})

//funcion Reiniciar
function reiniciar(){
  var columnas = $('[class^="col-"]');
  columnas.each(function(){
    $(this).empty();
  })
}

//funcion al iniciar partida
function comenzarjuego(){
  blanco();
}

$(function(){
  comenzarjuego();
  //funciones mouse`
   $('img.elemento').click(function(){
     var posV = $("img.elemento").attr("src");
      $('.btn-reinicio').text(posV);
   })
})
