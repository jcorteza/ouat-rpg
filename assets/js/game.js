var round = 1;
var wins = 0;
var heroHealth;
var heroAttack;
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
    // on click of #villainCards
    $("#villainCards").on("click", ".charCard", setupVillains);
    $("#ftBtn").on("click", ftSequence);
    $("#nextRnd").on("click", function() {
        round = 1;
        villPicked = false;
        lost = false;
        won = false;
        $("#villainCards").empty();
        $(".healthText").css("display", "none");
        $("#resultsDiv").css("display", "none");
        displayChars(villains);
        $("#villainCards").on("click", ".charCard", setupVillains);
        $("#ftBtn").on("click", ftSequence);
    });
    $("#reset").on("click", function() {
        round = 1;
        villPicked = false;
        heroPicked = false;
        lost = false;
        won = false;
        $("#heroCards")
            .empty()
            .on("click", ".charCard", setupHeroes);
        $("#villainCards")
            .empty()
            .on("click", ".charCard", setupVillains);
    });
});