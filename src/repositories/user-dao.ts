import { users } from "../database"
import { User } from "../models/user"
import { PoolClient } from "pg"
import { connectionPool } from "."
import { userDTOtoUser, multipleUserDTOtoUser } from "../util/userdto-to-user"


export async function daoGetUserByUsernameAndPassword(username, password):Promise<User>{
    
    let client: PoolClient
    
    try{
        client = await connectionPool.connect()

        let result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE username = $1 and password = $2',
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

export async function daoGetAllUsers(){
    let client: PoolClient
    try{
        client = await connectionPool.connect()

        let result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role')
        if(result.rowCount === 0){
            throw 'No Users Exist'
        }
        else{
            return multipleUserDTOtoUser(result.rows)
        }
    }
    catch(e){
        if(e === 'No Users Exist'){
            throw{
                status: 400,
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

export async function daoGetUserById(id:number){
    let client: PoolClient
    
    try{
        client = await connectionPool.connect()

        let result = await client.query('SELECT * FROM project_0.user NATURAL JOIN project_0.user_role NATURAL JOIN project_0.role WHERE user_id = $1',
                                    [id])
        if(result.rowCount === 0){
            throw 'User does not exist'
        }
        else{
            return userDTOtoUser(result.rows)
        }
    }
    catch(e){
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

export async function daoUpdateUser(newUser: User){
    for(let u of users){
        if(u.userId === newUser.userId){
            u = newUser
            return u
        }
    }
    throw{
        status: 404,
        message: 'User not found'
    }
}