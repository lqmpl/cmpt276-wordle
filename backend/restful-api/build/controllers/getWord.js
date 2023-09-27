"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWord = exports.computeScore = void 0;
const redisModel_1 = require("../models/redisModel");
// Returns a array of lengh 5 that determines if characters exist and if they
// are in the correct position
// Example [2, 1, 1, 0, 0]
//          ^
//          character 1 exists and is in the correct place
//         [2, 1, 1, 0, 0]
//                ^
//                character 3 exists but is not in the correct place
function computeScore(targetWord, guessWord) {
    let dict = {};
    let optionsArr = [];
    for (let i = 0; i < 5; i++) {
        if (dict[targetWord[i]]) {
            let currentArr = dict[targetWord[i]];
            dict[targetWord[i]] = [...currentArr, i];
        }
        else {
            dict[targetWord[i]] = [i];
        }
    }
    for (let i = 0; i < 5; i++) {
        let guessLetterArr = dict[guessWord[i]];
        if (guessLetterArr) {
            let green = false;
            let yellow = false;
            for (let j = 0; j < guessLetterArr.length; j++) {
                if (i === guessLetterArr[j]) {
                    green = true;
                }
                else {
                    yellow = true;
                }
            }
            if (green) {
                optionsArr = [...optionsArr, 2];
            }
            else if (yellow) {
                optionsArr = [...optionsArr, 1];
            }
        }
        else {
            optionsArr = [...optionsArr, 0];
        }
    }
    return optionsArr;
}
exports.computeScore = computeScore;
function checkWord(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let queryParam = (_a = req.query) === null || _a === void 0 ? void 0 : _a.word;
        queryParam = queryParam.toUpperCase();
        try {
            const value = yield (0, redisModel_1.getKey)(queryParam);
            if (value !== null) {
                const optionsArray = computeScore('ANIME', queryParam);
                let win = true;
                for (let i = 0; i < optionsArray.length; i++) {
                    if (optionsArray[i] !== 2) {
                        win = false;
                    }
                }
                res.json({
                    message: "found word",
                    value: value,
                    found: true,
                    optionsArray: optionsArray,
                    win: win
                });
            }
            else {
                res.json({
                    message: "word not found",
                    value: -1,
                    found: false,
                    optionsArray: [],
                    win: false
                });
            }
        }
        catch (error) {
            res.json({
                message: "Something wrong happened...",
                value: -1,
                found: false,
                optionsArray: [],
                win: false
            });
        }
    });
}
exports.checkWord = checkWord;
