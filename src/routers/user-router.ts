import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import * as userServices from '../services/user-services'

export const userRouter = express.Router()

userRouter.get('', [authorization(['finance-manager'])], async (req, res) =>{
    try{
        let allUsers = await userServices.getAllUsers()

        res.status(200).json(allUsers)
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})

userRouter.get('/:id', [authorization(['finance-manager', 'admin', 'user'])] ,async (req, res) =>{
    const id = +req.params.id
    if(isNaN(id)){
        res.status(400).send('Invalid ID')
    }
    else if(req.session.user.role.role === 'finance-manager'){
        try{
            let user = await userServices.getUserById(id)
            res.status(200).json(user)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
    else{
        try{
            let user = await userServices.getUserById(id)
            if(req.session.user.userId === user.userId){
                res.status(200).json(user)
            }
            else{
                res.status(404).send('Unable to find user')
            }
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', [authorization(['admin'])], async (req, res) =>{
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

