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
  var maximoElementos = 7;
  columnas.each(function(){
    var numChildren = $(this).children().length;
    var faltan = maximoElementos-numChildren;
    for (var i=0; i<faltan; i++){
      var aleatorio = Math.floor((Math.random()*4)+1);
      if (numChildren>0){
        $(this).find('img:first-of-type').before('<img src="image/' + aleatorio + '.png" class="elemento"></img>');
      } else {
        $(this).append('<img src="image/' + aleatorio + '.png" class="elemento"></img>')
      }
    }
  })
  dragdropElementos();
  verificar();
}

//Eventos para hacer draggable y droppable los elementos img
function dragdropElementos(){
  $('img').draggable({
		containment: '.panel-tablero',
    grid: [115, 95],
    droppable: 'img',
		revert: true,
		revertDuration: 100,
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
  mostrarMovimientos();
  arrastrado.attr('src', rutaSeleccionado);
  $(this).attr('src',rutaArrastrado);
  verificar();
}

//Mostrar movimientos
function mostrarMovimientos(){
  var numMovimientos = Number($('#movimientos-text').text());
  numMovimientos += 1;
  $('#movimientos-text').text(numMovimientos);
}

//verificar si hay minimo tres dulces del mismo tipo
function verificar(){
  var col1Elementos = $('.col-1').children();
	var col2Elementos = $('.col-2').children();
	var col3Elementos = $('.col-3').children();
	var col4Elementos = $('.col-4').children();
	var col5Elementos = $('.col-5').children();
	var col6Elementos = $('.col-6').children();
	var col7Elementos = $('.col-7').children();
  var arregloColumnas = $([col1Elementos, col2Elementos, col3Elementos, col4Elementos,
    col5Elementos, col6Elementos, col7Elementos
  ]);

  //buscar combos en columnas
    for (var c=0; c<7; c++){
      var curElemento = null;
      var sigElemento = null;
      var inicioCombiacion = null;
      var finCombinacion= null;
      var numIguales= 0;
      for (var r=0; r<6; r++){
        curElemento = arregloColumnas[c][r].src;
        sigElemento = arregloColumnas[c][r+1].src;
        if (curElemento==sigElemento){
          if (inicioCombiacion==null){
            inicioCombiacion=r;
            numIguales += 1;
          }else {
            numIguales += 1;
          }
          if (r>4 && numIguales>1){
            finCombinacion = r+1;
          }
        }else {
          if (numIguales>1) {
            finCombinacion = r;
          }else {
            inicioCombiacion = null;
            numIguales = 0;
          }
        }
        if (numIguales>1 && finCombinacion>0){
          finCombinacion += 1;
          for (var x=inicioCombiacion; x<finCombinacion; x++){
            arregloColumnas[c][x].className += " combo";
          }
          numIguales =0;
          inicioCombiacion = null;
          finCombinacion= null;
        }
      }
    }
  //buscar combos en filas
    for (var r=0; r<7; r++){
      var curElemento = null;
      var sigElemento = null;
      var inicioCombiacion = null;
      var finCombinacion= null;
      var numIguales= 0;
      for (var c=0; c<6; c++){
        curElemento = arregloColumnas[c][r].src;
        sigElemento = arregloColumnas[c+1][r].src;
        if (curElemento==sigElemento){
          if (inicioCombiacion==null){
            inicioCombiacion=c;
            numIguales += 1;
          }else {
            numIguales += 1;
          }
          if (c>4 && numIguales>1){
            finCombinacion = c+1;
          }
        }else {
          if (numIguales>1) {
            finCombinacion = c;
          }else {
            inicioCombiacion = null;
            numIguales = 0;
          }
        }
        if (numIguales>1 && finCombinacion>0){
          finCombinacion += 1;
          for (var x=inicioCombiacion; x<finCombinacion; x++){
            arregloColumnas[x][r].className += " combo";
          }
          MostrarPuntos(numIguales);
          numIguales =0;
          inicioCombiacion = null;
          finCombinacion= null;
        }
      }
    }
  animacionCombos();
}

//Mostrar puntos
function MostrarPuntos(numIguales) {
	var puntos = Number($('#score-text').text());
	switch (numIguales) {
		case 2:
			puntos += 20;
			break;
		case 3:
			puntos += 40;
			break;
		case 4:
			puntos += 80;
			break;
		case 5:
			puntos += 160;
			break;
		case 6:
			puntos += 320;
	}
	$('#score-text').text(puntos);
}

//animacion elementos combos
function animacionCombos(){
  $('img.combo').effect('pulsate', 900);
  $('img.combo').animate(
    {
    opacity: '0'  },
    {
    duration: 1000,
    complete: function () {
      eliminaCombos();
    },
    queue: true
  });
}

//eliminar elementos combos
function eliminaCombos(){
  $('img.combo').remove();
  iniciartablero();
}

//Boton iniciar
$('.btn-reinicio').click(function(){
  var puntos = 0;
  var movimientos=0;
  var texto_btn = $(this).text();
  if (texto_btn == "Iniciar"){
    $(this).text("Reiniciar");
    iniciartablero();
    contador(2);
  }else {
    $(this).text("Iniciar");
    reiniciar();
  }
})

//funcion Reiniciar
function reiniciar(){
  /*
  var columnas = $('[class^="col-"]');
  columnas.each(function(){
    $(this).empty();
    $('#score-text').text("0");
    $('#movimientos-text').text("0");
    $("#timer").text("00:00");
    clearInterval(x);
    contador(2);
  })*/
  location.reload();
}

//
function finjuego(){
$(".panel-score").animate(
  {
    width: "+=100%"
  },5000
)
$(".score").before("<h2 class=fin>Juego Finalizado</h2>");
$(".fin").css({"font-size":"5em","color":"#DCFF0E","text-align":"center"});
$(".panel-tablero").hide('120000','linear');
$(".time").hide('120000','linear');
}

//funcion al iniciar partida
function comenzarjuego(){
  blanco();
}

$(function(){
  comenzarjuego();

})
