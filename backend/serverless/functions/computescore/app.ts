import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MongoClient, ServerApiVersion } from "mongodb";
import { VALID_GUESSES } from "./validGuesses"

const uri = process.env.mongo_uri as string;  

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

interface BodyInterface {
    word: string
}

interface sessionInterface {
    _id: string
    login_time: Date, 
    username: string,
}

interface statsInterface {
    _id: string,
    classic_wins: number,
    timed_wins: number,
    words_guessed: number,
}

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let answer = ''; 
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const database = client.db("wordle-cmpt276"); 


        if (event.body === null) throw new Error('event null'); 
        const body: BodyInterface = JSON.parse(event.body);
        if (!body.word) throw new Error('bad body');   

        let length = VALID_GUESSES.length; 
        answer = VALID_GUESSES[Math.floor(Math.random() * length) + 1]

        const metadata = database.collection<{_id: string, globalWord: string}>("metadata");
        const root = await metadata.findOne({_id: "root"});
        
        if (!root) throw new Error("could not retrieve answer"); 

        const word: string = body.word.toUpperCase(); 
        const optionsArray: number[] = computeScore(root.globalWord, word); 

        let win = true;
        for (let i = 0; i < optionsArray.length; i++) {
            if (optionsArray[i] !== 2) {
                win = false;
            }
        }

        if (event.headers && event.headers.Cookie){
            const userSessionsCollection = database.collection<sessionInterface>("userSessions");

            let CookieSubstrings = event.headers.Cookie.split('='); 
            console.log(CookieSubstrings); 

            if (CookieSubstrings[0] === 'SESSION_ID'){ 
                let id = CookieSubstrings[1]; 

                const userSessionDocument = await userSessionsCollection.findOne({_id: id})            
                if (userSessionDocument){
                    let username = userSessionDocument.username;
                    
                    const userStatsCollection = database.collection<statsInterface>("userStats"); 
                    const userStatsDocument = await userStatsCollection.findOne({_id: username});

                    if (userStatsDocument){

                        let newWordsGuessed = userStatsDocument.words_guessed + 1; 

                        userStatsCollection.updateOne({_id: username}, {$set: {words_guessed: newWordsGuessed}})
                    }
                }
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "found word",
                value: optionsArray,
                found: true,
                optionsArray: optionsArray,
                win: win, 
                answer: answer
            }),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://cmpt276-wordle.vercel.app",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "text/plain" 
            },
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message,
                value: -1,
                found: false,
                optionsArray: [], 
                win: false, 
                answer: answer
            }),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://cmpt276-wordle.vercel.app",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "text/plain" 
            },
        };
    } 
}

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