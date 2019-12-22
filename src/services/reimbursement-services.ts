import * as reimbursementsDao from "../repositories/reimbursement-dao";



export function getReimbursementsByStatusId(statusId: number) {
    try {
        return reimbursementsDao.daoGetReimbursementsByStatusId(statusId)
    } catch (e) {
        throw e
    }
}


export function getReimbursementsByUserId(userId: number) {
    try {
        return reimbursementsDao.daoGetReimbursementsByUserId(userId)
    } catch (e) {
        throw e
    }

}


export function postReimbursement(post) {
    try {
        return reimbursementsDao.daoPostReimbersement(post)
    } catch (e) {
        throw e
    }

}


export async function patchReimbursement(patch) {
    try {
        let post = await reimbursementsDao.daoGetReimbursementsByReimbursementId(patch.reimbursementId)
        for (let key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key]
            }
        }
        return await reimbursementsDao.daoUpdateReimbursement(post)
    } catch (e) {
        throw e
    }

}