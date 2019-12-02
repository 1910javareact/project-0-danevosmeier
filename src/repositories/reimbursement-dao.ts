import { Reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool, schema } from ".";
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from "../util/reimbursementdto-to-reimbursement";


export async function daoGetAllReimbursements():Promise<Reimbursement[]>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query(`select * from ${schema}.reimbursement`)

        if(result.rowCount === 0){
            throw 'No Reimbursements Exits'
        }
        else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    }
    catch(e){
        if(e == 'No Reimbursements Exits'){
            throw{
                status: 404,
                message: 'No Reimbursements Exits'
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


export async function daoReimbursementByStatusId(statusId:number):Promise<Reimbursement[]>{
    let client: PoolClient

    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM ${schema}.reimbursement WHERE status = $1 ORDER BY date_submitted DESC`,
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

export async function daoGetReimbursementByUserId(userId:number):Promise<Reimbursement[]>{
    let client:PoolClient
    
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM ${schema}.reimbursement WHERE author = $1 ORDER BY date_submitted DESC`,
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

export async function daoSaveOneReimbursement(r:Reimbursement):Promise<Reimbursement>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()

        let holder = await client.query(`INSERT INTO ${schema}.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, "type") values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
                            [r.reimbursementId, r.author, r.amount, r.dateSubmitted,r.dateResolved, r.description, r.resolver, r.status, r.type])

        let result = await client.query(`SELECT * FROM ${schema}.reimbursement WHERE reimbursement_id = $1`,
                                        [holder.rows[0].reimbursement_id])

        console.log(result.rows);
        

        return reimbursementDTOtoReimbursement(result.rows)
    }
    catch(e){
        console.log(e);
        
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

export async function daoUpdateReimbursement(update: Reimbursement):Promise<Reimbursement>{
    let client:PoolClient
    
    try{
        client = await connectionPool.connect()

        await client.query(`UPDATE ${schema}.reimbursement SET reimbursement_id = $1, author = $2, amount = $3, date_submitted = $4, date_resolved = $5, description = $6, resolver = $7, status = $8, type = $9 WHERE reimbursement_id = $10`,
                            [update.reimbursementId, update.author, update.amount, update.dateSubmitted, update.dateResolved, update.description, update.resolver, update.status, update.type, update.reimbursementId])
        
        let result = await client.query(`SELECT * FROM ${schema}.reimbursement WHERE reimbursement_id = $1`,
                                            [update.reimbursementId])
        
        console.log(result.rows);
        
        return reimbursementDTOtoReimbursement(result.rows)
        
        
    }
    catch(e){
        console.log(e);

        throw{
            status: 500,
            message: 'Internal Server Error'
        }
    }
    finally{
        client && client.release()
    }
}