var counter = 1;
var tapplePoints = 0;
var TappleCategory;
var TappleTitle;
var correctPasswords = {
   01: 01,
   02: 02,
   03: 03,
   04: 04,
   05: 05, // disney tapple
   06: 07, //cups of sugar to the moon x2
   07: 07,
   08: 08,
   09: 09,
   10: 10, //wrestling tapple
   11: "time",
   12: 93746, //fuck=9 fucked=37 total=46
   13: 13,
   14: 14,
   15: 15, //metro tapple
   16: 16,
   17: 17,
   18: 1080, //baby gate
   19: 19,
   20: 20, //horror tapple
   21: "gin and juice",
   22: 22,
   23: 23,
   24: 24,
   25: 25, //rupaul tapple
   26: 26,
   27: "your breath",
   28: 55272, //56 x 47 x 21
   29: 29,
   30: 30, //family tapple
};

var type = document.getElementById('typing');
var ia = document.getElementById('inputAnswer');
   var nxtButton = document.getElementById('nextButton');
   var llbutton = document.getElementById('lifeLineButton');
   var popup = false;
   var elem = document.documentElement;
   var resultElem = document.getElementById('result');
   var lock = document.getElementById('ticker');
   var game = document.getElementById('tapple');
  
function openFullScreen(){
    if (elem.requestFullScreen) {
        elem.requestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullacreen) {
        /* IE11 */
        elem.msRequestFullacreen();
    }
    document.getElementById('topSecret').style.display = 'none';
    if(counter<2){
        lock.style.display = 'none';
    }
}

function closeFullScreen(){
    if(!document.fullscreenElement&&!document.mozFullscreenElement&&!document.webkitFullscreenElement&&!document.msFullscreenElement){
        if (elem.exitFullScreen) {
            elem.exitFullScreen();
        } else if (elem.webkitExitFullscreen) {
            /* Safari */
            elem.webkitExitFullscreen();
        } else if (elem.msExitFullacreen) {
            /* IE11 */
            elem.msExitFullacreen();
        }
        document.getElementById('topSecret').style.display = 'inline';
    }  
} 
 
function updateCounter(){
counter++;
}

function nextSlide(divHide, divShow){   
    changeInputColour('white');
    changeSpinnerColour('red');
    ia.disabled = false;
    lock.removeAttribute('disabled');
    ia.value = '';
    tapplePoints = 0;
    resetTapple();
    if(counter%5==0){
        type.style.display = 'none';
        lock.style.display = 'none';
        game.style.display = 'inline';
        switch(counter){
        case 5:
            TappleCategory = disneyTapple;
            TappleTitle = 'Disney';
            break;
        case 10:
            TappleCategory = wrestlingTapple;
            TappleTitle = 'Wrestling';
            break;
        case 15:
            TappleCategory = stmTapple;
            TappleTitle = 'Stm';
            break;
        case 20:
            TappleCategory = horrorTapple;
            TappleTitle = 'Horror';
            break;
        case 25:
            TappleCategory = rupaulTapple;
            TappleTitle = 'Rupaul';
            break;
        case 30:
            TappleCategory = familyTapple;
            TappleTitle = 'Family';
            break;
        }
        document.getElementById('tappleButton').innerHTML = TappleTitle;
        checkForEmptyTappleLetters();
    } else {
        switch(counter%2){
          case 0:
            type.style.display = 'none';
            game.style.display = 'none';
            lock.style.display = 'inline-block';
            break;
          case 1:
            lock.style.display = 'none';
            game.style.display = 'none';
            type.style.display = 'flex';
            break;
        }
    }

document.getElementById(divHide).style.display = 'none';
document.getElementById(divShow).style.display = 'inline';
document.getElementById('counter').innerHTML = "mission<br>" + counter + "/30";
   document.getElementById('counter').style.color = "pink";
   nxtButton.disabled = true;
   llbutton.disabled = false;
}

function verifyText(){
    var inputText = ia.value;
    var correctAnswer = correctPasswords[counter];
    if(inputText == correctAnswer){
      counter++;
      changeInputColour('green');  
      ia.disabled = true;
      nxtButton.disabled = false;
      llbutton.disabled = true;
   } else if(inputText == ''){
       changeInputColour('white');
   } else {
      changeInputColour('red');
   }
    
}

