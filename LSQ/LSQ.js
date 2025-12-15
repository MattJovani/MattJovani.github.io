var time = 0;
var resetTime = 46;
var pause = true;
var newWord;
var player = 'yellow';
var playerTurn = 1;
var numberOfPlayers = 4;
var yellowTotal = 0;
var blueTotal = 0;
var redTotal = 0;
var greenTotal = 0;
var yellowScore = 0;
var blueScore = 0;
var redScore = 0;
var greenScore = 0;
var yellowlvl = 0;
var bluelvl = 0;
var redlvl = 0;
var greenlvl = 0;
var yellowTurn = 'radial-gradient(circle, gold 90%, yellow)';
var blueTurn = 'radial-gradient(circle, cornflowerblue  80%, lightskyblue)';
var redTurn = 'radial-gradient(circle, coral 80%, lightcoral)';
var greenTurn = 'radial-gradient(circle,  limegreen 80%, lightgreen)';
var yellowCrayon = 'hue-rotate(60deg) brightness(2) opacity(0.4)';
var blueCrayon = 'hue-rotate(230deg) brightness(1.5) opacity(0.4)';
var redCrayon = 'hue-rotate(0deg) brightness(2) opacity(0.4)';
var greenCrayon = 'hue-rotate(140deg) brightness(1.5) opacity(0.4)';
const colors = ['yellow', 'blue', 'red', 'green'];
var level1 = [];
var level2 = [];
var level3 = [];
var level4 = [];

var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  document.getElementById('enterFullscreen').style.display = 'none';
document.getElementById('exitFullscreen').style.display = 'inline';  
}

function closeFullscreen(){
   if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  document.getElementById('exitFullscreen').style.display = 'none';
document.getElementById('enterFullscreen').style.display = 'inline';
}

function startGame(){
checkChecked();
togglePlayers();
resetTime = document.getElementById("timerInput").value;
playerTurn = Math.floor(Math.random()*4+1);
newPrompt(); document.getElementById('includePopup').style.display = 'none';
document.getElementById('popupContainer').style.display = 'none';
document.getElementById('vehicles').style.display = 'inline';
document.styleSheets[1].cssRules[2].style.display = 'inline';
document.getElementById('rightButton'). disabled = false;
document.getElementById('wrongButton'). disabled = false;
}

function checkChecked(){
   tickboxes.forEach(function(tick){
      if(tick.checked){
         switch(parseInt(tick.value)){
            case 1:
               addWords(chapter1);
               break;
            case 2:
               addWords(chapter2);
               break;
            case 3:
               addWords(chapter3);
               break;
            case 4:
               addWords(chapter4);
               break;
            case 5:
               addWords(chapter5);
               break;
            case 6:
               addWords(chapter6);
               break;
            case 7:
               addWords(chapter7);
               break;
            case 8:
               addWords(chapter8);
               break;
            case 9:
               addWords(chapter9);
               break;
            case 10:
               addWords(chapter10);
               break;
            case 11:
               addWords(chapter11);
               break;
            
         }
      }
   })
}

function addWords(chapter){
   level1.push(...chapter[0]);
   level2.push(...chapter[1]);
   level3.push(...chapter[2]);
   level4.push(...chapter[3]);
}

function togglePlayers(){
  for(i=0;i<4;i++){
     let color = colors[i]; if(document.getElementById(color+'PlayerCheck').checked){
      document.getElementById(color+'Truck').style.visibility = 'visible';
      document.getElementById(color+'Car').style.visibility = 'visible';
      document.getElementById(color+'Package').style.opacity = '1';
      document.getElementById(color+'Steal').disabled = false;
      } else {
      document.getElementById(color+'Truck').style.visibility = 'hidden';
      document.getElementById(color+'Car').style.visibility = 'hidden';
      document.getElementById(color+'Package').style.opacity = '0.2';
      document.getElementById(color+'Steal').disabled = true;
      }
   }
}

function moveTruck(color){
   document.getElementById(color+'Truck').style.left = truckPosition[window[color+'Score']];
}

function moveCar(multiplyValue, color){
   document.getElementById(color+'Car').style.left = carPosition[window[color+'lvl']] + multiplyValue * 2 +'%';
}

function wrongAnswer(){
   document.getElementById(player+'Steal').disabled = false;
   newPrompt();
}

function rightAnswer(){
   removeWord();
   window[player+'Total']++;
   window[player+'Score']++;
   window[player+'lvl']++;
   document.getElementById(player+'Total').innerHTML = window[player+'Total'];
   if(window[player+'Score'] == 10){
      endGame();
      } else {
   moveTruck(player);
   moveCar(playerTurn-1, player);
   document.getElementById(player+'Steal').disabled = false;
   newPrompt();
      }
}

