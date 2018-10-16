var characters = {
    heroes: {
        emma: {
            title: "Emma Swan, The Savior",
            quote: "I'm fighting for the people I love.",
            powers: "Light Magic, Lie Detection, Healing",
            healthPts: 152,
            attackPts: 20,
            counterPts: 5,
            profileImg: "./assets/images/emma-1.jpeg",
            type: "hero"
        },
        henry: {
            title: "Henry Mills, The Truest Believer",
            quote: "You may not believe[...]but I believe in you.",
            powers: "Belief, Power of The Author, Knowledge of Stories",
            healthPts: 130,
            attackPts: 15,
            counterPts: 10,
            profileImg: "./assets/images/henry-3.jpg",
            type: "hero"
        },
        snow: {
            title: "Mary Margaret Blanchard, Snow White",
            quote: "If people are supposed to be together, they find a way.",
            powers: "Leadership, Archery, Resourcefulness",
            healthPts: 155,
            attackPts: 17,
            counterPts: 8,
            profileImg: "./assets/images/snow.jpg",
            type: "hero"
        },
        charming: {
            title: "David Nolan, Prince Charming",
            quote: "You never have to worry. I will always find you.",
            powers: "Swordsmanship, Fighting, Timing",
            healthPts: 147,
            attackPts: 12,
            counterPts: 7,
            profileImg: "./assets/images/charming.jpg",
            type: "hero"
        }
    },
    villains: {
        rumple: {
            key: "rumple",
            title: "Rumplestiltskin, The Dark One",
            quote: "	Evil isn't born dearie, it's made.",
            powers: "Immortality, Dark Magic, Cutting Deals",
            healthPts: 175,
            attackPts: 0,
            counterPts: 75,
            profileImg: "./assets/images/rumple.jpeg",
            type: "villain"
        },
        regina: {
            key: "regina",
            title: "Regina Mills, The Evil Queen",
            quote: "I shall destroy your happiness, if it is the last thing I do.",
            powers: "Black Magic, Spell-casting, Mirror Magic",
            healthPts: 125,
            attackPts: 0,
            counterPts: 55,
            profileImg: "./assets/images/regina.jpg",
            type: "villain"
        },
        malificent: {
            key: "malificent",
            title: "Maleficent",
            quote: "But, 'beast' is so harsh. I prefer Maleficent.",
            powers: "Dragon Transformation, Sleeping Curse, Magical Staff",
            healthPts: 50,
            attackPts: 0,
            counterPts: 25,
            profileImg: "./assets/images/mal.jpg",
            type: "villain"
        },
        hades: {
            key: "hades",
            title: "Hades, God of the Underworld",
            quote: "Do I look like I like to lose anything?",
            powers: "Immortality, Omniscience, Magic",
            healthPts: 75,
            attackPts: 0,
            counterPts: 35,
            profileImg: "./assets/images/hades.jpg",
            type: "villain"
        }
    }
};
/* function fills out character divs in html */
function displayChars(charSet) {
    console.log("Inside displayChars function.");
    for(var key in charSet) {
        const charCard = $("<div>").attr("class", "charCard");
        $(charCard)
            .attr("data-health", charSet[key].healthPts)
            .attr("data-counter", charSet[key].counterPts);
        const charImg = $("<img src=\"" + charSet[key].profileImg + "\">").attr("alt", charSet[key].title + "show poster");
        const charTitle = $("<h2>").text(charSet[key].title);
        const charQuote = $("<p>").text("Quote: " + charSet[key].quote);
        const charPowers = $("<p>").text("Powers: " + charSet[key].powers);
        $(charImg)
            .add(charTitle)
            .add(charQuote)
            .add(charPowers)
            .appendTo(charCard);
        if(charSet[key].type === "hero") {
            $(charCard).attr("data-attack", charSet[key].attackPts);
            $(charCard).appendTo("#heroCards");
            
        }
        else if (charSet[key].type === "villain") {
            $(charCard).attr("data-key", charSet[key].key);
            $(charCard).appendTo("#villainCards")
        }
    }
}
function setupHeroes() {
    //hide all the hero cards except for the one that was clicked
    $("#heroCards > .charCard").not($(this)).css("display", "none");
    $(this).css("margin", "auto");
    $("#heroText").text("The Hero");
    // set hero variables
    heroHealth = $(this).attr("data-health");
    heroAttack = $(this).attr("data-attack");
    baseAttack = $(this).attr("data-attack");
    heroCounter = $(this).attr("data-counter");
    $("#heroHealth").text(heroHealth);
    $("#heroCards").off("click");
    // set heroPicked to true;
    heroPicked = true;
    timeToPlay();
}
function setupVillains() {
    $("#villainCards").off("click");
    $(this).detach();
    console.log($("#villainCards"));
    $("#currentEnemy").append(this);
    $("#villainCards").css("display", "none");
    $("#villText").text("The Villain");
    //set villain variables
    villHealth = $(this).attr("data-health");
    console.log(villHealth);
    villCounter = $(this).attr("data-counter");
    $("#villHealth").text(villHealth);
    // set villPicked to true;
    villPicked = true;
    timeToPlay();
}
function timeToPlay() {
    if(heroPicked && villPicked) {
        $(".healthText").css("display", "block");
        $("#fightDiv").css("display", "block");
    }
}
function heroAttacks() {
    $("#ftScn").text("You attack.");
    villHealth = villHealth-heroAttack;
    console.log("Villain health is now " + villHealth);
    $("#villHealth").text(villHealth);
    heroAttack = baseAttack * round;
    console.log("Hero attack power is now " + heroAttack);
}
function heroCounters() {
    $("#ftScn").text("You counter the attack.");
    villHealth = villHealth-heroCounter;
    console.log("Villain health is now " + villHealth);
    $("#villHealth").text(villHealth);
}
function villAttacks() {
    $("#ftScn").text("The villain returns your attack.");
    heroHealth = heroHealth-villCounter;
    console.log("Hero health is now " + heroHealth);
    $("#heroHealth").text(heroHealth);
}
function outcome() {
    $("#fightDiv").css("display", "none");
    if(!won && lost) {
        $("#nextRnd").css("display", "none");
        $("#game").text("Game Over");
        $("#resultText").text("The villains have won.");
        console.log("Game was lost");
    }
    else if (won && !lost) {
        wins++;
        if(wins < 4) {
            $("#game").text("Round Won");
            $("#nextRnd").css("display", "block");
            $("#resultText").text("You defeated the villain!");
        }
        else if(wins === 4) {
            $("#game").text("Game Over");
            $("#resultText").text("You saved everyone's happy endings!");
        }
        console.log("Game was won"); 
    }
    $("#resultsDiv").css("display", "block");
}
function ftSequence() {
    console.log("Inside ftSequence function.");
    $("#ftBtn").attr("disabled", "disabled");
    round++;
    console.log("Hero attacks");
    heroAttacks();
    if(villHealth > 0 ) {
        console.log("Villain survived the attack.");
        setTimeout(function() {
            console.log("Villain attacked.");
            villAttacks();
            if(heroHealth > 0) {
                console.log("Hero survived the attack.");
                setTimeout(function() {
                    console.log("The hero counters the attack.");
                    heroCounters();
                    if(villHealth <= 0) {
                        console.log("The villain was defeated.");
                        $("#ftBtn").removeAttr("disabled");
                        $("#villHealth").text("0");
                        won = true;
                        outcome();
                        if (wins === 4) {
                            return;
                        }
                    }
                    else {
                        console.log("The villain survived the attack.");
                        $("#ftBtn").removeAttr("disabled");
                        return;
                    }
                }, 1000);
            }
            else {
                console.log("The hero was defeated.");
                $("#ftBtn").removeAttr("disabled");
                $("#heroHealth").text("0");
                lost = true;
                outcome();
                return;
            }
        }, 1000);
    }
    else {
        console.log("The villain was defeated.");
        $("#ftBtn").removeAttr("disabled");
        $("#villHealth").text("0");
        won = true;
        outcome();
        return;
    }
}
function resetRound() {
    villPicked = false;
    lost = false;
    won = false;
    $("#currentEnemy").empty();
    $(".healthText").css("display", "none");
    $("#resultsDiv").css("display", "none");
    $("#villainsCards").removeAttr("style");
    $("#villainCards").css("display", "");
    $("#reset").removeAttr("disabled");
    $("#nextRnd").removeAttr("disabled");
    $("#ftScn").text("");
    $("#villText").text("Who will you battle?");
}