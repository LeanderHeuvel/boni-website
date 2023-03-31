/**
 * written by Leander van den Heuvel, 2023
 * https://www.linkedin.com/in/leander-van-den-heuvel/
 * 
 */

function checkSessionStorage() {
    if (window.localStorage.getItem('key')==null){
        players = []
        window.localStorage.setItem('key', JSON.stringify(players));
    }
    else{
         players = JSON.parse(window.localStorage.getItem('key'));
    }
}

function getRandomColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 40%)";
    return color;
  }

function updateSession(players){
    window.localStorage.setItem('key', JSON.stringify(players));
}
function sortPlayers(){
    players.sort(function(a, b) {
        return (a[1] - b[1])*-1;
      });
}

function getMaxValue(){
    var scores = players.map(function(value,index) { return value[1]; });

    var maxValue = scores.reduce(function(a, b) {
        return Math.max(a, b);
    }, -Infinity);
    return maxValue
}
function adaptScores(team, add) {
    for (let i=0; i<players.length; i++){
        if (players[i][0]==team){
            if(add){
                players[i][1]+=1
            }
            else {
                players[i][1]-=1
            }
            
        }
    }
    window.localStorage.setItem('key', JSON.stringify(players));
    rebuild();
}

function build (){
    if (players.length<1){
        lijst.innerHTML ="<div class='wrapper'>Nog geen spelers, maak ze via de knop rechts onder aan.</div>"
    }
    else{
        for (let i=0;i<players.length; i++ ){
            width = getWidth(i);
            lijst.innerHTML += makeProgressBar(i, width);
        }
    }
}

function rebuild(){
    sortPlayers();
    lijst.innerHTML="";
    for (let i=0;i<players.length; i++ ){
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        width = getWidth(i); 
        lijst.innerHTML += makeProgressBar(i, width);
    }
}
function makeProgressBar(i, width){
    return "<div onclick='adaptScores("+'"'+players[i][0]+'", true'+")' class='wrapper'><div style='background-color: "+players[i][2]+"; width: "+width+"%;' class='progressbar'> <div class = 'name'> "+players[i][0]+"</div><div class='score'>"+players[i][1]+"</div></div></div><hr>";
     
}
function getWidth(i){
    var maxValue = getMaxValue();
    return Math.max(10,players[i][1]/maxValue*100);
}

function addPlayer(name){
    name = name.replace("'","")
    players.push([name,0,Math.floor(Math.random()*16777215).toString(16)])
    updateSession(players)
    modal.style.display = "none";
    rebuild();
}

function fillSelectPlayer(select){
    // select = document.getElementById("selectPlayers")
    select.innerHTML="";
    for(let i = 0; i<players.length;i++){
        select.innerHTML+="<option selected value='"+players[i][0]+"'>"+players[i][0]+"</option>";
    }
}
function shuffleColors(){
    for(let i=0;i<players.length;i++) {
        players[i][2] = getRandomColor();
        updateSession(players);
        rebuild();
    }
}
function deletePlayer(name){
    alert("Weet je zeker dat je " +name+ " wil verwijderen?")
    for(let i=0;i<players.length;i++) {
        if (players[i][0]==name) {
            players.splice(i,1);
            console.log(players)
            updateSession(players)
            rebuild();
        }
    }
}
// main code
let players=null;
var lijst = document.getElementById("lijst");
var inputName = document.getElementById('fname')
var modal = document.getElementById("myModal");
var settingsModal = document.getElementById("settingsModal");
var selectedPlayer = document.getElementById("selectPlayers")
var selectedPlayerScore = document.getElementById("selectPlayersScore")
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var settingsButton = document.getElementById("settingsButton")
var enterButton = document.getElementById("enterButton")
var deleteButton = document.getElementById("deleteButton");
var lowerScoreButton = document.getElementById("lowerScoreButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanSettings = document.getElementsByClassName("close")[1];
var shuffleColorsButton = document.getElementById("shuffleColors");

shuffleColorsButton.onclick = function() {
    shuffleColors();
  }
// When the user clicks on the button, open the modal
settingsButton.onclick = function() {
    settingsModal.style.display = "block";
  }
btn.onclick = function() {
  fillSelectPlayer(selectedPlayer);
  fillSelectPlayer(selectedPlayerScore);
  modal.style.display = "block";
}


spanSettings.onclick = function() {
    settingsModal.style.display="none";
}
enterButton.onclick = function() {
    addPlayer(inputName.value);
    modal.style.display = "none";
  }
//detect enter keypress when adding a new name
inputName.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        enterButton.click();
      }
});
lowerScoreButton.onclick = function(){
    var name  = selectedPlayerScore.options[selectedPlayerScore.selectedIndex].value
    adaptScores(name,false);
}

deleteButton.onclick = function(){
    var name  = selectedPlayer.options[selectedPlayer.selectedIndex].value
    deletePlayer(name);
    modal.style.display = "none";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


checkSessionStorage();
var scores = players.map(function(value,index) { return value[1]; });
var maxValue = getMaxValue();
sortPlayers();
build();