function openFuelPopup(){
   if(document.getElementById('fuelPopup').style.display !== 'grid'){
   document.getElementById('fuelPopup').style.display = 'grid';
document.getElementById('wrongButton').disabled = true;
document.getElementById('rightButton').disabled = true;
} else {
   document.getElementById('fuelPopup').style.display = 'none';
document.getElementById('wrongButton').disabled = false;
document.getElementById('rightButton').disabled = false;
}
}

function stealAnswer(multiplyValue, color){
   removeWord();
   if(window[color+'lvl']>0){
   window[color+'lvl']--;
   moveCar(multiplyValue, color);
   document.getElementById('satellite').style.opacity = 0.8;
document.getElementById(color+'Car').style.opacity = 0.8;
   }   document.getElementById('fuelPopup').style.display = 'none';
document.getElementById('wrongButton').disabled = false;
document.getElementById('rightButton').disabled = false;
document.getElementById(player+'Steal').disabled = false;
newPrompt();
}

function newPrompt(){
   playerTurn ++;
   if(playerTurn > 4){
      playerTurn = 1;
      }
   switch(playerTurn){
      case 1:
         player = 'yellow';
         isColorPlaying('yellow');
         break;
      case 2:
         player = 'blue';
         isColorPlaying('blue');
         break;
      case 3:
         player = 'red';
         isColorPlaying('red');
         break;
      case 4:
         player = 'green';
         isColorPlaying('green');
         break;       
   }
   newWord = getWord();
   document.getElementById('prompt').innerHTML = newWord;
   document.body.style.backgroundImage = window[player+'Turn'];
   document.getElementById('crayon').style.filter = window[player+'Crayon'];
   document.getElementById('crayon').style.transform = crayonPosition[window[player+'Score']]; document.getElementById(player+'Steal').disabled = true;
   document.getElementById('fuel').disabled = true;
   time = resetTime;
   pause = false;
}

function isColorPlaying(color){
   if(!document.getElementById(color+'PlayerCheck').checked)
   newPrompt();
}

function getWord(){
   let selection = 'skip';
   switch(window[player+'lvl']){
      case 0:
      case 1:
      case 2:
         selection = level1[Math.floor(Math.random()*level1.length)];
         if(level1.length>0)            
         break;
      case 3:
      case 4:
      case 5:
         selection = level2[Math.floor(Math.random()*level2.length)];
         if(level2.length>0)
         break;
      case 6:
      case 7:
         selection = level3[Math.floor(Math.random()*level3.length)];
         if(level3.length>0)
         break;
      case 8:
      case 9:
         selection = level4[Math.floor(Math.random()*level4.length)];
         if(level4.length>0)
         break;
      case 10:
         selection = Math.floor(Math.random()*9999)+1000;
         break;
   }
   return selection;
}

function removeWord(){
   level1 = level1.filter(e => e !== newWord);
   level2 = level2.filter(e => e !== newWord);
   level3 = level3.filter(e => e !== newWord);
   level4 = level4.filter(e => e !== newWord);
}

function endGame(){
   let winner;
   switch(playerTurn){
      case 1:
         winner = 'JAUNE';
         break;
      case 2:
         winner = 'BLEU';
         break;
      case 3:
         winner = 'ROUGE';
         break;
      case 4:
         winner = 'VERT';
         break;      
   }
   for(i=0; i<4; i++){
      color = colors[i];
      window[color+'Score'] = 0;
      window[color+'lvl'] = 0;
      moveTruck(color);
      moveCar(playerTurn-1, color);
      document.getElementById(color+'Car').style.opacity = 0;
      document.getElementById(color+'Package').style.visibility = 'visible';
   }
   let percent = getPercentage();
   document.getElementById('winnerMsg').innerHTML = winner;
   document.getElementById('percentMsg').innerHTML = percent + '%';
   document.getElementById('rightButton'). disabled = true;
   document.getElementById('rightButton'). disabled = true;
document.getElementById('endPopup').style.display = 'grid';
}

