import {Request, Response} from 'express' 
import { getKey } from '../models/model' 


export async function getWord(req: Request, res: Response){
    const ret = await getKey('ALTOS')
    if (ret){
        console.log("Word is in dictionary")
    }

    res.json({message: "Hello world"});
}