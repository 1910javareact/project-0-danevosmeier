import express from "express"
import * as rServices from "../services/reimbursement-services"
import { authorization } from "../middleware/auth-middleware"
import { Reimbursement } from "../models/reimbursement"

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

reimbursementRouter.post('', async (req, res) => {
    let {body} = req
    let newReimbursement = new Reimbursement(0,0,0,0,0,'',0,0,0)
    for(let key in newReimbursement){
        if(body[key] === undefined){
            res.status(400).send('All fields are required for a reimbursement')
            break
        }
        else{
            newReimbursement[key] = body[key]
        }
    }
    if(rServices.saveOneReimbursement(newReimbursement)){
        res.sendStatus(201)
    }
    else{
        res.status(404).send('Reimbursement does not exist')
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