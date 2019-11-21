import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { getAllUsers } from '../services/user-services'

export const userRouter = express.Router()


//fix to only allow finance managers access
function controllerGetUsers(req, res){
    let users = getAllUsers()
    if(users){
        res.json(users)
    }
    else{
        res.sendStatus(500)
    }
}

//fix to manager

userRouter.get(``, [authorization(['Admin']), controllerGetUsers])