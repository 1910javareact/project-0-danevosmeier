import express from 'express'
import bodyparser from 'body-parser'
import { userRouter } from './routers/user-router'
import { getUserByUsernameAndPassword } from './services/user-services'
import { sessionMiddleware } from './middleware.ts/session-middleware'
import { reimbursementsRouter } from './routers/reimbursement-router'
import { corsFilter } from './middleware.ts/cors-middleware'


const app = express()  //this line builds the application from express


app.use(bodyparser.json())
app.use(sessionMiddleware)
app.use(corsFilter)

app.use('/users', userRouter)
app.use('/reimbursement', reimbursementsRouter)


//login
app.post('/login', async (req,res)=>{
    let {username, password} = req.body;
    if(!username || !password ){
        res.status(400).send('Invalid credentials')
    } else{

    try{
        let user = await getUserByUsernameAndPassword(username, password)
        req.session.user = user
        res.json(user)//its standard to send the logged in user info after the log in
    }catch(e){
        res.status(e.status).send(e.message)
    }
    }
})


//now we need to make the server actually run
//this means the server has to be listening for requests
app.listen(1910, ()=>{
    console.log('app has started');   
})


