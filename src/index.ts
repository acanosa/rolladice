import { DiceResult } from "./models/DiceResult";
import { RollDiceResponse } from "./response/RollDiceResponse";
const diceLib = require("./dice")
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3001;

const options = {
    origin: "http://localhost:3000"
}

app.use(cors(options))

app.use(express.json())

app.listen(PORT,  () => {
    console.log("Server running on port `PORT`")
})

//Using underscore in front of the param name to pass the unusedParam check
app.get("/", function(_req: any, res: any) {
    res.send("Roll a dice! execute POST /roll with your desired preferences to roll any dice you want up to D1000")
});

app.post("/roll", function(req: any, res: any) {
    var facesList = req.body
    if(facesList.length == 0) {
        res.send(400, "You didnt roll any dice! for example, if you want to roll a d20, you must send [{'faces': 20}]")
        return;
    } else {
        var responseBody: RollDiceResponse = {
            results: []
        }

        for (var i = 0; i < facesList.length; i++) {
            var diceResult: DiceResult = diceLib.rollTheDice(facesList[i], i + 1);
            responseBody.results.push(diceResult);
        }
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(responseBody );
    }
})