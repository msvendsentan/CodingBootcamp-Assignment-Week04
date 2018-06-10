//create 4 objects for the 4 characters
//4 characters: Lone Ranger (gunner), (swordsman), Robin Hood (archer), Harry Potter (mage) 

//Declare objects

var gunner = {
    name:"Lone Ranger",
    healthPoints:140,
    attackPower:5,
    counterAttackPower:25,
};

var swordsman = {
    name:"Bilbo Baggins",
    healthPoints:140,
    attackPower:5,
    counterAttackPower:25,
};

var archer = {
    name:"Robin Hood",
    healthPoints:140,
    attackPower:5,
    counterAttackPower:25,
};

var mage = {
    name:"Harry Potter",
    healthPoints:140,
    attackPower:5,
    counterAttackPower:25,
};

var enemies = ["gunner", "swordsman", "archer", "mage"];
var currentEnemy = "";
var ourCharacter = "";
var ourCharacterIndex;

var combatActions = ["smacks", "thwacks", "punches", "kicks", "socks", "slaps", "elbows", "knees", "clocks"];
var combatTargets = ["face", "chest", "gonads", "eye", "stomach"];


var gameState = 0; 
var battleVictoryCounter = 0;

//0 = select your character
//1 = select your enemy
//2 = enemy selected, attack
//3 = victory/loss -> freeze the game

//code

