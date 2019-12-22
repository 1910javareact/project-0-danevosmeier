import { Reimbursement } from "../models/reimbursement";
import { connectionPool } from ".";
import { multipleReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from "../util/reimbursementDTO-to-reimbursement";
import { PoolClient } from "pg";


//here we are accessing the reimbursements with a given status Id
export async function daoGetReimbursementsByStatusId(statusId: number):Promise<Reimbursement[]>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0.reimbursement NATURAL JOIN project0.reimbursement_status NATURAL JOIN project0.reimbursement_type WHERE status_id = $1 ORDER BY date_submitted DESC',
                                        [statusId])
        //console.log(result.rows);
        
        if(result.rowCount === 0){
            throw 'No Reimbursements By That Status'
        }else{
            return multipleReimbursementDTOtoReimbursement(result.rows)
        }
    } catch (e) {
        if(e === 'No Reimbursements By That Status'){
            throw {
                status: 404,
                message: 'No Reimbursements By That Status'
            }
        }else{
            throw{
                status:500,
                Message: 'Internal Server Error'
            }
        }
        
    } finally {
        client && client.release()
    }
}

//finding reimbursements by userId, then return an array
export async function daoGetReimbursementsByUserId(userId: number):Promise<Reimbursement[]>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0.reimbursement NATURAL JOIN project0.reimbursement_status NATURAL JOIN project0.reimbursement_type WHERE author = $1 ORDER BY date_submitted DESC',
        [userId])
        if(result.rowCount === 0){
            throw 'No Reimbursements By That User'
        }else{
            return multipleReimbursementDTOtoReimbursement(result.rows)
        }
    } catch (e) {
        if(e === 'No Reimbursements By That User'){
            throw {
                status: 404,
                message: 'No Reimbursements By That User'
            }
        }else{
            throw{
                status:500,
                Message: 'Internal Server Error'
            }
        
        } 
        }
        finally {
            client && client.release()
    }
}
//a new reimbersement request
export async function daoPostReimbersement(post){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        client.query('BEGIN')
        await client.query('INSERT INTO project0.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) values ($1,$2,now(),$3,$4,1,1,$5)',
            [post.author, post.amount, '0001/01/01', post.description, post.type])
        let result = await client.query('SELECT * FROM project0.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
            [post.author])
        client.query('COMMIT')
        return reimbursementDTOtoReimbursement(result.rows)
    }catch(e){
        client.query('ROLLBACK')
        throw{
            status: 500,
            message: 'Internal Server Error'
        }
    }finally{
        client && client.release()
    }
}

//get a reimbersement by id
export async function daoGetReimbursementsByReimbursementId(reimbursementId: number):Promise<Reimbursement>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()        
        let result = await client.query('SELECT * FROM project0.reimbursement WHERE reimbursement_id = $1',
                                         [reimbursementId])        
        if(result.rowCount === 0){
            throw 'Reimbursement Does Not Exist'
        }else{
            return reimbursementDTOtoReimbursement(result.rows)
        }
    }catch(e){
        if(e === 'Reimbursement Does Not Exist'){
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            }
        }else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client && client.release()
    }
}

//replace a reimbersemnt by id
export async function daoUpdateReimbursement(reimbursementUpdate: Reimbursement){    
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('UPDATE project0.reimbursement SET date_resolved = now(), resolver = $1, status_id = $2 WHERE reimbursement_id = $3',
        [reimbursementUpdate.resolver,reimbursementUpdate.status, reimbursementUpdate.reimbursementId])
        return await daoGetReimbursementsByReimbursementId(reimbursementUpdate.reimbursementId)
    }catch(e){
        if(e === 'Reimbursement Does Not Exist'){
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            }
        }else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client && client.release()
    }
}