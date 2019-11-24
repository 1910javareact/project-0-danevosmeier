import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import * as userServices from '../services/user-services'

export const userRouter = express.Router()


//fix to only allow finance managers access
async function controllerGetUsers(req, res){
    let users = userServices.getAllUsers()
    if(users){
        res.json(users)
    }
    else{
        res.sendStatus(500)
    }
}

userRouter.get(``, [authorization([1]), controllerGetUsers])

userRouter.get('/:id', [authorization[1]] ,async (req, res) =>{
    const id = +req.params.id
    if(isNaN(id)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let user = userServices.getUserById(id)
            if(user){
                res.json(user)
            }
            else{
                res.status.send('Unable to find user')
            }
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', [authorization([2])], async (req, res) =>{
    try{
        let {body} = req
        let user = userServices.updateUser(body)
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(400).send('Unable to find user')
        }
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})

