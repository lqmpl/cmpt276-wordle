import { createClient } from 'redis';

export async function getKey(key: string){
    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));
    
    await client.connect();

    const value = await client.get(key);

    return value; 
}
