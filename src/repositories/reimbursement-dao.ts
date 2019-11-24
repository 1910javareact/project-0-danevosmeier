import { Reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from "../util/reimbursementdto-to-reimbursement";



export async function daoReimbursementByStatusId(statusId:number){
    let client: PoolClient

    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE status_id = $1 ORDER BY date_submitted DESC',
                                [statusId])
        if(result.rowCount === 0){
            throw `Reimbursement does not exist`
        }
        else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e === `Reimbursement does not exist`){
            throw{
                status: 404,
                message: `Reimbursement does not exist`
            }
        }
        else{
            throw{
                status: 500,
                message: `Internal Server Error`
            }
        }
    }
    finally{
        client && client.release()
    }
}

export async function daoGetReimbursementByUserId(userId:number){
    let client:PoolClient
    
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE author = $1 ORDER BY date_submitted DESC',
                                    [userId])
        if(result.rowCount === 0){
            throw `No Reimbursement Found`
        }
        else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e === `No Reimbursement Found`){
            throw{
                status: 404,
                message: `No Reimbursement Found`
            }
        }
        else{
            throw{
                status: 500,
                message: `Internal Server Error`
            }
        }
    }
    finally{
        client && client.release()
    }
}

export async function daoSaveOneReimbursement(r){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        client.query(`BEGIN`)
        await client.query('INSERT INTO project_0.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) values ($1,$2,now(),$3,$4,null,1,$5)',
                            [r.author, r.amount, '0001/01/01', r.description, r.type])

        let result = await client.query('SELECT * FROM project_0.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
                                        [r.author])
        client.query('COMMIT')

        return reimbursementDTOtoReimbursement(result.rows)
    }
    catch(e){
        client.query('ROLLBACK')
        throw{
            status: 500,
            message: 'Internal Server Error'
        }
    }
    finally{
        client && client.release()
    }
}

export async function daoGetReimbursementByReimbursementId(reimbursement_id:number){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement WHERE reimbursement_id = $1',
                                    [reimbursement_id])
        if(result.rowCount === 0){
            throw `Reimbursement not found`
        }
        else{
            return reimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e === 'Reimbursement not found'){
            throw{
                status: 404,
                message: 'Reimbursement not found'
            }
        }
        else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }
    finally{
        client && client.release()
    }
}

export async function daoUpdateReimbursement(update: Reimbursement){
    let client:PoolClient
    
    try{
        client = await connectionPool.connect()
        let result = await client.query('UPDATE project_0.reimbursement SET date_resolved = now(), resolver = $1, status_id = $2 WHERE reimbursement_id = $3',
                            [update.resolver, update.status, update.reimbursementId])
        if(result.rows !== 0){
            return await daoGetReimbursementByReimbursementId(update.reimbursementId)
        }
        else{
            throw 'Reimbursement not found'
        }
    }
    catch(e){
        if(e === 'Reimbursement not found'){
            throw{
                status: 404,
                message: 'Reimbursement not found'
            }
        }
        else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }
    finally{
        client && client.release()
    }
}