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
document.styleSheets[0].cssRules[2].style.display = 'inline';
document.styleSheets[0].cssRules[4].style.opacity = '1';
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
document.styleSheets[0].cssRules[4].style.opacity = '0.1';
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
document.styleSheets[0].cssRules[4].style.opacity = '1';  
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
   document.styleSheets[0].cssRules[2].style.display = 'none';
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

const chapter1 = [
   wordsEasy = [
      "qui?",
      "o&ugrave;?",
      "quoi?",
      "pourquoi?",
      "quand?",
      "quel?",
      "lequel?",
      "bonne soir&eacute;e",
      "bonne semaine",
      "bonne fin de semaine",
      "bonne session",
      "au revoir",
      "comment &ccedil;a va?",
      "&ccedil;a va bien",
      "&ccedil;a va mal",
      "&ccedil;a va pas pire",
      "salut",
      "merci",
      "bienvenue",
      "adresse",
      "courriel",
      "oui",
      "non",
      "capable",
      "pas capable",
      "gentil",
      "pas gentil",
      "vrai",
      "pas vrai",
      "mais",
      "si",
      "fatigu&eacute;",
      "information",
      "exemple",
      "difficile",
      "comme",
      "aussi",
      "ou",
      "tr&egrave;s",
      "trop",
      "aucun",
      "autre",
      "encore",
      "fun",
      "dr&ocirc;le",
      "aimer",
      "parler",
      "signer",
      "oublier",
      "comprendre",
      "pas comprendre",
      "applaudire",
      "dire",
      "aller",
      "venir",
   ],
   wordsHard = [
      "comment?",
      "combien?",
      "bonne journ&eacute;e",
      "bon matin",
      "bonne nuit",
      "&agrave; la prochaine",
      "&agrave; bient&ocirc;t",
      "s'il vous plait",
      "excusez",
      "d&eacute;sol&eacute;",
      "pardon",
      "pas grave",
      "grave",
      "nom de famille",
      "pr&eacute;nom",
      "&acirc;ge",
      "num&eacute;ro de telephone",
      "sourd",
      "entendant",
      "mal entendant",
      "facile",
      "&agrave; cause",
      "parce que",
      "depuis",
      "tout",
      "avoir hate",
      "assez",
      "pas assez",
      "m&ecirc;me",
      "besoin",
      "pas besoin",
      "beaucoup",
      "plusieurs",
      "chaque",
      "c'est &ccedil;a",
      "probl&egrave;me",
      "compliqu&eacute;",
      "pas aimer",
      "adorer",
      "se rappeler",
      "attendre",
      "commencer",
      "rire",
      "r&eacute;pondre",
      "expliquer",
      "rencontrer",
      "savoir",
      "pas savoir",
      "avoir le go&ucirc;t",
      "pas avoir le go&ucirc;t",
      "questionner",
      "penser",
      "&eacute;peler",
      "de rien",
      "bon avant-midi",
      "bon apr&egrave;s-midi",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Qu'est-ce que le professeur enseigne?\
      </span><br>\
      <span style='font-size: 30px;'>\
      PROFESSEUR / ENSEINGER / QUOI?\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Il enseigne la LSQ.\
      </span><br>\
      <span style='font-size: 30px'>\
      LSQ / PT&Eacute; 3 / ENSEINGER\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Quel &acirc;ge as tu?\
      </span><br>\
      <span style='font-size: 30px'>\
      &Acirc;GE / PT&Eacute; 2?\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      J'ai __ ans.\
      </span><br>\
      <span style='font-size: 30px'>\
      PT&Eacute; 1 / &Acirc;GE / __\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      &Ccedil;a me fait plaisir de te rencontrer.\
      </span><br>\
      <span style='font-size: 30px'>\
      PLAISIR / PT&Eacute; 2 / RENCONTRER\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Bienvenue au personnes sourdes et aux personnes entendantes.\
      </span><br>\
      <span style='font-size: 30px'>\
      PERSONNE / SOURD / ENTENDANT / BIENVENUE\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Bonjour, comment vas-tu?\
      </span><br>\
      <span style='font-size: 30px'>\
      BONJOUR / &Ccedil;A-VA?\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Serait-ce possible de signer lentement, s'il-vous-pla&icirc;t?\
      </span><br>\
      <span style='font-size: 30px'>\
      SIGNER / LENTEMENT / POSSIBLE / S'IL-VOUS-PLA&Icirc;T?\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Pouvez-vous r&eacute;p&eacute;ter encore?\
      </span><br>\
      <span style='font-size: 30px'>\
      R&Eacute;P&Eacute;TER / ENCORE / POSSIBLE?\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Comment signe-t-on le mot B-O-N-J-O-U-R?\
      </span><br>\
      <span style='font-size: 30px'>\
      SIGNE / MOT / B-O-N-J-O-U-R / QUOI?\
      </span>",<!-- ↑10 -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Qu'est-ce que les enfants apprennent &agrave; l'&eacute;cole?\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Ils apprennent le fran&ccedil;ais.\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Quel &acirc;ge avait tu l'ann&eacute;e pass&eacute;e?\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      L'ann&eacute;e pass&eacute;e j'avais __ ans.\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      &Ccedil;a m'a fait plaisir de rencontrer ton amoureux.\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Bienvenue aux &eacute;tudiants LSQ.\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Pourquoi &ccedil;a va mal? Je suis d&eacute;sol&eacute;.\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Serait-ce possible d'&eacute;peler lentement, s'il-vous-pla&icirc;t?\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Pouvez-vous r&eacute;p&eacute;ter encore? J'ai manqu&eacute; beaucoup de mots\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      C'est quoi l'autre signe pour le mot P-A-S V-R-A-I?\
      </span>",<!-- ↑10 -->
   ]
];
const chapter2 = [
   wordsEasy = [
      "homme",
      "femme",
      "monsieur",
      "madame",
      "fr&egrave;re",
      "s&oelig;ur",
      "amoureux",
      "famille",
      "papa",
      "maman",
      "cousin / cousine",
      "neveu / ni&egrave;ce",
      "oncle",
      "tante",
      "b&eacute;b&eacute;",
      "ami",
      "enfant",
      "seul",
      "veuf / veuve",
      "vieux / vielle",
      "jeune",
      "se s&eacute;parer",
      "finir",
      "mourir",
      "blesser (physique)",
      "blesser (&eacute;motionnel)",
      "avoir",
      "grandir",
      "montrer",
      "se chicaner",
      "&eacute;couter",
      "donner cadeau",
      "recevoir",
   ],
   wordsHard = [
      "gar&ccedil;on",
      "fille",
      "beau-fr&egrave;re",
      "demi-s&oelig;ur",
      "&eacute;poux",
      "&eacute;pouse",
      "parent",
      "grand-parent",
      "grand-m&egrave;re",
      "grand-p&egrave;re",
      "jumeaux",
      "adolescent",
      "adulte",
      "meilleur ami",
      "&eacute;tranger",
      "c&eacute;libataire",
      "fianc&eacute;",
      "mari&eacute;",
      "monoparentale",
      "faire piti&eacute;",
      "secret",
      "important",
      "faire attention",
      "s'unir",
      "se r&eacute;unir",
      "embrasser",
      "vivre",
      "s'entendre",
      "na&icirc;tre",
      "critiquer",
      "divorcer",
      "&ecirc;tre tann&eacute;",
      "rassembler",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Quel est ton nom?\
      </span><br>\
      <span style='font-size: 30px;'>\
      NOM / APP 2 / QUOI? \
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Mon nom est __.\
      </span><br>\
      <span style='font-size: 30px;'>\
      NOM / APP 1 / __\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      As-tu des fr&egrave;res ou des s&oelig;urs?\
      </span><br>\
      <span style='font-size: 30px;'>\
      FR&Egrave;RE / S&OElig;UR / PT&Eacute; 2 / (AVOIR)?\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      J'ai __ fr&egrave;res et __ s&oelig;urs.\
      </span><br>\
      <span style='font-size: 30px;'>\
      FR&Egrave;RE / __ / S&OElig;UR / __ / (AVOIR)\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Mon cousin s'est s&eacute;par&eacute; le mois pass&eacute;.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MOIS / PASS&Eacute; /COUSIN / POSS 1 / SE S&Eacute;PARER\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      La s&oelig;ur de mon p&egrave;re ne s'est jamais mari&eacute;e.\
      </span><br>\
      <span style='font-size: 30px;'>\
      P&Egrave;RE / POSS 1 / PT&Eacute; 3 / S&OElig;UR / POSS 3 / MARIAGE / JAMAIS\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Son neveu et sa ni&egrave;ce se disputent beaucoup.\
      </span><br>\
      <span style='font-size: 30px;'>\
      NEVEU / NI&Egrave;CE / POSS 3 / DISPUTER / BEAUCOUP\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Son adresse est le 25 rue Guy.\
      </span><br>\
      <span style='font-size: 30px;'>\
      ADRESSE / APP 3 / 25 / RUE / G-U-Y\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Ta tante a combien d'enfants?\
      </span><br>\
      <span style='font-size: 30px;'>\
      TANTE / POSS 2 / ENFANT / COMBIEN?\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Mon oncle est tr&egrave;s riche, mais il est snob.\
      </span><br>\
      <span style='font-size: 30px;'>\
      ONCLE / POSS 1 / TR&Egrave;S RICHE / MAIS / SNOB\
      </span>",<!-- ↑10 -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      C'est quoi le nom de ton meilleur ami?\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Le nom de famille de ma grand-m&egrave;re est __.\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Il te reste combien de grand-parents vivant?\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      Mon p&egrave;re a __ fr&egrave;res et __ s&oelig;urs.\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Tes parents sont mari&eacute;s depuis combien d'ann&eacute;es?\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Mes parents se sont divorc&eacute;s avant que je soit n&eacute;e.\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Le jumeau de mon beau-fr&egrave;re le critique beaucoup.\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Ne dit pas a personne que je t'ai embrass&eacute;, c'est un secret.\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Cette madame est un &eacute;tranger mais j'ai piti&eacute; a cause qu'elle est vielle et elle veut mourir.\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Fait attention a ce que tu dit a ta s&oelig;ur. Tu l'a bless&eacute;.\
      </span>",<!-- ↑10 -->
   ]
];
const chapter3 = [
   wordsEasy = [
      "bonheur",
      "fiert&eacute;",
      "satisfaction",
      "tristesse",
      "d&eacute;courag&eacute;",
      "angoisse",
      "d&eacute;go&ucirc;t",
      "surprise",
      "plaisir",
      "frustration",
      "choc",
      "confortable",
      "manipulateur",
      "poli",
      "impoli",
      "r&eacute;veill&eacute;",
      "dans la lune",
      "amateur",
      "intelligent",
      "vantard",
      "tannant",
      "perfectioniste",
      "snob",
      "encourager",
      "douter",
      "abandonner",
      "d'accord",
      "r&eacute;fl&eacute;chir",
      "aider",
      "ha&iuml;r",
   ],
   wordsHard = [
      "joie",
      "confiance",
      "malheur",
      "&eacute;puis&eacute;",
      "col&egrave;re",
      "peur",
      "stresse",
      "mal a l'aise",
      "prudence",
      "f&acirc;ch&eacute;",
      "d&eacute;ception",
      "comp&eacute;tent",
      "incomp&eacute;tent",
      "menteur",
      "professionnel",
      "stupide",
      "ignorant",
      "violent",
      "confus",
      "patient",
      "impatient",
      "effront&eacute;",
      "continuer",
      "concentrer",
      "d&eacute;ranger",
      "ne pas d&eacute;ranger",
      "exag&eacute;rer",
      "avoir raison",
      "changer",
      "devenir",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      C&eacute;dric niaise encore mais il est adulte.\
      </span><br>\
      <span style='font-size: 30px;'>\
      C&Eacute;DRIC / NIAISER / ENCORE / MAIS / PT&Eacute; 3 / ADULTE\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Le cours de LSQ est trop difficile, j'abandonne.\
      </span><br>\
      <span style='font-size: 30px;'>\
      COURS / LSQ / DIFFICILE / TROP / PT&Eacute; 1 /ABANDONNER\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Ma m&egrave;re fait toujours des tartes au pommes.\
      </span><br>\
      <span style='font-size: 30px;'>\
      M&Egrave;RE / POSS 1 / TARTE / POMME / FAIRE / TOUJOURS\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      La personne &agrave; c&ocirc;t&eacute; de moi parle beaucoup, &ccedil;a me d&eacute;range.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PERSONNE / &Agrave; C&Ocirc;T&Eacute; / PT&Eacute; 1 / PARLER / BEAUCOUP || D&Eacute;RANGER\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Le professeur est tannant, il devrait arr&ecirc;ter.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PROFESSEUR / TANNANT / PT&Eacute; 3 / ARR&Ecirc;TER / FAUT\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Les &eacute;tudiants et les &eacute;tudiantes aiment le professeur.\
      </span><br>\
      <span style='font-size: 30px;'>\
      &Eacute;TUDIANT / HOMME / FEMME / PT&Eacute; 6 / PROFESSEUR / AIMER\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      J'aime aider mon fr&egrave;re.\
      </span><br>\
      <span style='font-size: 30px;'>\
      FR&Egrave;RE / POSS 1 / PT&Eacute; 1 / AIDER / AIMER\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Pourquoi tu veux apprendre la LSQ?\
      </span><br>\
      <span style='font-size: 30px;'>\
      PT&Eacute; 2 / LSQ / APPRENDRE / VOULOIR / POURQUOI?\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Hey! Es-tu dans la lune? Regarde moi!\
      </span><br>\
      <span style='font-size: 30px;'>\
      HEY! / PT&Eacute; 2 / DANS LA LUNE? || 2 REGARDER 1\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Tu penses que la LSQ est int&eacute;ressante? Je suis d'accord.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PT&Eacute; 2 / LSQ / INT&Eacute;RESSANT / PENSER? || PT&Eacute; 1 / D'ACCORD\
      </span>",<!-- ↑10 -->
      
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Matthew est patient quand il signe le mot impatient.\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Ce jeux de LSQ est tr&egrave;s fun. J'adore!\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Pourquoi est ce que mon b&eacute;b&eacute; est triste? je suis &eacute;puis&eacute;.\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      Ne parle pas quand tu manges. C'est impoli et &ccedil;a me d&eacute;range.\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Arr&ecirc;t d'avoir peur. Tu es capable si tu te concentres!\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Je n'aime pas ma belle-s&oelig;ur, elle est une menteuse et manipulatrice.\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Mon oncle est tr&egrave;s riche, il me donne l'argent.\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      J'ai raison, la personne &agrave; c&ocirc;t&eacute; de moi est stupide et ignorante.\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Je doute que je suis assez comp&eacute;tant. Est-ce que je change de cours?\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Je suis mal a l'aise quand mes beaux-parents viennent manger ici. Je cuisine mal.\
      </span>",<!-- ↑10 -->
   ]
];
const chapter4 = [
   wordsEasy = [
      "taille-crayon",
      "efface",
      "stylo",
      "cahier",
      "dictionnaire",
      "livre",
      "sac &agrave; dos",
      "art plastique",
      "education physique",
      "chimie",
      "fran&ccedil;ais",
      "anglais",
      "psychologie",
      "&eacute;tudiant",
      "professeur",
      "&eacute;cole",
      "internet",
      "pause",
      "cours",
      "caf&eacute; &eacute;tudiant",
      "universit&eacute;",
      "&eacute;tage",
      "t&eacute;l&eacute;phone",
      "caf&eacute;t&eacute;ria",
      "&eacute;tudier",
      "apprendre",
      "lire",
      "dessiner",
      "enseigner",
      "regarder",
      "entendre",
      "chercher",
      "faire",
      "communiquer",
      "tricher",
   ],
   wordsHard = [
      "crayon &agrave; mine",
      "feuille",
      "papier",
      "horaire",
      "agenda",
      "physique",
      "math&eacute;matiques",
      "science",
      "biologie",
      "politique",
      "histoire",
      "philosophie",
      "travail social",
      "directeur",
      "atelier",
      "local",
      "programme",
      "note (r&eacute;sultat)",
      "institut",
      "garderie",
      "maternelle",
      "primaire",
      "secondaire",
      "coll&egrave;ge",
      "classe",
      "ordinateur",
      "bureau",
      "magasin scolaire",
      "le&ccedil;on",
      "&eacute;crire",
      "observer",
      "surveiller",
      "quitter",
      "corriger",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Connais-tu mon professeur de biologie? Il est gentil.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PROFESSEUR / BIOLOGIE / POSS 1 / PT&Eacute; 2 / CONNA&Icirc;TRE? || GENTIL\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Je vais &agrave; la biblioth&egrave;que pour aller chercher un dictionnaire.\
      </span><br>\
      <span style='font-size: 30px;'>\
      BIBLIOTH&Egrave;QUE / ALLER / POURQUOI? / DICTIONNAIRE / ALLER CHERCHER\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Mon cours de langue des signes qu&eacute;b&eacute;coise est tr&egrave;s int&eacute;ressant.\
      </span><br>\
      <span style='font-size: 30px;'>\
      COURS / LANGUE / SIGNES / QU&Eacute;B&Eacute;COISE / APP 1 / INT&Eacute;RESSANT / TR&Egrave;S\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      Je dois acheter un livre d'anglais au magasin scolaire.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MAGASIN / SCOLAIRE / LIVRE / ANGLAIS / PT&Eacute; 1 / ACHETER / FAUT\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Je ne trouve pas le bureau du directeur.\
      </span><br>\
      <span style='font-size: 30px;'>\
      BUREAU / DIRECTEUR / PT&Eacute; 1 / PAS TROUVER\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Hier, mon cours de fran&ccedil;ais a &eacute;t&eacute; annul&eacute;.\
      </span><br>\
      <span style='font-size: 30px;'>\
      HIER / COURS / FRAN&Ccedil;AIS / APP 1 / ANNULER\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      J'aimerais acheter un ordinateur, mais je n'en ai pas les moyens.\
      </span><br>\
      <span style='font-size: 30px;'>\
      ORDINATEUR / ACHETER / VOULOIR / MAIS / PAS ARGENT\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Je suis pr&ecirc;t pour mon examen de philosophie qui aura lieu mardi prochain.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MARDI / PROCHAIN / EXAMEN / PHILOSOPHIE / PT&Eacute; 1 / PR&Ecirc;T\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      &Agrave; quelle heure est le cours de chimie?\
      </span><br>\
      <span style='font-size: 30px;'>\
      COURS / CHIMIE / HEURE?\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Il y a combien de personnes qui &eacute;tudient la politique &agrave; l'Universit&eacute;?\
      </span><br>\
      <span style='font-size: 30px;'>\
      UNIVERSIT&Eacute; / &Eacute;TUDIANT / POLITIQUE / COMBIEN?\
      </span>",<!-- ↑10 -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Ma m&egrave;re a enseign&eacute; au C&eacute;gep du Vieux Montr&eacute;al il y a 15 ans.\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Mon professeur de physique exag&egrave;re toujours.\
      </span>",<!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Tu cherche ton local? C'est &agrave; c&ocirc;t&eacute; de la caf&eacute;t&eacute;ria.\
      </span>",<!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      J'ai appris ma le&ccedil;on. J'ai &eacute;crit mon horaire avec un crayon &agrave; mine et il c'est effac&eacute;.\
      </span>",<!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      L'universit&eacute; de Concordia est situ&eacute; au 1455 boulevard De Maisonneuve.\
      </span>",<!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Ma s&oelig;ur commence la maternelle &agrave; matin.\
      </span>",<!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Je dois expliquer l'Internet a mon grand-p&egrave;re. Il a jamais eu d'ordinateur.\
      </span>",<!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Mon professeur nous surveille pour ne pas tricher sur n&ocirc;tre examen final.\
      </span>",<!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      C'est quelle semaine que les ateliers de ton cours de chimie commencent?\
      </span>",<!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Je suis intelligent! J'ai eu la meilleure note dans mon cours de math&eacute;matiques.\
      </span>"<!-- ↑10 -->
   ]
];
const chapter5 = [
   wordsEasy = [
      "voiture / auto",
      "moto",
      "autobus",
      "m&eacute;tro",
      "route",
      "rue",
      "autoroute",
      "v&eacute;lo",
      "chemin",
      "porte",
      "feu de circulation",
      "essence",
      "stationnement",
      "arr&ecirc;t",
      "coin",
      "sortie",
      "pont",
      "est",
      "ouest",
      "nord",
      "sud",
      "&agrave; c&ocirc;t&eacute;",
      "ici",
      "avancer",
      "falloir (faut)",
      "d&eacute;passer",
      "suivre",
      "prendre l'avion",
      "prendre l'autobus",     
   ],
   wordsHard = [
      "chemin de fer",
      "taxi",
      "camion",
      "train",
      "bateau",
      "avion",
      "accident",
      "trottoir",
      "boulevard",
      "moteur",
      "permis",
      "immatriculation",
      "&agrave; droite",
      "&agrave; gauche",
      "centre",
      "fond",
      "loin",
      "conduire",
      "demeurer",
      "rester",
      "partir",
      "voyager",
      "reconduire",
      "aller chercher",
      "marcher",
      "passer",
      "se reposer",
      "prendre le bateau",
      "prendre le m&eacute;tro",
      "prendre le train"
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      &Agrave; quelle &acirc;ge as-tu eu ton permis de conduire?\
      </span><br>\
      <span style='font-size: 30px;'>\
      PERMIS DE CONDUIRE / PT&Eacute; 2 / &Acirc;GE?\
      </span>", <!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      J'ai eu mon permis de conduire &agrave; __ ans.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PERMIS DE CONDUIRE / APP1 / &Acirc;GE / __\
      </span>", <!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      &Agrave; tous les jours, je prends l'autobus et le m&eacute;tro pour aller travailler.\
      </span><br>\
      <span style='font-size: 30px;'>\
      TOUS LES JOURS / PT&Eacute; 1 / PRENDRE L'AUTOBUS / PRENDRE LE M&Eacute;TRO / POURQUOI? || TRAVAILLER / ALLER\
      </span>", <!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      Quand je suis en retard pour mon cours, je prends toujours un taxi.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SI / COURS / RETARD / PT&Eacute; 1 / PRENDRE LE TAXI / TOUJOURS\
      </span>", <!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Ma voiture est tomb&eacute;e en panne sur l'autoroute 40.\
      </span><br>\
      <span style='font-size: 30px;'>\
      AUTOROUTE / 40 / VOITURE / APP 1 / PANNE\
      </span>", <!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Ce soir, je vais chercher mon ami &agrave; Qu&eacute;bec.\
      </span><br>\
      <span style='font-size: 30px;'>\
      CE / SOIR / VILLE / QU&Eacute;BEC / AMI / POSS 1 / PT&Eacute; 1 / ALLER CHERCHER\
      </span>", <!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Je peux aller te reconduire, je vais aussi en direction nord.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PT&Eacute; 1 / AUSSI / DIRECTION / NORD / ALLER / RECONDUIRE / PT&Eacute; 2 / PT&Eacute; 1 / POSSIBLE\
      </span>", <!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Je demeure pr&egrave;s du fleuve Saint-Laurent.\
      </span><br>\
      <span style='font-size: 30px;'>\
      FLEUVE / SAINT-LAURENT / PT&Eacute; 1 / PROCHE / DEMEURER\
      </span>", <!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      J'ai manqu&eacute; d'essence sur le boulevard des Laurentides.\
      </span><br>\
      <span style='font-size: 30px;'>\
      BOULEVARD / DES LAURENTIDES / PT&Eacute; 1 / ESSENCE / MANQUER\
      </span>", <!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Mardi soir, je me suis mal stationn&eacute;, jai eu une contravention.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MARDI / SOIR / STATIONNEMENT / MAL / PT&Eacute; 1 / CONTRAVENTION\
      </span>", <!-- ↑10 -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Il fait beau aujourd'hui. Je vais marcher jusqu'au travail.\
      </span>", <!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      J'ai peur de faire du v&eacute;lo sur les ponts.\
      </span>", <!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      &Agrave; quel age as-tu pris l'avion pour la premi&egrave;re fois?\
      </span>", <!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      Ma porte de voiture &agrave; droite est bris&eacute;e.\
      </span>", <!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Matthew a dit qu'il va etre en retard. Tu peux arr&ecirc;ter le moteur.\
      </span>", <!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Je ne connais pas le chemin pour aller chez C&eacute;dric. Je vais te suivre.\
      </span>", <!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      Je dois aller chercher mes amis, ils m'attendent.\
      </span>", <!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Il y a un addicent au coin de ma rue!\
      </span>", <!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Je n'aime pas voyager loin.\
      </span>", <!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      J'ai manquer ma sorti sur l'autoroute 13.\
      </span>", <!-- ↑10 -->
   ],
];
const chapter6 = [
   wordsEasy = [
      "matin",
      "avant-midi",
      "apr&egrave;s-midi",
      "soir",
      "t&ocirc;t",
      "tard",
      "semaine",
      "ann&eacute;e",
      "hier",
      "rare",
      "jamais",
      "aujourd'hui",
      "demain",
      "longtemps",
      "maintenant",
      "jusqu'&agrave;",
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
      "janvier",
      "avril",
      "mai",
      "juillet",
      "novembre",
      "d&eacute;cembre",
      "&eacute;t&eacute;",
      "No&euml;l",
      "Saint-Valentin",
      "Saint-Patrick",
      "F&ecirc;te des m&egrave;res",
      "F&ecirc;te des p&egrave;res",
      "F&ecirc;te du travail",
      "F&ecirc;te de la reine",
      "F&ecirc;te du Canada",
      "voir",
      "f&ecirc;ter / c&eacute;l&eacute;brer",
      "sortir",
      "profiter",
   ],
   wordsHard = [
      "midi",
      "nuit",
      "tant&ocirc;t",
      "mois",
      "apr&egrave;s demain",
      "avant hier",
      "cong&eacute;",
      "calendrier",
      "date",
      "minuit",
      "jour / journ&eacute;e",
      "heure",
      "minute",
      "seconde",
      "r&eacute;cemment",
      "semaine pass&eacute;e",
      "mois pass&eacute;",
      "ann&eacute;e pass&eacute;e",
      "semaine prochaine",
      "mois prochain",
      "ann&eacute;e prochaine",
      "souvent",
      "f&eacute;vrier",
      "mars",
      "juin",
      "ao&ucirc;t",
      "septembre",
      "octobre",
      "printemps",
      "automne",
      "hiver",
      "r&eacute;veillon",
      "jour de l'an",
      "journ&eacute;e des Patriotes",
      "Action de Gr&acirc;ce",
      "P&acirc;ques",
      "Saint Jean Baptiste",
      "Halloween",
      "avoir le temps",
      "pas avoir le temps",
      "trouver",
      "annoncer",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Jeudi apr&egrave;s-midi, je n'aurai pas le temps d'aller magasiner.\
      </span><br>\
      <span style='font-size: 30px;'>\
      JEUDI / APR&Egrave;S-MIDI / MAGASINER / ALLER / PAS LE TEMPS\
      </span>", <!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Je ne travaille pas le jour de la f&ecirc;te de la Reine.\
      </span><br>\
      <span style='font-size: 30px;'>\
      JOUR / F&Ecirc;TE DE LA REINE / PT&Eacute; 1 / PAS TRAVAILLER\
      </span>", <!-- ↑2 -->
      "<span style='font-size: 20px;'>\
      Je vais visiter ta famille tous les dimanches.\
      </span><br>\
      <span style='font-size: 30px;'>\
      TOUS LES DIMANCHES / FAMILLE / POSS 2 / PT&Eacute; 1 / VISITER\
      </span>", <!-- ↑3 -->
      "<span style='font-size: 20px;'>\
      Demain matin, je travaille &agrave; 8 heures.\
      </span><br>\
      <span style='font-size: 30px;'>\
      DEMAIN / MATIN / 8 / HEURE / PT&Eacute; 1 / TRAVAILLER\
      </span>", <!-- ↑4 -->
      "<span style='font-size: 20px;'>\
      Samedi soir, je vais au restaurant pour la f&ecirc;te &agrave; mon amie Julie.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SAMEDI / SOIR / F&Ecirc;TE / AMIE / J-U-L-I-E / RESTAURANT / PT&Eacute; 1 / ALLER\
      </span>", <!-- ↑5 -->
      "<span style='font-size: 20px;'>\
      Dimanche passe, c'&eacute;tait P&acirc;ques. J'ai mang&eacute; beaucoup de chocolat.\
      </span><br>\
      <span style='font-size: 30px;'>\
      DIMANCHE / PASS&Eacute; / F&Ecirc;TE / P&Acirc;QUES / CHOCOLAT / PT&Eacute; 1 / MANGER / BEAUCOUP\
      </span>", <!-- ↑6 -->
      "<span style='font-size: 20px;'>\
      J'ai un examen de psychologie la semaine prochaine.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SEMAINE / PROCHAINE / PT&Eacute; 1 / EXAMEN / PSYCHOLOGIE\
      </span>", <!-- ↑7 -->
      "<span style='font-size: 20px;'>\
      Ma f&ecirc;te est au mois de __.\
      </span><br>\
      <span style='font-size: 30px;'>\
      F&Ecirc;TE / APP 1 / QUAND? / MOIS / __\
      </span>", <!-- ↑8 -->
      "<span style='font-size: 20px;'>\
      Le cours est bient&ocirc;t fini, j'ai h&acirc;te d'aller au karaok&eacute;.\
      </span><br>\
      <span style='font-size: 30px;'>\
      COURS / BIENT&Ocirc;T / FINIR / KARAOK&Eacute; / ALLER / PT&Eacute; 1 / AVOIR-H&Acirc;TE\
      </span>", <!-- ↑9 -->
      "<span style='font-size: 20px;'>\
      Quand a lieu le prochain examen? Est-ce la semaine prochaine?\
      </span><br>\
      <span style='font-size: 30px;'>\
      EXAMEN / PROCHAIN / QUAND? / SEMAINE / PROCHAINE?\
      </span>", <!-- ↑10 -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Il a fait chaud toute l'&eacute;t&eacute;, J'ai profit&eacute; du soleil.\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Mon prochain cong&eacute; c'est l'action de gr&acirc;ce.\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Apr&egrave;s le travail, je vais me changer. Je sors pour l'Halloween avec mes amies.\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      L'automne commence le 22 septembre cette année.\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Mes grand-parents voyagent au sud toute l'hiver jusqu'au printemps.\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Je peux effacer mon calendrier entre La Saint-Jean Baptiste et la Fête du Canada. Ce n'est pas important.\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      J'oublie toujours les signes pour f&eacute;vrier, mars et juin.\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Je me rapelle du jour de l'an, tu &eacute;tait tr&egrave;s saoul avant minuit.\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Tant&ocirc;t je vais avoir le go&ucirc;t de marcher dehors.\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      J'ai annonc&eacute; mon arr&ecirc;t de travail apr&egrave;s le jour de l'an.\
      </span>", <!-- 10# -->   
   ],
];
const chapter7 = [
   wordsEasy = [
      "viande",
      "poisson",
      "poulet",
      "dinde",
      "hamburger",
      "pizza",
      "hot-dog",
      "crevette",
      "sauce",
      "ketchup",
      "mayonnaise",
      "tomate",
      "brocoli",
      "chou fleur",
      "champignon",
      "oignon",
      "fruit",
      "pomme",
      "orange",
      "ananas",
      "p&ecirc;che",
      "cr&ecirc;pe",
      "sirop d'&eacute;rable",
      "gaufre",
      "bagel",
      "r&ocirc;tie",
      "bacon",
      "omelette",
      "eau",
      "caf&eacute;",
      "th&eacute;",
      "tisane",
      "glace",
      "th&eacute; glac&eacute;",
      "vin rouge",
      "vin blanc",
      "alcool",
      "bi&egrave;re",
      "cr&egrave;me glac&eacute;e",
      "cr&egrave;me fouett&eacute;e",
      "g&acirc;teau",
      "tarte",
      "pointe",
      "salade de fruits",
      "d&eacute;jeuner",
      "d&icirc;ner",
      "souper",
      "pourboire",
      "verre",
      "chaise",
      "bon app&eacute;tit",
      "servir",
      "couper",
      "manger",
      "boire",
      "avaler",
      "remplir",
      "choisir",
      "renverser",
   ],
   wordsHard = [
      "steak",
      "porc",
      "jambon",
      "brochette",
      "pain",
      "saucisse",
      "poutine",
      "riz",
      "fruit de mer",
      "homard",
      "&oelig;uf",
      "l&eacute;gume",
      "patate",
      "frite",
      "salade",
      "moutarde",
      "relish",
      "sel",
      "poivre",
      "sucre",
      "spaghetti",
      "lasagne",
      "soupe",
      "carotte",
      "concombre",
      "banane",
      "fraise",
      "framboise",
      "poire",
      "c&eacute;r&eacute;ale",
      "creton",
      "gruau",
      "croissant",
      "confiture",
      "beurre d'arachide",
      "f&egrave;ve au lard",
      "chocolat",
      "morceau",
      "jus",
      "lait",
      "limonade",
      "jus de l&eacute;gumes",
      "champagne",
      "biscuit",
      "brunch",
      "menu",
      "addition",
      "cuisine",
      "table",
      "commander",
      "&ecirc;tre plein",
      "pr&eacute;f&eacute;rer",
      "cuire",
      "avoir soif",
      "avoir faim",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      J'ai fait de la soupe. Veux-tu y go&ucirc;ter?\
      </span><br>\
      <span style='font-size: 30px;'>\
      SOUPE / PT&Eacute; 1 / FAIRE || PT&Eacute; 2 / GO&Ucirc;TER / VOULOIR?\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Sa m&egrave;re fait une salade d&eacute;licieuse.\
      </span><br>\
      <span style='font-size: 30px;'>\
      M&Egrave;RE / POSS 3 / SALADE / D&Eacute;LICIEUX / FAIRE\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Hier, j'ai mang&eacute; du poulet grill&eacute; pour souper.\
      </span><br>\
      <span style='font-size: 30px;'>\
      HIER / SOUPER / PT&Eacute; 1 / POULET / GRILL&Eacute; / MANGER\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Ma femme pr&eacute;pare de bonnes cr&ecirc;pes.\
      </span><br>\
      <span style='font-size: 30px;'>\
      FEMME / POSS 1 / CR&Ecirc;PE / BONNE / PR&Eacute;PARER\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Pourquoi ne veux-tu pas manger?\
      </span><br>\
      <span style='font-size: 30px;'>\
      PT&Eacute; 2 / MANGER / PAS VOULOIR / POURQUOI?\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Le poulet du restaurant St-Hubert est tr&egrave;s cher!\
      </span><br>\
      <span style='font-size: 30px;'>\
      RESTAURANT / ST-HUBERT / POULET / TR&Egrave;S CHER!\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      Nous avons mang&eacute; de la pizza aux fruits de mer et au saumon.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PIZZA / FRUIT DE MER / SAUMON / PT&Eacute; 4 / MANGER / FINI\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Nous sommes all&eacute;s au restaurant pour f&ecirc;ter une amie d'enfance.\
      </span><br>\
      <span style='font-size: 30px;'>\
      RESTAURANT / F&Ecirc;TE / AMI / FEMME / ENFANCE / PT&Eacute; 4 / ALLER\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      J'ai fait une poutine au canard avec une sauce aux 5 poivres. C'&eacute;tait facile &agrave; faire.\
      </span><br>\
      <span style='font-size: 30px;'>\
      POUTINE / CANARD / AVEC / SAUCE / 5 / POIVRE / CUISINER || FAIRE / FACILE\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      Robert ne sait pas cuisiner, c'est dommage!\
      </span><br>\
      <span style='font-size: 30px;'>\
      ROBERT / PT&Eacute; 3 / CUISINER / PAS SAVOIR / DOMMAGE!\
      </span>", <!-- 10# -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Est-ce qu'il y a de l'alcool dans ton th&eacute; glac&eacute;?\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Donne moi un morceau de biscuit s'il te pla&icirc;t.\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Non merci pour le g&acirc;teau. Je suis plein &agrave; cause j'ai mang&eacute; trop de poutine.\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Peux-tu aller acheter du steak, du ma&iuml;s et des patates?\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Mon fruit de mer pr&eacute;f&eacute;r&eacute; c'est le homard.\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Le matin, j'aime faire un d&eacute;jeuner facile comme des r&ocirc;tis au beurre d'arachide et confiture ou des c&eacute;r&eacute;ales.\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      &Agrave; matin, j'ai exag&eacute;r&eacute; un peu. J'ai fait deux omelettes aux jambon, champignons, oignons, tomates et patates.\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      C'est le fun que les menus sont en code QR. Pas besoin d'attendre le serveur.\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Tu sais c'est quoi le nom pour la cr&egrave;me glac&eacute;e sur une pointe de tarte?\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      R&eacute;cemment j'ai trouv&eacute; une fraise rare. J'ai choisi de la mettre avec les framboises.\
      </span>", <!-- 10# -->
      
   ],
];
const chapter8 = [
   wordsEasy = [
      "ville",
      "village",
      "&eacute;glise",
      "gazon",
      "arbre",
      "fleur",
      "h&ocirc;pital",
      "&eacutepicerie",
      "magasin",
      "immeuble",
      "maison",
      "garage (maison)",
      "cl&ocirc;ture",
      "Montr&eacute;al",
      "acheter",
      "d&eacute;m&eacute;nager",
      "magasin",
      "ouvrir",
      "fermer",
      "pompier",
      "policier",
      "port",
   ],
   wordsHard = [
      "centre ville",
      "caserne de pompier",
      "poste de police",
      "centre d'achat",
      "mus&eacute;e",
      "usine",
      "th&eacute;&acirc;tre",
      "jardin",
      "h&ocirc;tel",
      "h&ocirc;tel de ville",
      "station de service",
      "dentiste",
      "pharmacie",
      "prison",
      "parc",
      "banque",
      "bar",
      "appartement",
      "condo",
      "garage (m&eacute;canique)",
      "r&eacute;parer",
      "payer",
      "vendre",
      "stationnement",
      "visiter",
      "construire",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Le centre d'achat est proche de chez toi.\
      </span><br>\
      <span style='font-size: 30px;'>\
      CENTRE D'ACHAT / O&Ugrave;? || CHEZ / PT&Eacute; 2 / PROCHE\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Pierre se rend au village tous les matins.\
      </span><br>\
      <span style='font-size: 30px;'>\
      TOUS LES MATINS / P-I-E-R-R-E / VILLAGE / ALLER\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Jeudi dernier, je suis aller visiter ton jardin.\
      </span><br>\
      <span style='font-size: 30px;'>\
      JEUDI / PASS&Eacute; / JARDIN / APP 2 / PT&Eacute; 1 / VISITER / ALLER\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Le mois prochain, tu d&eacute;m&eacute;nage dans un condo &agrave; Montr&eacute;al.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MOIS / PROCHAIN / VILLE / MONTR&Eacute;AL / PT&Eacute; 2 / CONDO / D&Eacute;M&Eacute;NAGER\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Ma maison est situ&eacute;e juste &agrave; c&ocirc;t&eacute; de la pharmacie.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MAISON / APP 1 / PHARMACIE / &Agrave; C&Ocirc;T&Eacute;\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Samedi soir, mon &eacute;pouse et moi sommes all&eacute;s au th&eacute;&acirc;tre et au restaurant.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SAMEDI / SOIR / TH&Eacute;&Acirc;TRE / APR&Egrave;S / RESTAURANT / &Eacute;POUSE / POSS 1 / PT&Eacute; 1 / ALLER\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      L'&eacute;glise a &eacute;t&eacute; construite il y a deux ans.\
      </span><br>\
      <span style='font-size: 30px;'>\
      2 / AN / PASS&Eacute; / &Eacute;GLISE / CONSTRUIRE\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Ses parents sortent tous les samedis soirs sur la rue St-Denis.\
      </span><br>\
      <span style='font-size: 30px;'>\
      TOUS LES SAMEDIS / SOIR / RUE / S-T - D-E-N-I-S / PARENT / POSS 3 / SORTIR\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Pour venir chez nous faut sortir &agrave; la station Pie-IX.\
      </span><br>\
      <span style='font-size: 30px;'>\
      CHEZ / NOUS / VENIR / COMMENT? || M&Eacute;TRO / PIE-IX / SORTIR\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      Je pr&eacute;f&rgrave;re d&eacute;m&eacute;nager au Canada qu'aux &Eacute;tats-Unis.\
      </span><br>\
      <span style='font-size: 30px;'>\
      CANADA / VS / &Eacute;TATS-UNIS / PR&Eacute;F&Eacute;RER / CANADA / PT&Eacute; 1 / POUR / D&Eacute;M&Eacute;NAGER\
      </span>", <!-- 10# -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      J'ai vendu mon auto apr&egrave;s que je l'ai fait r&eacute;parer au garage.\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Ils ont ferm&eacute; le stationnement pour construire un immeuble.\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Le gazon au parc est tr&egrave;s long.\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      As-tu stationn&eacute; ton auto dans mon garage?\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Il fait tr&egrave;s chaud dans ton appartement.\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Je veux acheter de la bi&egrave;re. C'est o&ugrave; la station de service proche d'ici?\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      J'ai visit&eacute; la prison avec le beau policier.\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      L'&eacute;picerie &agrave; c&ocirc;t&eacute; de la banque est maintenant ouverte.\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Mon h&ocirc;tel a beaucoup d'&eacute;tages.\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      Mon sugar Daddy a pay&eacute; tout mon alcool au Renard vendredi soir.\
      </span>", <!-- 10# -->
   ],
];
const chapter9 = [
   wordsEasy = [
      "soccer",
      "hockey",
      "baseball",
      "natation",
      "plonger",
      "patin &agrave; glace",
      "course",
      "escalade",
      "raquette",
      "boxe",
      "karat&eacute;",
      "quilles",
      "dessin",
      "danser",
      "camping",
      "comp&eacute;tition",
      "partie",
      "piscine",
      "b&acirc;ton",
      "ballon",
      "balle",
      "jeu",
      "&eacute;quipe",
      "rapide",
      "fort",
      "courir",
      "sauter",
      "jouer",
      "tomber",
      "nager",
   ],
   wordsHard = [
      "football",
      "volleyball",
      "golf",
      "tennis",
      "badminton",
      "escrime",
      "patin &agrave; roues align&eacute;es",
      "ski alpin",
      "ski de fond",
      "judo",
      "motoneige",
      "musique",
      "jeu de table",
      "jeu vid&eacute;o",
      "cin&eacute;ma",
      "peinture",
      "filet",
      "groupe",
      "arbitre",
      "erreur / faute",
      "troph&eacute;e",
      "lent",
      "parfait",
      "moyen",
      "lancer",
      "glisser",
      "balancer",
      "gagner",
      "perdre",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Quel sport aimes-tu?\
      </span><br>\
      <span style='font-size: 30px;'>\
      SPORT / PT&Eacute; 2 / AIMER / QUOI?\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Je n'aime pas le ski de fond parce que c'est lent.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SKI DE FOND / PT&Eacute; 1 / PAS AIMER / &Agrave; CAUSE / LENT\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Nous allons souper et ensuite nous jouerons au soccer.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SOUPER / APR&Egrave;S / SOCCER / PT&Eacute; 4 / JOUER\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Hier, il a &eacute;t&eacute; tr&egrave;s difficile de faire match nul au volleyball.\
      </span><br>\
      <span style='font-size: 30px;'>\
      HIER / VOLLEYBALL / &Eacute;GALE / DIFFICILE / TR&Egrave;S\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Tous les samedis, ton oncle et ta tante font de la natation.\
      </span><br>\
      <span style='font-size: 30px;'>\
      TOUS LES SAMEDIS / ONCLE / TANTE / APP 2 / NATATION\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Je suis d&eacute;&ccedil;u car nous avons perdu contre les &Eacute;tats-Unis hier au hockey.\
      </span><br>\
      <span style='font-size: 30px;'>\
      HIER / HOCKEY / CONTRE / &Eacute;TATS-UNIS / PERDRE / PT&Eacute; 1 / D&Eacute;&Ccedil;U\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      Je pr&eacute;f&egrave;re le patin &agrave; roues align&eacute;es, mais c'est difficile &agrave; Montr&eacute;al &agrave; cause des c&ocirc;tes.\
      </span><br>\
      <span style='font-size: 30px;'>\
      PATIN &Agrave; ROUES ALIGN&Eacute;ES / PR&Eacute;R&Eacute;RER / MAIS / &Agrave; CAUSE / MONTR&Eacute;AL / C&Ocirc;TES / DIFFICILE\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Les professeurs de l'universit&eacute; affrontent les &eacute;tudiants dans un match de Badminton.\
      </span><br>\
      <span style='font-size: 30px;'>\
      UNIVERSIT&Eacute; / BADMINTON / PROFESSEUR / VS / &Eacute;TUDIANT\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Le Canada a gagn&eacute; la m&eacute;daille d'or &agrave; la boxe.\
      </span><br>\
      <span style='font-size: 30px;'>\
      BOXE / CANADA / M&Eacute;DAILLE / OR / GAGNER\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      Robert n'est pas bon au hockey, mais il aime regarder.\
      </span><br>\
      <span style='font-size: 30px;'>\
      HOCKEY / JOUER / ROBERT / PAS BON / MAIS / REGARDER / AIMER\
      </span>", <!-- 10# -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Quand je fait du v&eacute;lo, j'aime &eacute;couter de la musique.\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Je pense que le baseball est trop lent comme sport.\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Gab adore l'escalade mais il tombe toujours.\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Je pr&eacute;f&egrave;re regarder les femmes jouer au tennis que les hommes.\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Ta as oubli&eacute; le ballon de soccer dans le parc.\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      N&ocirc;tre groupe de LSQ est all&eacute; au cin&eacute;ma lundi pass&eacute;.\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      La semaine de la construction je vais faire du camping avec mon amoureux.\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Je peux courir tr&egrave;s vite mais je ne peux pas patiner.\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      J'ai presque faite une partie parfaite aux quilles l'ann&eacute;e pass&eacute;e.\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      Je n'aime pas ce jeu &agrave; cause la comp&eacute;tition est trop forte. J'aime gagner.\
      </span>", <!-- 10# -->
   ],
];
const chapter10 = [
   wordsEasy = [
      "chien",
      "chat",
      "vache",
      "b&oelig;uf",
      "mouton",
      "ch&egrave;vre",
      "tortue",
      "oiseau",
      "poule",
      "lapin",
      "araign&eacute;e",
      "hibou",
      "moufette",
      "castor",
      "raton-laveur",
      "porc-&eacute;pic",
      "sauterelle",
      "chauve-souris",
      "grenouille",
      "serpent",
      "orignal",
      "chevreuil",
      "baleine",
      "girafe",
      "&eacute;l&eacute;phant",
      "panth&egrave;re",
      "zoo",
      "poulailler",
   ],
   wordsHard = [
      "chiot",
      "chaton",
      "veau",
      "cheval",
      "cochon",
      "souris",
      "rat",
      "renard",
      "abeille",
      "coq",
      "li&egrave;vre",
      "mouche",
      "moustique",
      "mouette",
      "fourmi",
      "coccinelle",
      "pigeon",
      "hamster",
      "ours",
      "tigre",
      "lion",
      "curieux",
      "sauvage",
      "m&eacute;chant",
      "ferme",
      "&eacute;curie",
      "tracteur",
      "champs",
      "fermier",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Les chats se cachent dans l'&eacute;curie.\
      </span><br>\
      <span style='font-size: 30px;'>\
      &Eacute;CURIE / CHATS / CACHER\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Dimanche pass&eacute;, je suis all&eacute; &agrave; la ferme de mon oncle.\
      </span><br>\
      <span style='font-size: 30px;'>\
      DIMANCHE / PASS&Eacute; / FERME / ONCLE / POSS 1 / PT&Eacute; 1 / ALLER\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Les abeilles font du miel et les gu&ecirc;pes piquent.\
      </span><br>\
      <span style='font-size: 30px;'>\
      ABEILLES / MIEL / FAIRE / GU&Ecirc;PES / PIQUER\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Le hibou mange des souris le soir.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SOIR / SOURIS / HIBOU / PT&Eacute; 3 / MANGER\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Le chien surveille les moutons.\
      </span><br>\
      <span style='font-size: 30px;'>\
      MOUTONS / CHIEN / PT&Eacute; 3 / SURVEILLER\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Le tracteur du fermier est bris&eacute;, il ne peut plus travailler.\
      </span><br>\
      <span style='font-size: 30px;'>\
      FERMIER / PT&Eacute; / TRACTEUR / POSS 3 / BRISER / MAINTENANT / TRAVAILLER / PAS CAPABLE\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      Les enfants adorent jouer avec les grenouilles dans la rivi&egrave;re.\
      </span><br>\
      <span style='font-size: 30px;'>\
      RIVI&Egrave;RE / GRENOUILLE / ENFANTS / JOUER / ADORER\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Il est difficile d'attraper les lapins car ils sont sauvages.\
      </span><br>\
      <span style='font-size: 30px;'>\
      LAPIN / ATTRAPER / DIFFICILE / &Agrave; CAUSE / SAUVAGE\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Depuis l'&eacute;cole primaire, mon animal favori est le z&egrave;bre.\
      </span><br>\
      <span style='font-size: 30px;'>\
      DEPUIS / &Eacute;COLE / PRIMAIRE / PT&Eacute; 1 / Z&Egrave;BRE / ANIMAL / PR&Eacute;F&Eacute;RER\
      </span>", <!-- ↑# -->
      "<span style='font-size: 20px;'>\
      Robert est dr&ocirc;le quand il imite les animaux.\
      </span><br>\
      <span style='font-size: 30px;'>\
      SI / ROBERT / ANIMAL / IMITER / DR&Ocirc;LE / PT&Eacute; 3\
      </span>", <!-- 10# -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Comment est-ce que les vampires deviennent des chauve-souris?\
      </span>", <!-- 1# -->
      "<span style='font-size: 20px;'>\
      Je cherche le hamster de ma s&oelig;ur mais je pense que le serpent de mon fr&egrave;re la mang&eacute;.\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      La personne qui travaille au zoo est m&eacute;chant vers l'&eacute;l&eacute;phant.\
      </span>", <!-- 3# -->
      "<span style='font-size: 20px;'>\
      Le champ a beaucoup de belles fleurs mais aussi beaucoup d'araign&eacute;es.\
      </span>", <!-- 4# -->
      "<span style='font-size: 20px;'>\
      Le cochon mange comme un cochon.\
      </span>", <!-- 5# -->
      "<span style='font-size: 20px;'>\
      Tu connais l'histoire de la tortue et le li&egrave;vre?\
      </span>", <!-- 6# -->
      "<span style='font-size: 20px;'>\
      Lequel tu pr&eacute;f&egrave;res... le lion, le tigre ou le panth&egrave;re?\
      </span>", <!-- 7# -->
      "<span style='font-size: 20px;'>\
      Les vaches boivent de l'eau mais les veaux boivent du lait.\
      </span>", <!-- 8# -->
      "<span style='font-size: 20px;'>\
      Je n'aime pas le camping &agrave; cause des fourmis et des moustiques.\
      </span>", <!-- 9# -->
      "<span style='font-size: 20px;'>\
      Le castor et l'orignal sont des animaux Canadiens.\
      </span>", <!-- 10# -->
   ],
];
const chapter11 = [
   wordsEasy = [
      "lesbienne",
      "drag queen",
      "la tour CN",
      "feu",
      "voisin",
      "gin",
      "dans",
      "sentir",
   ],
   wordsHard = [
      "gai",
      "sur",
      "s'en foutre",
      "fuck friend",
   ],
   phraseEasy = [
      "<span style='font-size: 20px;'>\
      Bienvenue au personnes gais et lesbiennes.\
      </span><br>\
      <span style='font-size: 30px'>\
      PERSONNE / GAI / LESBIENNE / BIENVENUE\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Ton chien est curieux, il sent ce qu'on cuisine.\
      </span><br>\
      <span style='font-size: 30px;'>\
      CHIEN / APP 2 / CURIEUX / CUISINER / PT&Eacute; 4 / PT&Eacute; 3 / SENTIR\
      </span>", <!-- ↑# -->
   ],
   phraseHard = [
      "<span style='font-size: 20px;'>\
      Je m'en fou de la tour CN.\
      </span>",<!-- ↑1 -->
      "<span style='font-size: 20px;'>\
      Le camion de pompier a bris&eacute; ma cl&ocirc;ture &agrave; cause du feu chez le voisin.\
      </span>", <!-- 2# -->
      "<span style='font-size: 20px;'>\
      Es-tu d&eacute;j&agrave; all&eacute; aux danseurs / danseuses nus?\
      </span>", <!-- 3# -->          
   ]
];