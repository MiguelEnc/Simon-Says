var 
  // Board's pads objects
  yellowPad = document.getElementById("yellow"),
  greenPad  = document.getElementById("green"),
  bluePad   = document.getElementById("blue"),
  redPad    = document.getElementById("red"),
  
  // Config
  strict    = document.getElementById("strict"),
  start     = document.getElementById("start"),
  stage     = document.getElementById("stage"),
  
  // Game logic
  strictFlag        = false,
  gameSequence      = [],
  userInputIndex    = 0,
  spectingUserInput = false,
  
  // Pads configuration values:
  // colors of each state and audio
  padVal = {
    yellow: {
      normal: '#F4B05E',
      clicked: '#efdc0b',
      audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
    },
    green: {
      normal: '#3BA354',
      clicked: '#02d837',
      audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
    },
    blue: {
      normal: '#00ABEA',
      clicked: '#01ebfc',
      audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
    },
    red: {
      normal: '#DE4659',
      clicked: '#ff0000',
      audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    },
    errorAudio: new Audio('http://www.freesfx.co.uk/rx2/mp3s/9/11110_1393961399.mp3')
  };

greenPad.onmousedown = function(){
  if(spectingUserInput)
    mouseDown(this, 0);
}

redPad.onmousedown = function(){
  if(spectingUserInput)
    mouseDown(this, 1);
}

yellowPad.onmousedown = function(){
  if(spectingUserInput)
    mouseDown(this, 2);
}

bluePad.onmousedown = function(){
  if(spectingUserInput)
    mouseDown(this, 3);
}

greenPad.onmouseup = function(){
  mouseUp(this);
}

redPad.onmouseup = function(){
  mouseUp(this);
}

yellowPad.onmouseup = function(){
  mouseUp(this);
}

bluePad.onmouseup = function(){
  mouseUp(this);
}


/**
 * Applies the mouse down effect to the given element
 * Changes background color and plays sound
 * @param {Object} element pad document object to modify
 * @param {Number} index pad index
 */
function mouseDown(element, index) {
  var pad = element.getAttribute("id");
  element.style.backgroundColor = padVal[pad].clicked;
  padVal[pad].audio.play();

  if(spectingUserInput && index != null) {
    checkUserSequence(index);
  }
}

/**
 * Applies the mouse up effect to the given element
 * Restores original background color
 * @param {Object} element pad document object to modify
 */
function mouseUp(element) {
  var pad = element.getAttribute("id");
  element.style.backgroundColor = padVal[pad].normal;
}

/**
 * Regulates Strict flag activation
 */
strict.onclick = function() {
  if(strictFlag) {
    strictFlag = false;
    strict.style.backgroundColor = "#333";
  } else {
    strictFlag = true;
    strict.style.backgroundColor = "red";
  }
}

document.getElementById("restart").onclick = function() {
  
  if(start.innerText === "Start"){ // Game start
    start.innerText = "Restart";

  } else { // Geme restart
    gameSequence = [];
  }

  generateRandomGameSequence();
}

/**
 * Adds a random number to the gameSequence
 */
function generateRandomGameSequence() {
  // random number between 0 and 3
  var rnd = Math.floor(Math.random() * 4);
  gameSequence.push(rnd);
  reproduceGameSequence(gameSequence);
}

/**
 * Displays the given gameSequence activation
 * @param {Array} arr Array of current gameSequence
 */
function reproduceGameSequence(arr) {
  var len = 0;
  spectingUserInput = false;
  var intervalId = setInterval(function(){

    if(len < arr.length){
      var val = arr[len];
      switch (val) {
        case 0:
          mouseDown(greenPad, null);
          setTimeout(function(){
            mouseUp(greenPad);
          }, 500);
        break;
    
        case 1:
          mouseDown(redPad, null);
          setTimeout(function(){
            mouseUp(redPad);
          }, 500);
        break;
    
        case 2:
          mouseDown(yellowPad, null);
          setTimeout(function(){
            mouseUp(yellowPad);
          }, 500);
        break;
    
        case 3:
          mouseDown(bluePad, null);
          setTimeout(function(){
            mouseUp(bluePad);
          }, 500);
        break;    
      }
      len = len + 1;
      updateCount();
    } else {
      clearInterval(intervalId);
      spectingUserInput = true;
    }

  }, 700);

}

function checkUserSequence(pad){

  if(gameSequence[userInputIndex] === pad){
    userInputIndex++;
  } else {

    padVal.errorAudio.play();
    spectingUserInput = false;

    if(strictFlag) {
      gameSequence = [];
      userInputIndex = 0;
        generateRandomGameSequence();
    } else {      
      setTimeout(function(){
        reproduceGameSequence(gameSequence);
      }, 600);
    }
  }

  if(userInputIndex == gameSequence.length){
    spectingUserInput = false;
    userInputIndex = 0;
    generateRandomGameSequence()
  }

}

function updateCount(){
  var sl = gameSequence.length;
  stage.innerHTML = sl < 10 ? '0'+sl : sl;
}
