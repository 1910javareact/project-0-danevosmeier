import { ReimDTO } from '../dtos/reimdto';
import { Reim } from '../models/reim';

export function reimDTOtoReim(r: ReimDTO[]): Reim {
    return new Reim(r[0].reimbursementid, r[0].author, r[0].amount, r[0].datesubmitted, r[0].dateresolved, r[0].description, r[0].resolver, r[0].status, r[0].type);
}

export function multiReimDTOConvertor(r: ReimDTO[]): Reim[] {
    const result = [];
    for (const reimbursement of r) {
        result.push(reimDTOtoReim([reimbursement]));
    }
    return result;
}