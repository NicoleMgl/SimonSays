
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var randomChosenColour;
var userChosenColour;
var level = 0;
var press = false;

$(document).keydown(function(){
    if (!press){
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        press = true;
    }
});

// Event Handler
$(".btn").on("click", function () {
    userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    // clear user
    userClickedPattern = [];
    // update level + view
    $("#level-title").text(`Level ${level}`);
    level++;
    // random sequence
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // animations
    $(`#${randomChosenColour}`).fadeOut(70).fadeIn(70);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("sucesss");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    press = false;
    gamePattern = [];
}