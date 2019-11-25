import * as daoR from "../repositories/reimbursement-dao"
import { Reimbursement } from "../models/reimbursement";

export async function getReimbursementByStatusId(id:number){
    try{
        return daoR.daoReimbursementByStatusId(id)
    }
    catch(e){
        throw e
    }
}

export async function getReimbursementByUserId(id:number){
    try{
        return daoR.daoGetReimbursementByUserId(id)
    }
    catch(e){
        throw e
    }
}

export async function saveOneReimbursement(reimbursement:Reimbursement){
    try{
        return daoR.daoSaveOneReimbursement(reimbursement)
    }
    catch(e){
        throw e
    }
}

export async function updateReimbursement(reimbursement:Reimbursement):Promise<Reimbursement[]>{
    try{
        let updatedReimbursement = daoR.daoReimbursementByStatusId(reimbursement.reimbursementId)

        for(let key in reimbursement){
            if(reimbursement[key] !== updatedReimbursement.hasOwnProperty[key]){
                updatedReimbursement[key] = reimbursement[key]
            }
        }
        return daoR.daoUpdateReimbursement(updatedReimbursement)
    }
    catch(e){
        throw e
    }    
}