const unlockedPokemon = [];
const collectedPokemon = [];
const uncollectedPokemon = [];
const maxLives = 8;
var livesLeft = maxLives;
var fakeAnswer1;
var fakeAnswer2;
var fakeAnswer3;
var fakeAnswer4;
var realAnswer;
var score = 0;
var hiScore = 0;

var ans1 = document.getElementById("answer1");
var ans2 = document.getElementById("answer2");
var ans3 = document.getElementById("answer3");
var ans4 = document.getElementById("answer4");
var img1 = document.getElementById("image1");
var img2 = document.getElementById("image2");
var img3 = document.getElementById("image3");
var img4 = document.getElementById("image4");
var btn1 = document.getElementById("button1");
var btn2 = document.getElementById("button2");
var btn3 = document.getElementById("button3");
var btn4 = document.getElementById("button4");
var viewPlay = document.getElementById("playSection");
var viewScore = document.getElementById("scoreSection");
var viewDex = document.getElementById("dexSection");
var viewMaster = document.getElementById("masterSection");

//Sets the screen ready for the player to play again
function playAgain(){
  viewScore.style.display = 'none';
  viewDex.style.display = 'none';
  viewPlay.style.display = 'inline';
  unlockedPokemon.splice(0,unlockedPokemon.length);
  score = 0;
  document.getElementById("scoreDisplay").innerHTML = "Score: " + score;
  livesLeft = maxLives;
  updateLives();
  loadPokemon();
}

//Rolls a random number to determine which Pokemon are shown
function loadPokemon(){
  let Pkmn = [];
  if(document.getElementById("shinybox").checked == true){
     Pkmn = uncollectedPokemon;
  } else {
     Pkmn = Pokemon;
  }
  checkLives();
  disableButtons(false);
  displayContButton("hide");
  resetColours();
  fakeAnswer1 = Pkmn[Math.floor(Math.random()*Pkmn.length)+1];
  fakeAnswer2 = Pkmn[Math.floor(Math.random()*Pkmn.length)+1];
  fakeAnswer3 = Pkmn[Math.floor(Math.random()*Pkmn.length)+1];
  fakeAnswer4 = Pkmn[Math.floor(Math.random()*Pkmn.length)+1];
  if(collectedPokemon.length > 901)
   finalFour();
  
  ans1.innerHTML = fakeAnswer1.name;
  ans2.innerHTML = fakeAnswer2.name;
  ans3.innerHTML = fakeAnswer3.name;
  ans4.innerHTML = fakeAnswer4.name;
  img1.src = fakeAnswer1.img;
  img2.src = fakeAnswer2.img;
  img3.src = fakeAnswer3.img;
  img4.src = fakeAnswer4.img;
  btn1.style.background = 'linear-gradient(to bottom left, '+fakeAnswer1.type1+', '+fakeAnswer1.type2+')';
  btn2.style.background = 'linear-gradient(to bottom left, '+fakeAnswer2.type1+', '+fakeAnswer2.type2+')';
  btn3.style.background = 'linear-gradient(to bottom left, '+fakeAnswer3.type1+', '+fakeAnswer3.type2+')';
  btn4.style.background = 'linear-gradient(to bottom left, '+fakeAnswer4.type1+', '+fakeAnswer4.type2+')';
  
  realAnswer = Pkmn[Math.floor(Math.random()*Pkmn.length)+1];
  document.getElementById("audioArea").src = realAnswer.mp3;

  switch (Math.floor(Math.random()*4)+1){
   case 1:
      ans1.innerHTML = realAnswer.name;
      img1.src = realAnswer.img;
      btn1.style.background = 'linear-gradient(to bottom left, '+realAnswer.type1+', '+realAnswer.type2+')';
      break;
   case 2:
      ans2.innerHTML = realAnswer.name;
      img2.src = realAnswer.img;
      btn2.style.background = 'linear-gradient(to bottom left, '+realAnswer.type1+', '+realAnswer.type2+')';
      break;
   case 3:
      ans3.innerHTML = realAnswer.name;
      img3.src = realAnswer.img;
      btn3.style.background = 'linear-gradient(to bottom left, '+realAnswer.type1+', '+realAnswer.type2+')';
      break;
   case 4:
      ans4.innerHTML = realAnswer.name;
      img4.src = realAnswer.img;
      btn4.style.background = 'linear-gradient(to bottom left, '+realAnswer.type1+', '+realAnswer.type2+')';
      break;
  }
checkDoubles();
}

//Prevents a Pokemon from appearing twice in the choices
function checkDoubles(){
  if (ans1.innerHTML==ans2.innerHTML || ans1.innerHTML==ans3.innerHTML ||
      ans1.innerHTML==ans4.innerHTML || ans2.innerHTML==ans3.innerHTML ||
      ans2.innerHTML==ans4.innerHTML || ans3.innerHTML==ans4.innerHTML)
  loadPokemon();
}

