import { Request, Response, query } from 'express'
import { getKey } from '../models/redisModel'

// Returns a array of lengh 5 that determines if characters exist and if they
// are in the correct position

// Example [2, 1, 1, 0, 0]
//          ^
//          character 1 exists and is in the correct place

//         [2, 1, 1, 0, 0]
//                ^
//                character 3 exists but is not in the correct place
export function computeScore(targetWord: string, guessWord: string) {
    let dict: { [key: string]: number[] } = {}
    let optionsArr: number[] = []

    for (let i = 0; i < 5; i++) {
        if (dict[targetWord[i]]) {
            let currentArr = dict[targetWord[i]]
            dict[targetWord[i]] = [...currentArr, i]
        }
        else {
            dict[targetWord[i]] = [i]
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
                optionsArr = [...optionsArr, 2]
            }
            else if (yellow) {
                optionsArr = [...optionsArr, 1]
            }
        }
        else {
            optionsArr = [...optionsArr, 0]
        }
    }
    return optionsArr; 
}

export async function checkWord(req: Request, res: Response) {
    let queryParam = req.query?.word as string;
    queryParam = queryParam.toUpperCase();

    try {
        const value = await getKey(queryParam);
        if (value !== null) {

            const optionsArray: number[] = computeScore('ANIME', queryParam);

            let win = true;
            for (let i = 0; i<optionsArray.length; i++){
                if (optionsArray[i] !== 2){
                    win = false; 
                }
            }

            res.json(
                {
                    message: "found word",
                    value: value,
                    found: true,
                    optionsArray: optionsArray, 
                    win: win
                }
            );
        }
        else {
            res.json(
                {
                    message: "word not found",
                    value: -1,
                    found: false,
                    optionsArray: [], 
                    win: false
                }
            );
        }
    } catch (error) {
        res.json({ 
            message: "Something wrong happened...",
            value: -1,
            found: false,
            optionsArray: [], 
            win: false
        });
    }
}