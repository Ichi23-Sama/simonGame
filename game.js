var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

//start the web when any key is pressed
$(document).on("keypress", function(){
    if (gameStart != true){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
});

//check which button is pressed
$(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 800);
        }
    } else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        stopSound("bgMusic");
    }
}

function nextSequence() {
      userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}
