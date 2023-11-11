import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.mongo_uri as string;  

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

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
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        let SESSION_ID; 

        if (event.headers && event.headers.Cookie){
            let arr = event.headers.Cookie.split('=');
            if (arr.length !== 2 || arr[0] !== 'SESSION_ID') throw new Error('bad auth');  

            SESSION_ID = arr[1]; 

            const database = client.db("wordle-cmpt276");
            const userSessionsCollection = database.collection<sessionInterface>("userSessions");
            const document = await userSessionsCollection.findOne({_id: SESSION_ID});
            const username = document?.username; 

            if (!username) throw new Error("no username"); 

            const userStatsCollection = database.collection<statsInterface>("userStats"); 
            const userStats = await userStatsCollection.findOne({ _id: username }); 

            if (!userStats) throw new Error("no user stats");

            return {
                statusCode: 200,
                body: JSON.stringify({
                    _id: username,
                    classic_wins: userStats.classic_wins,
                    timed_wins: userStats.timed_wins,
                    words_guessed: userStats.words_guessed 
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
        else{
            throw new Error("No Session ID"); 
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message,
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
    finally {
        await client.close(); 
    }
};
