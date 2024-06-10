"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diceLib = require("./dice");
const express = require('express');
const app = express();
const cors = require('cors');
const options = {
    origin: "http://localhost:3000"
};
app.use(cors(options));
app.use(express.json());
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
app.get("/", function (_1, res) {
    res.send("Roll a dice! execute POST /roll with your desired preferences to roll any dice you want up to D1000");
});
app.post("/roll", function (req, res) {
    var facesList = req.body;
    if (facesList.length == 0) {
        res.send(400, "You didnt roll any dice! for example, if you want to roll a d20, you must send [{'faces': 20}]");
        return;
    }
    else {
        var responseBody = {
            results: []
        };
        for (var i = 0; i < facesList.length; i++) {
            var diceResult = diceLib.rollTheDice(facesList[i], i + 1);
            responseBody.results.push(diceResult);
        }
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(responseBody);
    }
});
//# sourceMappingURL=index.js.map