function verifyAnswer(){
   var correctAnswer = correctPasswords[counter];
       var password = resultElem.innerHTML;
       if(counter==12 && password==46){
           document.getElementById('hotdog').style.display = 'inline';
       }
       if(password == correctAnswer){
      counter++;
      nxtButton.disabled = false;
      llbutton.disabled = true;
      lock.setAttribute('disabled', "");
      changeSpinnerColour('green');
   } 
}

function verifyTapple(letter, position, elem, val){   
    if(val==""){
        document.getElementById('tappleButton').innerHTML = TappleTitle;
    } else {
        document.getElementById('tappleButton').innerHTML = val;
    }
    if(TappleCategory[position-1].items.includes(val.toLowerCase())){
        elem.style.backgroundColor = 'green';
        elem.value = "";
        elem.disabled = true;
        if(![17,21,22,24,25,26].includes(position)){
            tapplePoints++;
            if(tapplePoints>0){ //==20 FIX
            counter++;
            nxtButton.disabled = false;
            llbutton.disabled = true;
            }
        }            
    }
}

function checkForEmptyTappleLetters(){   
    for(i=0; i<26; i++){
        if(TappleCategory[i].items.length < 1){
            document.getElementById('tapple'+TappleCategory[i].letter).disabled = true;
            document.getElementById('tapple'+TappleCategory[i].letter).style.backgroundColor = 'white';
            if(!["Q","U","V","X","Y","Z"].includes(TappleCategory[i].letter)){
            tapplePoints++;
            }
        }
    }
}

function changeInputColour(colour){
    ia.style.backgroundColor = colour;
}

function changeSpinnerColour(colour){
    var spinners = document.querySelectorAll('.rotator');
    spinners.forEach(spin =>{
        spin.style.color = colour;
    })
}

function resetTapple(){
    var tapElems = document.querySelectorAll('.tappleLetters');
    tapElems.forEach(tapElem =>{
        tapElem.style.backgroundColor = 'black';
        tapElem.disabled = false;
    })
    var tapElemsBonus = document.querySelectorAll('.tappleLetters.bonus');
    tapElemsBonus.forEach(tapElem =>{
        tapElem.style.backgroundColor = 'magenta';
    })
}

function togglePopup(whichPopup){
  if(popup){
   popup = false;  document.getElementById(whichPopup).style.visibility = 'hidden';
  } else {
     popup = true; document.getElementById(whichPopup).style.visibility = 'visible';
  }
}

function focusLetter(letter, colour){  
    if(!letter.disabled){       
        letter.style.backgroundColor = colour;
        letter.classList.add('focusLetters');
    }
}

function unfocusLetter(letter, colour){
    if(!letter.disabled){
        letter.style.backgroundColor = colour;
    }
    letter.classList.remove('focusLetters');
    letter.value = "";
    document.getElementById('tappleButton').innerHTML = TappleTitle;
}

const tappleElems = document.querySelectorAll('.tappleLetters');
const tappleBonus = document.querySelectorAll('.bonus');
tappleElems.forEach(elem => elem.addEventListener('focus', focusLetter.bind(null, elem, '#50575e')));
tappleElems.forEach(elem => elem.addEventListener('focusout', unfocusLetter.bind(null, elem, 'black')));
tappleBonus.forEach(elem => elem.addEventListener('focusout', unfocusLetter.bind(null, elem, 'magenta')));

//resultElem.addEventListener('DOMSubtreeModified',verifyAnswer);
 
 // const observer = new MutationObserver( list => {
 //   const evt = new CustomEvent('dom-changed', {detail: list});
 //   resultElem.dispatchEvent(evt)
 // });
 // observer.observe(resultElem, {attributes: true, childList: true, subtree: true});
 // resultElem.addEventListener('dom-changed', verifyAnswer);
 
 // const observer = new MutationObserver(list => {
 //   verifyAnswer;
 // });
 // observer.observe(resultElem, {attributes: true, childList: true, subtree: true});
 
 //Make DOM editable for ease of demo
 document.body.contentEditable = true;
 // Implement the code that will run when triggered
 var observer = new MutationObserver(function(mutations) {
     mutations.forEach(function(mutation) {
       document.getElementById('counter').style.color = "yellow";
     });
 });
 // Define the configuration
 var config = {
      subtree:true, 
      attributes: false, 
      childList: false, 
      characterData: true
 };
 // Observe the target
 observer.observe(resultElem, config);

document.addEventListener('fullscreenchange', closeFullScreen);
document.addEventListener('mozfullscreenchange', closeFullScreen);
document.addEventListener('webkitfullscreenchange', closeFullScreen);
document.addEventListener('msfullscreenchange', closeFullScreen);