$(document).ready(function() {

    //After having killed an enemy, this function allows the player to choose the next enemy and cleans up.
    function newEnemy() {
        gameState = 1;
        battleVictoryCounter++;
        $("#defeated_enemies").append($("#" + currentEnemy));
        $("#" + currentEnemy).children("p").addClass("defeated");

        //If time permits: swap out enemy picture with dead enemy picture

        $("#" + ourCharacter).children("img").removeClass("mirror");
        $("#character_window").children("h2").text("Selected Character");
        $("#versus").remove();
        $("#instructions_text").text("Great job! You've defeated " + eval(currentEnemy)["name"] + "! Click on an available enemy to start a new fight!");
    }

    //New game button, full reinitialization.
    function newGame() {
        gameState = 0;
        battleVictoryCounter = 0;
        enemies = ["gunner", "swordsman", "archer", "mage"];
        gunner["healthPoints"] = 140;
        swordsman["healthPoints"] = 140;
        archer["healthPoints"] = 140;
        mage["healthPoints"] = 140;
        gunner["attackPower"] = 5;
        swordsman["attackPower"] = 5;
        archer["attackPower"] = 5;
        mage["attackPower"] = 5;
        gunner["counterAttackPower"] = 25;
        swordsman["counterAttackPower"] = 25;
        archer["counterAttackPower"] = 25;
        mage["counterAttackPower"] = 25;

        $("#gunner").empty().html("<img src=\"./assets/images/gunner.jpg\">").prepend("<p class=\"name\">" + gunner["name"] + "</p>").append("<p class=\"health_points\">HP: " + gunner["healthPoints"] + "</p>");
        $("#swordsman").empty().html("<img src=\"./assets/images/swordsman.jpg\">").prepend("<p class=\"name\">" + swordsman["name"] + "</p>").append("<p class=\"health_points\">HP: " + swordsman["healthPoints"] + "</p>");
        $("#archer").empty().html("<img src=\"./assets/images/archer.jpg\">").prepend("<p class=\"name\">" + archer["name"] + "</p>").append("<p class=\"health_points\">HP: " + archer["healthPoints"] + "</p>");
        $("#mage").empty().html("<img src=\"./assets/images/mage.jpg\">").prepend("<p class=\"name\">" + mage["name"] + "</p>").append("<p class=\"health_points\">HP: " + mage["healthPoints"] + "</p>");
        $("#character_window").children("h2").text("Character Selection");
        $("#character_window").append($("#gunner")).append($("#swordsman")).append($("#archer")).append($("#mage"));
        $("#versus").remove();
        $("#log_text").empty();
        $("#instructions_text").text("Welcome to the Stickfigure Showdown! Choose a character to get started...");
    }


    $("#gunner").prepend("<p class=\"name\">" + gunner["name"] + "</p>").append("<p class=\"health_points\">HP: " + gunner["healthPoints"] + "</p>");
    $("#swordsman").prepend("<p class=\"name\">" + swordsman["name"] + "</p>").append("<p class=\"health_points\">HP: " + swordsman["healthPoints"] + "</p>");
    $("#archer").prepend("<p class=\"name\">" + archer["name"] + "</p>").append("<p class=\"health_points\">HP: " + archer["healthPoints"] + "</p>");
    $("#mage").prepend("<p class=\"name\">" + mage["name"] + "</p>").append("<p class=\"health_points\">HP: " + mage["healthPoints"] + "</p>");





    $(".character").on("click", function() {
        if (gameState == 0) {
            $("#character_window").children("h2").text("Selected Character");
            ourCharacter = this.id;
            $("#" + ourCharacter).addClass("us");
            ourCharacterIndex = enemies.indexOf(this.id);
            enemies.splice(ourCharacterIndex, 1);
            for (var i = 0; i < enemies.length; i++) {
                eval(enemies[i])["counterAttackPower"] = (i + 1) * 10
                $("#" + enemies[i]).addClass("enemies");
                $("#enemies_available").append($("#" + enemies[i]));
            }
            $("#instructions_text").text("Great! You've chosen " + eval(ourCharacter)["name"] + "! Click on an available enemy to start a fight! But be careful--some enemies are stronger than others.");
            gameState = 1;
                        
        } else if (gameState == 1 && $(this).parent().attr("id") == "enemies_available") {
            currentEnemy = this.id;
            $("#" + ourCharacter).children("img").addClass("mirror");
            $("#character_window").children("h2").text("Fight!");
            $("#character_window").append("<div id=\"versus\">VERSUS</div>").append($("#" + currentEnemy));
            $("#instructions_text").text("You've selected " + eval(currentEnemy)["name"] + " as your opponent. Click the attack button to duel it out!");
            gameState = 2;
        }


    });

    $("#attack_button").on("click", function() {
        if (gameState == 0) {
            $("#log_text").html("<p>Pick your character first!</p>");
        } else if (gameState == 1) {
            $("#log_text").html("<p>Pick someone to attack first!</p>");
        } else if (gameState == 2) {
            $("#log_text").html("<p>Your <span id=\"our_character\">" 
                + eval(ourCharacter)["name"] 
                + "</span> " 
                + combatActions[Math.floor(Math.random()*combatActions.length)] 
                + " the enemy <span id=\"enemy_character\">" 
                + eval(currentEnemy)["name"] 
                + "</span> in the " 
                + combatTargets[Math.floor(Math.random()*combatTargets.length)] 
                + " for <span id=\"our_damage\">" 
                + eval(ourCharacter)["attackPower"] 
                + " points of damage!</span></p>"
            );

            $("#log_text").append("<p><span id=\"enemy_character\">" 
                + eval(currentEnemy)["name"] 
                + "</span> fights back, and " 
                + combatActions[Math.floor(Math.random()*combatActions.length)] 
                + " <span id=\"our_character\"> " 
                + eval(ourCharacter)["name"] 
                + "</span> in the " 
                + combatTargets[Math.floor(Math.random()*combatTargets.length)] 
                + " for <span id=\"enemy_damage\">" 
                + eval(currentEnemy)["counterAttackPower"] 
                + " points of damage!</span></p>"
            );

            //we hit first
            eval(currentEnemy)["healthPoints"] = Math.max(eval(currentEnemy)["healthPoints"] - eval(ourCharacter)["attackPower"], 0);
            $("#" + currentEnemy).children(".health_points").html("HP: " + eval(currentEnemy)["healthPoints"]);

            if (eval(currentEnemy)["healthPoints"] == 0) {
                $("#log_text").append("<p class=\"battle_victory\">You've beaten " + eval(currentEnemy)["name"] + "!");
                newEnemy();
                if (battleVictoryCounter == 3) {
                    $("#log_text").append("<p class=\"game_victory\">You've won! Click \"New Game\" to start a new game!</p>");
                    $("#instructions_text").text("Way to go! You've won! Click \"New Game\" if you'd like to start a new game!");
                    gameState = 3;
                }
            } else {            
                eval(ourCharacter)["healthPoints"] = Math.max(eval(ourCharacter)["healthPoints"] - eval(currentEnemy)["counterAttackPower"], 0);
                $("#" + ourCharacter).children(".health_points").html("HP: " + eval(ourCharacter)["healthPoints"]);

            }

            if (eval(ourCharacter)["healthPoints"] == 0) {
                $("#" + ourCharacter).children("p").addClass("defeated");
                $("#log_text").append("<p class=\"game_defeat\">You've lost! Click \"New Game\" to start a new game!</p>");
                $("#instructions_text").text("You've lost--better luck next time! Remember: some enemies are weaker than others--trying finding out who they are! Click \"New Game\" if you'd like to start a new game!");
                gameState = 3;
            }

            eval(ourCharacter)["attackPower"] += 7;








        }
    });

    $("#newgame_button").on("click", newGame);



});

