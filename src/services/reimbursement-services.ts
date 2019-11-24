import * as daoR from "../repositories/reimbursement-dao"
import { Reimbursement } from "../models/reimbursement";

export async function getReimbursementByStatusId(id:number){
    return daoR.daoReimbursementByStatusId(id)
}

export async function getReimbursementByUserId(id:number){
    return daoR.daoGetReimbursementByUserId(id)
}

export async function saveOneReimbursement(reimbursement:Reimbursement){
    return daoR.daoSaveOneReimbursement(reimbursement)
}

export async function updateReimbursement(reimbursement:Reimbursement){
    let updateReimbursement = daoR.daoReimbursementByStatusId(reimbursement.reimbursementId)

    for(let r in reimbursement){
        if(reimbursement[r] !== updateReimbursement(r)){
            updateReimbursement[r] = reimbursement[r]
        }
    }
    return daoR.daoUpdateReimbursement(updateReimbursement)
}