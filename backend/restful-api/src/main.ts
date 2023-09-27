import express, { Request, Response } from "express" 
import { checkWord } from './controllers/getWord'
import cors from 'cors' 
const app = express() 
app.use(express.json()) 
app.use(cors())

const PORT = 4000
app.get('/api/checkWord', checkWord)

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})


