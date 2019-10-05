$(document).ready(function(){
blanco();

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
        $(this).find('img:first-of-type').before('<img src="image/' + aleatorio + '.png" class="pieza"></img>');
      } else {
        $(this).append('<img src="image/' + aleatorio + '.png" class="pieza"></img>')
      }
    }
  })
  $('.pieza').draggable();
}

//Boton iniciar
$('.btn-reinicio').click(function(){
  var texto_btn = $(this).text();
  if (texto_btn == "Iniciar"){
    $(this).text("Reiniciar");
    iniciartablero();
    contador();
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

});