function getPercentage(){
   let numerator = 0
   let denominator = 0;
   let grandTotal = 0;
   tickboxes.forEach(function(tick){
      if(tick.checked){
         switch(parseInt(tick.value)){
            case 1:
               denominator = denominator + addTotal(chapter1);
               break;
            case 2:
               denominator = denominator + addTotal(chapter2);
               break;
            case 3:
               denominator = denominator + addTotal(chapter3);
               break;
            case 4:
               denominator = denominator + addTotal(chapter4);
               break;
            case 5:
               denominator = denominator + addTotal(chapter5);
               break;
            case 6:
               denominator = denominator + addTotal(chapter6);
               break;
            case 7:
               denominator = denominator + addTotal(chapter7);
               break;
            case 8:
               denominator = denominator + addTotal(chapter8);
               break;
            case 9:
               denominator = denominator + addTotal(chapter9);
               break;
            case 10:
               denominator = denominator + addTotal(chapter10);
               break;
            case 11:
               denominator = denominator + addTotal(chapter11);
               break;
         }
      }
   })
   numerator = level1.length + level2.length + level3.length + level4.length;
   numerator = denominator - numerator;
   grandTotal = numerator/denominator * 100;
   return Math.round(grandTotal);
}

function addTotal(chapter){
   let total = 0;
   for(let i=0;i<4;i++){
      total = total + chapter[i].length;
   }
   return total;
}

function continueGame(){
   document.getElementById('endPopup').style.display = 'none';
document.getElementById('rightButton'). disabled = false;
document.getElementById('wrongButton'). disabled = false;
newPrompt();
}

function restart(){
   level1.splice(0, level1.length);
   level2.splice(0, level2.length);
   level3.splice(0, level3.length);
   level4.splice(0, level4.length);
   document.getElementById('endPopup').style.display = 'none';
   document.getElementById('includePopup').style.display = 'grid';
   document.getElementById('popupContainer').style.display = 'grid';
   document.getElementById('vehicles').style.display = 'none';
document.styleSheets[1].cssRules[2].style.display = 'none';
}

var yellowColors = [ "yellow1", "yellow2", "yellow3", "yellow4" ];
var blueColors = [ "blue1", "blue2", "blue3", "blue4" ];
var redColors = [ "red1", "red2", "red3", "red4" ];
var greenColors = [ "green1", "green2", "green3", "green4" ];
var stopIndex = 0;
var lastClass = blueColors[0];
window.setInterval(function() {
    let colors;
    stopIndex++;
    switch(playerTurn){
       case 1:
          colors = yellowColors;
          break;
       case 2:
          colors = blueColors;
          break;
       case 3:
          colors = redColors;
          break;
       case 4:
          colors = greenColors;
          break;
    }
    if(stopIndex >= colors.length) {
        stopIndex = 0;
    }
    var newClass = colors[stopIndex];
    document.getElementById('endPopup').classList.remove(lastClass);
    document.getElementById('endPopup').classList.add(newClass);
    lastClass = newClass;
   
}, 2000);

let oneTick = 0;
let twoTick = 0;
var tickboxes = document.querySelectorAll('input[type="checkbox"]');
var tickchapters = document.querySelectorAll('input[class="checkboxes"]');
var tickplayers = document.querySelectorAll('input[class="choosePlayers"]');
tickboxes.forEach(function(check){
   check.addEventListener("click", function() {
   tickchapters.forEach(function(tick){
      if(tick.checked){
         oneTick ++;
      }
   })
   tickplayers.forEach(function(tick){
      if(tick.checked){
         twoTick ++;
      }
   })
   if(oneTick > 0 && twoTick > 1){
      document.getElementById('startButton').disabled = false;   
      } else {
document.getElementById('startButton').disabled = true;         
      }
      oneTick = 0;
      twoTick = 0;
  });
});

window.setInterval(function(){
   if(!pause){
   time--;
   document.getElementById('timer').innerHTML = time;
   }
   if(time <= 0){
      pause = true;
      document.getElementById('fuel').disabled = false;
   }
}, 1000);

var truckPosition = {
   0: '2.3%',
   1: '11.1%',
   2: '19.9%',
   3: '28.7%',
   4: '37.5%',
   5: '46.3%',
   6: '55.1%',
   7: '63.9%',
   8: '72.7%',
   9: '81.5%',
   10: '90.3%'
};

var carPosition = {
   0: 0.25,
   1: 9.075,
   2: 17.9,
   3: 26.725,
   4: 35.55,
   5: 44.375,
   6: 53.2,
   7: 62.025,
   8: 70.85,
   9: 79.675,
   10: 88.5
};

const crayonPosition = {
   0: 'rotate(18deg)',
   1: 'rotate(13.5deg)',
   2: 'rotate(6deg)',
   3: 'rotate(-3deg)',
   4: 'rotate(-19deg)',
   5: 'rotate(-45deg)',
   6: 'rotate(-69deg)',
   7: 'rotate(-84deg)',
   8: 'rotate(-95deg)',
   9: 'rotate(-102deg)'  
};