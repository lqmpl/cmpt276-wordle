import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MongoClient, ServerApiVersion } from "mongodb";
import { nanoid } from 'nanoid';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const uri = process.env.mongo_uri as string;  

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

interface accountInterface {
    _id: string,
    password: string
}

interface sessionInterface {
    _id: string
    login_time: Date, 
    username: string,
}

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const database = client.db("wordle-cmpt276");
        const userAccountsCollection = database.collection<accountInterface>("userAccounts");

        if (event.body === null) throw new Error('event null'); 
        const bodyData: accountInterface = JSON.parse(event.body); 
        if (!bodyData._id || !bodyData.password) throw new Error('bad body');   

        const username: string = bodyData._id;
        const password: string = bodyData.password; 
        const filter = {_id: username, password: password};
        const document: accountInterface | null = await userAccountsCollection.findOne(filter); 

        if (document) { 
            const userSessionsCollection = database.collection<sessionInterface>("userSessions");

            let id = nanoid(); 
                                        
            await userSessionsCollection.insertOne({
                _id: id, 
                login_time: new Date(),
                username: username 
            }); 
            
            return {
                statusCode: 200,
                body: JSON.stringify({message: 'logged in'}),
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://cmpt276-wordle.vercel.app",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    "Access-Control-Allow-Credentials": "true",
                    "Set-Cookie": `SESSION_ID=${id}; SameSite=None; Secure; Max-Age=3600; Path=/`, 
                    "Content-Type": "text/plain" 
                },
            }
        }
        else{
            throw new Error('username or password not found');
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `${err.message}`,
            }),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://cmpt276-wordle.vercel.app",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "text/plain" 
            },
        };
    } finally {
        client.close();
    }
};
