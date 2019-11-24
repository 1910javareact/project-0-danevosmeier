import express from "express"
import * as rServices from "../services/reimbursement-services"
import { authorization } from "../middleware/auth-middleware"

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', authorization([1]), async (req, res) =>{
    let statusId = +req.params.statusId
    if(isNaN(statusId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let reimbursements = await rServices.getReimbursementByStatusId(statusId)
            res.json(reimbursements)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/author/userId/:userId', authorization([1]), async (req, res)=>{
    let userId = +req.params.userId
    if(isNaN(userId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let reimbursements = await rServices.getReimbursementByUserId(userId)
            res.json(reimbursements)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.post('', authorization([1,2,3]), async (req, res){
    let {body} = req
    let singleReimbursement = {
        author: req.session.user.userId,
        amount: body.amount,
        description: body.description,
        type: body.type
    }
    for(let key in singleReimbursement){
        if(!singleReimbursement[key]){
            res.status(400).send('Please include all fields')
        }
    }
    try{
        let newReimbursement = await rServices.updateReimbursement(singleReimbursement)
        res.status(201).json(newReimbursement)
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})

reimbursementRouter.patch('', authorization([1]), async (req, res)=>{
    try{
        let {body} = req
        
        let update = rServices.updateReimbursement(body)

        if(update){
            res.status(200).json(update)
        }
        else{
            res.status(404).send(`Not found`)
        }
    }
    catch(e){
        res.status(e.status).send(e.message)
    }
})