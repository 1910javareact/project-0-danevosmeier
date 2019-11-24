import * as userDao from "../repositories/user-dao";
import { User } from "../models/user";


export async function getUserByUsernameAndPassword(username:string, password:string){
    
    return await userDao.daoGetUserByUsernameAndPassword(username, password)
}

export async function getAllUsers():Promise<User[]>{
    
    return await userDao.daoGetAllUsers()
}

export async function getUserById(id: number){
    try{
        return await userDao.daoGetUserById(id)
    }
    catch(e){
        throw e
    }
}

export async function updateUser(req: User){
    let user = await userDao.daoGetUserById(req.userId)

    for(let key in req){
        if(req[key] !== undefined && user.hasOwnProperty(key)){
            user[key] = req[key]
        }
    }
    return await userDao.daoUpdateUser(user)
}