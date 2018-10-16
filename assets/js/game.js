var round = 1;
var wins = 0;
var heroHealth;
var heroAttack;
var baseAttack;
var heroCounter;
var villHealth;
var villCounter;
var lost = false;
var won = false;
var heroPicked = false;
var villPicked = false;
var defeated;

$(document).ready(function() {
    const heroes = characters.heroes;
    const villains = characters.villains;
    displayChars(heroes);
    displayChars(villains);
    // on click of #heroCards div run setupHeroes function
    $("#heroCards").on("click", ".charCard", setupHeroes);
    // on click of #villainCards run setupVillain function
    $("#villainCards").on("click", ".charCard", setupVillains);
    $("#ftBtn").on("click", ftSequence);
    $("#nextRnd").on("click", function() {
        $("#nextRnd").attr("disabled", "disabled");
        resetRound();
        $("#villainCards").on("click", ".charCard", setupVillains);
    });
    $("#reset").on("click", function() {
        $("#reset").attr("disabled", "disabled");
        resetRound();
        round = 1;
        wins = 0;
        heroPicked = false;
        $("#heroCards").empty();
        $("#villainCards").empty();
        displayChars(heroes);
        displayChars(villains);
        $("#heroCards").on("click", ".charCard", setupHeroes);
        $("#villainCards").on("click", ".charCard", setupVillains);
    });
});