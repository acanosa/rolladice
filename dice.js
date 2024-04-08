function rollTheDice(dice, number) {
    var diceResult = {};
    var modifier = dice.modifier !== undefined ? dice.modifier : 0;
    var validationResults = validateDice(dice);
    if(!validationResults.passed) {
        diceResult.name = "Invalid dice";
        diceResult.result = validationResults.message;
    } else {
        diceResult.name = dice.name ? dice.name : buildName(dice.faces, number, modifier);
        if(dice.times !== undefined) {
            diceResult.result = [];
            for(var i = 0; i < dice.times; i++) {
                diceResult.result.push(roll(dice.faces, modifier));        
            }
        } else  {
            diceResult.result = roll(dice.faces, modifier);
        }
    }
    
    return diceResult;
}

function roll(faces, modifier) {
    return Math.floor(Math.random() * (faces)) + 1 + modifier;
}

function buildName(diceFaces, diceNumber, modifier) {
    var name = "Dice " + diceNumber + " [D" + diceFaces;
    if(modifier !== undefined && modifier != 0) {
        name += "+" + modifier;
    }
    name += "]";
    return name;
}

function validateDice(dice) {
    var validationResults = { "passed": false, "message": ""};
    console.log(dice);
    if(!dice.faces) {
        validationResults.message = "Dice faces not specified";
    }

    if(typeof dice.faces !== "number") {
        validationResults.message = "Dice faces are not a number";
    }

    if(dice.faces <= 0) {
        validationResults.message = "Dice faces cannot be 0 or lower";
    }

    if(dice.faces > 1000) {
        validationResults.message = "Cannot roll a dice with more than 1000 faces";
    }

    if(dice.times > 10) {
        validationResults.message = "Cannot roll the same dice more than 10 times";
    }

    if(validationResults.message == "") {
        validationResults.passed = true;
    }
    return validationResults;
}

module.exports = {rollTheDice};