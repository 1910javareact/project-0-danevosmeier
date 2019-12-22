import express from 'express'
import { authorization } from '../middleware.ts/auth-middleware'
import * as userServices from '../services/user-services'


export const userRouter = express.Router()


userRouter.get('',  [authorization([2])], 
async (req,res) =>{
    try {
    let users = await userServices.getUsers()       
        res.json(users)
    } catch (e){
        res.sendStatus(500)
    }
})

//An example of not using arrow functions

// async function controllerGetUsers(req, res){
//     let users = await userServices.getUsers()
//     if(users){        
//         res.json(users)
//     }else{
//         res.sendStatus(500)
//     }

// }

// userRouter.get('',  [authorization([2]), controllerGetUsers])


userRouter.get('/:id', async (req,res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400).send('Invalid ID')
    }else{
        try{
            let user = await userServices.getUserById(id)
            res.json(user)
        }catch(e){
            console.log(e);
            
            res.status(e.status).send(e.message)
        }
        
    }
})


userRouter.patch('', [authorization([1])], async (req, res) => {
    try {
        const {body} = req;
        const update = await userServices.updateUser(body);
        res.status(200).json(update);
    }catch (e) {
        res.status(e.status).send(e.message);
    }
});




