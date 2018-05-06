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
  strictFlag= false,
  sequence  = [],
  
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
    }
  };

yellowPad.onmousedown = function(){
  mouseDown(this);
}

yellowPad.onmouseup = function(){
  mouseUp(this);
}

greenPad.onmousedown = function(){
  mouseDown(this);
}

greenPad.onmouseup = function(){
  mouseUp(this);
}

bluePad.onmousedown = function(){
  mouseDown(this);
}

bluePad.onmouseup = function(){
  mouseUp(this);
}

redPad.onmousedown = function(){
  mouseDown(this)
}

redPad.onmouseup = function(){
  mouseUp(this);
}

/**
 * Applies the mouse down effect to the given element
 * Changes background color and plays sound
 * @param {Object} element pad document object to modify
 */
function mouseDown(element) {
  var pad = element.getAttribute("id");
  element.style.backgroundColor = padVal[pad].clicked;
  padVal[pad].audio.play();
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

  // } else { // Geme restart
    // sequence = [];
  }

  generateRandomSequence();
}

/**
 * Adds a random number to the sequence
 */
function generateRandomSequence() {
  // random number between 0 and 3
  var rnd = Math.floor(Math.random() * 4);
  sequence.push(rnd);
  reproduceSequence(sequence);
}

/**
 * Displays the given sequence activation
 * @param {Array} arr Array of current sequence
 */
function reproduceSequence(arr) {
  var len = 0;
  var intervalId = setInterval(function(){

    if(len < arr.length){
      var val = arr[len];
      switch (val) {
        case 0:
          mouseDown(greenPad);
          setTimeout(function(){
            mouseUp(greenPad);
          }, 500);
        break;
    
        case 1:
          mouseDown(redPad);
          setTimeout(function(){
            mouseUp(redPad);
          }, 500);
        break;
    
        case 2:
          mouseDown(yellowPad);
          setTimeout(function(){
            mouseUp(yellowPad);
          }, 500);
        break;
    
        case 3:
          mouseDown(bluePad);
          setTimeout(function(){
            mouseUp(bluePad);
          }, 500);
        break;    
      }
      len = len + 1;
      updateCount();
    } else {
      clearInterval(intervalId);
    }

  }, 500);

}

function updateCount(){
  var sl = sequence.length;
  stage.innerHTML = sl < 10 ? '0'+sl : sl;
}
