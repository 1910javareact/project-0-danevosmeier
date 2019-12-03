import express from "express"
import * as rServices from "../services/reimbursement-services"
import { authorization } from "../middleware/auth-middleware"
import { Reimbursement } from "../models/reimbursement"

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', [authorization(['FINANCE MANAGER'])], async (req, res) =>{
    
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
            console.log(e);
            
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/author/userId/:userId', [authorization(['FINANCE MANAGER', 'ADMIN', 'USER'])], async (req, res)=>{
    let userId = +req.params.userId
    if(isNaN(userId)){
        res.status(400).send('Invalid ID')
    }
    else if(req.session.user.role.role === 'FINANCE MANAGER'){
        try{
            let reimbursement = await rServices.getReimbursementByUserId(userId)
            res.status(200).json(reimbursement)
        }
        catch(e){
            console.log(e);
            
            res.status(e.status).send(e.message)
        }
    }
    else{
        try{
            let reimbursement = await rServices.getReimbursementByUserId(userId)
            if(req.session.user.userId === reimbursement[0].author){
                res.status(200).json(reimbursement)
            }
            else{
                res.status(401).send('Unathorized')
            }
        }
        catch(e){
            console.log(e);
            
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.post('',[authorization(['FINANCE MANAGER', 'ADMIN', 'USER'])], async (req, res) => {
    let {body} = req

    let newReimbursement = new Reimbursement(0,0,0,0,0,'',0,0,0)
        try{    
            for(let key in newReimbursement){
                console.log(key);
                
                if(body[key] === undefined){
                    console.log(body[key]);
                    

                    res.status(400).send('All fields are required for a reimbursement')
                    break
                }
                else{
                    newReimbursement[key] = body[key]
                }
            }

            let update = await rServices.saveOneReimbursement(newReimbursement)

            if(update){
                res.status(201).send('update')
            }
            else{
                res.status(404).send('Reimbursement does not exist')
            }
        }
        catch(e){
            res.status(e.status).send(e.message)
        }
    
})

reimbursementRouter.patch('', authorization(['FINANCE MANAGER']), async (req, res)=>{
    try{
        let {body} = req
        
        let update = await rServices.updateReimbursement(body)

        res.status(200).json(update)
    }
    catch(e){
        console.log(e);
        
        res.status(e.status).send(e.message)
    }
})

reimbursementRouter.get('', authorization(['FINANCE MANAGER']), async (req, res) =>{
    try{
        let allReimbursements = await rServices.getAllReimbursements()

        res.status(200).json(allReimbursements)
    }
    catch(e){
        console.log(e);
        
        res.status(e.status).send(e.message)
    }
})