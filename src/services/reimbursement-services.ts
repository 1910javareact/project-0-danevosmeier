import * as daoR from "../repositories/reimbursement-dao"
import { Reimbursement } from "../models/reimbursement";

export async function getReimbursementByStatusId(id:number):Promise<Reimbursement[]>{
    try{
        return daoR.daoReimbursementByStatusId(id)
    }
    catch(e){
        throw e
    }
}

export async function getReimbursementByUserId(id:number):Promise<Reimbursement[]>{
    try{
        return daoR.daoGetReimbursementByUserId(id)
    }
    catch(e){
        throw e
    }
}

export async function saveOneReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
    try{
        return daoR.daoSaveOneReimbursement(reimbursement)
    }
    catch(e){
        throw e
    }
}

export async function updateReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
    try{
        return daoR.daoUpdateReimbursement(reimbursement)
     }
    catch(e){
        throw e
    }    
}