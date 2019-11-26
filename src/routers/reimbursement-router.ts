import express from "express"
import * as rServices from "../services/reimbursement-services"
import { authorization } from "../middleware/auth-middleware"
import { Reimbursement } from "../models/reimbursement"

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', [authorization(['finance-manager'])], async (req, res) =>{
    
    let statusId = +req.params.statusId
    
    if(isNaN(statusId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let reimbursements = await rServices.getReimbursementByStatusId(statusId)
            res.status(200).json(reimbursements)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/author/userId/:userId', [authorization(['finance-manager', 'admin', 'user'])], async (req, res)=>{
    let userId = +req.params.userId
    if(isNaN(userId)){
        res.status(400).send('Invalid ID')
    }
    else if(req.seession.user.role.role === 'finance-manager'){
        try{
            let reimbursement = await rServices.getReimbursementByUserId(userId)
            res.status(200).json(reimbursement)
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
    else{
        try{
            let reimbursement = await rServices.getReimbursementByUserId(userId)
            if(req.seession.user.userId === reimbursement[0].author){
                res.status(200).json(reimbursement)
            }
            else{
                res.status(401).send('Unathorized')
            }
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.post('',[authorization(['finance-manager', 'admin', 'user'])], async (req, res) => {
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

reimbursementRouter.patch('', authorization(['finance-manager']), async (req, res)=>{
    try{
        let {body} = req
        
        let newReimbursement = new Reimbursement(0,0,0,0,0,'',0,0,0)

        newReimbursement.reimbursementId = body.reimbursementId

        newReimbursement.status = body.status
        
        let update = await rServices.updateReimbursement(newReimbursement)

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