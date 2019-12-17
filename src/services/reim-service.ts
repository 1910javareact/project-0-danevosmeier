import * as reimbursementsDao from '../repositories/reim-dao';
import { Reim } from '../models/reim';

export function getAllReims(): Promise<Reim[]> {
    return reimbursementsDao.daoGetAllReims();
}

export function getReimbursementsByReimbursementId(reimbursementid){
    try {
        return reimbursementsDao.daoGetReimbursementsByReimbursementId(reimbursementid);
    } catch(e) {
        throw e;
    }
}
export function getReimbursementsByStatusId(status: number) {
    try {
        return reimbursementsDao.daoGetReimbursementsByStatusId(status);
    } catch (e) {
        throw e;
    }
}

export function getReimbursementsByUserId(userId: number) {
    try {
        return reimbursementsDao.daoGetReimbursementsByUserId(userId);
    } catch (e) {
        throw e;
    }

}

export function postReimbersement(post) {
    try {
        return reimbursementsDao.daoPostReimbersement(post);
    } catch (e) {
        throw e;
    }

}

export async function patchReimbersement(patch) {
    try {
        const post = await reimbursementsDao.daoGetReimbursementsByReimbursementId(patch.reimbursementId);
        for (const key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key];
            }
        }
        return await reimbursementsDao.daoUpdateReimbursement(post);
    } catch (e) {
        throw e;
    }
}
