import { ReimbursementDTO } from "../dto-models/reimbursement";
import { Reimbursement } from "../models/reimbursement";


export function reimbursementDTOtoReimbursement(r: ReimbursementDTO[]):Reimbursement{
    return new Reimbursement(
        r[0].reimbursement_id,
        r[0].author,
        r[0].amount,
        r[0].date_submitted,
        r[0].date_resolved,
        r[0].description,
        r[0].resolver,
        r[0].status,
        r[0].type
    )
}

export function multiReimbursementDTOtoReimbursement(rD: ReimbursementDTO[]):Reimbursement[]{
    let currentR: ReimbursementDTO[] = []
    let result: Reimbursement[] = []
    for(let r of rD){
        if(currentR.length ===  0){
            currentR.push(r)
        }
        else if(currentR[0].reimbursement_id === r.reimbursement_id){
            currentR.push(r)
        }
        else{
            result.push(reimbursementDTOtoReimbursement(currentR))
            currentR = []
            currentR.push(r)
        }
    }
    result.push(reimbursementDTOtoReimbursement(currentR))
    return result
}