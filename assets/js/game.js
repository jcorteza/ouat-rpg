var heroesArray = [];
var villainsArray = [];
/* heroe and villain objects */
var emma = {
    title: "Emma Swan, The Savior",
    quote: "I'm fighting for the people I love.",
    powers: "Light Magic, Lie Detection, Healing",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/emma-1.jpeg",
    type: "hero"
}
var henry = {
    title: "Henry Mills, The Truest Believer",
    quote: "You may not believe[...]but I believe in you.",
    powers: "Belief, Power of The Author, Knowledge of Stories",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/henry-3.jpg",
    type: "hero"
}
var snow = {
    title: "Mary Margaret Blanchard, Snow White",
    quote: "If people are supposed to be together, they find a way.",
    powers: "Leadership, Archery, Resourcefulness",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/snow.jpg",
    type: "hero"
}
var charming = {
    title: "David Nolan, Prince Charming",
    quote: "You never have to worry. I will always find you.",
    powers: "Swordsmanship, Fighting, Timing",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/charming.jpg",
    type: "hero"
}

heroesArray.push(emma, henry, snow, charming);

var rumple = {
    title: "Rumplestiltskin, The Dark One",
    quote: "	Evil isn't born dearie, it's made.",
    powers: "Immortality, Dark Magic, Cutting Deals",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/rumple.jpeg",
    type: "villain"
}
var regina = {
    title: "Regina Mills, The Evil Queen",
    quote: "I shall destroy your happiness, if it is the last thing I do.",
    powers: "Black Magic, Spell-casting, Mirror Magic",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/regina.jpg",
    type: "villain"
}
var malificent = {
    title: "Maleficent",
    quote: "But, 'beast' is so harsh. I prefer Maleficent.",
    powers: "Dragon Transformation, Sleeping Curse, Magical Staff",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/mal.jpg",
    type: "villain"
}
var hades = {
    title: "Hades, God of the Underworld",
    quote: "Do I look like I like to lose anything?",
    powers: "Immortality, Omniscience, Magic",
    healthPts: 0,
    attackPts: 0,
    counterPts: 0,
    profileImg: "./assets/images/hades.jpg",
    type: "villain"
}

villainsArray.push(rumple, regina, malificent, hades);
var characters = {heroes: heroesArray, villains: villainsArray};

var numArray = [];
var round = 1;
var heroHealth;
var heroAttack;
var heroCounter;
var villHealth;
var villCounter;
let lost = false;
let won = false;

/* function fills out character divs in html */
function displayChars(charSet) {
    console.log("Inside displayChars function.");
    for(i = 0; i < charSet.length; i++) {
        const charCard = $("<div>").attr("class", "charCard");
        $(charCard).attr("data-health", charSet[i].healthPts).attr("data-counter", charSet[i].counterPts);
        const charImg = $("<img src=\"" + charSet[i].profileImg + "\">").attr("alt", charSet[i].title + "show poster");
        const charTitle = $("<h2>").text(charSet[i].title);
        const charQuote = $("<p>").text("Quote: " + charSet[i].quote);
        const charPowers = $("<p>").text("Powers: " + charSet[i].powers);
        $(charImg).add(charTitle).add(charQuote).add(charPowers).appendTo(charCard);
        if(charSet[i].type === "hero") {
            $(charCard).appendTo("#heroCards");
            $(charCard).attr("data-attack", charSet[i].attackPts);
        }
        else if (charSet[i].type === "villain") {
            $(charCard).appendTo("#villainCards")
        }
    }
}
function randomNumber(x,y) {
    num = Math.floor(Math.random() * x + y);
    return num;
}
function setPts(x, y, array) {
    let num = 0;
    do {
        num = randomNumber(x, y);
    }while(array.includes(num)) 
    if(!array.includes(num)) {;
        array.push(num);
        return num;
    }
}
function assignPts(charSet) {
    for(i = 0; i < charSet.length; i++) {
        if(charSet[i].type === "hero") {
            /* generate random number */
            charSet[i].healthPts = setPts(100, 100, numArray);
            charSet[i].attackPts = setPts(20, 30, numArray);
            charSet[i].counterPts = setPts(10, 20, numArray);
        }
        else if(charSet[i].type === "villain") {
            charSet[i].healthPts = setPts(75, 75, numArray);
            charSet[i].counterPts = setPts(50, 50, numArray);
        }
    }
}

