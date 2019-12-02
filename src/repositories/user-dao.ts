import { User } from "../models/user"
import { PoolClient } from "pg"
import { connectionPool, schema } from "."
import { userDTOtoUser, multipleUserDTOtoUser } from "../util/userdto-to-user"


export async function daoGetUserByUsernameAndPassword(username:string, password:string):Promise<User>{
    
    let client: PoolClient
    
    try{
        client = await connectionPool.connect()

        let result = await client.query(`SELECT * FROM ${schema}.users NATURAL JOIN ${schema}.users_join_roles NATURAL JOIN ${schema}.roles WHERE username = $1 and "password" = $2`,
                                    [username, password])
        if(result.rowCount === 0){
            throw 'Invalid Credentials'
            
        }
        else{
            return userDTOtoUser(result.rows)
        }
    }
    catch(e){
        console.log(e);
        
        
        if(e === 'Invalid Credentials'){
            throw{
                status: 401,
                message: 'Invalid Credentials'
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

export async function daoGetAllUsers():Promise<User[]>{
    let client: PoolClient
    try{
        client = await connectionPool.connect()

        let result = await client.query(`SELECT * FROM ${schema}.users NATURAL JOIN ${schema}.users_join_roles NATURAL JOIN ${schema}.roles`)
        
        if(result.rowCount === 0){
            throw 'No Users Exist'
        }
        else{
            return multipleUserDTOtoUser(result.rows)
        }
    }
    catch(e){
        console.log(e);
        
        if(e === 'No Users Exist'){
            throw{
                status: 404,
                message: 'No Users Exist'
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

export async function daoGetUserById(id:number):Promise<User>{
    let client: PoolClient
    
    try{
        client = await connectionPool.connect()

        let result = await client.query(`SELECT * FROM ${schema}.users NATURAL JOIN ${schema}.users_join_roles NATURAL JOIN ${schema}.roles WHERE user_id = $1`,
                                    [id])
        if(result.rowCount === 0){
            throw 'User does not exist'
        }
        else{
            return userDTOtoUser(result.rows)
        }
    }
    catch(e){
        console.log(e);
        if(e === 'User does not exist'){
            throw{
                status: 404,
                message: 'User not found'
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

export async function daoUpdateUser(user: User):Promise<User>{
    
    let client: PoolClient
   
    try {
        client = await connectionPool.connect();
        
        await client.query(`UPDATE ${schema}.users SET username = $1, "password" = $2, firstname = $3, lastname = $4, email = $5 WHERE user_id = $6`,
                            [user.username, user.password, user.firstName, user.lastName, user.email, user.userId]);
        
        let result = await client.query(`SELECT * FROM ${schema}.users NATURAL JOIN ${schema}.users_join_roles NATURAL JOIN ${schema}.roles WHERE user_id = $1`,
                                        [user.userId]);
        if (result.rowCount === 0) {
            console.log(result.rowCount);
            
            throw 'User does not exist';
            
            
        }
        else {
            console.log(result.rows);
            
            return userDTOtoUser(result.rows);
        }
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