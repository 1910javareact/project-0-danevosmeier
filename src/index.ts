import express from 'express'
import bodyParser from 'body-parser';
import { getUserByUsernameAndPassword } from './services/user-services';
import { userRouter } from './routers/user-router';
import {sessionMiddleware} from './middleware/session-middleware'

const app = express()

app.use(bodyParser.json())

app.use(sessionMiddleware)

app.post(`/login`, (req, res)=>{
    let {username, password} = req.body

    if(!username || !password){
        res.status(400).send(`Invalid Credentials`)
    }

    try{
        let user = getUserByUsernameAndPassword(username, password)
        req.session.user = user
        res.json(user)
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})

app.use(`/users`, userRouter)



app.listen(1985, ()=>{
    console.log(`app has started`);
    
})

