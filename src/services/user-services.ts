import * as userDao from "../repositories/user-dao";
import { User } from "../models/user";


export async function getUserByUsernameAndPassword(username:string, password:string){
    //add functionality
    return userDao.daoGetUserByUsernameAndPassword(username, password)
}

export async function getAllUsers():Promise<User[]>{
    //add functionality
    return userDao.daoGetAllUsers()
}

export async function getUserById(id: number){
    try{
        return userDao.daoGetUserById(id)
    }
    catch(e){
        throw e
    }
}

export async function updateUser(req: User){
    let user = userDao.daoGetUserById(req.userId)

    for(let key in req){
        if(req[key] !== undefined && user.hasOwnProperty(key)){
            user[key] = req[key]
        }
    }
    return userDao.daoUpdateUser(user)
}