$(document).ready(function(){
blanco();
iniciartablero();

function blanco(){
  $("div h1").animate(
    {
      color:"white"
    },3000, function(){amarillo()}
  );
}
function amarillo(){
  $("div h1").animate(
    {
      color:"#DCFF0E"
    },2000, function(){blanco()}
  );
}

function iniciartablero(){
  var columnas = $('[class^="col-"]');
  columnas.each(function(){
    for (var i=0; i<6; i++){
      var aleatorio = Math.floor((Math.random()*4)+1);
      var hijoscolumna= $(this).children().length;
      if (hijoscolumna>0){
        $(this).find('img:first-of-type').before('<img src="image/' + aleatorio + '.png" class="element"></img>');
      } else {
        $(this).append('<img src="image/' + aleatorio + '.png" class="element"></img>')
      }
    }
  })

}

});