function updateDisplay() {
    const ht1 = $("#villainCards > .charCard").height();
    console.log($(ht1));
    $("#gameDiv").css("display", "flex");
    $("#fightDiv").css("display", "block");
    $("#villainCards").add("#heroCards").css("display", "block");
    $(".charsInnerDiv").css("width", "25%");
    $(".charsInnerDiv").css("margin-right", "4%");
    $("#villainCards").add("#heroCards").css("max-width", "100%");
    $(".healthText").css("display", "block");
}
function updateVillHealthh() {
    if(villHealth <= 0) {
        $("#ftScn").text("You won this round!");
        $("#ftScn").css("display", "block");
        villHealth = 0;
        $("#villHealth").text(villHealth);
        $("#ftBtn").off("click");
        $("#ftBtn").css("display", "none");
        won = true;
        console.log("Won is " + won);
        return;
    }
}
function updateHeroHealth() {
    if(heroHealth <= 0) {
        $("#ftScn").text("You lost!");
        $("#ftScn").css("display", "block");
        heroHealth = 0;
        $("#heroHealth").text(heroHealth);
        $("#ftBtn").off("click");
        $("#ftBtn").css("display", "none");
        lost = true;
        console.log("Lost is " + lost);
        return;
    }
}
$(document).ready(function() {
    let heroPicked = false;
    let villPicked = false;
    const heroesRef = characters.heroes;
    const villsRef = characters.villains;
    assignPts(heroesRef);
    assignPts(villsRef);
    displayChars(heroesRef);
    displayChars(villsRef);
    $("#heroCards").on("click", ".charCard", function() {
        const thisHero = $(this);
        $("#heroCards > .charCard").not($(this)).css("display", "none");
        $("#heroText").text("Your Hero");
        heroHealth = $(this).attr("data-health");
        heroAttack = $(this).attr("data-attack");
        heroCounter = $(this).attr("data-counter");
        $("#heroHealth").text(heroHealth);
        heroPicked = true;
        if(heroPicked && villPicked) {
            updateDisplay();
        }
    });
    $("#villainCards").on("click", ".charCard", function() {
        const thisVill = $(this);
        $("#villainCards > .charCard").not($(this)).css("display", "none");
        $("#villText").text("The Villain");
        villHealth = $(this).attr("data-health");
        villCounter = $(this).attr("data-counter");
        $("#villHealth").text(villHealth);
        villPicked = true;
        if(heroPicked && villPicked) {
           updateDisplay();           
        }
    });
    $("#ftBtn").on("click", function() {
        villHealth = villHealth-heroAttack;
        $("#villHealth").text(villHealth);
        updateVillHealthh();
        heroHealth = heroHealth-villCounter;
        $("#heroHealth").text(heroHealth);
        updateHeroHealth();
        villHealth = villHealth-heroCounter;
        $("#villHealth").text(villHealth);
        updateVillHealthh()
        round++;
        heroAttack = heroAttack * round;
        console.log("Won is " + won);
        console.log("Lost is " + lost);
        if (won && lost) {
            $("#ftScn").text("You both lost.");
            $("#reset").css("display", "block");
            console.log("Inside if lost and won both true fun.");
        }
        else if(lost) {
            $("#reset").css("display", "block");
            console.log("Inside if lost is true fun.");
        }
        else if (won) {
            $("#nextRnd").css("display", "block");
            console.log("Inside if won is true fun.");
        }
    });
    $("#nextRnd").on("click", function() {});
    $("#reset").on("click", function() {});
});