$(document).ready(function(){
blanco();

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

});
