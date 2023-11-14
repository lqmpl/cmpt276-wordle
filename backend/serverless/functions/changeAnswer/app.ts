import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Collection, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.mongo_uri as string;  

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

interface sessionInterface {
    _id: string
    login_time: Date, 
    username: string,
}

interface metadataInterface {
    _id: string,
    globalWord: string
}


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        if (!(event.headers && event.headers.Cookie)) throw new Error("no user auth"); 

        if (event.headers.Cookie.split('=')[0] !== 'SESSION_ID') throw new Error('wrong cookie'); 
        
        const SESSION_ID = event.headers.Cookie.split('=')[1];

        const database = client.db("wordle-cmpt276");
        const sessionCollection = database.collection<sessionInterface>('userSessions'); 
        const sessionDocument = await sessionCollection.findOne({_id: SESSION_ID, username: "admin"});

        if (!sessionDocument) throw new Error("user not authorized");

        const metadataCollection: Collection<metadataInterface> = database.collection("metadata");
        const metadata = await metadataCollection.findOne({_id: "root"}); 

        if (!(event.body)) throw new Error("no body");
        let body: {globalWord: string} = JSON.parse(event.body);
        if (!body.globalWord) throw new Error("bad body"); 

        await metadataCollection.updateOne({_id: "root"}, {$set: {globalWord: body.globalWord.toUpperCase()}});

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'success'}),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://cmpt276-wordle.vercel.app",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "text/plain" 
            },
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'failed',
                errMessage: error.message
            }),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://cmpt276-wordle.vercel.app",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "text/plain" 
            },
        }
    }
}