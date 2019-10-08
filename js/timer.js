function contador(){
	// Set the time we're counting down to
	//var countDownDate = new Date().getTime() + minutes * 60000);
	var countDownTime = new Date().getTime()+.1*60000;

	// Update the count down every 1 second
	var x = setInterval(function() {

	  // Get today's time
	  var now = new Date().getTime();

	  // Find the distance between now and the count down date
	  var distance = countDownTime - now;

	  // Time calculations for days, hours, minutes and seconds
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Output the result in an element with id="timer"
		if (seconds<10){
			$("#timer").text("0"+minutes + ":0" + seconds);
		}else {
			$("#timer").text("0"+minutes + ":" + seconds);
		}


	  // If the count down is over, write some text
	  if (distance < 1) {
	    clearInterval(x);
			$("#timer").text("00:00");
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
	}, 1000);
}
