import express, { Request, Response } from "express" 
import { getWord } from './controllers/getWord'
const app = express() 
app.use(express.json()) 

const PORT = 3000
app.get('/api/getWord', getWord)

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})