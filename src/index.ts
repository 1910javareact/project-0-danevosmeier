import express from 'express'
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json())

app.listen(1985, ()=>{
    console.log(`app has started`);
    
})

