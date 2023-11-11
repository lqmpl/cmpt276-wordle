import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

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

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const queryParams = event.queryStringParameters;

    try {
        if (queryParams) {
            // Access individual query parameters
            let word = queryParams.word;

            if (word) {
                word = word.toUpperCase();

                const optionsArray: number[] = computeScore('ANIME', word);

                let win = true;
                for (let i = 0; i < optionsArray.length; i++) {
                    if (optionsArray[i] !== 2) {
                        win = false;
                    }
                }

                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: "found word",
                        value: optionsArray,
                        found: true,
                        optionsArray: optionsArray,
                        win: win
                    }),
                    headers: {
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                };
            }
            else {
                throw Error('broken url')
            }
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "word not found",
                value: -1,
                found: false,
                optionsArray: [], 
                win: false
            }),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        };
    }
};
