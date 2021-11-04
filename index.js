var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var userChosenColour;
var check = 0;
var level = 0;
var checkingAnswer = 0;
var randomChosenColour;

$(document).keypress(function(event){
  if(check === 0){
   check++;
   $("#level-title").text("LEVEL "+level);
   nextSequence();
  }

});




function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playingSound(randomChosenColour);
  $("#level-title").text("LEVEL "+level);
  level++;
  // console.log(gamePattern);
  userClickedPattern=[];
  checkingAnswer=0;
  }


$(".btn").on("click",function(event){

  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playingSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
  // console.log(userClickedPattern);
})


function checkAnswer(){
  if(userClickedPattern[checkingAnswer] === gamePattern[checkingAnswer]){
    checkingAnswer++;
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence,1000);
    }
  }
  else{
    var endGame = new Audio("sounds/wrong.mp3");
    endGame.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game Over, Press button to Restart");
    startOver();
  }
}

function startOver(){
  $(".restart").removeClass("hidden");
  $(".restart").click(function(){
    gamePattern =[];
    userClickedPattern=[];
    checkingAnswer=0;
    level=0;
    check = 0;
    $("h1").text("Press A Key to Start");
    $(".restart").addClass("hidden");
  })

}

function playingSound(colour){
  switch (colour) {

    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;

    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;

    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;

    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;

    default:

  }
}




function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},50);
}