//Verifies if the answer selected is correct
function checkAnswer(buttonClicked, buttonAnswer){
  if (buttonAnswer == realAnswer.name){
   score ++;
   document.getElementById("scoreDisplay").innerHTML = "Score: " + score;
   buttonClicked.style.background = 'radial-gradient(closest-side, lightgreen, green, darkgreen)';
   realAnswer.img = realAnswer.shiny;
   let allButtons = document.querySelectorAll(".buttons");
    allButtons.forEach(button =>{
      if(button.childNodes[1].innerHTML != realAnswer.name)
        button.style.opacity = 0.5;
    });
  updateCollection();
  } else {
    let allButtons = document.querySelectorAll(".buttons");
    allButtons.forEach(button =>{
      if(button.childNodes[1].innerHTML == realAnswer.name){
        button.style.background = 'radial-gradient(closest-side, darkred, red, coral)';
      } else {
        button.style.opacity = 0.5;
      }
    });
    buttonClicked.style.background = 'radial-gradient(closest-side, coral, red, darkred)';
    buttonClicked.style.opacity = 0.5;
   livesLeft--;
   updateLives();
  }
  disableButtons(true);
  displayContButton("show");
}

//Adds the newly discovered Pokemon to the array of unlocked & collected shinies if not already collected
function updateCollection(){
  if (!unlockedPokemon.includes(realAnswer))
     unlockedPokemon.push(realAnswer);
  if (!collectedPokemon.includes(realAnswer))
     collectedPokemon.push(realAnswer);
}

//Prevents player from clicking multiple buttons
function disableButtons(task){
  let allButtons = document.querySelectorAll(".buttons");
   allButtons.forEach(button =>{
   button.disabled = task;
   });
}

//displays and hides the continue button
function displayContButton(task){
 if(task=="hide"){
    document.getElementById("continueButton").style.visibility = 'hidden';
  } else {
    document.getElementById("continueButton").style.visibility = 'visible';
  }
}

//Resets the opacity of the buttons
function resetColours(){
  let allButtons = document.querySelectorAll(".buttons");
  allButtons.forEach(button =>{
  button.style.opacity = 1;
  });
}

//Refreshes the lives to be up to date
function updateLives(){
  let allLives = document.querySelectorAll(".lives");
  allLives.forEach(life =>{
  life.remove();
  });
  createLives(livesLeft, pokeball);
  createLives(maxLives-livesLeft, ironball);
}

//Creates new img nodes to display the lives
function createLives(numLives, icon){
  for(let i = 0; i < numLives; i++){
     let createdImg = document.createElement('img');
     createdImg.className = "lives";
     createdImg.src = icon;
     document.getElementById("livesArea").appendChild(createdImg);
  }
}

//Verifies if the player has run out of lives
function checkLives(){
  if(livesLeft == 0)
   endGame();
}

//Displays the end of game message and unlocked Pokemon
function endGame(){
  let allShinyNodes = document.querySelectorAll(".shinies");
  allShinyNodes.forEach(shinyNode =>{
  shinyNode.remove();
  });
  sortPokemon();
  displayShinies(unlockedPokemon,"unlockedArea");
  for(let i=1;i<9;i++){
    let tempCollection = [];
    let genNum = "gen" + i.toString();
    tempCollection.splice(0,tempCollection.length);
    for(let j=0; j < collectedPokemon.length; j++){
      if(collectedPokemon[j].gen == i)
       tempCollection.push(collectedPokemon[j]);  
    } displayShinies(tempCollection,genNum);
  }
  document.getElementById("finalScore").innerHTML = score;
  document.getElementById("totalCollected").innerHTML =
                           collectedPokemon.length + "/" + (Pokemon.length -1);
  viewPlay.style.display = 'none';
  viewScore.style.display = 'flex';
  if(hiScore < score)
     hiScore = score;
  document.getElementById("hiScoreDisplay").textContent = "Highscore: " + hiScore;
}

//creates the image nodes to display the Pokemon
function displayShinies(PkmnArray, area){
  for(let i = 0; i < PkmnArray.length; i++){
     let createdImg = document.createElement('img');
     createdImg.className = "shinies";
     createdImg.src = PkmnArray[i].shiny;
     document.getElementById(area).appendChild(createdImg);
  }
}

//Displays the entire collection of Pokemon
function viewCollection(){
  viewScore.style.display = 'none';
  viewDex.style.display = 'flex';
}

//Sorts the Pokemon so that they can be displayed by Pokedex number. At the same time it adds the uncollected Pokemon to a new Array
function sortPokemon(){
  let tempArray = [];
  uncollectedPokemon.splice(0, uncollectedPokemon.length);
  for(let i = 0; i < Pokemon.length; i++){
     if(collectedPokemon.includes(Pokemon[i])){
     tempArray.push(Pokemon[i]);   
     } else {
        uncollectedPokemon.push(Pokemon[i])
     }
  }
  collectedPokemon.splice(0, collectedPokemon.length);
  collectedPokemon.push(...tempArray);
}

//Sets Ditto, Mudkip, Inkay, & Eiscue as the final four fake answers because there aren't enough Pokemon left to random()
function finalFour(){
  fakeAnswer1 = Pokemon[132];
  fakeAnswer2 = Pokemon[258];
  fakeAnswer3 = Pokemon[686];
  fakeAnswer4 = Pokemon[875];
}

//checks if the player has collected all 905 Pokemon
function pokemonMaster(){
  if (collectedPokemon.length == 905){
     viewPlay.style.display = 'none';
     viewMaster.style.display = 'flex';
  }
}

setInterval(pokemonMaster,1000);
document.addEventListener("DOMContentLoaded", updateLives())
document.addEventListener("DOMContentLoaded", loadPokemon())